/**
 * 元数据中表达式需要的一些函数
 */

// {{***}} 
const reg = new RegExp("^\s*\{{2}(.+)\}{2}\s*$","m")

// {{{***}}}
const reg1 = new RegExp("^\s*\{{3}(.+)\}{3}\s*$","m")

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