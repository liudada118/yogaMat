import React, { useState } from 'react'
import { View, Text, Switch, StyleSheet, Button } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
// import Blue from '../../blue/Appblue'
// import Wifi from '../../wifi/Wifi'
// import AppNetwork from '../../network/AppNetwork'
// export default function Bluetooth({navigation}) {
//     return (
//         <View style={styles.relative}>
//             <Text style>
//                 设备提示信息
//         </Text>
//             <View style={styles.button}>
//                 <Button
//                     title='下一步'
//                     color='green'
//                     onPress={()=>navigation.navigate('conWifi')}
//                 />
//             </View>
//         </View>
//     )
// }
// const styles = StyleSheet.create({
//     relative :{
//         height: '100%'
//     },
//     button : {
//         width: '96%',
//         marginLeft: '2%',
//         position: 'absolute',
//         bottom : '2%'
//     }
// })

export default function Bluetooth(){
    return (
        <View style={styles.relative}>
            <Text style>SSID</Text>
            <Text style>BSSID</Text>
            <TextInput placeholder='密码:' style={styles.input} />
            <View style={styles.button}>
            <Button 
            title='确认'
            color = 'green'
            />
            </View>
        </View>
        )
}

const styles = StyleSheet.create({
    relative :{
        height: '100%',
        margin : 10
    },
    button : {
        width: '96%',
        marginLeft: '2%',
        position: 'absolute',
        bottom : '2%'
    },
    input :{
        borderWidth : 1,
        borderColor : '#bbb',
        padding : 0
    }
})