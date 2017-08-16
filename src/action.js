import React from 'react'
import { AppLoader } from 'mk-app-loader'
import * as util from './util'
import { fromJS } from 'immutable'
import contextManager from './context'
import config from './config'

class action {
	constructor(option) {
		this.appInfo = option.appInfo
		this.meta = fromJS(option.appInfo.meta)
		this.cache = {}

		util.setMeta(option.appInfo)
	}

	config = ({ metaHandlers }) => {
		this.metaHandlers = metaHandlers
	}

	initView = (component, injections) => {
		this.component = component
		this.injections = injections

		this.metaHandlers && this.metaHandlers['onInit'] && this.metaHandlers['onInit']({ component, injections })
	}

	getField = (fieldPath) => {
		return util.getField(this.injections.getState(), fieldPath)
	}

	getFields = (fieldPaths) => {
		return util.getFields(this.injections.getState(), fieldPaths)
	}

	setField = (fieldPath, value) => {
		return this.injections.reduce('setField', fieldPath, value)
	}

	setFields = (values) => {
		return this.injections.reduce('setFields', values)
	}

	parseExpreesion = (v) => {
		if (!this.cache.expression)
			this.cache.expression = {}

		if (this.cache.expression[v]) {
			return this.cache.expression[v]
		}

		if (!this.cache.expressionParams) {
			this.cache.expressionParams = ['data']
				.concat(Object.keys(this.metaHandlers).map(k => "$" + k))
				.concat(['_path', '_rowIndex', '_vars', '_fullPath'])
		}

		var params = this.cache.expressionParams

		var body = util.getExpressionBody(v)

		this.cache.expression[v] = new Function(...params, body)

		return this.cache.expression[v]
	}

	updateMeta = (meta, path, rowIndex, vars, data) => {
		//存在name和component属性追加path路径
		if (meta.name && meta.component) {
			meta.path = vars ? `${path}, ${vars.join(',')}` : path
		}

		if (meta["_power"])
			return

		Object.keys(meta).forEach(key => {
			let v = meta[key],
				t = typeof v,
				currentPath = path

			if (t == 'string' && util.isExpression(v)) {
				let f = this.parseExpreesion(v)

				let values = [data]

				Object.keys(this.metaHandlers).forEach(k => {
					values.push((...args) => this.metaHandlers[k](...args, { currentPath, rowIndex, vars }))
				})

				values = values.concat([currentPath, rowIndex, vars, meta.path])
				let ret = f.apply(this, values)
				if (key == '...' && ret && typeof ret == 'object') {
					Object.keys(ret).forEach(kk => {
						meta[kk] = () => ret[kk]
					})
					delete meta['...']
				} else {
					meta[key] = () => ret
				}
			}
			else if (v instanceof Array) {

				v.forEach(c => {
					currentPath = path
					if (c.name && c.component) {
						currentPath = currentPath ? `${currentPath}.${key}.${c.name}` : `${key}.${c.name}`
					}
					this.updateMeta(c, currentPath, rowIndex, vars, data)
				})
			}
			else if (t == 'object') {
				if (v.name && v.component) {
					currentPath = currentPath ? `${currentPath}.${key}.${v.name}` : `${key}.${v.name}`
				}
				this.updateMeta(meta[key], currentPath, rowIndex, vars, data)
			}

		})
	}

	calcBindField = (bindField, vars) => {
		if (!bindField) return bindField

		if (!vars) return bindField

		var hit = false

		//root.detail.code,0;form.detail.${0}.code => form.detail.0.code
		//root.detail,0;form.detail => form.detail.0
		bindField = bindField.replace(/{(\d+)}/g, (match, index) => {
			hit = true
			return vars[index]
		})
		return hit ? bindField : bindField + '.' + vars[0]
	}

	getMeta = (fullPath, propertys) => {
		const meta = util.getMeta(this.appInfo, fullPath, propertys),
			parsedPath = util.parsePath(fullPath),
			path = parsedPath.path,
			rowIndex = parsedPath.vars ? parsedPath.vars[0] : undefined,
			vars = parsedPath.vars,
			data = util.getField(this.injections.getState()).toJS()

		meta['_power'] = undefined
		this.updateMeta(meta, path, rowIndex, vars, data)
		return meta
	}

	asyncGet = async (path, property) => {
		var parsedPath = util.parsePath(path),
			eventSource = (parsedPath || {
				path: 'root'
			}).path

		if (typeof property === 'string') {
			if (this.event && this.event[eventSource] && this.event[eventSource][propertys]) {

				var response = await this.event[eventSource][propertys]({
					path: eventSource,
					rowIndex: parsedPath.vars ? parsedPath.vars[0] : undefined
				})

				return Promise.resolve(response)
			}
		}
	}

	onEvent = (eventName, option) => {
		var parsedPath = util.parsePath(option.path),
			eventSource = (parsedPath || {
				path: 'root'
			}).path

		const strHandler = util.getMeta(this.appInfo, eventSource, eventName)
		if (strHandler && strHandler.substring(0, 2) === '$$' && this.metaHandlers[strHandler.substr(2)]) {
			this.metaHandlers[strHandler.substr(2)]({
				...option,
				path: eventSource,
				rowIndex: parsedPath.vars ? parsedPath.vars[0] : option.rowIndex
			})
		}
		else {
			this.injections.reduce('onEvent', eventName, option)
		}
	}

	getDirectFuns = () => {
		return {
			getMeta: (path, propertys) => {
				return this.getMeta(path, propertys)
			},
			getField: (fieldPath) => {
				return this.getField(fieldPath)
			},
			asyncGet: async (path, propertys) => {
				return await this.asyncGet(path, property)
			},
			gm: (path, propertys) => {
				return this.getMeta(path, propertys)
			},
			gf: (fieldPath) => {
				return this.getField(fieldPath)
			},
			ag: async (path, propertys) => {
				return await this.asyncGet(path, property)
			}
		}
	}

	toast = (...args) => {
		const Toast = config.getToast()
		if (!Toast || args.length == 0 || !Toast[args[0]]) return
		Toast[args[0]](...args.slice(1))
	}

	notification = (...args) => {
		const Notification = config.getNotification()
		if (!Notification || args.length == 0 || !Notification[args[0]]) return
		Notification[args[0]](...args.slice(1))
	}

	modal = (...args) => {
		const Modal = config.getModal()
		if (!Modal || args.length == 0 || !Modal[args[0]]) return
		return Modal[args[0]](...args.slice(1))
	}

	loadApp = (name, props) => {
		return <AppLoader {...props} name={name} />
	}

	gm = this.getMeta

	gf = this.getField

	gfs = this.getFields

	sf = this.setField

	sfs = this.setFields

	context = contextManager
}

export default function creator(option) {
	return new action(option)
}