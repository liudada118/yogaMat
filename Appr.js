import React, { useContext, useState } from 'react';
import { Image, Button, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginR from './src/screen/lr/LoginR'
import Blue from './Appblue'
import Login from './src/screen/login/Login'
import EmailLogin from './src/screen/login/EmailLogin'
import Registered from './src/screen/registered/Registered'
import Home from './src/screen/home/Home'
import Remind from './src/screen/home/settingTypes/Remind'
import Reward from './src/screen/home/settingTypes/Reward'
import Sensor from './src/screen/home/settingTypes/Sensor'
import Set from './src/screen/home/settingTypes/Set'
import Setting from './src/screen/home/setting/Setting'
import RealTime from './src/screen/realTime/RealTime'
import HistoryTime from './src/screen/historytime/HistoryTime'
import ConWifi from './src/screen/home/settingTypes/connect/ConWifi'
import SureConWifi from './src/screen/home/settingTypes/connect/SureConWifi'
import Connecting from './src/screen/home/settingTypes/connect/Connecting'
import SetName from './src/screen/home/settingTypes/connect/SetName'
import Experience from './src/screen/home/settingTypes/connect/Experience'
import BedHome from './src/bedScreen/BedHome'
import SleepQuality from './src/bedScreen/SleepQuality'
import Breathing from './src/bedScreen/Breathing'
import Microclimate from './src/bedScreen/Microclimate'
import BedSetting from './src/bedScreen/Setting'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewWork from './src/screen/home/settingTypes/App'
import { loginContext } from './Context'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Icons from 'react-native-vector-icons/Ionicons'
import Demo from './Demo'
import EmailReg from './src/screen/registered/EmailReg'
import Choose from './src/screen/home/Choose'
import AddEquip from './src/screen/home/AddEquip'
import Ech from './Ech'
const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();
/*
*给登录之后的tab路由添加icon
*/
function HomeScreen() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home1') {
                        iconName = focused
                            ? require('./src/assets/onHome.png')
                            : require('./src/assets/home.png')
                    } else if (route.name === 'Settings') {
                        iconName = focused ? require('./src/assets/onSet.png') : require('./src/assets/set.png');
                    }
                    return <Image
                        style={{ width: 24, height: 24 }}
                        source={iconName}
                    />
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Home1" options={{ title: '首页', headerShown: false }} component={Home} />
            <Tab.Screen name="Settings" options={{ title: '设置', headerShown: false }} component={Setting} />
        </Tab.Navigator>
    );
}

/**
 * 登录之前一套路由，登录之后一套路由
 * 使用redux作为状态管理  管理登陆状态
 * */
function Appr(props) {
    const [state, setState] = useState(0)
    return (
        <>
            <NavigationContainer>
                {
                    props.login ? props.product === 0 ?
                        
                        <Stack.Navigator>
                                <Stack.Screen options={{
                                    headerShown: false
                                }} name="HomePage" component={HomeScreen} />
                                <Stack.Screen options={{ headerTitle: null }} name="remind" component={Remind} />
                                <Stack.Screen options={{ headerTitle: null }} name="reward" component={Reward} />
                                <Stack.Screen options={{ headerTitle: null }} name="bluetooth" component={NewWork} />
                                <Stack.Screen options={{ headerTitle: null }} name="realTime" component={RealTime} />
                                <Stack.Screen options={{ headerTitle: null }} name="set" component={Set} />
                                <Stack.Screen options={{ headerTitle: null }} name="historyTime" component={HistoryTime} />
                                <Stack.Screen options={{ headerTitle: null }} name="conWifi" component={ConWifi} />
                                <Stack.Screen options={{ headerTitle: null }} name="sureWifi" component={SureConWifi} />
                                <Stack.Screen options={{ headerTitle: null }} name="connecting" component={Connecting} />
                                <Stack.Screen options={{ headerTitle: null }} name="setname" component={SetName} />
                                <Stack.Screen options={{ headerTitle: null }} name="experience" component={Experience} />
                                <Stack.Screen options={{ headerTitle: null }} name="sensor" component={Sensor} />
                            </Stack.Navigator>
                        :
                        props.product === 1 ?
                            <Stack.Navigator>
                                <Stack.Screen options={{
                                    headerShown: false
                                }} name="bedHome" component={BedHome} />
                                <Stack.Screen options={{ headerShown: false }} name="sleepQuality" component={SleepQuality} />
                                <Stack.Screen options={{ headerShown: false }} name="breathing" component={Breathing} />
                                <Stack.Screen options={{ headerShown: false }} name="Microclimate" component={Microclimate} />
                                <Stack.Screen options={{ headerShown: false }} name="bedSetting" component={BedSetting} />
                            </Stack.Navigator>
                            :
                           <Stack.Navigator>
                            <Stack.Screen options={{
                                headerShown: false
                            }} name="Choose" component={Choose} />
                            <Stack.Screen options={{ headerShown: false }} name="AddEquip" component={AddEquip} />
                            <Stack.Screen options={{ headerShown: false }} name="breathing" component={Breathing} />
                            <Stack.Screen options={{ headerShown: false }} name="Microclimate" component={Microclimate} />
                            <Stack.Screen options={{ headerShown: false }} name="bedSetting" component={BedSetting} />
                        </Stack.Navigator>
                        // <Choose />
                        :
                        <Stack.Navigator>
                            {/* <Stack.Screen options={{ headerShown: false }} name="ech" component={Ech} /> */}
                            <Stack.Screen options={{ headerShown: false }} name="demo" component={Blue} />
                            <Stack.Screen options={{ headerShown: false }} name="newperpal" component={LoginR} />
                            <Stack.Screen options={{ headerShown: false }} name="login" component={Login} />
                            <Stack.Screen options={{ headerShown: false }} name="emaillogin" component={EmailLogin} />
                            <Stack.Screen options={{ headerShown: false }} name="registered" component={Registered} />
                            <Stack.Screen options={{ headerShown: false }} name="EmailReg" component={EmailReg} />
                        </Stack.Navigator>

                }
            </NavigationContainer>
            {/* {
                props.login ? props.product === 0 ? <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flex: 1, backgroundColor: '#fff' }}>
                    <TouchableOpacity onPress={() => { props.chair() }} style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#2e1d6a', textAlign: 'center' }}>
                        <Icon name='chair' size={100} color='' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { props.bed() }} style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#2e1d6a', textAlign: 'center' }}>
                        <Icons name='bed' size={100} />
                    </TouchableOpacity>
                </View> : null : null
            } */}
        </>

    )
}
const mapStateToProps = (state) => {
    return {
        login: state.login,
        product: state.product
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        chair: () => { dispatch({ type: 'CHAIR' }) },
        bed: () => { dispatch({ type: 'BED' }) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Appr);
