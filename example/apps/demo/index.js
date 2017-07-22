import config from './config'
import * as data from './data'

export default {
	name: "demo",
	version: "1.0.0",
	description: "demo",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "demo")
	}
}