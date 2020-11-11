import React from 'react'
import { BreweryDto } from 'api/brewery/brewery-api.types'
import { Portal, Text, Modal, Card, Title } from 'react-native-paper'
import { OpenURLButton } from 'common/ui/UrlOpenButton'
import { breweryI18n } from '../brewery.i18n'

interface Props {
    item: BreweryDto | null | undefined
    onDismiss(): void
}

export const BreweryDetailsModal: React.FC<Props> = ({ item, onDismiss }) => {
    if (!item) {
        return null
    }
    return (
        <Portal>
            <Modal visible={true} onDismiss={onDismiss}>
                <Card style={{ padding: 8 }}>
                    <Title>{item.name}</Title>
                    <OpenURLButton url={item.website_url}>{breweryI18n.homePage}</OpenURLButton>
                    <Text>{JSON.stringify(item, null, 2)}</Text>
                </Card>
            </Modal>
        </Portal>
    )
}
