import { storeFactory } from 'common/redux/store-utils'
import { breweriesListReducerSlice } from 'modules/brewery/views/breweries-list-view/state/breweries-list.reducer'
import { breweriesListLoadEpic } from 'modules/brewery/views/breweries-list-view/state/breweries-list.epics'

export const appStore = storeFactory({
    reducers: {
        ...breweriesListReducerSlice,
    },
    epics: [breweriesListLoadEpic],
    enabledDevTools: true,
})
