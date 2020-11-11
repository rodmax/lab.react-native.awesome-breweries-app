export interface BreweryDto {
    id: number
    name: string
    city: string
    state: string
    website_url: string
}

export interface BreweriesListQueryParams {
    /**
     * The offset or page of breweries to return.
     */
    page: number
    /**
     * Number of breweries to return each call.
     * Note: Max per page is 50.
     */
    per_page: number
    /**
     * Filter breweries by name.
     */
    by_name?: string
}
