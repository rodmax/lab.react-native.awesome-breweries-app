import { Epic, ofType } from 'redux-observable'
import { switchMap, map, debounceTime, catchError } from 'rxjs/operators'
import { BreweriesListAction, breweriesListActions } from './breweries-list.actions'
import { breweryApiClient } from 'api/brewery/brewery-api.client'
import { of, merge } from 'rxjs'
import { BreweriesListQueryParams } from 'api/brewery/brewery-api.types'
import { BreweriesListStateSlice } from './breweries-list.reducer'

const SEARCH_DEBOUNCE = 300

export const breweriesListLoadEpic: Epic<
    BreweriesListAction,
    BreweriesListAction,
    BreweriesListStateSlice
> = (action$, state$) => {
    return merge(
        action$.pipe(
            ofType('@breweriesList.loadStart'),
            map(a => a.payload)
        ),
        action$.pipe(
            ofType('@breweriesList.searchChange'),
            debounceTime(SEARCH_DEBOUNCE),
            map(() => {
                return 'FIRST_PAGE' as const
            })
        )
    ).pipe(
        switchMap(loadType => {
            const state = state$.value.breweriesList

            const params: BreweriesListQueryParams = {
                page: state.page,
                per_page: state.per_page,
                by_name: state.search,
            }
            return breweryApiClient.loadList(params).pipe(
                map(items => {
                    return breweriesListActions.loadSuccess({ items, loadType })
                }),
                catchError(err => {
                    return of(breweriesListActions.loadError(err))
                })
            )
        })
    )
}
