import { StateSlice, storeSlice } from 'common/redux/reducer-utils'
import { shouldNeverBeCalled } from 'common/utils/misc'
import { BreweriesListAction, LoadType } from './breweries-list.actions'
import { BreweryDto, BreweriesListQueryParams } from 'api/brewery/brewery-api.types'
import { breweryApiClient } from 'api/brewery/brewery-api.client'

export interface BreweriesListState {
    items: BreweryDto[]
    search: string
    filter: unknown
    page: BreweriesListQueryParams['page']
    per_page: BreweriesListQueryParams['per_page']
    isLoading: boolean
    isLoadingMore: boolean
    hasMoreItems: boolean
    error: unknown
    activeItemId: null | BreweryDto['id']
}

const initialState: BreweriesListState = {
    isLoading: false,
    isLoadingMore: false,
    search: '',
    filter: null,
    items: [],
    hasMoreItems: true,
    activeItemId: null,
    error: null,
    page: breweryApiClient.FIRST_PAGE_INDEX,
    per_page: 20,
}

export type BreweriesListStateSlice = StateSlice<typeof breweriesListReducerSlice>
export const breweriesListReducerSlice = storeSlice('breweriesList', initialState).withReducer(
    (state, action: BreweriesListAction) => {
        switch (action.type) {
            case '@breweriesList.loadStart':
                return {
                    ...state,
                    ...isLoadingStateByType(action.payload),
                    page: action.payload === 'FIRST_PAGE' ? initialState.page : state.page + 1,
                }
            case '@breweriesList.searchChange':
                return {
                    ...state,
                    ...isLoadingStateByType('FIRST_PAGE'),
                    search: action.payload,
                    page: initialState.page,
                }

            case '@breweriesList.loadSuccess':
                return {
                    ...state,
                    isLoading: false,
                    isLoadingMore: false,
                    hasMoreItems: action.payload.items.length === state.per_page,
                    items:
                        action.payload.loadType === 'FIRST_PAGE'
                            ? action.payload.items
                            : [...state.items, ...action.payload.items],
                }

            case '@breweriesList.loadError':
                return { ...state, isLoading: false, error: action.payload }
            case '@breweriesList.selectItem':
                return { ...state, activeItemId: action.payload }
            case '@breweriesList.closeItem':
                return { ...state, activeItemId: null }

            default:
                shouldNeverBeCalled(action)
        }
        return state
    }
)

const isLoadingStateByType = (
    loadType: LoadType
): Pick<BreweriesListState, 'isLoadingMore' | 'isLoading'> => {
    return {
        isLoading: loadType === 'FIRST_PAGE',
        isLoadingMore: loadType === 'LOAD_MORE',
    }
}
