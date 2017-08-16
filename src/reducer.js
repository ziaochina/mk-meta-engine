import Immutable, {
	Map,
	List
} from 'immutable'

import contextManager from './context'

import * as util from './util'

class reducer {
	constructor(option) {
		this.appInfo = option.appInfo
		this.onEvent = this.onEvent.bind(this)
	}

	init = (state, option) => {
		const {
			data = {},
		} = option

		return this.initByImmutable(state, {
			data: Immutable.fromJS(data),
		})
	}

	initByImmutable = (state, option) => {
		const {
			data,
		} = option

		//清除state中非@@开头的属性，那属性是mk-app-loader增加的
		const keys = []
		state.mapKeys(key => {
			if (key.indexOf('@@') === -1)
				keys.push(key)
		})

		keys.forEach(key => {
			state = state.remove(key)
		})

		//设置状态
		return state
			.set('data', data)
	}

	onEvent = (state, eventName, option) => {
		const { path } = option

		const fieldPath = util.getMeta(this.appInfo, path, 'bindField')

		switch (eventName) {
			case 'onFieldFocus':
				return focus(state, path)
			case 'onFieldChange':
				return util.setField(state, fieldPath, option.value)
			default:
				return state
		}
	}

	focus = (state, path) => {
		return util.setter(state, 'meta', 'focusField', path)
	}

	getMeta = util.getMeta

	getField = util.getField

	getFields = util.getFields

	setField = util.setField

	setFields = util.setFields

	gm = util.getMeta

	gf = util.getField

	gfs = util.getFields

	sf = util.setField

	sfs = util.setFields

	context = contextManager

}

export default function creator(option) {
	return new reducer(option)
}