import { action, ActionsUnion } from 'common/redux/action-utils'
import { BreweryDto } from 'api/brewery/brewery-api.types'

export type LoadType = 'FIRST_PAGE' | 'LOAD_MORE'

export const breweriesListActions = {
    loadStart: action('@breweriesList.loadStart').withPayload<LoadType>(),
    loadSuccess: action('@breweriesList.loadSuccess').withPayload<{
        items: BreweryDto[]
        loadType: LoadType
    }>(),
    searchChange: action('@breweriesList.searchChange').withPayload<string>(),
    loadError: action('@breweriesList.loadError').withPayload<object>(),
    selectItem: action('@breweriesList.selectItem').withPayload<BreweryDto['id']>(),
    closeItem: action('@breweriesList.closeItem').withNoPayload(),
}

export type BreweriesListAction = ActionsUnion<typeof breweriesListActions>
