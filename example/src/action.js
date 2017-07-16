import { action as MetaAction } from '../../src'

class action {
	
	constructor(option){
		this.metaAction = option.metaAction
	}

	onInit = ({component, injections}) =>{
		this.component = component
		this.injections = injections
		injections.reduce('init')
	}

	login = () => {
		const user = this.metaAction.gf('data.form.user'), 
			pass = this.metaAction.gf('data.form.password')

		if(user == 1 && pass == 1){
			this.metaAction.setField('data.isLogin', true)
			console.log('ok')
		}
		else{
			console.log('error')
		}
	}

	logout = () => {
		if( this.metaAction.getField('data.isLogin') === true )
			this.metaAction.setField('data.isLogin', false)
	}

	isLogin = () => {
		return this.metaAction.getField('data.isLogin') === true
	}

}

export default function creator(option) {
	const metaAction = new MetaAction(option),
		o = new action({...option, metaAction}),
		ret = {...metaAction,...o}

	metaAction.config({metaHandlers:ret})

	return ret
}
