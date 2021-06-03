import React, { useState } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity,Switch } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Picker from 'react-native-picker';
import UsePicker from '../components/Picker'
export default function Setting(props) {
    const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [equip, setEquip] = useState('小爱音响')
    const [breathe, setBreathe] = useState('大于15秒')
    const [outBed, setOutBed] = useState('大于30分钟')
    const [sound, setSound] = useState('白噪音')
    const [curtain, setCurtain] = useState('离床时开启')
    const [condition, setCondition] = useState('26C')
    const [tv, setTv] = useState('入睡后关闭')
    const [humidifier, setHumidifier] = useState('卧床开启')
    const [light, setLight] = useState('卧床开启')
    const Light = () => {
        let data = ['卧床开启', '卧床后开启'];
        UsePicker(data, setLight)
    }
    const Humidifier = () => {
        let data = ['卧床开启', '卧床后开启'];
        UsePicker(data, setHumidifier)
    }
    const Call = () => {
        let data = ['小爱音响', '蓝牙'];
        UsePicker(data, setEquip)
    }
    const Breathe = () => {
        let data = ['大于15秒', '大于30秒'];
        UsePicker(data, setBreathe)
    }
    const OutBed = () => {
        let data = ['大于15分钟', '大于30分钟'];
        UsePicker(data, setOutBed)
    }
    const Sound = () => {
        let data = ['白噪音', '黑噪音'];
        UsePicker(data, setSound)
    }
    const Curtain = () => {
        let data = ['离床时开启', '离床后开启'];
        UsePicker(data, setCurtain)
    }
    const Condition = () => {
        let data = []
        for (let i = 16; i <= 30; i++) {
            data.push(`${i}C`)
        }
        UsePicker(data, setCondition)
    }
    const Tv = () => {
        let data = ['入睡后关闭', '入睡前关闭'];
        UsePicker(data, setTv)
    }
    return (
        <ScrollView style={{ padding: 10 }}>
            <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', margin: 5 }}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => { props.navigation.pop() }}>
                    <Icon name="chevron-back" size={24} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20 }}>设置</Text>
                <Text style></Text>
            </View>
            <Text>当前状态： 离床</Text>
            <View>
                <Text style={[styles.bigTitle]}>智慧唤醒</Text>
            </View>
            <TouchableOpacity onPress={() => { Call() }}>
                <View style={[styles.card, styles.flexDirection, styles.justifyContent]}>
                    <Text style>07:30</Text>
                    <Text>{equip}  ></Text>
                </View>
            </TouchableOpacity>
            <View>
                <Text style={[styles.bigTitle]}>异常警报</Text>
            </View>
            <View style={[styles.card,]}>
                <TouchableOpacity onPress={() => { Breathe() }}>
                    <View style={[styles.flexDirection, styles.justifyContent, styles.padTopBot, styles.borderBottom]}>
                        <Text style>呼吸暂停</Text>
                        <Text>{breathe}  ></Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { OutBed() }}>
                    <View style={[styles.flexDirection, styles.justifyContent, styles.padTopBot]}>
                        <Text style>离床时间</Text>
                        <Text>{outBed}  ></Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={[styles.bigTitle]}>智慧联动</Text>
            </View>
            <View style={[styles.card,]}>
                <TouchableOpacity style={{ flexDirection: 'row',justifyContent : 'space-between' ,alignItems : 'center'}} activeOpacity={1} onPress={()=>{toggleSwitch()} }>
                    <Text style={{ fontSize: 16 , borderBottomWidth  : 1 , borderColor : '#666'}}>AloT智慧睡眠</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { Sound() }}>
                    <View style={[styles.flexDirection, styles.justifyContent, styles.padTopBot, styles.borderBottom]}>
                        <Text style>小爱音响</Text>
                        <Text>{sound}  ></Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { Curtain() }}>
                    <View style={[styles.flexDirection, styles.justifyContent, styles.padTopBot, styles.borderBottom]}>
                        <Text style>智能窗帘</Text>
                        <Text>{curtain}  ></Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { Condition() }}>
                    <View style={[styles.flexDirection, styles.justifyContent, styles.padTopBot, styles.borderBottom]}>
                        <Text style>米家空调</Text>
                        <Text>{condition}  ></Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { Tv() }}>
                    <View style={[styles.flexDirection, styles.justifyContent, styles.padTopBot, styles.borderBottom]}>
                        <Text style>小米电视</Text>
                        <Text>{tv}  ></Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { Humidifier() }}>
                    <View style={[styles.flexDirection, styles.justifyContent, styles.padTopBot, styles.borderBottom]}>
                        <Text style>米家加湿器</Text>
                        <Text>{humidifier}  ></Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { Light() }}>
                    <View style={[styles.flexDirection, styles.justifyContent, styles.padTopBot]}>
                        <Text style>小米夜灯</Text>
                        <Text>{light}  ></Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={[styles.bigTitle]}>Q&A</Text>
            </View>
            <View style={[styles.card, styles.padd20]}>
                <Text style={styles.textColor}>关于睡眠呼吸:</Text>
                <Text style={styles.textcolor}>睡眠呼吸中止症是一種睡眠障礙，以男性、肥胖、酗酒及
                有服用安眠藥、鎮定劑的人機會較大，而老人患者的比例
                比青壯年更高。患者在睡眠中，因不能呼吸而導致睡眠呼吸中止，
                並常於睡夢中醒來，醒後會回復正常呼吸。類似情況在一晚可以發生數十次到數
                百次不等，每次醒來的時間並不一定，由數秒到超過一分鐘都有可能，患者自身不易察覺。
                由於睡眠斷斷續續進行，患者無法享有優質睡眠，導致白天常常打瞌睡、精神不濟、無法專心，進
                    而影響工作及日常生活品質。</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    padd20: {
        paddingTop: 20,
    }
    ,
    borderBottom: {
        borderBottomWidth: 1,
        borderColor: '#ddd'
    },
    padTopBot: {
        paddingTop: 5,
        paddingBottom: 5
    },
    bigTitle: {
        fontSize: 20,
        // fontWeight: 'bold',
        marginTop: 20,
        marginRight: 10,
        marginBottom: 10
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15
    },
    flexDirection: {
        flexDirection: 'row'
    },
    justifyContent: {
        justifyContent: "space-between"
    },
    textColor: {
        color: '#aaa',
        marginBottom: 10
    },
    textcolor: {
        color: '#ccc'
    }
})
