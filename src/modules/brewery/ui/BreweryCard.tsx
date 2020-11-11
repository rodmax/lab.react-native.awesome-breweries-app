import React from 'react'
import { BreweryDto } from 'api/brewery/brewery-api.types'
import { Card, Text } from 'react-native-paper'

interface Props {
    item: BreweryDto
    onPress(): void
}

export const BreweryCard: React.FC<Props> = props => {
    return (
        <Card elevation={2} style={{ marginBottom: 4 }} onPress={props.onPress}>
            <Card.Title title={props.item.name}></Card.Title>
            <Card.Content>
                <Text>#{props.item.id}</Text>
                <Text>{props.item.state}</Text>
                <Text>{props.item.city}</Text>
            </Card.Content>
        </Card>
    )
}
