import React, { useState } from 'react'
import { View, Text, Switch, StyleSheet, Button ,TextInput} from 'react-native'
// import AppNetwork from '../../network/AppNetwork'
export default function SureConWifi({navigation}) {
    return (
        <View style={styles.relative}>
            <Text style>
                设置设备名字
        </Text>
        <TextInput />
            <View style={styles.button}>
                <Button
                    title='下一步'
                    color='green'
                    onPress={()=>navigation.navigate('experience')}
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