import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  AsyncStorage,
  Modal,
  Alert
} from 'react-native';

import instance from '../../../http/axios';

import { loginContext } from '../../../../Context';
export default function Remind({ navigation }) {
  const { tokens, changeTokens, phones, id, changeId } = useContext(loginContext);
  const [phone, setPhone] = useState('');
  const [token, setToken] = useState('');
  const [listOn, setListOn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [verInfo, setVerInfo] = useState('');
  const [state, setState] = useState({
    sensor: '暂无设备',
  });
  const [loading, setLoad] = useState(false);
  const [list, setList] = useState('');
  const [realSensor, setRealSen] = useState('');
  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('phone', function (err, res) {
        setPhone(res);
      });
      const value1 = await AsyncStorage.getItem('token', function (err, res) {
        setToken(res);
      });
      if (value !== null) {
        // We have data!!
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const _storeData = async (data) => {
    try {
      await AsyncStorage.setItem('id', data);
    } catch (error) {
      // Error saving data
    }
  };

  useEffect(() => {
    _retrieveData();
  }, []);

  /**
   * 页面加载发起请求获得设备数据*/ 
  useEffect(() => {
    AsyncStorage.getItem('token', (error, token) => {
      if (!error) {
        const resultToken = JSON.parse(token);


        AsyncStorage.getItem('phone', (error, result) => {
          if (!error) {
            const res = JSON.parse(result);
            var url =
              'api/sensor/selectSensorListByPhone?phone=' +
              res +
              '&access_token=' +
              resultToken +
              '';
            instance.get(url).then((res) => {
              setList(res.data.data);
            });
          }
        });
      }
    });
  }, []);
  const changeSensor = () => {
    setListOn(!listOn);
  };
  /**
   * 解绑设备，发起解绑请求，重新加载设备*/ 
  const delSensor = (a) => {
    setModalVisible(true)
    setVerInfo('正在解绑')
    AsyncStorage.getItem('token', (error, token) => {
      if (!error) {
        const resultToken = JSON.parse(token);



        AsyncStorage.getItem('phone', (error, result) => {
          if (!error) {
            const res = JSON.parse(result);
            instance.post(`api/sensor/deleteSensor?deviceId=${a.deviceId}&phone=${res}&access_token=${resultToken}`).then(() => {
              setVerInfo('解绑成功')
              setTimeout(() => {
                setModalVisible(false)
                var url =
                  'api/sensor/selectSensorListByPhone?phone=' +
                  res +
                  '&access_token=' +
                  resultToken +
                  '';
                instance.get(url).then((res) => {
                  setList(res.data.data);
                });
              }, 2000)
            }
            )
          }
        });
      }
    });

  }
  /**
   * 将deviceid储存*/ 
  const changeRealSensor = (a) => {

    setRealSen(a.sensorName);

    AsyncStorage.setItem('nowDeviceId', JSON.stringify(a.deviceId), (error) => {
      if (error) {
      } else {
      }
    });
    AsyncStorage.getItem('nowDeviceId', (error, result) => {
      if (!error) {
        const res = JSON.parse(result);
      }
    });
  };
  return (
    <View style={[styles.outPadding, styles.relative]}>
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
            <Text style={styles.modalText}>{verInfo}</Text>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={changeSensor}>
        <View style={[styles.card]}>
          <View style={[styles.flexRow, styles.spaceBetween]}>
            <Text
              style={state.sit === '暂无设备' ? styles.outText : styles.text}>
              当前设备
            </Text>
            <Text style={styles.text}>
              {realSensor === '' ? '暂无设备' : realSensor}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      
        <View style={[styles.card]}>
          {list.length > 0
            ? list.map((a, index) => {
              return (

                <View
                  style={[styles.flexRow, styles.spaceBetween, styles.margin]}
                  key={index}>
                  <TouchableOpacity onPress={() => changeRealSensor(a)}>
                    <Text style={styles.text}>{a.sensorName}</Text></TouchableOpacity>
                  <Button
                    title='解绑设备'
                    onPress={() => { delSensor(a) }}
                  />
                </View>
              );
            })
            : null}
        </View>
      
      <View style={styles.absolute}>
        <Button
          title="确定"
          color="green"
          onPress={() => navigation.navigate('HomePage')}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  margin: {
    marginBottom: 10
  },
  relative: {
    position: 'relative',
    height: '100%',
  },
  absolute: {
    position: 'absolute',
    bottom: '5%',
    width: '100%',
    left: '5%',
  },
  flexRow: {
    flexDirection: 'row',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  outPadding: {
    padding: '5%',
  },
  card: {
    marginTop: '5%',
    marginBottom: '5%',
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: '2%',
  },
  padding: {
    marginBottom: '3%',
  },
  smallPadding: {
    marginBottom: '3%',
    padding: '1%',
  },
  outText: {
    fontSize: 20,
    textAlignVertical: 'center',
    color: '#ccc',
  },
  outPicker: {
    height: 50,
    width: 120,
    fontSize: 20,
    textAlignVertical: 'center',
    color: '#ccc',
  },
  picker: {
    height: 50,
    width: 120,
    color: 'black',
  },
  smallPicker: {
    height: 50,
    width: 120,
    fontSize: 14,
    color: 'black',
  },
  outSmallPicker: {
    height: 50,
    width: 120,
    fontSize: 14,
    textAlignVertical: 'center',
    color: '#ccc',
  },
  text: {
    fontSize: 20,
    textAlignVertical: 'center',
    color: 'black',
  },
  smallText: {
    fontSize: 14,
    textAlignVertical: 'center',
    color: 'black',
  },
  outSmallText: {
    fontSize: 14,
    textAlignVertical: 'center',
    color: '#ccc',
  },
  noText: {
    fontSize: 14,
    color: '#bbb',
  },
});
