import React, { Component, useState } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import Iconon from 'react-native-vector-icons/Ionicons'

export default function AddEquip(props) {
    const [loading, setLoading] = useState(false);
    const [loadInfo, setLoadInfo] = useState('请求中');
    console.log(props.navigation.state)
    return (
        <>
            {loading ? <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: "center", zIndex: 1, position: 'absolute' }}>
                <View style={{ padding: 20, backgroundColor: '#555', justifyContent: 'center', alignItems: 'center' }}>
                    <Loading text={loadInfo} />
                </View>
            </View> : null}
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => { props.navigation.pop() }}
                style={{ flexDirection : 'row' , alignItems : 'center'}}
            >
                <Iconon name="chevron-back" size={24} color='black' />
                <Text>当前设备</Text>
            </TouchableOpacity>
        </>

    )
}