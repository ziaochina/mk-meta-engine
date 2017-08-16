import Immutable, {
    Map,
    List,
    fromJS
} from 'immutable'

import {
    existsParamsInPath,
    parsePath,
    calcBindField,
    match
} from './path'

import { isExpression, getExpressionBody } from './expression'

const cache = { meta: Map() }

window['__getCache'] = () => cache

export function setMeta(appInfo) {

    if (!appInfo || !appInfo.meta) return

    const appName = appInfo.name

    if (cache.meta.has(appName))
        return

    const meta = fromJS(appInfo.meta)

    cache.meta = cache.meta
        .setIn([appName, 'meta'], meta)
        .setIn([appName, 'metaMap'], parseMeta(meta))
}

export function parseMeta(meta) {
    let ret = Map()

    /*
        name = meta.get('name')

    ret = ret.set(name, '')

    /*const parseChildren = (children, parentPath, parentRealPath) => {
        if (!children) return
        parentRealPath = parentRealPath? `${parentRealPath}.` : parentRealPath
        children.forEach((child, index) => {
            if(typeof child !='string'){
                let childName = child.get('name'),
                    path = `${parentPath}.${childName}`,
                    realPath = `${parentRealPath}children.${index}`
                ret = ret.set(path, realPath)
                parseChildren(children.get('children'), path, realPath)
            }
        })
    }*/


    const parseProp = (propValue, parentPath, parentRealPath) => {
        if (!(propValue instanceof Immutable.Map)) {
            return
        }

        if (propValue.get('name') && propValue.get('component')) {
            parentPath = parentPath ? `${parentPath}.${propValue.get('name')}` : propValue.get('name')
            ret = ret.set(parentPath, parentRealPath)
        }

        propValue.keySeq().toArray().forEach(p => {

            let v = propValue.get(p),
                currentPath = parentPath ? `${parentPath}.${p}` : p
            if (v instanceof Immutable.List) {
                v.forEach((c, index) => {
                    let currentRealPath = parentRealPath ? `${parentRealPath}.${p}.${index}` : `${p}.${index}`
                    parseProp(c, `${currentPath}`, currentRealPath)
                })
            } else {
                let currentRealPath = parentRealPath ? `${parentRealPath}.${p}` : p
                parseProp(v, `${currentPath}`, currentRealPath)
            }
        })
    }

    parseProp(meta, '', '')
    /*
        meta.keySeq().toArray().forEach(p=>{
    
    
             if(p != 'children' && p != 'name' && p != 'component'){
                parseProp(meta.get(p), `${name}.#${p}`, `${name}.${p}`)
            }
        })
    
        parseChildren(meta.get('children'), name, '')
        */
    return ret
}

function isComponent(meta) {
    return typeof meta == 'object' && !!meta.name && !!meta.component
}

export function getMeta(appInfo, fullpath, propertys) {

    if (!fullpath)
        return cache.meta.getIn([appInfo.name, 'meta']).toJS()

    const parsedPath = parsePath(fullpath),
        vars = parsedPath.vars,
        metaMap = cache.meta.getIn([appInfo.name, 'metaMap']),
        meta = cache.meta.getIn([appInfo.name, 'meta'])

    const path = metaMap.get(parsedPath.path)

    const currentMeta = path ? meta.getIn(path.split('.')) : meta

    if (!propertys)
        return currentMeta.toJS()

    const ret = {}

    if (propertys instanceof Array) {
        propertys.forEach(p => {
            let val = currentMeta.getIn(p.split('.'))
            if (p == 'bindField') {
                ret[p] = calcBindField(val, parsedPath)
            }
            else {
                ret[p] = (val && val.toJS) ? val.toJS() : val
            }

        })

        return ret
    }

    if (typeof propertys == 'string') {
        let val = currentMeta.getIn(propertys.split('.'))
        if (propertys == 'bindField') {
            return calcBindField(val, parsedPath)
        }
        return (val && val.toJS) ? val.toJS() : val
    }

}

export function getField(state, fieldPath) {
    if (!fieldPath) {
        return state.get('data')
    }

    if (fieldPath instanceof Array) {
        return state.getIn(fieldPath)
    } else {
        return state.getIn(fieldPath.split('.'))
    }
}

export function getFields(state, fieldPaths) {
    var ret = {}
    fieldPaths.forEach(o => ret[o] = getField(state, o))
    return ret
}

export function setField(state, fieldPath, value) {
    if (fieldPath instanceof Array) {
        return state.setIn(fieldPath, value)
    } else {
        return state.setIn(fieldPath.split('.'), value)
    }
}

export function setFields(state, values) {
    values.forEach(o => {
        state = setField(state, o.path, o.value)
    })

    return state
}

export function updateField(state, fieldPath, fn) {
    if (fieldPath instanceof Array) {
        return state.updateIn(fieldPath, fn)
    } else {
        return state.updateIn(fieldPath.split('.'), fn)
    }
}


Object.assign(exports, {
    existsParamsInPath,
    parsePath,
    calcBindField,
    match,
    isExpression,
    getExpressionBody,
    ...exports
})