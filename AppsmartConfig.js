import {PermissionsAndroid, Button, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {NetworkInfo} from 'react-native-network-info';
import WifiManager from 'react-native-wifi-reborn';
import Smartconfig from 'react-native-smartconfig-iot';
/** 增加权限
 *<uses-permission android:name="android.permission.INTERNET" />
 <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
 <uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />
 <uses-permission android:name="android.permission.CHANGE_WIFI_MULTICAST_STATE" />
 *  ios pod install

 * @returns {JSX.Element}
 * @constructor
 */
export default function App() {
  const [bssid, setBssid] = useState();
  const [ssid, setSsid] = useState();

  const initWifi = async () => {
    try {
      const ssid = await WifiManager.getCurrentWifiSSID();
      const bssid = await WifiManager.getBSSID();
      setSsid(ssid);
      setBssid(bssid);

      console.log('Your current connected wifi SSID is ' + ssid + '  ' + bssid);
    } catch (error) {
      console.log('Cannot get current SSID!', {error});
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
        console.log('Location permission denied');
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
      console.log(ipAddress);
    });

    NetworkInfo.getSSID().then((name) => {

      console.info(name);
    });
    // Get BSSID
    NetworkInfo.getBSSID().then((bssid) => {
      console.log(bssid);
    });

    setLog('configuring...');
    foundDevice = false;

    Smartconfig.start({
      // type: 'esptouch', //or airkiss, now doesn't not effect
      // ssid: 'huawei',
      // bssid: '52:b7:9d:db:4f:89', //"" if not need to filter (don't use null)
      // password: '12345678',
      // timeout: 50000, //now doesn't not effect
      type: 'esptouch', //or airkiss, now doesn't not effect
      ssid: ssid,
      bssid: bssid, //"" if not need to filter (don't use null)
      password: '12345678',
      timeout: 50000, //now doesn't not effect
    })
      .then(function (results) {
        //Array of device success do smartconfig
        console.log(results);
        /*[
        {
          'bssid': 'device-bssi1', //device bssid
          'ipv4': '192.168.1.11' //local ip address
        },
        {
          'bssid': 'device-bssi2', //device bssid
          'ipv4': '192.168.1.12' //local ip address
        },
        ...
      ]*/
      })
      .catch(function (error) {});
  }

  function stopConfig() {
    Smartconfig.stop();
    setLog('Stopped config');
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{log} </Text>
      <Text> {ssid} </Text>
      <Text> {bssid}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 100,
        }}>
        <Button title={'Start Config'} onPress={() => config()} />

        <View width={20} />

        <Button title={'Stop Config'} onPress={() => stopConfig()} />
      </View>
    </View>
  );
}
