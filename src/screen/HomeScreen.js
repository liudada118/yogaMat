import React, {useState, useEffect} from 'react';
import {PermissionsAndroid, Button, View, Text} from 'react-native';
import WifiManager from 'react-native-wifi-reborn';

function HomeScreen() {
  useEffect(() => {
    requestLocationPermission();
  }, []);
  const initWifi = async () => {
    try {
      const ssid = await WifiManager.getCurrentWifiSSID();
      const bssid = await WifiManager.getBSSID();

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

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button title="Go to Details" />
    </View>
  );
}
export default HomeScreen;
