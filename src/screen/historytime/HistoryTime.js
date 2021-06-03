import React, { useState, useEffect } from 'react'
import { LineChart } from 'react-native-chart-kit'
import { Text, View, StyleSheet, TouchableWithoutFeedback, ScrollView, Dimensions } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
export default function HistoryTime() {
    const data = ['今', '日', '周', '月']
    const [title, setTitle] = useState(0)
    useEffect(() => {
        setData(new Date())
    }, [date])
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setData] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date())
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        if (title === 2 && typeof date === 'object') {
            let startTime //本周的开始时间

            let endTime //本周的结束时间
            let data = date //当前日期

            let year = Number(data.getFullYear());//当前年

            let month = Number(data.getMonth()) + 1;

            let nowMonth = Number(data.getMonth());
            let day = Number(data.getDate()); //当天
            let mydate = new Date(year, month - 1, day);

            let weekday = mydate.getDay();
            function formatDate(date) {
                let myyear = Number(date.getFullYear());

                let mymonth = Number(date.getMonth() + 1);

                let myweekday = Number(date.getDate());

                if (mymonth < 10) {
                    mymonth = "0" + mymonth;

                }

                if (myweekday < 10) {
                    myweekday = "0" + myweekday;

                }

                return (myyear + "-" + mymonth + "-" + myweekday);

            }

            //获得本周的开始日期

            function getWeekStartDate() {
                let weekStartDate = new Date(year, nowMonth, day + 1 - weekday);

                return formatDate(weekStartDate);

            }

            //获得本周的结束日期

            function getWeekEndDate() {
                let weekEndDate = new Date(year, nowMonth, day + 7 - weekday);

                return formatDate(weekEndDate);

            }

            startTime = getWeekStartDate()

            endTime = getWeekEndDate()
            setData(startTime + '至' + endTime)
        } else if (title === 0) {

            let newDate = date
            let year = Number(newDate.getFullYear());//当前年

            let month = Number(newDate.getMonth()) + 1;
            let day = Number(newDate.getDate());
            let oldDate = new Date()
            let oldyear = Number(oldDate.getFullYear());//当前年

            let oldmonth = Number(oldDate.getMonth()) + 1;
            let oldday = Number(oldDate.getDate());
            if (year != oldyear || month != oldmonth || day != oldday) {
                setTitle(1)
                setData(date)
            }
            // }
        } else if (title === 1) {
            setData(date)
        } else if (title === 3) {
            let data = startDate //当前日期

            let year = Number(data.getFullYear());//当前年

            let month = Number(data.getMonth()) + 1;
            let day = Number(data.getDate());
            setData(year + '-' + month)
        }
        setStartDate(date)
        hideDatePicker();
    };
    const changeTitle = (index) => {
        setTitle(index)
        console.log(typeof date)
        if (index === 2) {
            let startTime //本周的开始时间

            let endTime //本周的结束时间
            let data = startDate //当前日期

            let year = Number(data.getFullYear());//当前年

            let month = Number(data.getMonth()) + 1;

            let nowMonth = Number(data.getMonth());
            let day = Number(data.getDate()); //当天
            let mydate = new Date(year, month - 1, day);

            let weekday = mydate.getDay();
            function formatDate(date) {
                let myyear = Number(date.getFullYear());

                let mymonth = Number(date.getMonth() + 1);

                let myweekday = Number(date.getDate());

                if (mymonth < 10) {
                    mymonth = "0" + mymonth;

                }

                if (myweekday < 10) {
                    myweekday = "0" + myweekday;

                }

                return (myyear + "-" + mymonth + "-" + myweekday);

            }

            //获得本周的开始日期

            function getWeekStartDate() {
                let weekStartDate = new Date(year, nowMonth, day + 1 - weekday);

                return formatDate(weekStartDate);

            }

            //获得本周的结束日期

            function getWeekEndDate() {
                let weekEndDate = new Date(year, nowMonth, day + 7 - weekday);

                return formatDate(weekEndDate);

            }

            startTime = getWeekStartDate()

            endTime = getWeekEndDate()

            setData(startTime + '至' + endTime)
        } else if (index === 3) {
            let data = startDate //当前日期

            let year = Number(data.getFullYear());//当前年

            let month = Number(data.getMonth()) + 1;
            let day = Number(data.getDate());
            setData(year + '-' + month)
        } else if (index === 0) {
            setData(new Date())
            setStartDate(new Date())
        }
        else {
            setData(startDate)
        }
    }
    const changeDate = (date) => {
        let data = date //当前日期

        let year = Number(data.getFullYear());//当前年

        let month = Number(data.getMonth()) + 1;
        let day = Number(data.getDate());
        return (year + '-' + month + '-' + day)
    }
    return (
        <View >
            <View>
                <TouchableWithoutFeedback onPress={showDatePicker}>
                    <Text style={styles.dateText}>{typeof date === 'object' ? changeDate(date) : date}></Text>
                </TouchableWithoutFeedback >
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View>
            <View style={styles.title}>
                {data.map((a, index) => {
                    return (
                        <TouchableWithoutFeedback key={index} onPress={() => { changeTitle(index) }}>
                            <View style={[styles.flex1, title === index ? styles.ontitle : null]} >
                                <Text style={styles.textCenter}>{a}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )
                })}
            </View>
            <ScrollView style={styles.content}>
                <LineChart
                    data={{
                        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                        datasets: [{
                            data: [
                                1,
                                1,
                                0,
                                1,
                                0,
                                1
                            ]
                        }]
                    }}
                    width={Dimensions.get('window').width} // from react-native
                    height={220}
                    chartConfig={{
                        backgroundColor: '#ccc',
                        backgroundGradientFrom: '#ccc',
                        backgroundGradientTo: '#ffa726',
                        // decimalPlaces: 4, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
                {/* </View> */}
                <View style={styles.card}>
                    <View style={styles.titleBorder}>
                        <Text style={styles.flex}>
                            今日标准坐姿时间    
                    </Text>
                        <Text style={[styles.flex,styles.textRight]}>
                            1时3分钟
                    </Text>
                    </View>
                    <View style={styles.titleBorder}>
                        <Text style={styles.flex}>
                            今日累计学习时间
                    </Text>
                        <Text style={[styles.flex,styles.textRight]}>
                            1时3分钟
                    </Text>
                    </View>
                    <View style={styles.titleBorder}>
                        <Text style={styles.flex}>
                            今日最久坐姿
                    </Text>
                        <Text style={[styles.flex,styles.textRight]}>
                            1时3分钟
                    </Text>
                    </View>
                    <View style={styles.Title}>
                        <Text style={styles.flex}>
                            今日最久时间
                    </Text>
                        <Text style={[styles.flex,styles.textRight]}>
                            1时3分钟
                    </Text>
                    </View>
                </View>
            </ScrollView>
        </View>)
}
const styles = StyleSheet.create({
    flex : {
        flex : 1,
        color : '#999'
    },
    
    dateText: {
        fontSize: 20,
        padding: 10
    },
    margin: {
        margin: 10
    },
    bgc: {
        backgroundColor: 'black',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    whiteText: {
        color: 'white'
    },
    title: {
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10
    },
    Title : {
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        padding: 10 
    },
    titleBorder : {
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        borderBottomColor : '#bbb',
        borderBottomWidth : 1,
        padding : 10
    },
    flex1: {
        flex: 1,
        height: 30,
        backgroundColor: '#bbb',
        margin: 1
    },
    ontitle: {
        backgroundColor: '#ddd'
    },
    textCenter: {
        textAlign: 'center',
        lineHeight: 30
    },
    textRight : {
        textAlign: 'right'
    },
    content: {
        marginLeft: 10,
        marginRight: 10
    },
    card: {
        borderRadius: 10,
        backgroundColor: '#eee',
        // height: 80,
    }
})
