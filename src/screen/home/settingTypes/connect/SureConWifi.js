import React, { useState } from 'react'
import { View, Text, Switch, StyleSheet, Button } from 'react-native'
// import AppNetwork from '../../network/AppNetwork'
export default function SureConWifi({navigation}) {
    return (
        <View style={styles.relative}>
            <Text style>
                请将手机连接到wifi
        </Text>
            <View style={styles.button}>
                <Button
                    title='去连接wifi'
                    color='green'
                    onPress={()=>navigation.navigate('connecting')}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    relative :{
        height: '100%'
    },
    button : {
        width: '96%',
        marginLeft: '2%',
        position: 'absolute',
        bottom : '2%'
    }
})