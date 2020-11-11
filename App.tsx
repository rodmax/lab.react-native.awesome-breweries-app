import React from 'react'
import { BreweriesListView } from 'modules/brewery/views/breweries-list-view/BreweriesListView'
import { Provider as PaperProvider } from 'react-native-paper'
import { Provider as StoreProvider } from 'react-redux'
import { appStore } from 'core/app-store'

export const App = () => {
    return (
        <StoreProvider store={appStore()}>
            <PaperProvider>
                <BreweriesListView></BreweriesListView>
            </PaperProvider>
        </StoreProvider>
    )
}
