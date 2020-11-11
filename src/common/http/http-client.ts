import { HttpRequestConfig, HttpResponse, AnyHttpQueryParams } from './http-client.types'
import { fromFetch } from 'rxjs/fetch'
import { switchMap } from 'rxjs/operators'
import { throwError, Observable } from 'rxjs'

export const httpClient = {
    request,
}

function request<Dto>(config: HttpRequestConfig): Observable<HttpResponse<Dto>> {
    let url = config.url
    if (config.queryParams) {
        url += '?' + queryString(config.queryParams)
    }
    console.log(url)
    return fromFetch(url, { method: config.method }).pipe(
        switchMap(response => {
            if (response.ok) {
                return response.json().then(data => {
                    return { data, response }
                })
            } else {
                return throwError(response)
            }
        })
    )
}

/**
 * NOTE: array values not supported
 */
function queryString(params: object): string {
    return Object.keys(params)
        .map(k => {
            const value = (params as AnyHttpQueryParams)[k]
            if (value === null || value === undefined || value === '') {
                return null
            }
            return encodeURIComponent(k) + '=' + encodeURIComponent(value)
        })
        .filter(str => !!str)
        .join('&')
}
