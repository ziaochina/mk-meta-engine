import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import monkeyKing from './monkeyKing'
import config from './config'
import utils from 'mk-utils'

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

			componentDidCatch(error, info) {
				 utils.exception.error(error)
  			}


			componentWillUnmount() {
				this.props.unmount()
			}


			render() {
				if (this.props.notRender === true || this.props._notRender === true)
					return null

				if (!WrappedComponent)
					return null

				if (!this.props.payload || !this.props.payload.get('data'))
					return null

				if( this.props.payload.getIn(['data','_notRender']) === true)
					return null

				return <WrappedComponent {...this.props} monkeyKing={monkeyKing} />
			}
		}
	}
}

