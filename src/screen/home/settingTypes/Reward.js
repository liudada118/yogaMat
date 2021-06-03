import React, { useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { BottomSheet, ListItem } from 'react-native-elements'
export default function Remind({ navigation }) {
    const [isVisible, setIsVisible] = useState(false);
    const [state, setState] = useState({
        time: '15分钟',
        progress: '1',
        reward: '4'
    })
    const list = [
        {
            title: '15分钟',
            containerStyle: { backgroundColor: '#fff' },
            titleStyle: { color: 'white' },
            onPress: () => setIsVisible(false),
        },
        {
            title: '30分钟',
            containerStyle: { backgroundColor: '#fff' },
            titleStyle: { color: 'white' },
            onPress: () => setIsVisible(false),
        },
        {
            title: '45分钟',
            containerStyle: { backgroundColor: '#fff' },
            titleStyle: { color: 'white' },
            onPress: () => setIsVisible(false),
        },
        {
            title: '60分钟',
            containerStyle: { backgroundColor: '#fff' },
            titleStyle: { color: 'white' },
            onPress: () => setIsVisible(false),
        },
    ]
    const [data , setData] = useState(['15分钟' , '30分钟' ,'45分钟' , '60分钟'])
    const [data1 , setData1] = useState(['15分钟' , '30分钟' ,'45分钟' , '60分钟'])
    const [data2 , setData2] = useState(['15分钟' , '30分钟' ,'45分钟' , '60分钟'])
    return (
        <View style={[styles.outPadding, styles.relative]}>
            <View style={[styles.flexRow, styles.spaceBetween]}>
                <Text style={styles.text}>奖励设置</Text>
            </View>
            <View style={[styles.card]} >
                <View style={[styles.flexRow, styles.spaceBetween, styles.padding]}>
                    <Text style={styles.text}>奖励完成时间</Text><Text style={styles.text}> <Picker
                        selectedValue={state.time}
                        style={{ height: 50, width: 120 }}
                        onValueChange={(itemValue, itemIndex) =>
                            setState({ ...state, time: itemValue })
                        }>
                        {data.map((item, index) => { return <Picker.Item key={index} label={item} value={item} /> })}
                    </Picker></Text>
                </View>
                <View style={[styles.flexRow, styles.spaceBetween, styles.smallPadding]}>
                    <Text style={styles.smallText}>奖励完成进度</Text><Text style={styles.smallText}> <Picker
                        selectedValue={state.progress}
                        style={{ height: 50, width: 120 }}
                        onValueChange={(itemValue, itemIndex) =>
                            setState({ ...state, progress: itemValue })
                        }>
                        {data1.map((item, index) => { return <Picker.Item key={index} label={item} value={item} /> })}
                    </Picker></Text>
                </View>
                <View style={[styles.flexRow, styles.spaceBetween, styles.smallPadding]}>
                    <Text style={styles.smallText}>奖励游戏时间</Text><Text style={styles.smallText} > <Picker
                        selectedValue={state.reward}
                        style={{ height: 50, width: 120 }}
                        onValueChange={(itemValue, itemIndex) =>
                            setState({ ...state, reward: itemValue })
                        }>
                        {data2.map((item, index) => { return <Picker.Item key={index} label={item} value={item} /> })}
                    </Picker></Text>
                </View>
            </View>
            <View style={styles.absolute}>
                <Button title='确定' color='green'
                    onPress={() => navigation.navigate('HomePage')}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    relative: {
        position: 'relative',
        height: '100%'
    },
    absolute: {
        position: 'absolute',
        bottom: '5%',
        width: '100%',
        left: '5%'
    },
    flexRow: {
        flexDirection: 'row'
    },
    spaceBetween: {
        justifyContent: 'space-between'
    },
    outPadding: {
        padding: '5%'
    },
    card: {
        marginTop: '5%',
        marginBottom: '5%',
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: '2%'
    },
    padding: {
        marginBottom: '3%'
    },
    smallPadding: {
        marginBottom: '3%',
        padding: '1%'
    },
    text: {
        fontSize: 20,
        textAlignVertical: 'center',
        color: 'black'
    },
    smallText: {
        fontSize: 14,
        textAlignVertical: 'center',
        color: 'black'
    },
    noText: {
        fontSize: 14,
        color: '#bbb'
    }
})
