import React, { useState,useEffect } from 'react'
import { Button } from 'react-native'
// import axios from 'axios'
import instance from '../../../http/axios'
import { AsyncStorage } from '@react-native-community/async-storage'
export default function Set({navigation}) {
    const [token , setToken] = useState('')
    const _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem("token");
          if (value !== null) {
            // We have data!!
            console.log(value);
          }
        } catch (error) {
          // Error retrieving data
        }
      };
    useEffect(() => {
        console.log(token)
        setToken(_retrieveData())
    }, [])
    const onRealTime = () => {
        instance.post('api/dataOrder/sendOrder?devicesId=f4:cf:a2:96:61:f4&dataCommand=1001&access_token=d23e0be9-8bd9-4c65-88dc-7301f85c166f')
            .then(res => { console.log(res) })
            .catch(err => console.log(err))
    }
    const closeRealTime = () => {
        instance.post('api/dataOrder/sendOrder?devicesId=f4:cf:a2:96:61:f4&dataCommand=1005&access_token=d23e0be9-8bd9-4c65-88dc-7301f85c166f')
            .then(res => { console.log(res) })
            .catch(err => console.log(err))
    }
    const ring = () => {
        instance.post('api/dataOrder/sendOrder?devicesId=f4:cf:a2:96:61:f4&dataCommand=1003&access_token=d23e0be9-8bd9-4c65-88dc-7301f85c166f')
            .then(res => { console.log(res) })
            .catch(err => console.log(err))
    } 
    const shock = () => {
        instance.post('api/dataOrder/sendOrder?devicesId=f4:cf:a2:96:61:f4&dataCommand=1002&access_token=d23e0be9-8bd9-4c65-88dc-7301f85c166f')
        .then(res => { console.log(res) })
        .catch(err => console.log(err))
    }
    return (
        <>
            <Button title='开始实时'
                onPress={onRealTime}
            />
            <Button title='关闭实时' 
                onPress={closeRealTime}
            />
            <Button title='开始震动' 
                onPress={shock}
            />
            <Button title='开始响铃'
            onPress={ring}
            />
            <Button 
            title="返回"
            onPress={()=>{
                navigation.pop()
            }} />
        </>)
}
