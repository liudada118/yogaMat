import React from 'react'
import { View, StyleSheet } from 'react-native'
export default function Progress(props) {
    console.log(props.children)
    return (
        <View style={styles.content}>
            <View style={styles.progress}></View>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        width: '90%',
        height: 20,
        backgroundColor: '#eee',
        alignSelf: 'center',
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'space-between',
        flexDirection : 'row',
        paddingLeft : 5,
        paddingRight : 5
    },
    progress: {
        width: '50%',
        height: '100%',
        backgroundColor: '#aaa',
        position: 'absolute'
    }
})