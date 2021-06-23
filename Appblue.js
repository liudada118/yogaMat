import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  NativeEventEmitter,
  NativeModules,
  Platform,
  PermissionsAndroid,
  FlatList,
  ScrollView,
  AppState,
  Dimensions,
  Item,
  LayoutAnimation,
  ToastAndroid
} from 'react-native';
import Video from 'react-native-video';
import BleManager from 'react-native-ble-manager';
// import Video from 'react-native-video'; 
import { WebView } from 'react-native-webview';
import Ech from './Ech'
import { com } from './com'
// import video1 from './src/assets/video/video1.mp4'
// import video1Info from './src/assets/video/video1info.mp4'
// import video2 from './src/assets/video/video2.mp4'
// import video2Info from './src/assets/video/video2info.mp4'
// import video3 from './src/assets/video/video3.mp4'
// import video3Info from './src/assets/video/video3info.mp4'
// import video4 from './src/assets/video/video4.mp4'
// import video4Info from './src/assets/video/video4info.mp4'
const { height, scale } = Dimensions.get('window');
let dataArr = []
let dataArr1 = []
let dataArr2 = []
let dataArr3 = []
let leftArr1 = []
let leftArr2 = []
let rightArr1 = []
let rightArr2 = []
let flag = 1

const comValue = 130
const top = 200
const left = 450
const color = 'rgb(80,80,80)'
const promptColor = 'rgb(155,155,155)'
const goodColor = 'rgb(249,214,248)'
/**
 * 适配宽度*/
const myWidth = 300
function Width(num) {
  return num * width / myWidth
}

const width = Dimensions.get('window').width;
const window = Dimensions.get('window');
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
let l1W = 100
const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
export default class App extends React.Component {

  constructor() {
    super();

    this.state = {
      scanning: false,
      peripherals: new Map(),
      appState: '',
      width: 0,
      width1: 0,
      width2: 0,
      width3: 0,
      width4: 0,
      width5: 0,
      width6: 0,
      width7: 0,
      text: '',
      video1End: false,
      num1: 0,
      video1Info: false,
      step: 1,
      num2: 0,
      num3: 0,
      num4: 0
    };
    this.l1 = React.createRef();
    this.l2 = React.createRef();
    this.l3 = React.createRef();
    this.l4 = React.createRef();
    this.l5 = React.createRef();
    this.l6 = React.createRef();
    this.l7 = React.createRef();
    this.l8 = React.createRef();
    this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
    this.handleStopScan = this.handleStopScan.bind(this);
    this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(
      this,
    );
    this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(
      this,
    );
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.initUUID();
  }
  fullUUID(uuid) {
    if (uuid.length === 4) {
      return '0000' + uuid.toUpperCase() + '-0000-1000-8000-00805F9B34FB';
    }
    if (uuid.length === 8) {
      return uuid.toUpperCase() + '-0000-1000-8000-00805F9B34FB';
    }
    return uuid.toUpperCase();
  }

  initUUID() {
    this.readServiceUUID = [];
    this.readCharacteristicUUID = [];
    this.writeWithResponseServiceUUID = [];
    this.writeWithResponseCharacteristicUUID = [];
    this.writeWithoutResponseServiceUUID = [];
    this.writeWithoutResponseCharacteristicUUID = [];
    this.nofityServiceUUID = [];
    this.nofityCharacteristicUUID = [];
  }

  //获取Notify、Read、Write、WriteWithoutResponse的serviceUUID和characteristicUUID
  getUUID(peripheralInfo) {
    this.readServiceUUID = [];
    this.readCharacteristicUUID = [];
    this.writeWithResponseServiceUUID = [];
    this.writeWithResponseCharacteristicUUID = [];
    this.writeWithoutResponseServiceUUID = [];
    this.writeWithoutResponseCharacteristicUUID = [];
    this.nofityServiceUUID = [];
    this.nofityCharacteristicUUID = [];
    for (let item of peripheralInfo.characteristics) {
      item.service = this.fullUUID(item.service);
      item.characteristic = this.fullUUID(item.characteristic);
      if (Platform.OS == 'android') {
        if (item.properties.Notify == 'Notify') {
          this.nofityServiceUUID.push(item.service);
          this.nofityCharacteristicUUID.push(item.characteristic);
        }
        if (item.properties.Read == 'Read') {
          this.readServiceUUID.push(item.service);
          this.readCharacteristicUUID.push(item.characteristic);
        }
        if (item.properties.Write == 'Write') {
          this.writeWithResponseServiceUUID.push(item.service);
          this.writeWithResponseCharacteristicUUID.push(item.characteristic);
        }
        if (item.properties.WriteWithoutResponse == 'WriteWithoutResponse') {
          this.writeWithoutResponseServiceUUID.push(item.service);
          this.writeWithoutResponseCharacteristicUUID.push(item.characteristic);
        }
      } else {
        //ios
        for (let property of item.properties) {
          if (property == 'Notify') {
            this.nofityServiceUUID.push(item.service);
            this.nofityCharacteristicUUID.push(item.characteristic);
          }
          if (property == 'Read') {
            this.readServiceUUID.push(item.service);
            this.readCharacteristicUUID.push(item.characteristic);
          }
          if (property == 'Write') {
            this.writeWithResponseServiceUUID.push(item.service);
            this.writeWithResponseCharacteristicUUID.push(item.characteristic);
          }
          if (property == 'WriteWithoutResponse') {
            this.writeWithoutResponseServiceUUID.push(item.service);
            this.writeWithoutResponseCharacteristicUUID.push(
              item.characteristic,
            );
          }
        }
      }
    }
    console.log('readServiceUUID', this.readServiceUUID);
    console.log('readCharacteristicUUID', this.readCharacteristicUUID);
    console.log(
      'writeWithResponseServiceUUID',
      this.writeWithResponseServiceUUID,
    );
    console.log(
      'writeWithResponseCharacteristicUUID',
      this.writeWithResponseCharacteristicUUID,
    );
    console.log(
      'writeWithoutResponseServiceUUID',
      this.writeWithoutResponseServiceUUID,
    );
    console.log(
      'writeWithoutResponseCharacteristicUUID',
      this.writeWithoutResponseCharacteristicUUID,
    );
    console.log('nofityServiceUUID', this.nofityServiceUUID);
    console.log('nofityCharacteristicUUID', this.nofityCharacteristicUUID);
  }

