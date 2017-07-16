import * as components from './metaComponents'
import * as api from './api'

module.exports = {
	name: 'example',
	version: '0.0.1',
	description: 'example',
	author: '',
	meta: api.getMeta(),
	components,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, 'example')
	}
}
