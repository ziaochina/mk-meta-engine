import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import monkeyKing from './monkeyKing'
import config from './config'
import utils from 'mk-utils'

export default function wrapper(option) {
	return WrappedComponent => {
		return class internal extends Component {

			constructor(props) {
   	 			super(props)
    			this.state = { hasError: false }
  			}

			componentDidMount() {
				this.props.initView(this)
			}

			shouldComponentUpdate(nextProps, nextState) {
				if(nextState.hasError != this.state.hasError){
					return true
				}

				for (var o in this.props) {
					if (this.props[o] != nextProps[o]) {
						return true
					}
				}
				return false
			}

			
			componentWillReceiveProps(nextProps){
				if(this.state.hasError){
					this.setState({ hasError: false, error:undefined })
				}

				if(nextProps.componentWillReceiveProps){
					nextProps.componentWillReceiveProps(nextProps)
				}
			}

			componentDidCatch(error, info) {
				utils.exception.error(error)
				this.setState({ hasError: true, error })
				return true
  			}


			componentWillUnmount() {
				this.props.unmount()
			}


			render() {
				if (this.state.hasError) {
					return <div style={{color:'red'}}>{this.state.error}</div>
				}
				
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

