import moment from 'moment'

export function stringToMoment(v) {
    if (!v)
        return v
    return moment(v)
}

export function momentToString(v) {
    if (!v)
        return v
    return moment(v).format(format)
}