import React from 'react'
import { Text, View } from 'react-native'

export const BreweriesListView: React.FC = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{BreweriesListView.name} !!! 🎉</Text>
        </View>
    )
}
