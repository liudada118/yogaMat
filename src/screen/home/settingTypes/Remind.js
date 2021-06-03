import React, { useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { Picker } from '@react-native-picker/picker';
export default function Remind({ navigation }) {
    /**
     * 各个提醒的状态 因为使用picker只能用一个state  所以写到了一起
     * */ 
    const [state, setState] = useState({
        sit: '不提醒',
        now: '不提醒',
        lr: '不提醒',
        other: '不提醒',
        angle : '不提醒'
    })
    return (
        <View style={[styles.outPadding, styles.relative]}>
            <View style={[styles.card]}>
                <View style={[styles.flexRow, styles.spaceBetween]}>
                    {/* 当设置为不提醒的时候，颜色为白色 */}
                    <Text style={state.sit === '不提醒' ? styles.outText : styles.text}>久坐提醒</Text>
                    <Text style={styles.text}>
                        <Picker
                            selectedValue={state.sit}
                            style={state.sit === '不提醒' ? styles.outPicker : styles.picker}
                            onValueChange={(itemValue, itemIndex) =>
                                setState({ ...state, sit: itemValue })
                            }>
                            <Picker.Item label="不提醒" value="不提醒" />
                            <Picker.Item label="15分钟" value="15分钟" />
                            <Picker.Item label="30分钟" value="30分钟" />
                            <Picker.Item label="45分钟" value="45分钟" />
                            <Picker.Item label="60分钟" value="60分钟" />
                        </Picker>

                    </Text>
                </View>
            </View>
            <View style={[styles.card]} >
                <View style={[styles.flexRow, styles.spaceBetween, styles.padding]}>
                    <Text style={state.now === '不提醒' ? styles.outText : styles.text}>坐姿提醒</Text><Text style={styles.text}><Picker
                        selectedValue={state.now}
                        style={state.now === '不提醒' ? styles.outPicker : styles.picker}
                        onValueChange={(itemValue, itemIndex) =>
                            setState({ ...state, now: itemValue })
                        }>
                        <Picker.Item label="不提醒" value="不提醒" />
                        <Picker.Item label="15分钟" value="15分钟" />
                        <Picker.Item label="30分钟" value="30分钟" />
                        <Picker.Item label="45分钟" value="45分钟" />
                        <Picker.Item label="60分钟" value="60分钟" />
                    </Picker></Text>
                </View>

                <View style={[styles.flexRow, styles.spaceBetween, styles.smallPadding]}>
                    <Text style={state.lr === '不提醒' ? styles.outSmallText : styles.smallText}>脊柱角度</Text><Text style={styles.smallText} ><Picker
                        selectedValue={state.lr}
                        style={state.lr === '不提醒' ? styles.outSmallPicker : styles.smallPicker}
                        onValueChange={(itemValue, itemIndex) =>
                            setState({ ...state, lr: itemValue })
                        }>
                        <Picker.Item label="不提醒" value="不提醒" />
                        <Picker.Item label="前倾" value="前倾" />
                        <Picker.Item label="后靠" value="后靠" />
                        <Picker.Item label="前倾/后靠" value="前倾/后靠" />
                    </Picker></Text>
                </View>
                <View style={[styles.flexRow, styles.spaceBetween, styles.smallPadding]}>
                    <Text style={state.lr === '不提醒' ? styles.outSmallText : styles.smallText}>左右平衡</Text><Text style={styles.smallText} ><Picker
                        selectedValue={state.lr}
                        style={state.lr === '不提醒' ? styles.outSmallPicker : styles.smallPicker}
                        onValueChange={(itemValue, itemIndex) =>
                            setState({ ...state, lr: itemValue })
                        }>
                        <Picker.Item label="不提醒" value="不提醒" />
                        <Picker.Item label="左倾" value="左倾" />
                        <Picker.Item label="右倾" value="右倾" />
                        <Picker.Item label="左倾/右倾" value="左倾/右倾" />
                    </Picker></Text>
                </View>
                <View style={[styles.flexRow, styles.spaceBetween, styles.smallPadding]}>
                    <Text style={state.other === '不提醒' ? styles.outSmallText : styles.smallText}>其他坐姿</Text><Text style={styles.smallText}><Picker
                        selectedValue={state.other}
                        style={state.other === '不提醒' ? styles.outSmallPicker : styles.smallPicker}
                        onValueChange={(itemValue, itemIndex) =>
                            setState({ ...state, other: itemValue })
                        }>
                        <Picker.Item label="不提醒" value="不提醒" />
                        <Picker.Item label="二郎腿" value="二郎腿" />
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
    outText:{
        fontSize: 20,
        textAlignVertical: 'center',
        color : '#ccc'
    },
    outPicker : {
        height: 50, 
        width: 120,
        fontSize: 20,
        textAlignVertical: 'center',
        color : '#ccc'
    },
    picker : {
        height: 50, 
        width: 120,
        color : 'black'
    },
    smallPicker : {
        height: 50, 
        width: 120,
        fontSize: 14,
        color : 'black'
    },
    outSmallPicker : {
        height: 50, 
        width: 120,
        fontSize: 14,
        textAlignVertical: 'center',
        color : '#ccc'
    },
    text: {
        fontSize: 20,
        textAlignVertical: 'center',
        color : 'black'
    },
    smallText: {
        fontSize: 14,
        textAlignVertical: 'center',
        color : 'black'
    },
    outSmallText : {
        fontSize: 14,
        textAlignVertical: 'center',
        color : '#ccc'
    },
    noText: {
        fontSize: 14,
        color: '#bbb'
    }
})
