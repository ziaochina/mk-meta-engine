# mk-meta-engine

元数据化引擎，在mk-app-loader实现的应用隔离基础上，实现可以用json元数据描述界面模型，并提供了action、reducer的基础函数和monkeyKing组件.

目的是让开发者能按照一个固定的套路创建应用

## run example

```
$ cd example
$ npm init
$ npm start
```

## 基于当前元数据引擎实现的一些模板app，请点击链接查看

- [mk-app-root](https://github.com/ziaochina/mk-app-root)
- [mk-app-login](https://github.com/ziaochina/mk-app-login)
- [mk-app-portal](https://github.com/ziaochina/mk-app-portal)
- [mk-app-person-list](https://github.com/ziaochina/mk-app-person-list)
- [mk-app-person-card](https://github.com/ziaochina/mk-app-person-card)

## demo网站

- [mk-demo](https://github.com/ziaochina/mk-demo)

## API

### index 

| 成员        | 说明           | 类型               | 
|-------------|----------------|--------------------|
| start | 启动, 使用mk命令创建网站已经调用，不用手动再掉 | function |
| config | 配置，配置元数据引擎以及app-loader需要apps,components等，不用手动调用 | function |
| action | 元数据引擎基类action,提供了一些action基础方法 | class |
| reducer | 元数据引擎基类reducer,提供了一些reducer基础方法 | class |
| wrapper | 元数据引擎组件装饰器 | function |
| componentFactory | 元数据引擎组件仓库，可以注册自己开发的组件 | function |
| AppLoader | AppLoader组件，可以加载app,来源于mk-app-loader | ReactElement |


### action

| 成员        | 说明           | 类型               | 
|-------------|----------------|--------------------|
| config    | 配置函数，使用mk命令初始化的应该默认已经调用   | function |
| getField | 获取state中某个字段值，参数为(fieldPath)，如data.form.user   | function | 
| gf | gf === getField, 简写  | function | 
| setField | 设置state中某个字段值，参数为(fieldPath,value) | function |
| sf | sf === setField, 简写 | function |
| getMeta | 获取元数据，参数为(path,propertys), path:如root.form.user, propertys:如['style'] | function |
| gm | gm === getMeta, 简写 | function |
| context | 上下文object,设置后所有app可以获取context中的信息 | object |
| toast | 轻提示 | function |
| notification | 通知提示 | function |
| modal | 显示模式窗口 | function |

### reducer 
| 成员        | 说明           | 类型               | 
|-------------|----------------|--------------------|
|  init | 初始化，使用mk命令初始化的应该默认已经调用 | function |
| getMeta | 获取元数据， 参数（state, path,propertys） | function |
| gm | gm === getMeta | function |
| getField | 获取字段值，参数为(state, fieldPath) | function |
| gf | gf === getField | function |
| setField | 设置字段值， 参数为(state, field, value) | function|
| sf | sf === setField | function |
| context | 上下文Object | object |

### meta
Json化定义界面数据，如下
```
{
    name: 'root',
    component: '::div',
    children: [{
        name: 'about',
        component: '::a',
        children: 'about',
        style: { fontSize: 16, margin: 30 },
        onClick: '{{$handleAboutClick}}'
    }, {
        name: 'hello',
        component: '::a',
        children: 'hello world',
        style: { fontSize: 16, margin: 30 },
        onClick: '{{$handleHelloClick}}'
    }, {
        name: 'content',
        component: '::div',
        style: { fontSize: 16, margin: 30 },
        children: 'hello world'
    }]
}
```
| 固定属性        | 说明           | 类型               | 
|-------------|----------------|--------------------|
| name | 名称，同级不能为重复 | string |
| component | 组件名，componentFactory中注册的，使用注册时候的名字，默认包含了mk-component所有组件;使用原生组件时，前面加:: | string |
| _visibile | 引擎级属性，设置为false,这个节点将不render | bool |
| _power | 超能力，目前支持函数返回组件和循环输出组件 | string |
| ... | ...属性将属性值解构赋值给组件 |
| 组件自身可用属性 | 只要是组件可用的属性就可以设置  | |


注：组件自身可用属性，属性值可以使用表达式，格式为"{{}}"

"{{data.form.user}}" => 取state中路径为data.form.user的值

"{{$handleClick}}" => 返回action中定义的handleClick方法

 "{{(e)=>$setField('data.form.user', e.target.value)}}" => 用户输入框修改，直接调用Action基类中setField方法赋值

 "{{$getVisible()}}" => 调用action中getVisible方法执行结果




