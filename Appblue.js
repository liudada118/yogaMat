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
let comnum = 1
import { com } from './src/js/com'
import BleManager from 'react-native-ble-manager';
import { WebView } from 'react-native-webview';
const { height, scale } = Dimensions.get('window');
import Echarts from 'native-echarts';
import Fili from 'fili'
const arr = [289, 404, 452, 467, 474, 480, 485, 493, 495, 492, 497, 498, 500, 503, 499, 494, 493, 497, 500, 497, 501, 495, 498, 500, 494, 499, 499, 501, 496, 497, 493, 498, 500, 501, 502, 502, 503, 503, 502, 503, 502, 502, 503, 503, 504, 502, 503, 504, 503, 502, 505, 502, 503, 502, 500, 503, 504, 502, 502, 505, 504, 504, 503, 506, 504, 506, 505, 506, 507, 507, 506, 505, 507, 506, 506, 505, 504, 504, 506, 504, 505, 506, 506, 507, 504, 504, 504, 505, 506, 507, 505, 504, 504, 503, 502, 503, 504, 503, 501, 505, 510, 526, 537, 537, 535, 532, 531, 533, 535, 519, 519, 527, 536, 549, 561, 564, 562, 552, 543, 542, 548, 551, 555, 560, 561, 563, 563, 563, 563, 563, 566, 564, 563, 563, 561, 566, 561, 561, 559, 561, 559, 564, 564, 561, 560, 561, 557, 560, 559, 556, 556, 560, 561, 562, 563, 559, 560, 559, 557, 556, 557, 558, 561, 563, 563, 568, 567, 561, 556, 549, 553, 556, 558, 551, 542, 540, 537, 531, 499, 494, 490, 492, 489, 490, 485, 491, 495, 494, 505, 500, 502, 500, 498, 499, 494, 497, 473, 455, 398, 331, 342, 393, 423, 435, 461, 465, 471, 474, 476, 463, 459, 463, 467, 466, 478, 495, 485, 467, 450, 403, 444, 448, 459, 459, 469, 467, 456, 446, 452, 454, 456, 461, 463, 462, 452, 439, 401, 430, 451, 450, 457, 468, 453, 444, 443, 441, 452, 461, 470, 469, 471, 495, 488, 459, 451, 459, 475, 478, 476, 472, 460, 455, 455, 447, 444, 447, 454, 464, 510, 547, 553, 532, 509, 503, 542, 556, 545, 532, 538, 541, 546, 554, 552, 553, 558, 543, 517, 512, 509, 531, 543, 546, 554, 551, 544, 523, 538, 546, 537, 556, 558, 555, 550, 546, 545, 547, 548, 552, 551, 490, 437, 453, 479, 545, 552, 551, 546, 532, 525, 531, 548, 547, 537, 514, 484, 513, 518, 532, 531, 528, 511, 463, 372, 362, 381, 463, 507, 481, 485, 516, 536, 511, 441]
var firCalculator = new Fili.FirCoeffs();

// calculate filter coefficients
var firFilterCoeffs = firCalculator.lowpass({
  order: 20, // filter order
  Fs: 10, // sampling frequency
  Fc: 0.2 // cutoff frequency
  // forbandpass and bandstop F1 and F2 must be provided instead of Fc
});
var firFilter = new Fili.FirFilter(firFilterCoeffs);
firFilter.simulate(arr)
// console.log(firFilter.simulate(arr), '++++++++++');
/**
 * 适配宽度*/
