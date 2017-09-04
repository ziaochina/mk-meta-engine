import React, { Component } from 'react'
import { RedboxReact } from 'mk-component'
import ReactDOM from 'react-dom'

import monkeyKing from './monkeyKing'


function wrapTryCatch(Component) {
	const originalRender = Component.prototype.render

	Component.prototype.render = function tryRender() {
		try {
			return originalRender.apply(this, arguments)
		} catch (err) {
			console.error(err);
			return <RedboxReact error={err} />
		}
	}
	return Component
}

export default function wrapper(option) {
	return WrappedComponent => {
		return class internal extends Component {

			componentDidMount() {
				this.props.initView(this)
			}

			shouldComponentUpdate(nextProps) {
				for (var o in this.props) {
					if (this.props[o] != nextProps[o]) {
						return true
					}
				}
				return false
			}

			render() {
				if (this.props.notRender === true)
					return null
				if (!WrappedComponent)
					return null
				if (!this.props.payload || !this.props.payload.get('data'))
					return null

				const C = wrapTryCatch(WrappedComponent)
				return <C {...this.props} monkeyKing={monkeyKing} />
			}
		}
	}
}

