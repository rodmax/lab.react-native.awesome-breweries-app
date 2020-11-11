import { httpClient } from 'common/http/http-client'
import { Observable } from 'rxjs'
import { BreweryDto, BreweriesListQueryParams } from './brewery-api.types'
import { map } from 'rxjs/operators'

export const breweryApiClient = {
    loadList,
    FIRST_PAGE_INDEX: 1,
} as const

function loadList(queryParams: BreweriesListQueryParams): Observable<BreweryDto[]> {
    return httpClient
        .request<BreweryDto[]>({
            method: 'GET',
            url: `https://api.openbrewerydb.org/breweries`,
            queryParams,
        })
        .pipe(map(r => r.data))
}