  componentDidMount() {





    AppState.addEventListener('change', this.handleAppStateChange);

    BleManager.start({ showAlert: false });

    this.handlerDiscover = bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      this.handleDiscoverPeripheral,
    );
    this.handlerStop = bleManagerEmitter.addListener(
      'BleManagerStopScan',
      this.handleStopScan,
    );
    this.handlerDisconnect = bleManagerEmitter.addListener(
      'BleManagerDisconnectPeripheral',
      this.handleDisconnectedPeripheral,
    );
    this.handlerUpdate = bleManagerEmitter.addListener(
      'BleManagerDidUpdateValueForCharacteristic',
      this.handleUpdateValueForCharacteristic,
    );

    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ).then((result) => {
        if (result) {
          console.log('Permission is OK');
          this.startScan();
        } else {
          PermissionsAndroid.requestPermission(
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          ).then((result) => {
            if (result) {
              console.log('User accept');
              this.startScan();
            } else {
              console.log('User refuse');
            }
          });
        }
      });
    }
  }

  handleAppStateChange(nextAppState) {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
      BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
        console.log('Connected peripherals: ' + peripheralsArray.length);
      });
    }
    this.setState({ appState: nextAppState });
  }

  componentWillUnmount() {
    this.handlerDiscover.remove();
    this.handlerStop.remove();
    this.handlerDisconnect.remove();
    this.handlerUpdate.remove();
  }
  showToastWithGravityAndOffset(title) {
    ToastAndroid.showWithGravityAndOffset(
      title,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  handleDisconnectedPeripheral(data) {
    let peripherals = this.state.peripherals;
    let peripheral = peripherals.get(data.peripheral);
    if (peripheral) {
      peripheral.connected = false;
      peripherals.set(peripheral.id, peripheral);
      this.setState({ peripherals });
    }
    console.log('Disconnected from ' + data.peripheral);
  }

  //处理接收到数据之后的业务
  handleUpdateValueForCharacteristic(data) {
    // console.log(
    //   'Received data from ' + data.peripheral + '   data: ' + data.value, this.l1, l1W, this.state.width
    // );
    l1W++
    let a = data.value
    // console.log(a)
    let valueArr = new Array(8).fill(0);
    let j = 0
    for (let i = 0; i < a.length; i++) {
      if ((i + 1) % 4 == 1) {
        valueArr[j] += a[i]
      }
      else if ((i + 1) % 4 == 2) {
        valueArr[j] += a[i] * 255
      }
      else if ((i + 1) % 4 == 3) {
        valueArr[j] += a[i] * 255 * 255
      } else if ((i + 1) % 4 == 0) {
        valueArr[j] += a[i] * 255 * 255 * 255
      }

      if ((i + 1) % 4 == 0) {
        j++
      }
    }
    console.log(valueArr,)
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    // this.setState({
    //   width: valueArr[0] * (width - 20) / 1020,
    //   width1: valueArr[1] * (width - 20) / 1020,
    //   width2: valueArr[2] * (width - 20) / 1020,
    //   width3: valueArr[3] * (width - 20) / 1020,
    //   width4: valueArr[4] * (width - 20) / 1020,
    //   width5: valueArr[5] * (width - 20) / 1020,
    //   width6: valueArr[6] * (width - 20) / 1020,
    //   width7: valueArr[7] * (width - 20) / 1020,
    // })

    // this.state.width = 
    // this.l1.current._internalFiberInstanceHandleDEV.memoizedProps.style.width=200
    // console.log(this.l1.current._internalFiberInstanceHandleDEV.memoizedProps.style.width)
    // this.l1.style = { backgroundColor: 'red', width: 100, height: 200 }
    // console.log(valueArr)
    if (this.state.step == 2) {
      if (valueArr[2] > comValue) {

        if (dataArr[dataArr.length - 1] == 'l5') {
          this.l4.setNativeProps({
            style: {
              opacity: 1,
              backgroundColor: goodColor
            }
          })
        }

        if (dataArr[dataArr.length - 1] == 'l5') {
          dataArr.push('l4')

          this.setState({
            num1: dataArr.length,
          })
        }
      }
      else if (valueArr[3] > comValue) {

        if (dataArr[dataArr.length - 1] == 'l4' || dataArr.length == 0) {
          console.log(111)
          this.l5.setNativeProps({
            style: {
              opacity: 1,
              backgroundColor: goodColor

            }
          })
        }

        if (dataArr[dataArr.length - 1] == 'l4' || dataArr.length == 0) {
          dataArr.push('l5')
          this.setState({
            num1: dataArr.length,
          })
        }
      }



      if (valueArr[2] < comValue) {
        if (dataArr[dataArr.length - 1] == 'l5') {
          this.l4.setNativeProps({
            style: {
              opacity: 1,
              backgroundColor: promptColor
            }
          })
        }
        if (dataArr[dataArr.length - 1] == 'l4') {
          this.l4.setNativeProps({
            style: {
              opacity: 1,
              backgroundColor: color
            }
          })
        }

      }
      if (valueArr[3] < comValue) {
        if (dataArr[dataArr.length - 1] == 'l5') {
          this.l5.setNativeProps({
            style: {
              opacity: 1,
              backgroundColor: color
            }
          })
        }
        if (dataArr[dataArr.length - 1] == 'l4') {
          this.l5.setNativeProps({
            style: {
              opacity: 1,
              backgroundColor: promptColor
            }
          })
        }
      }
    }



    if (this.state.step == 4) {
      console.log(dataArr1)
      if ((valueArr[2] > comValue && valueArr[3] > comValue) && (dataArr1.length == 0 || dataArr1[dataArr1.length - 1] != 'two')) {
        this.l4.setNativeProps({
          style: {
            opacity: 1,
            backgroundColor: goodColor
          }
        })
        this.l5.setNativeProps({
          style: {
            opacity: 1,
            backgroundColor: goodColor
          }
        })
        dataArr1.push('two')
        leftArr1.push(valueArr[2])
        rightArr1.push(valueArr[3])
        this.setState({
          num2: parseInt(dataArr1.length / 2)
        })
      } else if ((valueArr[2] > comValue && valueArr[3] < comValue) && ((dataArr1.length == 1 || dataArr1[dataArr1.length - 2] == 'l5') && dataArr1[dataArr1.length - 1] == 'two')) {
        leftArr1.push(valueArr[2])
        this.l4.setNativeProps({
          style: {
            opacity: 1,
            backgroundColor: goodColor
          }
        })
        dataArr1.push('l4')
        this.setState({
          num2: parseInt(dataArr1.length / 2)
        })
      } else if ((valueArr[3] > comValue && valueArr[2] < comValue) && ((dataArr1.length == 1 || dataArr1[dataArr1.length - 2] == 'l4') && dataArr1[dataArr1.length - 1] == 'two')) {
        rightArr1.push(valueArr[3])
        this.l5.setNativeProps({
          style: {
            opacity: 1,
            backgroundColor: goodColor
          }
        })
        dataArr1.push('l5')
        this.setState({
          num2: parseInt(dataArr1.length / 2)
        })
      }

      if (valueArr[3] < comValue) {


        if (((dataArr1[dataArr1.length - 2] == 'l4') && dataArr1[dataArr1.length - 1] == 'two') || dataArr1[dataArr1.length - 1] == 'l4' || dataArr1[dataArr1.length - 1] == 'l5' || dataArr1.length == 0) {
          this.l5.setNativeProps({
            style: {
              opacity: 1,
              backgroundColor: promptColor
            }
          })
        } else {
          this.l5.setNativeProps({
            style: {
              opacity: 1,
              backgroundColor: color
            }
          })
        }

      }
      if (valueArr[2] < comValue) {

        if (((dataArr1[dataArr1.length - 2] == 'l5') && dataArr1[dataArr1.length - 1] == 'two') || dataArr1[dataArr1.length - 1] == 'l4' || dataArr1[dataArr1.length - 1] == 'l5' || dataArr1.length == 0) {
          this.l4.setNativeProps({
            style: {
              opacity: 1,
              backgroundColor: promptColor
            }
          })
        } else {
          this.l4.setNativeProps({
            style: {
              opacity: 1,
              backgroundColor: color
            }
          })
        }



      }
    }


    if (this.state.step == 6) {
      console.log(dataArr2)

      if ((valueArr[2] > comValue && valueArr[3] > comValue) && (dataArr2.length == 0 || dataArr2[dataArr2.length - 1] != 'two')) {
        this.l4.setNativeProps({
          style: {
            opacity: 1,
            backgroundColor: goodColor
          }
        })
        this.l5.setNativeProps({
          style: {
            opacity: 1,
            backgroundColor: goodColor
          }
        })
        dataArr2.push('two')
        leftArr2.push(valueArr[2])
        rightArr2.push(valueArr[3])
      } else if (valueArr[2] > comValue && valueArr[3] < comValue && dataArr2[dataArr2.length - 1] == 'two') {
        leftArr2.push(valueArr[2])
        this.l4.setNativeProps({
          style: {
            opacity: 1,
            backgroundColor: goodColor
          }
        })
        dataArr2.push('l5')
        this.setState({
          num3: parseInt(dataArr2.length / 2)
        })
      }

      if (valueArr[3] < comValue) {
        this.l5.setNativeProps({
          style: {
            opacity: 1,
            backgroundColor: promptColor
          }
        })
      }
      if (valueArr[2] < comValue) {
        if (dataArr2[dataArr2.length - 1] == 'two' || dataArr2.length == 0) {
          this.l4.setNativeProps({
            style: {
              opacity: 1,
              backgroundColor: promptColor
            }
          })
        } else {
          this.l4.setNativeProps({
            style: {
              opacity: 1,
              backgroundColor: color
            }
          })
        }

      }

    }


    if (this.state.step == 8) {
      if ((valueArr[2] > comValue && valueArr[3] > comValue && valueArr[4] < comValue) && (dataArr3.length == 0 || dataArr3[dataArr3.length - 1] != 'two')) {
        this.l4.setNativeProps({
          style: {
            opacity: 1,
            backgroundColor: goodColor
          }
        })
        this.l5.setNativeProps({
          style: {
            opacity: 1,
            backgroundColor: goodColor
          }
        })
        dataArr3.push('two')
      } else if (valueArr[2] < comValue && valueArr[3] < comValue && valueArr[4] > comValue && dataArr3[dataArr3.length - 1] == 'two') {
        this.l3.setNativeProps({
          style: {
            opacity: 1,
            backgroundColor: goodColor
          }
        })
        dataArr3.push('l3')
        this.setState({
          num4: parseInt(dataArr3.length / 2)
        })
      }

      if (valueArr[3] < comValue) {
        if (dataArr3[dataArr3.length - 1] == 'l3' || dataArr3.length == 0) {
          this.l5.setNativeProps({
            style: {
              opacity: 1,
              backgroundColor: promptColor
            }
          })
        } else {
          this.l5.setNativeProps({
            style: {
              opacity: 1,
              backgroundColor: color
            }
          })
        }

      }
      if (valueArr[2] < comValue) {
        if (dataArr3[dataArr3.length - 1] == 'l3' || dataArr3.length == 0) {
          this.l4.setNativeProps({
            style: {
              opacity: 1,
              backgroundColor: promptColor
            }
          })
        } else {
          this.l4.setNativeProps({
            style: {
              opacity: 1,
              backgroundColor: color
            }
          })
        }

      }
      if (valueArr[4] < comValue) {
        if (dataArr3[dataArr3.length - 1] == 'two') {
          this.l3.setNativeProps({
            style: {
              opacity: 1,
              backgroundColor: promptColor
            }
          })
        } else {
          this.l3.setNativeProps({
            style: {
              opacity: 1,
              backgroundColor: color
            }
          })
        }
      }

    }

    if (this.state.step == 9) {
      flag++
      console.log(flag)
      if (flag == 2) {
        setTimeout(() => {
          this.setState({
            step: 10
          })
        }, 2000)
      }

    }



  }

  handleStopScan() {
    console.log('Scan is stopped');
    this.setState({ scanning: false });
  }

  startScan() {
    console.log(this.state.scanning)
    if (!this.state.scanning) {
      console.log('join',)
      this.setState({ peripherals: new Map() });
      BleManager.scan([], 3, true).then((results) => {
        console.log('Scanning...');
        this.showToastWithGravityAndOffset('Scanning...')
        this.setState({ scanning: true });
      });
    }
  }

  retrieveConnected() {
    BleManager.getConnectedPeripherals([]).then((results) => {
      if (results.length == 0) {
        console.log('No connected peripherals');
      }
      console.log(results);
      var peripherals = this.state.peripherals;
      for (var i = 0; i < results.length; i++) {
        var peripheral = results[i];
        peripheral.connected = true;
        peripherals.set(peripheral.id, peripheral);
        this.setState({ peripherals });
      }
    });
  }

  //处理发现蓝牙之后的业务
  handleDiscoverPeripheral(peripheral) {
    var peripherals = this.state.peripherals;
    if (peripheral.name != null) {
      console.info(peripheral.name);
      if (peripheral.name == 'MYSHOE') {
        if (peripheral.id == 'D8:52:24:C6:A6:3D') {
          console.info('===' + peripheral.name + '  ' + peripheral.id);
          this.getData(peripheral);
          return;
        }
        // console.log(peripheral.id,'myshoe')
      }
      if (!peripherals.has(peripheral.id)) {
        peripherals.set(peripheral.id, peripheral);
        this.setState({ peripherals });
      }
    }
  }

  //获取蓝牙数据  打开通知
  getData(peripheral) {
    console.info('peripheral 数据：--  ' + peripheral);
    if (peripheral) {
      if (peripheral.connected) {
        BleManager.disconnect(peripheral.id);
      } else {
        console.info('开始连接');
        this.showToastWithGravityAndOffset('开始连接')
        BleManager.connect(peripheral.id)
          .then(() => {
            let peripherals = this.state.peripherals;
            let p = peripherals.get(peripheral.id);
            if (p) {
              p.connected = true;
              peripherals.set(peripheral.id, p);
              this.setState({ peripherals });
            }
            console.log('连接到 ' + JSON.stringify(peripheral.id));
            // https://github.com/sandeepmistry/bleno/tree/master/examples/pizza
            BleManager.retrieveServices(peripheral.id).then(
              (peripheralInfo) => {
                this.getUUID(peripheralInfo);
                console.log(
                  'print ---------  ' + JSON.stringify(peripheralInfo),
                );
                console.info('peripheral.id => ' + peripheral.id);

                BleManager.startNotification(
                  peripheral.id,
                  this.nofityServiceUUID[0],
                  this.nofityCharacteristicUUID[0],
                )
                  .then(() => {
                    console.log('Started notification on ' + peripheral.id);
                  })
                  .catch((error) => {
                    console.log('Notification error', error);
                  });
              },
            );
          })
          .catch((error) => {
            console.log('Connection error', error);
          });
      }
    }
  }

  render() {
    //const list = Array.from(this.state.peripherals.values());

    return (

      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <TouchableHighlight
            style={{
              marginTop: 40,
              margin: 20,
              padding: 20,
              backgroundColor: '#ccc',
            }}
            onPress={() => this.startScan()}>
            <Text>Scan Bluetooth ({this.state.scanning ? 'on' : 'off'})</Text>

          </TouchableHighlight>
          <View style={{ width: width, height: height, }}>
            <View style={{ width: height * 0.9, height: width, resizeMode: 'stretch', transform: [{ rotateZ: '90deg' }, { translateY: width / 2 - 40 }, { translateX: 140 }] }}>


              {
                this.state.step == 1 ? <Video source={require('./src/assets/video/video1info.mp4')}   // Can be a URL or a local file.
                  ref={(ref) => {
                    this.player = ref
                  }}                                      // Store reference
                  onBuffer={this.onBuffer}                // Callback when remote video is buffering
                  onError={this.videoError}
                  onEnd={() => {
                    this.setState({
                      step: 2
                    })

                  }}              // Callback when video cannot be loaded
                  style={{
                    flex: 1 //width: height * 0.9, height: width, resizeMode: 'stretch', transform: [{ rotateZ: '90deg' }, { translateY: width / 2 - 40 }, { translateX: 140 }] 
                  }} /> : this.state.step == 2 ? <>
                    <Video source={require('./src/assets/video/video1.mp4')}   // Can be a URL or a local file.
                      ref={(ref) => {
                        this.player = ref
                      }}                                      // Store reference
                      onBuffer={this.onBuffer}                // Callback when remote video is buffering
                      onError={this.videoError}
                      onLoadStart={() => {
                        this.l5.setNativeProps({
                          style: {
                            opacity: 1,
                            backgroundColor: promptColor
                          }
                        })
                      }}
                      onEnd={() => {
                        this.setState({
                          step: 3
                        })
                      }}              // Callback when video cannot be loaded
                      // style={{ width: height * 0.9, height: width, resizeMode: 'stretch', transform: [{ rotateZ: '90deg' }, { translateY: width / 2 - 40 }, { translateX: 140 }] }}  
                      style={{ flex: 1 }}
                    />
                    <Text style={{ position: 'absolute', top: 50, color: 'white', fontSize: 24 }}>{this.state.num1}/16</Text>
                    <View style={{
                      position: 'absolute', top, left,// transform: [{ rotateZ: '90deg' }], 
                      alignItems: 'center', justifyContent: 'center'
                    }}>
                      <View style={{ width: Width(48), height: Width(108) > height * 0.8 ? 0.8 * height : Width(108), borderWidth: 1, borderColor: '#f9d6f8' }}>
                        <View ref={(e) => this.l8 = e} style={{ flex: 1, borderBottomWidth: 1, borderColor: '#f9d6f8', flexDirection: 'row', backgroundColor: color, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30) }}></Text>
                        </View>
                        <View style={{ flex: 2, borderBottomWidth: 1, borderColor: '#f9d6f8', position: 'relative' }}>
                          <View ref={(e) => this.l3 = e} style={{ position: 'absolute', top: '50%', backgroundColor: color, left: '50%', zIndex: 2, width: Width(24), height: Width(24), transform: [{ translateY: -Width(12) }, { translateX: -Width(12) }, { rotateZ: '45deg' }], borderWidth: 1, borderColor: '#f9d6f8', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30), transform: [{ rotateZ: '-45deg' }] }}></Text>
                          </View>
                          <View style={{ flex: 1, borderBottomWidth: 1, borderColor: '#f9d6f8', flexDirection: 'row' }}>
                            <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#f9d6f8', backgroundColor: color, justifyContent: 'center', alignItems: 'center' }} ref={(e) => this.l1 = e}><Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30) }}></Text></View>
                            <View style={{ flex: 1, backgroundColor: color, justifyContent: 'center', alignItems: 'center' }} ref={(e) => this.l2 = e}><Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30) }}></Text></View>
                          </View>
                          <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#f9d6f8', backgroundColor: color, justifyContent: 'center', alignItems: 'center' }} ref={(e) => this.l4 = e}><Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30) }}></Text></View>
                            <View style={{ flex: 1, backgroundColor: color, justifyContent: 'center', alignItems: 'center' }} ref={(e) => this.l5 = e}><Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30) }}></Text></View>
                          </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                          <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#f9d6f8', backgroundColor: color, justifyContent: 'center', alignItems: 'center' }} ref={(e) => this.l6 = e}>
                            <Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30) }}></Text>
                          </View>
                        </View>
                      </View>
                    </View></> : this.state.step == 3 ? <Video source={require('./src/assets/video/video2info.mp4')}   // Can be a URL or a local file.
                      ref={(ref) => {
                        this.player = ref
                      }}                                      // Store reference
                      onBuffer={this.onBuffer}                // Callback when remote video is buffering
                      onError={this.videoError}
                      onEnd={() => {
                        this.setState({
                          step: 4
                        })

                      }}              // Callback when video cannot be loaded
                      style={{
                        flex: 1 //width: height * 0.9, height: width, resizeMode: 'stretch', transform: [{ rotateZ: '90deg' }, { translateY: width / 2 - 40 }, { translateX: 140 }] 
                      }} /> : this.state.step == 4 ? <>
                        <Video source={require('./src/assets/video/video2.mp4')}   // Can be a URL or a local file.
                          ref={(ref) => {
                            this.player = ref
                          }}                                      // Store reference
                          onBuffer={this.onBuffer}                // Callback when remote video is buffering
                          onError={this.videoError}
                          // onLoadStart={() => {
                          //   this.l5.setNativeProps({
                          //     style: {
                          //       opacity: 1,
                          //       backgroundColor: promptColor
                          //     }
                          //   })
                          //   this.l4.setNativeProps({
                          //     style: {
                          //       opacity: 1,
                          //       backgroundColor: promptColor
                          //     }
                          //   })
                          // }}
                          onEnd={() => {
                            this.setState({
                              step: 5,
                            })
                          }}              // Callback when video cannot be loaded
                          // style={{ width: height * 0.9, height: width, resizeMode: 'stretch', transform: [{ rotateZ: '90deg' }, { translateY: width / 2 - 40 }, { translateX: 140 }] }}  
                          style={{ flex: 1 }}
                        />
                        <Text style={{ position: 'absolute', top: 50, color: 'white', fontSize: 24 }}>{this.state.num2}/16</Text>
                        <View style={{
                          position: 'absolute', top, left,// transform: [{ rotateZ: '90deg' }], 
                          alignItems: 'center', justifyContent: 'center'
                        }}>
                          <View style={{ width: Width(48), height: Width(108) > height * 0.8 ? 0.8 * height : Width(108), borderWidth: 1, borderColor: '#f9d6f8' }}>
                            <View ref={(e) => this.l8 = e} style={{ flex: 1, borderBottomWidth: 1, borderColor: '#f9d6f8', flexDirection: 'row', backgroundColor: color, justifyContent: 'center', alignItems: 'center' }}>
                              <Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30) }}></Text>
                            </View>
                            <View style={{ flex: 2, borderBottomWidth: 1, borderColor: '#f9d6f8', position: 'relative' }}>
                              <View ref={(e) => this.l3 = e} style={{ position: 'absolute', top: '50%', backgroundColor: color, left: '50%', zIndex: 2, width: Width(24), height: Width(24), transform: [{ translateY: -Width(12) }, { translateX: -Width(12) }, { rotateZ: '45deg' }], borderWidth: 1, borderColor: '#f9d6f8', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30), transform: [{ rotateZ: '-45deg' }] }}></Text>
                              </View>
                              <View style={{ flex: 1, borderBottomWidth: 1, borderColor: '#f9d6f8', flexDirection: 'row' }}>
                                <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#f9d6f8', backgroundColor: color, justifyContent: 'center', alignItems: 'center' }} ref={(e) => this.l1 = e}><Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30) }}></Text></View>
                                <View style={{ flex: 1, backgroundColor: color, justifyContent: 'center', alignItems: 'center' }} ref={(e) => this.l2 = e}><Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30) }}></Text></View>
                              </View>
                              <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#f9d6f8', backgroundColor: color, justifyContent: 'center', alignItems: 'center' }} ref={(e) => this.l4 = e}><Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30) }}></Text></View>
                                <View style={{ flex: 1, backgroundColor: color, justifyContent: 'center', alignItems: 'center' }} ref={(e) => this.l5 = e}><Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30) }}></Text></View>
                              </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                              <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#f9d6f8', backgroundColor: color, justifyContent: 'center', alignItems: 'center' }} ref={(e) => this.l6 = e}>
                                <Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30) }}></Text>
                              </View>
                            </View>
                          </View>
                        </View></> : this.state.step == 5 ? <Video source={require('./src/assets/video/video3info.mp4')}   // Can be a URL or a local file.
                          ref={(ref) => {
                            this.player = ref
                          }}                                      // Store reference
                          onBuffer={this.onBuffer}                // Callback when remote video is buffering
                          onError={this.videoError}
                          onEnd={() => {
                            this.setState({
                              step: 6
                            })

                          }}              // Callback when video cannot be loaded
                          style={{
                            flex: 1 //width: height * 0.9, height: width, resizeMode: 'stretch', transform: [{ rotateZ: '90deg' }, { translateY: width / 2 - 40 }, { translateX: 140 }] 
                          }} /> : this.state.step == 6 ? <>
                            <Video source={require('./src/assets/video/video3.mp4')}   // Can be a URL or a local file.
                              ref={(ref) => {
                                this.player = ref
                              }}                                      // Store reference
                              onBuffer={this.onBuffer}                // Callback when remote video is buffering
                              onError={this.videoError}
                              onLoadStart={() => {
                                this.l5.setNativeProps({
                                  style: {
                                    opacity: 1,
                                    backgroundColor: promptColor
                                  }
                                })
                                this.l4.setNativeProps({
                                  style: {
                                    opacity: 1,
                                    backgroundColor: promptColor
                                  }
                                })
                              }}
                              onEnd={() => {
                                this.setState({
                                  step: 7
                                })
                              }}              // Callback when video cannot be loaded
                              // style={{ width: height * 0.9, height: width, resizeMode: 'stretch', transform: [{ rotateZ: '90deg' }, { translateY: width / 2 - 40 }, { translateX: 140 }] }}  
                              style={{ flex: 1 }}
                            />
                            <Text style={{ position: 'absolute', top: 50, color: 'white', fontSize: 24 }}>{this.state.num3}/16</Text>
                            <View style={{
                              position: 'absolute', top, left,// transform: [{ rotateZ: '90deg' }], 
                              alignItems: 'center', justifyContent: 'center'
                            }}>
                              <View style={{ width: Width(48), height: Width(108) > height * 0.8 ? 0.8 * height : Width(108), borderWidth: 1, borderColor: '#f9d6f8' }}>
                                <View ref={(e) => this.l8 = e} style={{ flex: 1, borderBottomWidth: 1, borderColor: '#f9d6f8', flexDirection: 'row', backgroundColor: color, justifyContent: 'center', alignItems: 'center' }}>
                                  <Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30) }}></Text>
                                </View>
                                <View style={{ flex: 2, borderBottomWidth: 1, borderColor: '#f9d6f8', position: 'relative' }}>
                                  <View ref={(e) => this.l3 = e} style={{ position: 'absolute', top: '50%', backgroundColor: color, left: '50%', zIndex: 2, width: Width(24), height: Width(24), transform: [{ translateY: -Width(12) }, { translateX: -Width(12) }, { rotateZ: '45deg' }], borderWidth: 1, borderColor: '#f9d6f8', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30), transform: [{ rotateZ: '-45deg' }] }}></Text>
                                  </View>
                                  <View style={{ flex: 1, borderBottomWidth: 1, borderColor: '#f9d6f8', flexDirection: 'row' }}>
                                    <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#f9d6f8', backgroundColor: color, justifyContent: 'center', alignItems: 'center' }} ref={(e) => this.l1 = e}><Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30) }}></Text></View>
                                    <View style={{ flex: 1, backgroundColor: color, justifyContent: 'center', alignItems: 'center' }} ref={(e) => this.l2 = e}><Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30) }}></Text></View>
                                  </View>
                                  <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#f9d6f8', backgroundColor: color, justifyContent: 'center', alignItems: 'center' }} ref={(e) => this.l4 = e}><Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30) }}></Text></View>
                                    <View style={{ flex: 1, backgroundColor: color, justifyContent: 'center', alignItems: 'center' }} ref={(e) => this.l5 = e}><Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30) }}></Text></View>
                                  </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                  <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#f9d6f8', backgroundColor: color, justifyContent: 'center', alignItems: 'center' }} ref={(e) => this.l6 = e}>
                                    <Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30) }}></Text>
                                  </View>
                                </View>
                              </View>
                            </View></> : this.state.step == 7 ? <Video source={require('./src/assets/video/video4info.mp4')}   // Can be a URL or a local file.
                              ref={(ref) => {
                                this.player = ref
                              }}                                      // Store reference
                              onBuffer={this.onBuffer}                // Callback when remote video is buffering
                              onError={this.videoError}
                              onEnd={() => {
                                this.setState({
                                  step: 8
                                })

                              }}              // Callback when video cannot be loaded
                              style={{
                                flex: 1 //width: height * 0.9, height: width, resizeMode: 'stretch', transform: [{ rotateZ: '90deg' }, { translateY: width / 2 - 40 }, { translateX: 140 }] 
                              }} /> : this.state.step == 8 ? <>
                                <Video source={require('./src/assets/video/video4.mp4')}   // Can be a URL or a local file.
                                  ref={(ref) => {
                                    this.player = ref
                                  }}                                      // Store reference
                                  onBuffer={this.onBuffer}                // Callback when remote video is buffering
                                  onError={this.videoError}
                                  onLoadStart={() => {
                                    this.l5.setNativeProps({
                                      style: {
                                        opacity: 1,
                                        backgroundColor: promptColor
                                      }
                                    })
                                    this.l4.setNativeProps({
                                      style: {
                                        opacity: 1,
                                        backgroundColor: promptColor
                                      }
                                    })
                                  }}
                                  onEnd={() => {
                                    this.setState({
                                      step: 9
                                    })
                                  }}              // Callback when video cannot be loaded
                                  // style={{ width: height * 0.9, height: width, resizeMode: 'stretch', transform: [{ rotateZ: '90deg' }, { translateY: width / 2 - 40 }, { translateX: 140 }] }}  
                                  style={{ flex: 1 }}
                                />
                                <Text style={{ position: 'absolute', top: 50, color: 'white', fontSize: 24 }}>{this.state.num4}/16</Text>
                                <View style={{
                                  position: 'absolute', top, left,// transform: [{ rotateZ: '90deg' }], 
                                  alignItems: 'center', justifyContent: 'center'
                                }}>
                                  <View style={{ width: Width(48), height: Width(108) > height * 0.8 ? 0.8 * height : Width(108), borderWidth: 1, borderColor: '#f9d6f8' }}>
                                    <View ref={(e) => this.l8 = e} style={{ flex: 1, borderBottomWidth: 1, borderColor: '#f9d6f8', flexDirection: 'row', backgroundColor: color, justifyContent: 'center', alignItems: 'center' }}>
                                      <Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30) }}></Text>
                                    </View>
                                    <View style={{ flex: 2, borderBottomWidth: 1, borderColor: '#f9d6f8', position: 'relative' }}>
                                      <View ref={(e) => this.l3 = e} style={{ position: 'absolute', top: '50%', backgroundColor: color, left: '50%', zIndex: 2, width: Width(24), height: Width(24), transform: [{ translateY: -Width(12) }, { translateX: -Width(12) }, { rotateZ: '45deg' }], borderWidth: 1, borderColor: '#f9d6f8', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30), transform: [{ rotateZ: '-45deg' }] }}></Text>
                                      </View>
                                      <View style={{ flex: 1, borderBottomWidth: 1, borderColor: '#f9d6f8', flexDirection: 'row' }}>
                                        <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#f9d6f8', backgroundColor: color, justifyContent: 'center', alignItems: 'center' }} ref={(e) => this.l1 = e}><Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30) }}></Text></View>
                                        <View style={{ flex: 1, backgroundColor: color, justifyContent: 'center', alignItems: 'center' }} ref={(e) => this.l2 = e}><Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30) }}></Text></View>
                                      </View>
                                      <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#f9d6f8', backgroundColor: color, justifyContent: 'center', alignItems: 'center' }} ref={(e) => this.l4 = e}><Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30) }}></Text></View>
                                        <View style={{ flex: 1, backgroundColor: color, justifyContent: 'center', alignItems: 'center' }} ref={(e) => this.l5 = e}><Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30) }}></Text></View>
                                      </View>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                      <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#f9d6f8', backgroundColor: color, justifyContent: 'center', alignItems: 'center' }} ref={(e) => this.l6 = e}>
                                        <Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30) }}></Text>
                                      </View>
                                    </View>
                                  </View>
                                </View></> : this.state.step == 9 ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                  <Text>左右小跳 : {this.state.num1}</Text>
                                  <Text>半蹲侧抬腿 : {this.state.num2}</Text>
                                  <Text>右提膝收腹 : {this.state.num3}</Text>
                                  <Text>开合跳 : {this.state.num4}</Text>
                                </View> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Ech muscle={com.muscle([leftArr1, leftArr2, rightArr1, rightArr2])} flex={com.flex([this.state.num1, this.state.num2, this.state.num3, this.state.num4])} skill={com.skill([this.state.num1, this.state.num2, this.state.num3, this.state.num4])}
                    endur={com.endur()} Concen={com.Concen()} />
                </View>
              }
            </View>




            {/* {this.state.video1Info ? !this.state.video1End ? 
        <View style={{ width: height * 0.9, height: width, resizeMode: 'stretch', transform: [{ rotateZ: '90deg' }, { translateY: width / 2 - 40 }, { translateX: 140 }] 
      }}>
          
          {<Video source={require('./src/assets/video/video1.mp4')}   // Can be a URL or a local file.
            ref={(ref) => {
              this.player = ref
            }}                                      // Store reference
            onBuffer={this.onBuffer}                // Callback when remote video is buffering
            onError={this.videoError}
            onLoadStart={() => {
              this.l5.setNativeProps({
                style: {
                  opacity: 1,
                  backgroundColor: promptColor
                }
              })
            }} 
            onEnd={()=>{
              this.setState({
                video1End : true
              })
            }}              // Callback when video cannot be loaded
            // style={{ width: height * 0.9, height: width, resizeMode: 'stretch', transform: [{ rotateZ: '90deg' }, { translateY: width / 2 - 40 }, { translateX: 140 }] }}  
            style={{ flex: 1}}
            />}
          <Text style={{position: 'absolute',top: 50, color : 'white'}}>{this.state.num1}/16</Text>
          <View style={{ position: 'absolute', top: 150, left: 400,// transform: [{ rotateZ: '90deg' }], 
          alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: Width(48), height: Width(108) > height * 0.8 ? 0.8 * height : Width(108), borderWidth: 1, borderColor: '#f9d6f8' }}>
              <View ref={(e) => this.l8 = e} style={{ flex: 1, borderBottomWidth: 1, borderColor: '#f9d6f8', flexDirection: 'row', backgroundColor: color, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30) }}></Text>
              </View>
              <View style={{ flex: 2, borderBottomWidth: 1, borderColor: '#f9d6f8', position: 'relative' }}>
                <View ref={(e) => this.l3 = e} style={{ position: 'absolute', top: '50%', backgroundColor: color, left: '50%', zIndex: 2, width: Width(24), height: Width(24), transform: [{ translateY: -Width(12) }, { translateX: -Width(12) }, { rotateZ: '45deg' }], borderWidth: 1, borderColor: '#f9d6f8', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30), transform: [{ rotateZ: '-45deg' }] }}></Text>
                </View>
                <View style={{ flex: 1, borderBottomWidth: 1, borderColor: '#f9d6f8', flexDirection: 'row' }}>
                  <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#f9d6f8', backgroundColor: color, justifyContent: 'center', alignItems: 'center' }} ref={(e) => this.l1 = e}><Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30) }}></Text></View>
                  <View style={{ flex: 1, backgroundColor: color, justifyContent: 'center', alignItems: 'center' }} ref={(e) => this.l2 = e}><Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30) }}></Text></View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#f9d6f8', backgroundColor: color, justifyContent: 'center', alignItems: 'center' }} ref={(e) => this.l4 = e}><Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30) }}></Text></View>
                  <View style={{ flex: 1, backgroundColor: color, justifyContent: 'center', alignItems: 'center' }} ref={(e) => this.l5 = e}><Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30) }}></Text></View>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#f9d6f8', backgroundColor: color, justifyContent: 'center', alignItems: 'center' }} ref={(e) => this.l6 = e}>
                  <Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30) }}></Text>
                </View>
              </View>
            </View>
          </View>


        </View> : <Text>前后小跳 : {parseInt(dataArr.length/2)}</Text> : <Video source={require('./src/assets/video/video1info.mp4')}   // Can be a URL or a local file.
            ref={(ref) => {
              this.player = ref
            }}                                      // Store reference
            onBuffer={this.onBuffer}                // Callback when remote video is buffering
            onError={this.videoError} 
            onEnd={()=>{
              this.setState({
                video1Info : true
              })
              
            }}              // Callback when video cannot be loaded
            style={{ width: height * 0.9, height: width, resizeMode: 'stretch', transform: [{ rotateZ: '90deg' }, { translateY: width / 2 - 40 }, { translateX: 140 }] 
          }}  />} */}


          </View>
        </ScrollView>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  text: { fontSize: 24 },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    width: window.width,
    height: window.height,
  },
  scroll: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    margin: 10,
  },
  row: {
    margin: 10,
  },
  box: {
    margin: 10
  }
});
