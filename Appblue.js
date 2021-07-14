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

import BleManager from 'react-native-ble-manager';
import { WebView } from 'react-native-webview';
const { height, scale } = Dimensions.get('window');

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
      value : ''
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
    console.log(valueArr, a)
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    this.setState({
      width: valueArr[0] * (width - 20) / 1020,
      width1: valueArr[1] * (width - 20) / 1020,
      width2: valueArr[2] * (width - 20) / 1020,
      width3: valueArr[3] * (width - 20) / 1020,
      width4: valueArr[4] * (width - 20) / 1020,
      width5: valueArr[5] * (width - 20) / 1020,
      width6: valueArr[6] * (width - 20) / 1020,
      width7: valueArr[7] * (width - 20) / 1020,
      value : valueArr
    })
    if (valueArr[6] > 100) {
      this.setState({
        text: 7
      })
    }
    // this.state.width = 
    // this.l1.current._internalFiberInstanceHandleDEV.memoizedProps.style.width=200
    // console.log(this.l1.current._internalFiberInstanceHandleDEV.memoizedProps.style.width)
    // this.l1.style = { backgroundColor: 'red', width: 100, height: 200 }
    if (valueArr[0] > 130) {
      this.l6.setNativeProps({
        style: {
          opacity: 1,
          backgroundColor: 'rgb(249,214,248)'
        }
      })
    }
    if (valueArr[1] > 130) {
      this.l4.setNativeProps({
        style: {
          opacity: 1,
          backgroundColor: 'rgb(249,214,248)'
        }
      })
    }
    if (valueArr[2] > 130) {
      this.l5.setNativeProps({
        style: {
          opacity: 1,
          backgroundColor: 'rgb(249,214,248)'
        }
      })
    }
    if (valueArr[3] > 130) {
      this.l3.setNativeProps({
        style: {
          opacity: 1,
          backgroundColor: 'rgb(249,214,248)'
        }
      })
    }
    if (valueArr[4] > 130) {
      this.l2.setNativeProps({
        style: {
          opacity: 1,
          backgroundColor: 'rgb(249,214,248)'
        }
      })
    }
    if (valueArr[5] > 130) {
      this.l1.setNativeProps({
        style: {
          opacity: 1,
          backgroundColor: 'rgb(249,214,248)'
        }
      })
    }
    if (valueArr[7] > 130) {
      this.l8.setNativeProps({
        style: {
          opacity: 1,
          backgroundColor: 'rgb(249,214,248)'
        }
      })
    }


    if (valueArr[0] < 130) {
      this.l6.setNativeProps({
        style: {
          opacity: 1,
          backgroundColor: 'rgb(36,4,49)'
        }
      })
    }
    if (valueArr[1] < 130) {
      this.l4.setNativeProps({
        style: {
          opacity: 1,
          backgroundColor: 'rgb(36,4,49)'
        }
      })
    }
    if (valueArr[2] < 130) {
      this.l5.setNativeProps({
        style: {
          opacity: 1,
          backgroundColor: 'rgb(36,4,49)'
        }
      })
    }
    if (valueArr[3] < 130) {
      this.l3.setNativeProps({
        style: {
          opacity: 1,
          backgroundColor: 'rgb(36,4,49)'
        }
      })
    }
    if (valueArr[4] < 130) {
      this.l2.setNativeProps({
        style: {
          opacity: 1,
          backgroundColor: 'rgb(36,4,49)'
        }
      })
    }
    if (valueArr[5] < 130) {
      this.l1.setNativeProps({
        style: {
          opacity: 1,
          backgroundColor: 'rgb(36,4,49)'
        }
      })
    }
    if (valueArr[7] < 130) {
      this.l8.setNativeProps({
        style: {
          opacity: 1,
          backgroundColor: 'rgb(36,4,49)'
        }
      })
    }

    // this.l6.setNativeProps({
    //   style: {
    //     opacity: 1,
    //     backgroundColor: `rgb(${36 + parseInt(valueArr[0] * 213 / 1020)},${4 + parseInt(valueArr[0] * 210 / 1020)},${49 + parseInt(valueArr[0] * 199 / 1020)})`
    //   }
    // });
    // this.l4.setNativeProps({
    //   style: {
    //     opacity: 1,
    //     backgroundColor: `rgb(${36 + parseInt(valueArr[1] * 213 / 1020)},${4 + parseInt(valueArr[1] * 210 / 1020)},${49 + parseInt(valueArr[1] * 199 / 1020)})`
    //   }
    // });
    // this.l5.setNativeProps({
    //   style: {
    //     opacity: 1,
    //     backgroundColor: `rgb(${36 + parseInt(valueArr[2] * 213 / 1020)},${4 + parseInt(valueArr[2] * 210 / 1020)},${49 + parseInt(valueArr[2] * 199 / 1020)})`
    //   }
    // });
    // this.l3.setNativeProps({
    //   style: {
    //     opacity: 1,
    //     backgroundColor: `rgb(${36 + parseInt(valueArr[3] * 213 / 1020)},${4 + parseInt(valueArr[3] * 210 / 1020)},${49 + parseInt(valueArr[3] * 199 / 1020)})`
    //   }
    // });
    // this.l2.setNativeProps({
    //   style: {
    //     opacity: 1,
    //     backgroundColor: `rgb(${36 + parseInt(valueArr[4] * 213 / 1020)},${4 + parseInt(valueArr[4] * 210 / 1020)},${49 + parseInt(valueArr[4] * 199 / 1020)})`
    //   }
    // });
    // this.l1.setNativeProps({
    //   style: {
    //     opacity: 1,
    //     backgroundColor: `rgb(${36 + parseInt(valueArr[5] * 213 / 1020)},${4 + parseInt(valueArr[5] * 210 / 1020)},${49 + parseInt(valueArr[5] * 199 / 1020)})`
    //   }
    // });

    // this.l8.setNativeProps({
    //   style: {
    //     opacity: 1,
    //     backgroundColor: `rgb(${36 + parseInt(valueArr[7] * 213 / 1020)},${4 + parseInt(valueArr[7] * 210 / 1020)},${49 + parseInt(valueArr[7] * 199 / 1020)})`
    //   }
    // });

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
        {/* <WebView
          source={{ uri: 'https://github.com/facebook/react-native' }}
          style={{ marginTop: 20 }}
        /> */}
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
        <Text style={{textAlign : 'center'}}>{this.state.value.toString()}</Text>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: Width(240), height: Width(540) > height * 0.8 ? 0.8 * height : Width(540), borderWidth: 1, borderColor: '#f9d6f8' }}>
            <View ref={(e) => this.l8 = e} style={{ flex: 1, borderBottomWidth: 1, borderColor: '#f9d6f8', flexDirection: 'row', backgroundColor: 'rgb(36,4,49)', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30) }}>7</Text>
            </View>
            <View style={{ flex: 2, borderBottomWidth: 1, borderColor: '#f9d6f8', position: 'relative' }}>
              <View ref={(e) => this.l3 = e} style={{ position: 'absolute', top: '50%', backgroundColor: 'rgb(36,4,49)', left: '50%', zIndex: 2, width: Width(120), height: Width(120), transform: [{ translateY: -Width(60) }, { translateX: -Width(60) }, { rotateZ: '45deg' }], borderWidth: 1, borderColor: '#f9d6f8', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30), transform: [{ rotateZ: '-45deg' }] }}>4</Text>
              </View>
              <View style={{ flex: 1, borderBottomWidth: 1, borderColor: '#f9d6f8', flexDirection: 'row' }}>
                <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#f9d6f8', backgroundColor: 'rgb(36,4,49)', justifyContent: 'center', alignItems: 'center' }} ref={(e) => this.l1 = e}><Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30) }}>6</Text></View>
                <View style={{ flex: 1, backgroundColor: 'rgb(36,4,49)', justifyContent: 'center', alignItems: 'center' }} ref={(e) => this.l2 = e}><Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30) }}>5</Text></View>
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#f9d6f8', backgroundColor: 'rgb(36,4,49)', justifyContent: 'center', alignItems: 'center' }} ref={(e) => this.l4 = e}><Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30) }}>2</Text></View>
                <View style={{ flex: 1, backgroundColor: 'rgb(36,4,49)', justifyContent: 'center', alignItems: 'center' }} ref={(e) => this.l5 = e}><Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30) }}>3</Text></View>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#f9d6f8', backgroundColor: 'rgb(36,4,49)', justifyContent: 'center', alignItems: 'center' }} ref={(e) => this.l6 = e}>
                <Text style={{ color: 'rgb(36,4,49)', fontSize: Width(30) }}>1</Text>
              </View>
              {/* <View style={{ flex: 1,backgroundColor : 'rgb(36,4,49)' }} ref={(e) => this.l7 = e}></View> */}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
