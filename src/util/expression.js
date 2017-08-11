/**
 * 元数据中表达式需要的一些函数
 */

// {{***}} 
const reg = /^\s*\{{2}([.\n\S]+)\}{2}\s*$/m

// {{{***}}}
const reg1 = /^\s*\{{3}([.\n\S]+)\}{3}\s*$/m

export function isExpression(v){
    return reg.test(v) || reg1.test(v)
} 

export function getExpressionBody(v){
    if (reg1.test(v)){
        //去掉前后{{{ }}}
        return v.replace(reg1, (word, group) => group)
    }

	if(reg.test(v)){
         //return + 去掉前后{{ }}
        return "return " + v.replace(reg, (word, group) => group)
    }
    
    return v
}