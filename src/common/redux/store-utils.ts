/// <reference types="./redux-observable.patch" />

import { combineReducers, createStore, applyMiddleware, ReducersMapObject, Action } from 'redux'
import { createEpicMiddleware, combineEpics, Epic } from 'redux-observable'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BaseReducerObject = ReducersMapObject<any, any>

interface StoreOptions<M extends BaseReducerObject> {
    reducers: M
    epics: Array<Epic>
    enabledDevTools?: boolean
}

export const storeFactory = <M extends BaseReducerObject>(options: StoreOptions<M>) => {
    options = {
        enabledDevTools: false,
        ...options,
    }

    return () => {
        const reducer = combineReducers(options.reducers)

        const epicMiddleware = createEpicMiddleware<Action>()
        let enhancer = applyMiddleware(epicMiddleware)
        const store = createStore(reducer, enhancer)
        epicMiddleware.run(combineEpics(...options.epics))
        return store
    }
}
