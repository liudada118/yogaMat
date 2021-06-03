import React, { useState } from 'react'
import { View, StyleSheet, Text, Image, TouchableWithoutFeedback, ScrollView, TouchableOpacity } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { VictoryChart, VictoryTheme, VictoryLine } from "victory-native";
import Icon from 'react-native-vector-icons/Ionicons'
import Icons from 'react-native-vector-icons/Fontisto'
import { Dates } from '../assets/js/calculateDate'
import DateTop from './DateTop'
export default function Breathing(props) {
    const [breath, setBreath] = useState(
        [
            ['呼吸暂停', '11秒', '异常'],
            ['呼吸暂停', '11秒', '异常'],
            ['呼吸暂停', '11秒', '异常'],
            ['呼吸暂停', '11秒', '异常'],
        ]
    )
    const [sleepPosition, setSleepPosition] = useState(
        [
            ['昨日主要睡姿', '右侧睡'],
            ['昨日入睡坐姿', '仰睡'],
            ['睡姿变化次数', '14次'],
        ]
    )
    const showDatePicker = () => {
        setDatePickerVisibility(true);
        console.log('我被点击了')
    };
    const [nowDate, setNowDate] = useState(new Date())
    const handleConfirm = (date) => {
        setNowDate(date)
        hideDatePicker();
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    return (
        <ScrollView>
            <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', margin: 5 }}>
                <TouchableOpacity 
                activeOpacity = {1}
                onPress={() => { props.navigation.pop() }}>
                    <Icon name="chevron-back" size={24} />
                </TouchableOpacity>
                <Text style={{fontSize : 20}}>呼吸健康</Text>
                <TouchableWithoutFeedback onPress={showDatePicker}>
                <Icons name='date' size={20} />
                </TouchableWithoutFeedback>
            </View>
            <View>
                <Text style={[styles.textCenter,styles.color]}>{Dates(nowDate)}</Text>
            </View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            <View style={[styles.flexDirection, styles.marginTopBottom]}>
                <View style={styles.flex1}>
                    <Text style={[styles.textCenter]}>平均呼吸率</Text>
                    <Text style={[styles.textCenter, styles.bigText]}>18<Text style={styles.mediateBold}>次/分</Text></Text>
                </View>
                <View style={styles.flex1}>
                    <Text style={styles.textCenter}>血氧饱和度</Text>
                    <Text style={[styles.textCenter, styles.bigText]}>偏低</Text>
                </View>
            </View>
            <View>
                <View><Text style={[styles.marginLeft4, styles.marTop20Bot5]}>呼吸健康</Text></View>
                <View style={styles.card}>
                    <VictoryChart
                        theme={VictoryTheme.material}
                        height={200}
                    >
                        <VictoryLine
                            interpolation="natural"
                            style={{
                                data: { stroke: "#ddd" },
                                parent: { border: "1px solid #ccc" }
                            }}
                            data={[
                                { x: 1, y: '浅睡', },
                                { x: 2, y: '深睡', },
                                { x: 3, y: '翻身', },
                                { x: 4, y: '深睡', },
                                { x: 5, y: '浅睡', }
                            ]}
                        />
                    </VictoryChart>
                    {breath.map((items, indexs) => {
                        console.log(items)
                        return (
                            <View key={indexs} style={[styles.flexDirection, styles.spaceBetween]}>
                                {items.map((item, index) => {
                                    return (
                                        <Text key={index} style={styles.marginTopBottom5}>{item}</Text>
                                    )
                                })}
                            </View>
                        )
                    })}
                </View>

            </View>
            <View>
                <View><Text style={[styles.marginLeft4, styles.marTop20Bot5]}>睡姿情况</Text></View>
                <View style={styles.card}>
                    <VictoryChart
                        theme={VictoryTheme.material}
                        height={200}
                    >
                        <VictoryLine
                            interpolation="natural"
                            style={{
                                data: { stroke: "#ddd" },
                                parent: { border: "1px solid #ccc" }
                            }}
                            data={[
                                { x: 1, y: '浅睡', },
                                { x: 2, y: '深睡', },
                                { x: 3, y: '翻身', },
                                { x: 4, y: '深睡', },
                                { x: 5, y: '浅睡', }
                            ]}
                        />
                    </VictoryChart>
                    {sleepPosition.map((items, indexs) => {
                        console.log(items)
                        return (
                            <View key={indexs} style={[styles.flexDirection, styles.spaceBetween]}>
                                {items.map((item, index) => {
                                    return (
                                        <Text key={index} style={styles.marginTopBottom5}>{item}</Text>
                                    )
                                })}
                            </View>
                        )
                    })}
                </View>

            </View>
        </ScrollView >
    )
}
const styles = StyleSheet.create({
    marTop20Bot5: {
        marginTop: 20,
        marginBottom: 5,
        fontSize: 20
    },
    marginLeft4: {
        marginLeft: '4%'
    },
    card: {
        marginRight: '2%',
        marginLeft: '2%',
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    spaceBetween: {
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10
    },
    marginTopBottom5: {
        marginBottom: 5,
        marginTop: 5,
        color: '#666'
    },
    marginTopBottom: {
        marginBottom: 20,
        marginTop: 20,

    },
    textCenter: {
        textAlign: 'center'
    },
    color: {
        color : '#aaa'
    },
    dateImg: {
        position: 'absolute',
        width: 28,
        height: 24,
        right: 5,
        top: 2,
        resizeMode: 'stretch',
    },
    flex1: {
        flex: 1,
    },
    flexDirection: {
        flexDirection: 'row'
    },
    // mediateText : {
    //     fontSize : 14
    // },
    bigText: {
        fontSize: 40
    },
    mediateBold: {
        fontSize: 16,
    }
})
