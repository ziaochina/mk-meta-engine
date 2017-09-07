import { config as appLoaderConfig, AppLoader } from 'mk-app-loader'
import cf from './componentFactory'


var toast, notification, modal, errorBox, apps

function config(option) {
	const components = option.components

	toast = option.toast
	notification = option.notification
	modal = option.modal
	errorBox = option.errorBox
	apps = option.apps

	appLoaderConfig(option)

	cf.registerComponent('AppLoader', AppLoader)

	if (components && components.length > 0) {
		components.forEach(c => {
			if (c.appName)
				cf.registerAppComponent(c.appName, c.name, c.component)

			else
				cf.registerComponent(c.name, c.component)
		})
	}

	if (apps) {
		Object.keys(apps).forEach(k => {
			let a = apps[k]
			if (a.components && a.components.length > 0) {
				a.components.forEach(c => {
					cf.registerAppComponent(a.name, c.name, c.component)
				})
			}
		})
	}
}

config.getToast = () => toast
config.getNotification = () => notification
config.getModal = () => modal
config.getApps = () => apps

export default config