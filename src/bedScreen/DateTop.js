import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Icons from 'react-native-vector-icons/Fontisto'
export default function DateTop(props) {
    console.log(props,'props')
    return (
        <View style={{ justifyContent: 'space-between',alignItems : 'center', flexDirection: 'row', margin: 5 }}>
            <TouchableOpacity onPress={() => {props.navigation.pop()}}>
                <Icon name="chevron-back" size={24} />
            </TouchableOpacity>
            <Text>{props.title}</Text>
            <Icons name='date' size={20} />
        </View>
    )
}
