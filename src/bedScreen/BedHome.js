import React, { Component, useState } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import Echarts from 'native-echarts';
import { VictoryChart, VictoryTheme, VictoryLine } from "victory-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Iconon from 'react-native-vector-icons/Ionicons'
import Font5 from 'react-native-vector-icons/FontAwesome5'
let { width, height } = Dimensions.get('window');
import { connect } from 'react-redux'
function BedHome(props) {
    const [content, setContent] = useState([
        { '打鼾次数': 32 },
        { '常用睡姿': '左侧卧' },
        { '离床次数': 6 },
        { '体动次数': 17 },
        { '平均温湿度': [26, 30] },
        { '呼吸率': 17 },
    ])
    const [features, setFeatures] = useState([
        { title: '睡眠质量', icon: 'moon', navigation: 'sleepQuality' },
        { title: '呼吸健康', icon: 'lungs', navigation: 'breathing' },
        { title: '睡眠微气候', icon: 'temperature-low', navigation: 'Microclimate' },
    ])
    console.log(props,'props')
    return (
        <>

            <View style={styles.title}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {console.log('jeje',props.state); props.chair() }}>
                    <Iconon name="chevron-back" size={24} color='#fff' />
                </TouchableOpacity>
                <View>
                    <Text style={[styles.whileColor, styles.textCenter]}>
                        睡眠时长
            </Text>
                    <Text style={[styles.whileColor, styles.textCenter]}>
                        7小时10分钟
            </Text>
                </View>
                <TouchableOpacity onPress={() => {
                    props.navigation.navigate('bedSetting')
                }} style={styles.titleImg}>
                    <Image
                        source={require('../assets/more.png')}
                        style={styles.TitleIcon}
                    />
                </TouchableOpacity>
            </View>


            <ScrollView >
                <View style={styles.bgc}>
                    <VictoryChart
                        theme={VictoryTheme.material}
                    >
                        <VictoryLine
                            interpolation="natural"
                            style={{
                                data: { stroke: "#fff" },
                                parent: { border: "1px solid #ccc" }
                            }}
                            data={[
                                { x: 1, y: '浅睡' },
                                { x: 2, y: '深睡' },
                                { x: 3, y: '翻身' },
                                { x: 4, y: '深睡' },
                                { x: 5, y: '浅睡' }
                            ]}
                        />
                    </VictoryChart>

                    <View style>
                        <View style={styles.flexDirection}>
                            <View style={[styles.flex1, styles.content, styles.flexDirection]}>
                                <Icon name="power-sleep" size={40} color="#ccc" />
                                <View style>
                                    <Text style={[styles.textCenter, styles.whileColor, styles.bigText]}>85%</Text>
                                    <Text style={[styles.textCenter, styles.whileColor, styles.smallText]}>睡眠质量</Text>
                                </View>
                            </View>
                            <View style={[styles.flex1, styles.content, styles.flexDirection]}>
                                <Iconon name='water' size={40} color="#ccc" />
                                <View>
                                    <Text style={[styles.textCenter, styles.whileColor, styles.bigText]}>偏低</Text>
                                    <Text style={[styles.textCenter, styles.whileColor, styles.smallText]}>血氧饱和度</Text></View>
                            </View>
                        </View>
                        <View style={[styles.flexDirection, styles.flexWrap, styles.textBgc]}>
                            {
                                content.map((item, index) => {
                                    return (
                                        <View key={item} style={[styles.flexItem, index !== 2 && index !== 5 ? styles.borderRight : null]}>
                                            <Text style={[styles.textCenter, styles.whileColor, styles.smallTextBold]}>{Object.keys(item)[0]}</Text>
                                            {typeof item[Object.keys(item)[0]] === 'number' ?
                                                <Text style={[styles.textCenter, styles.whileColor, styles.mediumText]}>{item[Object.keys(item)[0]]}<Text style={styles.smallText}>次</Text></Text>
                                                : typeof item[Object.keys(item)[0]] === 'string' ? <Text style={[styles.textCenter, styles.whileColor, styles.mediumText]}>{item[Object.keys(item)[0]]}</Text>
                                                    : <Text style={[styles.textCenter, styles.whileColor, styles.mediumText]}>{item[Object.keys(item)[0]][0]}<Text style={styles.smallText}>C/</Text>{item[Object.keys(item)[0]][1]}<Text style={styles.smallText}>C</Text></Text>}
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                </View>
                {features.map((item, key) => {
                    return (
                        <TouchableOpacity onPress={() => props.navigation.navigate(item.navigation)}>
                            <View key={item} style={[styles.margin5, key !== 2 ? styles.borderBottom : null]}>
                                <Text style={styles.fs}><Font5 name={item.icon} size={20} />     {item.title}</Text>
                                <Text style={[styles.position, styles.fs]}>></Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </>
    )
}
const styles = StyleSheet.create({
    textCenter: {
        textAlign: 'center'
    },
    fs: {
        fontSize: 20,
        color: '#888'
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    borderRight: {
        borderRightWidth: 1,
        borderColor: '#ddd'
    },
    margin5: {
        marginRight: '5%',
        marginLeft: '5%',
        paddingTop: 10,
        paddingBottom: 10
    },
    position: {
        position: 'absolute',
        right: 0,
        top: 10
    },
    title: {
        justifyContent: 'space-between',
        // alignItems: 'center',
        backgroundColor: '#2d266c',
        flexDirection: 'row',
        padding: 5
    },
    whileColor: {
        color: '#fff'
    },
    bgc: {
        backgroundColor: '#2d266c',
    },
    titleImg: {
        // position: 'absolute',
        // top: 2,
        // right: 2,

    },
    TitleIcon: {
        height: 20,
        width: 20,
        resizeMode: 'stretch',

    },
    flexDirection: {
        flexDirection: 'row'
    },
    flex1: {
        flex: 1,
    },
    textCenter: {
        textAlign: 'center',

    },
    flexItem: {
        minWidth: '31%',
        marginTop: 20,
        marginBottom: 20
    },
    flexWrap: {
        flexWrap: 'wrap'
    },
    smallTextBold: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    smallText: {
        fontSize: 12,
    },
    mediumText: {
        fontSize: 22,
        fontWeight: '200'
    },
    bigText: {
        fontSize: 28,
        fontWeight: 'bold'
    },
    textBgc: {
        backgroundColor: '#38327a',
        marginRight: '2%',
        marginLeft: '2%',
        paddingTop: '5%',
        paddingBottom: '5%',
        borderRadius: 10,
        marginTop: '5%',
        marginBottom: '5%'
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderColor: '#999'
    }
})
const mapStateToProps = (state) => {
    return {state}
}
const mapDispatchToProps = dispatch => {
    return { chair: () => dispatch({ type: 'BACK' }) }

}
export default connect(mapStateToProps,mapDispatchToProps)(BedHome)