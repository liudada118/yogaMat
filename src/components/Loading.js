import React from 'react'
import { View,ActivityIndicator ,Text} from 'react-native'
export default function Loading(props) {
    return (
        <View>
            <ActivityIndicator size="large" color="#00ff00" />
            <Text style={{marginTop : 10}}>{props.text}</Text>
        </View>
    )
}
