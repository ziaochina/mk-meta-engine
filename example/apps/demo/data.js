export function getMeta() {
	return {
		name: 'root',
		component: '::div',
		children: [{
			name: 'hello',
			component: '::div',
			children:'hello'
		}, {
			name: 'userLabel',
			component: '::span',
			children: 'user:',
			_visible: '{{data.isLogin !== true}}'
		}, {
			name: 'user',
			component: '::input',
			value: '{{data.form.user}}',
			onChange: "{{ (e) => $setField('data.form.user', e.target.value ) }}",
			_visible: '{{$isLogin() === false}}'
		}, {
			name: 'pwdLabel',
			component: '::span',
			children: 'password:',
			_visible: `{{{
				debugger;
				console.log(arguments);
				return data.isLogin !== true;
			}}}`
		}, {
			name: 'password',
			component: '::input',
			type: 'password',
			value: '{{data.form.password}}',
			onChange: "{{ (e) => $setField('data.form.password', e.target.value ) }}",
			_visible: '{{$isLogin() === false}}'
		}, {
			name: 'button',
			component: '::button',
			children: 'login',
			onClick: '{{$login}}',
			_visible: '{{$isLogin() === false}}'
		}, {
			name: 'welcome',
			component: '::div',
			children: 'welcome',
			_visible: '{{$isLogin()}}'
		}, {
			name: 'logout',
			component: '::button',
			children: 'logout',
			onClick: '{{$logout}}',
			_visible: '{{$isLogin()}}'
		},
		{
			name: 'span',
			component: '::span',
			children: "{{data.details[_rowIndex]}}",
			_power: 'for in data.details',
			'...': '{{data.ps}}'
		}]

	}
}