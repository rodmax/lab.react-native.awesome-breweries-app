import React, { useEffect, Dispatch } from 'react'
import { FlatList, View, SafeAreaView } from 'react-native'
import { ProgressBar, ActivityIndicator } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { BreweriesListStateSlice } from './state/breweries-list.reducer'
import { breweriesListActions, BreweriesListAction } from './state/breweries-list.actions'
import { BreweryCard } from 'modules/brewery/ui/BreweryCard'
import { BreweriesListSearch } from 'modules/brewery/ui/BreweriesListSearch'
import { BreweryDetailsModal } from 'modules/brewery/ui/BreweryDetailsModal'
import { BreweryDto } from 'api/brewery/brewery-api.types'

export const BreweriesListView: React.FC = () => {
    const search = useSelector(selectSearch)
    const isLoading = useSelector(selectIsLoading)
    const isLoadingMore = useSelector(selectIsLoadingMore)
    const canLoadMore = useSelector(selectHasMoreItems)
    const items = useSelector(selectItems)
    const activeItem = useSelector(selectActiveItem)

    const dispatch = useDispatch<Dispatch<BreweriesListAction>>()

    useEffect(() => {
        dispatch(breweriesListActions.loadStart('FIRST_PAGE'))
    }, [])

    const renderItem = ({ item }: { item: BreweryDto }) => {
        return (
            <BreweryCard
                item={item}
                onPress={() => dispatch(breweriesListActions.selectItem(item.id))}
            />
        )
    }

    const renderFooter = () => {
        /* HOTFIX: dirty hack with marginBottom to make somehow footer visible */
        return (
            <View style={{ marginBottom: isLoadingMore ? 64 : 80 }}>
                {isLoadingMore ? (
                    <ActivityIndicator size='large' animating={true} style={{ padding: 16 }} />
                ) : null}
            </View>
        )
    }

    const loadMore = () => {
        if (isLoadingMore || isLoading) {
            return
        }
        if (canLoadMore) {
            dispatch(breweriesListActions.loadStart('LOAD_MORE'))
        }
    }

    return (
        <>
            <View>
                <BreweriesListSearch
                    value={search}
                    onChangeSearch={value => dispatch(breweriesListActions.searchChange(value))}
                />
                {isLoading ? <ProgressBar indeterminate={true} /> : null}
            </View>
            <BreweryDetailsModal
                item={activeItem}
                onDismiss={() => dispatch(breweriesListActions.closeItem())}
            ></BreweryDetailsModal>
            <SafeAreaView>
                <FlatList
                    scrollsToTop={true}
                    refreshing={isLoading}
                    data={items}
                    key='id'
                    renderItem={renderItem}
                    onEndReached={loadMore}
                    ListFooterComponent={renderFooter}
                ></FlatList>
            </SafeAreaView>
        </>
    )
}

const selectSearch = (s: BreweriesListStateSlice) => s.breweriesList.search
const selectIsLoading = (s: BreweriesListStateSlice) => s.breweriesList.isLoading
const selectIsLoadingMore = (s: BreweriesListStateSlice) => s.breweriesList.isLoadingMore
const selectHasMoreItems = (s: BreweriesListStateSlice) => s.breweriesList.hasMoreItems
const selectItems = (s: BreweriesListStateSlice) => s.breweriesList.items

const selectActiveItem = (s: BreweriesListStateSlice) => {
    const id = s.breweriesList.activeItemId
    if (id === null) {
        return null
    }
    return s.breweriesList.items.find(item => item.id === id)
}
