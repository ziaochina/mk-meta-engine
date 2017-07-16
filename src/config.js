import {
	config as appLoaderConfig,
	AppLoader
} from 'mk-app-loader'

import cf from './componentFactory'

var toast, notification, modal

function config(option) {
	const components = option.components

	toast = option.toast
	notification = option.notification
	modal = option.modal

	appLoaderConfig(option)

	cf.registerComponent('AppLoader', AppLoader)

	if (!components || components.length == 0)
		return


	components.forEach(c => {
		if (c.appName)
			cf.registerComponent(c.appName, c.name, c.component)

		else
			cf.registerComponent(c.name, c.component)
	})
}

config.getToast = () => toast
config.getNotification = () => notification
config.getModal = () => modal

export default config