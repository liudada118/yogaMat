import {
  PermissionsAndroid,
  Button,
  Text,
  View,
  StyleSheet,
  TextInput,
  Modal,
  TouchableHighlight,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {NetworkInfo} from 'react-native-network-info';
import WifiManager from 'react-native-wifi-reborn';
import Smartconfig from 'react-native-smartconfig-iot';
import instance from '../../../http/axios';
import AsyncStorage from '@react-native-community/async-storage';
/** 增加权限
 *<uses-permission android:name="android.permission.INTERNET" />
 <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
 <uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />
 <uses-permission android:name="android.permission.CHANGE_WIFI_MULTICAST_STATE" />
 *  ios pod install

 * @returns {JSX.Element}
 * @constructor
 */
export default function App({navigation}) {
  const [bssid, setBssid] = useState();
  const [ssid, setSsid] = useState();
  const [value, setValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modal, setModal] = useState(1);

  const initWifi = async () => {
    try {
      const ssid = await WifiManager.getCurrentWifiSSID();
      const bssid = await WifiManager.getBSSID();
      setSsid(ssid);
      setBssid(bssid);

    } catch (error) {
    }
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'React Native Wifi Reborn App Permission',
          message:
            'Location permission is required to connect with or scan for Wifi networks. ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await initWifi();
      } else {
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    requestLocationPermission();
  });
  const [log, setLog] = useState('log here');
  let foundDevice = false;

  const wifiName = ssid;
  const wifiPass = 'nnnnnnnn';
  // you can random bssid of wifi, but it need correct format
  const wifiBssid = bssid;

  // timeout not work with android, on android default is 45s
  const TIME_OUT_SMART_CONFIG = 30 * 1000; // 30s

  function config() {
    // Get Local IP
    NetworkInfo.getIPAddress().then((ipAddress) => {
    });

    NetworkInfo.getSSID().then((name) => {
    });
    // Get BSSID
    NetworkInfo.getBSSID().then((bssid) => {
    });

    setLog('configuring...');
    foundDevice = false;

    Smartconfig.start({
      type: 'esptouch', //or airkiss, now doesn't not effect
      ssid: ssid,
      bssid: bssid, //"" if not need to filter (don't use null)
      password: value,
      timeout: 50000, //now doesn't not effect
    })
      .then(function (results) {
        //Array of device success do smartconfig
        ToastAndroid.show(results[0], 4);
        stopConfig();

        AsyncStorage.getItem('token', (error, token) => {
          if (!error) {
            const resultToken = JSON.parse(token);

            AsyncStorage.getItem('phone', (error, result) => {
              if (!error) {
                if (result) {
                  const res = JSON.parse(result);


                  instance
                    .post(
                      `api/sensor/insertSensor?sensorName=${results[0]}&deviceId=${results[0]}&mac=${results[0]}&access_token=${resultToken}&userName=${res}`,
                    )
                    .then((res) => {
                      if (res.data.msg == 1) {
                        setModal(2);
                        setTimeout(() => {
                          setModalVisible(false);
                          navigation.navigate('HomePage')
                        }, 2000);
                      } else {
                        setModal(3);
                        setTimeout(() => {
                          setModalVisible(false);
                          navigation.navigate('bluetooth')
                        }, 2000);
                      }
                    })
                    .catch((err) => {});
                } else {
                }
              }
            });
          }
        });

      })
      .catch(function (error) {});
  }

  function stopConfig() {
    Smartconfig.stop();
    setLog('Stopped config');
  }

  return (
    <>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                {modal === 1
                  ? '正在连接设备...'
                  : modal === 2
                  ? '连接成功'
                  : '连接失败'}
              </Text>

              {modal === 1 ? (
                <TouchableHighlight
                  style={{...styles.openButton, backgroundColor: '#2196F3'}}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    stopConfig();
                  }}>
                  <Text style={styles.textStyle}>断开连接</Text>
                </TouchableHighlight>
              ) : null}
            </View>
          </View>
        </Modal>

      </View>
      <View style={styles.relative}>
        <Text style>SSID : {ssid}</Text>
        <Text style>BSSID : {bssid}</Text>
        <TextInput
          placeholder="密码:"
          style={styles.input}
          onChangeText={(text) => setValue(text)}
          value={value}
          secureTextEntry
        />
        <View style={styles.button}>
          <Button
            title="确认"
            color="green"
            onPress={() => {
              config();
              setModalVisible(!modalVisible);
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  relative: {
    height: '100%',
    margin: 10,
  },
  button: {
    width: '96%',
    marginLeft: '2%',
    position: 'absolute',
    bottom: '6%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    padding: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
