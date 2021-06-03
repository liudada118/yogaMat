import React from 'react'
import { View, Text, Image, TouchableWithoutFeedback, } from 'react-native'
export default function Date() {
    const showDatePicker = () => {
        setDatePickerVisibility(true);
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

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    return <>
        <View>
            <Text style={styles.textCenter}>date</Text>
            <TouchableWithoutFeedback onPress={showDatePicker}>
                <Image style={styles.dateImg} source={require('../assets/date.png')} />
            </TouchableWithoutFeedback>
        </View>
        <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
    </>
}
