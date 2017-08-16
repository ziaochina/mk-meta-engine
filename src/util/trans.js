import moment from 'moment'

export function stringToMoment(v) {
    if (!v)
        return v
    return moment(v)
}

export function momentToString(v, format) {
    if (!v)
        return v
    return moment(v).format(format)
}