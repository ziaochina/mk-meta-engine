import React, {Component} from 'react'

import {wrapper,} from '../../src'

import appInfo from './index.js'

@wrapper(appInfo)
export default class C extends Component {
	render() {
		return  this.props.monkeyKing({...this.props, path:'root'})
	}
}