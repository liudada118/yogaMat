import React,{useState} from 'react'
import {View,StyleSheet} from 'react-native'
export default function Power(props) {
    // const [outPower , setOutPower] = useState(false)
    return (
        <View style={styles.wrapper}>
            <View style={props.power===1 ? styles.content : styles.outContent}></View>
        </View>
    )
}
const styles = StyleSheet.create({
    wrapper : {
        // position : 'relative',
        width : 20,
        height : 8,
        backgroundColor : '#fff',
        borderRadius : 4,
        // position : 'absolute',
        // top : '2%',
        // right : '2%',
        overflow : 'hidden'
    },
    content : {
        width : '100%',
        height : '100%',
        backgroundColor : 'green',
        borderRadius : 4,
    },
    outContent : {
        width : '20%',
        height : '100%',
        backgroundColor : 'red',
        borderRadius : 4,
        position : 'absolute',
        right : 0,
    }
})