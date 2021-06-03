import React from 'react'
import {Button, View,Text,StyleSheet} from 'react-native'
import { ScrollView} from 'react-native-gesture-handler'
export default function ConWifi({navigation}) {
    return (
        <View style={styles.relative}>
            <View>
                <Text>
                    选择设备工作的wifi
                </Text>
            </View>
            <ScrollView>
                <Text>Wifi</Text>
            </ScrollView>
            <View style={styles.button}>
                <Button
                title='下一步'
                color = 'green'
                onPress={()=>navigation.navigate('sureWifi')}
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
