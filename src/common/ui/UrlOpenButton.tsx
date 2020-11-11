import { Button } from 'react-native-paper'
import React, { useCallback } from 'react'
import { Linking, Alert } from 'react-native'

interface Props {
    url: string
}

// Copy pasted from  https://reactnative.dev/docs/linking
export const OpenURLButton: React.FC<Props> = ({ url, children }) => {
    const handlePress = useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url)

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url)
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`)
        }
    }, [url])

    return <Button onPress={handlePress}>{children}</Button>
}
