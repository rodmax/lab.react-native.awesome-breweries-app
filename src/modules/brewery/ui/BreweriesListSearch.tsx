import React from 'react'
import { Searchbar } from 'react-native-paper'
import { breweryI18n } from '../brewery.i18n'

interface Props {
    value: string
    onChangeSearch(search: string): void
}

export const BreweriesListSearch: React.FC<Props> = props => {
    return (
        <Searchbar
            placeholder={breweryI18n.searchPlaceholder}
            onChangeText={props.onChangeSearch}
            value={props.value}
        />
    )
}
