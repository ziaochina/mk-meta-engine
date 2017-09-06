import React from 'react'
import { AppLoader } from 'mk-app-loader'
import * as common from './common'
import utils from 'mk-utils'
import { fromJS } from 'immutable'
import contextManager from './context'
import config from './config'

class action {
	constructor(option) {
		this.appInfo = option.appInfo
		this.meta = fromJS(option.appInfo.meta)
		this.cache = {}

		common.setMeta(option.appInfo)
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
		return common.getField(this.injections.getState(), fieldPath)
	}

	getFields = (fieldPaths) => {
		return common.getFields(this.injections.getState(), fieldPaths)
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

		var body = utils.expression.getExpressionBody(v)

		this.cache.expression[v] = new Function(...params, body)

		return this.cache.expression[v]
	}

	execExpression = (v, meta, data, path, rowIndex, vars) => {
		let f = this.parseExpreesion(v)
		let values = [data]

		Object.keys(this.metaHandlers).forEach(k => {
			values.push((...args) => this.metaHandlers[k](...args, { currentPath: path, rowIndex, vars }))
		})

		values = values.concat([path, rowIndex, vars, meta.path])
		
		return f.apply(this, values)
	}

	updateMeta = (meta, path, rowIndex, vars, data) => {
		//存在name和component属性追加path路径
		if (meta.name && meta.component) {
			meta.path = vars ? `${path}, ${vars.join(',')}` : path
		}

		if (meta["_power"])
			return

		var excludeProps = meta["_excludeProps"]
		if (excludeProps && utils.expression.isExpression(excludeProps)) {
			excludeProps = this.execExpression(excludeProps, meta, data, path, rowIndex, vars)
		}

		//去除meta的排除属性
		if (excludeProps && excludeProps instanceof Array) {
			excludeProps.forEach(k => {
				if (meta[k])
					delete meta[k]
			})
		}

		Object.keys(meta).forEach(key => {
			let v = meta[key],
				t = typeof v,
				currentPath = path

			if (t == 'string' && utils.expression.isExpression(v)) {
				const ret = this.execExpression(v, meta, data, currentPath, rowIndex, vars)

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

				v.forEach((c, index) => {
					if (typeof c == 'string' && utils.expression.isExpression(c)) {
						meta[key][index] = this.execExpression(c, meta, data, currentPath, rowIndex, vars)
					}
					else {
						currentPath = path
						if (c.name && c.component) {
							currentPath = currentPath ? `${currentPath}.${key}.${c.name}` : `${key}.${c.name}`
						}
						this.updateMeta(c, currentPath, rowIndex, vars, data)
					}
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

	getMeta = (fullPath, propertys) => {
		const meta = common.getMeta(this.appInfo, fullPath, propertys),
			parsedPath = utils.path.parsePath(fullPath),
			path = parsedPath.path,
			rowIndex = parsedPath.vars ? parsedPath.vars[0] : undefined,
			vars = parsedPath.vars,
			data = common.getField(this.injections.getState()).toJS()

		meta['_power'] = undefined
		this.updateMeta(meta, path, rowIndex, vars, data)
		return meta
	}

	setMetaForce = (appName, meta) => {
		common.setMetaForce(appName, meta)
	}

	focus = (path) => {
		if (this.isFocus(path)) return false
		this.setField('data.other.focusFieldPath', path)
		return true
	}

	focusByEvent = (e) => {
		const path = utils.path.findPathByEvent(e)
		return this.focus(path)
	}

	isFocus = (path) => {
		if (!path) return false
		const focusFieldPath = this.getField('data.other.focusFieldPath')
		if (!focusFieldPath) return false
		return path.replace(/\s/g, '') == focusFieldPath.replace(/\s/g, '')
	}

	getDirectFuns = () => {
		return {
			getMeta: (path, propertys) => {
				return this.getMeta(path, propertys)
			},
			getField: (fieldPath) => {
				return this.getField(fieldPath)
			},
			gm: (path, propertys) => {
				return this.getMeta(path, propertys)
			},
			gf: (fieldPath) => {
				return this.getField(fieldPath)
			},
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

	findPathByEvent = utils.path.findPathByEvent

	stringToMoment = utils.moment.stringToMoment

	momentToString = utils.moment.momentToString

	fromJS = fromJS

	context = contextManager
}

export default function creator(option) {
	return new action(option)
}