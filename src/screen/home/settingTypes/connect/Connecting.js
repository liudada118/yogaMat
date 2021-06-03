import React,{useState,useEffect} from 'react'
import {Button, View,Text,StyleSheet} from 'react-native'
import { ScrollView} from 'react-native-gesture-handler'
export default function ConWifi({navigation}) {
    const [state, setState] = useState(false)
    useEffect(()=>{
        setTimeout(()=>{
            setState(true)
        },2000)
    } ,[state])
    return (
        <View style={styles.relative}>
            <View>
            <Text>请将设备尽量靠近路由器</Text>
            <Text>请将设备尽量靠近路由器</Text>
            <Text>请将设备尽量靠近路由器</Text>
            <Text>请将设备尽量靠近路由器</Text>
            </View>
            {state ? <View style={styles.button}>
                <Button
                title='完成'
                color = 'green'
                onPress={()=>navigation.navigate('setname')}
                />
            </View> : null}
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