const myWidth = 300
function Width(num) {
  return num * width / myWidth
}
let smooth = 0
let dataArr = []
let relArr = []
let relArr1 = []
let relArr2 = []
let relArr3 = []
let relArr4 = []
let diffArr = []
let stable = []
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
      aver: '',
      isView: false,
      option: '',
      option1: '',
      option2: '',
      option3: '',
      arr: '',
      trueValue : ''
    };
    this.l1 = React.createRef();
    this.l2 = React.createRef();
    this.l3 = React.createRef();
    this.l4 = React.createRef();
    this.l5 = React.createRef();
    this.l6 = React.createRef();
    this.l7 = React.createRef();
    this.l8 = React.createRef();
    this.slide = React.createRef();
    this.slide1 = React.createRef();
    this.slide2 = React.createRef();
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
    // console.log(valueArr)
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

      if (dataArr.length < 2) {
        
        
        dataArr.push(valueArr[4])
        if(dataArr.length ==2){
        smooth = smooth + (Math.abs(dataArr[1]-dataArr[0])  - smooth) / 30 
        diffArr.push(smooth)}
        // console.log(smooth,com(dataArr))
        let fillArr = firFilter.simulate(dataArr)
        relArr1.push(valueArr[4])
        relArr2.push(fillArr)
        relArr3.push(com(dataArr).toFixed(0))
        // relArr4.push(relArr3)
        relArr.push(com(fillArr).toFixed(0))//Number( com(fillArr).toFixed(0)))
        let relvalue = relArr.reduce((prev, cur) => parseInt(prev) + parseInt(cur), 0)
        relArr4.push(relvalue / relArr.length)
        console.log(relArr1)
        // if (relvalue / relArr.length >= 0 && relvalue / relArr.length < 10) {
        //   this.slide.setNativeProps({
        //     style: {
        //       opacity : 1
        //     }
        //   })
        //   // this.slide1.setNativeProps({
        //   //   style: {
        //   //     opacity : 0
        //   //   }
        //   // })
        //   // this.slide2.setNativeProps({
        //   //   style: {
        //   //     opacity : 0
        //   //   }
        //   // })
        // } else if (relvalue / relArr.length < 250) {
        //   this.slide.setNativeProps({
        //     style: {
        //       opacity : 0
        //     }
        //   })
        //   // this.slide1.setNativeProps({
        //   //   style: {
        //   //     opacity : 1
        //   //   }
        //   // })
        //   // this.slide2.setNativeProps({
        //   //   style: {
        //   //     opacity : 0
        //   //   }
        //   // })
        // } else {
        //   this.slide.setNativeProps({
        //     style: {
        //       opacity : 0
        //     }
        //   })
        //   // this.slide1.setNativeProps({
        //   //   style: {
        //   //     opacity : 0
        //   //   }
        //   // })
        //   // this.slide2.setNativeProps({
        //   //   style: {
        //   //     opacity : 1
        //   //   }
        //   // })
        // }
        this.slide.setNativeProps({
              style: {
                left : `${(smooth-1)*20 > 90 ? 90   : (smooth-1)*20 < 0 ? 0 :  (smooth-1)*20}%`
              }
            })

        
        // console.log(fillArr)
        this.setState({
          aver: smooth,
         
        })



        this.setState({
          option: {
            title: {
              text: 'ECharts demo'
            },
            tooltip: {},
            legend: {
              data: ['销量']
            },
            xAxis: {
              data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
              name: '销量',
              type: 'bar',
              data: relArr
            }]
          }, arr: relArr,
          option1: {
            title: {
              text: 'diffArr'
            },
            tooltip: {},
            legend: {
              data: ['销量']
            },
            xAxis: {
              data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
              name: '销量',
              type: 'bar',
              data: diffArr
            }]
          },
          option2: {
            title: {
              text: '滤波'
            },
            tooltip: {},
            legend: {
              data: ['销量']
            },
            xAxis: {
              data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
              name: '销量',
              type: 'bar',
              data: relArr2
            }]
          },
          option3: {
            title: {
              text: '平均滤波'
            },
            tooltip: {},
            legend: {
              data: ['销量']
            },
            xAxis: {
              data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
              name: '销量',
              type: 'bar',
              data: relArr4
            }]
          },
        })




      } else {
        
        comnum++
        dataArr.shift()
        dataArr.push(valueArr[4])
       
        smooth = smooth + (Math.abs(dataArr[1]-dataArr[0]) - smooth) / 30
        diffArr.push(smooth)
        // console.log(smooth,com(dataArr))
        let fillArr = firFilter.simulate(dataArr)

        relArr1.push(valueArr[4])
       
        let fillArr1 = firFilter.simulate(relArr1)
        relArr2 = fillArr1
        relArr3.push(com(dataArr).toFixed(0))
        relArr.shift()
        relArr.push(com(fillArr).toFixed(0))
        let relvalue = relArr.reduce((prev, cur) => parseInt(prev) + parseInt(cur), 0)
        relArr4.push(relvalue / relArr.length)
        console.log(relArr1)
        // if (relvalue / relArr.length >= 0 && relvalue / relArr.length < 4) {
        //   this.slide.setNativeProps({
        //     style: {
        //       opacity : 1
        //     }
        //   })
        //   // this.slide1.setNativeProps({
        //   //   style: {
        //   //     opacity : 0
        //   //   }
        //   // })
        //   // this.slide2.setNativeProps({
        //   //   style: {
        //   //     opacity : 0
        //   //   }
        //   // })
        // } else if (relvalue / relArr.length < 250) {
        //   this.slide.setNativeProps({
        //     style: {
        //       opacity : 0
        //     }
        //   })
        //   // this.slide1.setNativeProps({
        //   //   style: {
        //   //     opacity : 1
        //   //   }
        //   // })
        //   // this.slide2.setNativeProps({
        //   //   style: {
        //   //     opacity : 0
        //   //   }
        //   // })
        // } else {
        //   this.slide.setNativeProps({
        //     style: {
        //       opacity : 0
        //     }
        //   })
        //   // this.slide1.setNativeProps({
        //   //   style: {
        //   //     opacity : 0
        //   //   }
        //   // })
        //   // this.slide2.setNativeProps({
        //   //   style: {
        //   //     opacity : 1
        //   //   }
        //   // })
        // }
        this.slide.setNativeProps({
          style: {
            left : `${(smooth-1)*20 > 90 ? 90   : (smooth-1)*20 < 0 ? 0 :  (smooth-1)*20}%`
          }
        })
        // console.log(fillArr)
        this.setState({
          aver: smooth,
          trueValue : Math.abs(dataArr[1]-dataArr[0])
        })
        // relArr.push(Number( com(dataArr).toFixed(0)))
        //Number( com(fillArr).toFixed(0)))
        // relArr.push(valueArr[4])
        // console.log(relArr)
        this.setState({
          option: {
            title: {
              text: 'ECharts demo'
            },
            tooltip: {},
            legend: {
              data: ['销量']
            },
            xAxis: {
              data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
              name: '销量',
              type: 'bar',
              data: relArr
            }]
          },
          arr: relArr,
          option1: {
            title: {
              text: 'diffArr'
            },
            tooltip: {},
            legend: {
              data: ['销量']
            },
            xAxis: {
              data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
              name: '销量',
              type: 'bar',
              data: diffArr
            }]
          },
          option2: {
            title: {
              text: '滤波'
            },
            tooltip: {},
            legend: {
              data: ['销量']
            },
            xAxis: {
              data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
              name: '销量',
              type: 'bar',
              data: relArr2
            }]
          }, option3: {
            title: {
              text: '平均滤波'
            },
            tooltip: {},
            legend: {
              data: ['销量']
            },
            xAxis: {
              data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
              name: '销量',
              type: 'bar',
              data: relArr4
            }]
          },
        })

      }
      this.l2.setNativeProps({
        style: {
          opacity: 1,
          backgroundColor: 'rgb(249,214,248)'
        }
      })
    }

    // if(dataArr.length < 10){
    //   dataArr.push(valueArr[4])
    //   smooth = smooth + (com(dataArr) - smooth)/10
    //   console.log(smooth,com(dataArr))
    //   this.setState({
    //     aver : smooth
    //   })
    //   relArr.push(com(dataArr))

    //   this.setState({
    //     option : {
    //       title: {
    //           text: 'ECharts demo'
    //       },
    //       tooltip: {},
    //       legend: {
    //           data:['销量']
    //       },
    //       xAxis: {
    //           data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
    //       },
    //       yAxis: {},
    //       series: [{
    //           name: '销量',
    //           type: 'bar',
    //           data: relArr
    //       }]
    //     },arr : relArr
    //   })
    // }else{
    //   dataArr.shift()
    //   dataArr.push(valueArr[4])
    //   smooth = smooth + (com(dataArr) - smooth)/10
    //   console.log(smooth,com(dataArr))
    //   this.setState({
    //     aver : smooth
    //   })
    //   relArr.push(com(dataArr))

    //   this.setState({
    //     option : {
    //       title: {
    //           text: 'ECharts demo'
    //       },
    //       tooltip: {},
    //       legend: {
    //           data:['销量']
    //       },
    //       xAxis: {
    //           data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
    //       },
    //       yAxis: {},
    //       series: [{
    //           name: '销量',
    //           type: 'bar',
    //           data: relArr
    //       }]
    //     },
    //     arr : relArr
    //   })

    // }
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
          {/* <> */}
          <View style={{ width: '100%', backgroundColor: '#ccc', height: 30, borderRadius: 15, position: 'relative',flexDirection : 'row' }}>
            <View ref={(e) => this.slide = e} style={{ width: '10%', backgroundColor: 'green', height: 30, borderRadius: 15,position:'absolute',//left:'30%'
            //borderBottomLeftRadius: 15,borderTopLeftRadius : 15, 
             }}></View>
            {/* <View ref={(e) => this.slide1 = e} style={{ width: '34%', backgroundColor: '#f15929', height: 30  }}></View>
            <View ref={(e) => this.slide2 = e} style={{ width: '33%', backgroundColor: 'red', height: 30, borderBottomRightRadius: 15, borderTopRightRadius : 15,  }}></View> */}
          </View>
          {/* < AppView option={this.state.option} arr={[this.state.arr]} /> */}
          < AppView option={this.state.option1} arr={[this.state.arr]} />
          {/* < AppView option={this.state.option2} arr={[this.state.arr]} />   */}
          {/* lubo */}
          {/* < AppView option={this.state.option3} arr={[this.state.arr]} /> */}
          <Text style={{ textAlign: 'center', width: '100%' }}>{parseInt(this.state.aver )},{parseInt(this.state.trueValue )}</Text>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', opacity: 0 }}>
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
        </ScrollView>
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


class AppView extends React.Component {
  constructor() {
    super()
  }
  shouldComponentUpdate(nextProps) {
    // console.log(this.props.arr.length,relArr.length , '++++++++++++')
    if (comnum % 30 == 0) {

      return true
    }
    // console.log(nextProps)
    return false
  }
  render() {
    return <Echarts option={this.props.option} height={300} />
  }
}
AppView.defaultProps = {
  option: {
    title: {
      text: 'ECharts demo'
    },
    tooltip: {},
    legend: {
      data: ['销量']
    },
    xAxis: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
    },
    yAxis: {},
    series: [{
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }]
  }
}