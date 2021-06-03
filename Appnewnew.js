// In App.js in a new project

import React, {Context} from 'react';
import {useState} from 'react';
import {Button, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import LoginR from './src/screen/lr/LoginR'
// import Login from './src/screen/login/Login'
// import EmailLogin from './src/screen/login/EmailLogin'
// import Registered from './src/screen/registered/Registered'
// import Home from './src/screen/home/Home'
// import Remind from './src/screen/home/settingTypes/Remind'
// import Reward from './src/screen/home/settingTypes/Reward'
// import Bluetooth from './src/screen/home/settingTypes/Bluetooth'
// import Set from './src/screen/home/settingTypes/Set'
// import Setting from './src/screen/home/setting/Setting'
// import RealTime from './src/screen/realTime/RealTime'
// import Home from './src/screen/home/Home'
// import HistoryTime from './src/screen/historytime/HistoryTime'
// import ConWifi from './src/screen/home/settingTypes/connect/ConWifi'
// import SureConWifi from './src/screen/home/settingTypes/connect/SureConWifi'
// import Connecting from './src/screen/home/settingTypes/connect/Connecting'
// import SetName from './src/screen/home/settingTypes/connect/SetName'
// import Experience from './src/screen/home/settingTypes/connect/Experience'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Canvas from './src/components/Canvas'
// import NewWork from './src/screen/home/settingTypes/App'
// import reducer from './src/store/reducer'
// import {createStore} from 'redux'
import {loginContext} from './Context';
import {Provider, connect} from 'react-redux';
import Appr from './Appr';
import JPush from 'jpush-react-native';
// const store = createStore(reducer)
const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();
let tokens = '';
const changeTokens = (data) => {
  tokens = data;
};
let phones = '';
const changePhone = (data) => {
  phones = data;
};
let id = '';
const changeId = (data) => {
  id = data;
};
class App extends React.Component {
  componentDidMount() {
    // JPush.init();
    // //连接状态
    // this.connectListener = (result) => {
    //   console.log('connectListener:' + JSON.stringify(result));
    // };
    // JPush.addConnectEventListener(this.connectListener);
    // //通知回调
    // this.notificationListener = (result) => {
    //   console.log('notificationListener:' + JSON.stringify(result));
    // };
    // JPush.addNotificationListener(this.notificationListener);
    // //本地通知回调
    // this.localNotificationListener = (result) => {
    //   console.log('localNotificationListener:' + JSON.stringify(result));
    // };
    // JPush.addLocalNotificationListener(this.localNotificationListener);
    // //自定义消息回调
    // this.customMessageListener = (result) => {
    //   console.log('customMessageListener:' + JSON.stringify(result));
    // };
    // JPush.addCustomMessagegListener(this.customMessageListener);
    // //tag alias事件回调
    // this.tagAliasListener = (result) => {
    //   console.log('tagAliasListener:' + JSON.stringify(result));
    // };
    // JPush.addTagAliasListener(this.tagAliasListener);
    // //手机号码事件回调
    // this.mobileNumberListener = (result) => {
    //   console.log('mobileNumberListener:' + JSON.stringify(result));
    // };
    // JPush.addMobileNumberListener(this.mobileNumberListener);
    // JPush.setAlias({sequence: 6,alias:"18579103020"})
  }

  state = {
    login: false,
  };
  onLogin = () => {
    this.setState({login: true});
  };
  render() {
    return (
      <loginContext.Provider
        value={{
          login: this.state.login,
          onLogin: this.onLogin,
          tokens: tokens,
          changeTokens,
          phones,
          changePhone,
          changeId,
          id,
        }}>
        <Appr />
      </loginContext.Provider>
    );
  }
}
export default App;
