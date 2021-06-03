import React, { Component, useState } from 'react'
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback, Button ,TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Icons from 'react-native-vector-icons/Fontisto'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { VictoryPie } from 'victory-native'
import { Dates } from '../assets/js/calculateDate'
export default function SleepQuality(props) {
    const [nowDate, setNowDate] = useState(new Date())
    const [date, setDate] = useState([
        { '卧床': '22:20' },
        { '入睡': '22:30' },
        { '醒来': '08:20' },
        { '起床': '11:20' },
    ])
    const [dateStatistics, setDateStatistics] = useState([
        { '卧床总时': '11时08分' },
        { '入睡时长': '7时10分' },
        { '深睡时长': '3时05分' },
        { '睡眠效率': '88%' }
    ])
    const showDatePicker = () => {
        setDatePickerVisibility(true);
        console.log('我被点击了')
    };

    const handleConfirm = (date) => {
        setNowDate(date)
        hideDatePicker();
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    return (
        <>
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
            <View>
                <Text style={[styles.textCenter, styles.bigText,styles.marginTopBottom]}>85%</Text>
            </View>
            <View style={styles.flexDirection}>
                {
                    date.map((item, index) => {
                        return (
                            <View key={item} style={styles.flex1}>
                                <Text style={[styles.textCenter, styles.smallBold]}>{Object.keys(item)[0]}</Text>
                                <Text style={[styles.textCenter, styles.smallBold]}>{item[Object.keys(item)[0]]}</Text>
                            </View>
                        )
                    })
                }
            </View>
            <View style={styles.marginTopBottom}>
                {
                    dateStatistics.map((item, index) => {
                        return (
                            <View key={item} style={[styles.justifyContent, styles.paddingTopBottom, styles.flexDirection, styles.margin, index !== 3 ? styles.borderBottom : null]}>
                                <Text style>{Object.keys(item)[0]}</Text>
                                <Text style>{item[Object.keys(item)[0]]}</Text>
                            </View>)
                    })
                }
            </View>
            <View>
                <Text style={[styles.marginLeft4, styles.marTop20Bot5]}>睡眠阶段</Text>
                <VictoryPie
                    data={[
                        { x: "深睡", y: 35 },
                        { x: "浅睡", y: 40 },
                        { x: "快速眼动", y: 55 },
                        { x: "清醒", y: 25 }
                    ]}
                    height={300}
                    colorScale={["#6fcacb", "#70f0f3", "#9b8dcb", "#e2a6ec"]}
                />
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    color: {
        color : '#aaa'
    },
    marginLeft4: {
        marginLeft: '4%'
    },
    marTop20Bot5: {
        marginBottom: 5,
        fontSize: 20
    },
    paddingTopBottom: {
        paddingTop: 10,
        paddingBottom: 10
    },
    marginTopBottom: {
        marginTop: 20,
        marginBottom: 20
    },
    smallBold: {
        fontWeight: 'bold'
    },
    margin: {
        marginLeft: '5%',
        marginRight: '5%',

    },
    borderBottom: {
        borderBottomColor: '#aaa',
        borderBottomWidth: 1
    },
    justifyContent: {
        justifyContent: 'space-between'
    },
    flexDirection: {
        flexDirection: 'row',

    },
    flex1: {
        flex: 1
    },
    bigText: {
        fontSize: 40
    },
    textCenter: {
        textAlign: 'center'
    },
    dateImg: {
        position: 'absolute',
        width: 28,
        height: 24,
        right: 5,
        top: 2,
        resizeMode: 'stretch',
    }
})