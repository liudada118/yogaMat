import React, { useState } from 'react'
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback,ScrollView,TouchableOpacity } from 'react-native'
import { Dates } from '../assets/js/calculateDate'
import Icon from 'react-native-vector-icons/Ionicons'
import Icons from 'react-native-vector-icons/Fontisto'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { VictoryChart, VictoryTheme, VictoryLine } from "victory-native";
export default function Microclimate(props) {
    const [content, setContent] = useState([
        { '平均温度': '18' },
        { '平均湿度': '50' },
        { '光照舒适度': '65' },
    ])
    const [bright, setBright] = useState(
        [
            ['最高亮度', 2],
            ['最低亮度', 1],
        ]
    )
    const [tempera, setTempera] = useState(
        [
            ['平均温度', '24C'],
            ['最低温度', '19C']
        ]
    )
    const [humidity, setHumidity] = useState(
        [
            ['平均湿度', '50%'],
            ['最大湿度', '57%']
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
            <View style={[styles.flexDirection, styles.marTop10Bot20]}>
                {
                    content.map((item, index) => {
                        return (
                            <View key={item} style={[styles.flex1, index !== 2 ? styles.borderRight : null]}>
                                <Text style={[styles.textCenter, styles.smallBold]}>{Object.keys(item)[0]}</Text>
                                <Text style={[styles.textCenter, styles.bigBold]}>{item[Object.keys(item)[0]]}{index === 0 ? <Text style={styles.normalText}>C</Text> : <Text style={styles.normalText}>%</Text>}</Text>
                            </View>)
                    })
                }
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
                    {bright.map((items, indexs) => {
                        console.log(items)
                        return (
                            <View key={indexs} style={[styles.flexDirection, styles.spaceBetween, indexs === 0 ? styles.borderBottom : null]}>
                                {items.map((item, index) => {
                                    return (
                                        <Text key={index} style={[styles.marginTopBottom5,]}>{item}</Text>
                                    )
                                })}
                            </View>
                        )
                    })}
                </View>

            </View>
            <View>
                <View><Text style={[styles.marginLeft4, styles.marTop20Bot5]}>温度变化</Text></View>
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
                    {tempera.map((items, indexs) => {
                        console.log(items)
                        return (
                            <View key={indexs} style={[styles.flexDirection, styles.spaceBetween, indexs === 0 ? styles.borderBottom : null]}>
                                {items.map((item, index) => {
                                    return (
                                        <Text key={index} style={[styles.marginTopBottom5,]}>{item}</Text>
                                    )
                                })}
                            </View>
                        )
                    })}
                </View>

            </View>
            <View>
                <View><Text style={[styles.marginLeft4, styles.marTop20Bot5]}>湿度变化</Text></View>
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
                    {humidity.map((items, indexs) => {
                        console.log(items)
                        return (
                            <View key={indexs} style={[styles.flexDirection, styles.spaceBetween, indexs === 0 ? styles.borderBottom : null]}>
                                {items.map((item, index) => {
                                    return (
                                        <Text key={index} style={[styles.marginTopBottom5,]}>{item}</Text>
                                    )
                                })}
                            </View>
                        )
                    })}
                </View>

            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    color: {
        color : '#aaa'
    },
    marTop10Bot20: {
        marginTop: 15,
        marginBottom: 20
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
    },
    flex1: {
        flex: 1,
    },
    flexDirection: {
        flexDirection: 'row'
    },
    borderRight: {
        borderRightWidth: 1,
        borderColor: '#ccc'
    },
    smallBold: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 20
    },
    bigBold: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    normalText: {
        fontSize: 14
    },
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
        marginLeft: 10,
        marginRight: 10
    },
    marginTopBottom5: {
        marginBottom: 5,
        marginTop: 5,
        color: '#666'
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderColor: '#666'
    }
})
