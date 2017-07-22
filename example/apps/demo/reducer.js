import { Map } from 'immutable'
import { reducer as MetaReducer } from 'mk-meta-engine'
import config from './config'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
        this.config = config.current
    }

    init = (state, option) => {
        const data = {
            data: {
                form: {
                    user: '1',
                    password: '1'
                },
                details: [1, 2, 3, 4],
                ps: {
                    a: 'a',
                    b: 1
                }
            }
        }
        return this.metaReducer.init(state, data)
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}