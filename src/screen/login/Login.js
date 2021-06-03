// import React, { useState, useEffect, useContext } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   TextInput,
//   Modal,
//   AsyncStorage,
//   ActivityIndicator,
//   TouchableWithoutFeedback
// } from 'react-native';
// import { loginContext } from '../../../Context';
// import { loginInstance, } from '../../http/axios';
// import Toast from '../../components/Toast'
// import Loading from '../../components/Loading'
// import DateTop from '../../bedScreen/DateTop'
// import { connect } from 'react-redux';
// import Iconon from 'react-native-vector-icons/Ionicons'
// let ti = 60;
// function Login(props) {
//   const { onLogin, changeTokens, changePhone } = useContext(loginContext);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [verInfo, setVerInfo] = useState('');
//   const [inputState, setValue] = useState('');
//   const [verColor, setVerColor] = useState(false);
//   const [ver, setVer] = useState('');
//   const [time, setTime] = useState(60);
//   const [timer, setTimer] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [loadInfo, setLoadInfo] = useState('请求中');
//   const [onTimer, setOnTimer] = useState(false);
//   const changeValue = (e) => {
//     setValue(e);
//   };

//   useEffect(() => {
//     AsyncStorage.getItem('phone', (error, result) => {
//       if (!error) {
//         if (result != null) {
//           const res = JSON.parse(result);
//           changeValue(res);
//         }
//       }
//     });
//     // Toast.showLoading('请求中')
//   }, []);

//   /**
//    * 点击登录按钮  弹框 相当于loading
//    * 请求验证码接口
//    * 将手机号码 和token储存起来
//    * 如果没有获得token便是请求失败
//    * 失败弹框
//    * */
//   const putInfo = () => {
//     setLoadInfo('请求中')
//     setLoading(true)
//     loginInstance
//       .post(`oauth/mobile?phone=${inputState}&code=${ver}`)
//       .then(function (response) {
//         if (response.data.access_token) {
//           setLoading(false)
//           // onLogin();
//           props.login()
//           changeTokens(response.data.access_token);
//           changePhone(inputState);
//           console.info('token is:' + response.data.access_token);
//           AsyncStorage.setItem(
//             'token',
//             JSON.stringify(response.data.access_token),
//             (error) => {
//               if (error) {
//               } else {
//               }
//             },
//           );
//           //存储电话号码
//           AsyncStorage.setItem('phone', JSON.stringify(inputState), (error) => {
//             if (error) {
//             } else {
//             }
//           });
//           AsyncStorage.getItem('token', (error, result) => {
//             if (!error) {
//               const res = JSON.parse(result);
//             }
//           });
//           AsyncStorage.getItem('phone', (error, result) => {
//             if (!error) {
//               const res = JSON.parse(result);
//             }
//           });
//         } else {
//           setLoadInfo(response.data.msg)
//           setTimeout(() => {
//             setLoading(false)
//           }, 2000);
//         }
//       })
//       .catch(function (error) {
//         setLoadInfo('请检查手机网络')
//         setTimeout(() => {
//           setLoading(false);
//         }, 2000)

//       });
//   };

//   /**
//    * 获取验证码
//    * 失败弹框
//    * */
//   const getVer = () => {
//     loginInstance
//       .post(`oauth/register?type=sms&&phone=${inputState}`)
//       .then(function (response) { })
//       .catch(function (error) {
//         setLoading(true)
//         setLoadInfo('请检查手机网络')
//         setTimeout(() => {
//           setLoading(false)
//         }, 2000);
//       });
//     countDown();
//   };
//   /**
//    * 倒计时实现*/
//   const countDown = () => {
//     if (onTimer) {
//       return
//     }
//     let count = 60;
//     setOnTimer(true)
//     setTime(count);
//     let a = setInterval(() => {
//       setTime(count--);
//       console.log(time)
//       if (count === 0) {
//         clearInterval(a);
//         setOnTimer(false)
//       }
//     }, 1000)
//   };

//   return (
//     <>
//       {loading ? <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: "center", zIndex: 1, position: 'absolute' }}>
//         <View style={{ padding: 20, backgroundColor: '#555', justifyContent: 'center', alignItems: 'center' }}>
//           <Loading text={loadInfo} />
//         </View>
//       </View> : null}

//       <View style={styles.centeredView}>
//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={modalVisible}
//           onRequestClose={() => {
//             Alert.alert('Modal has been closed.');
//             setModalVisible(!modalVisible);
//           }}>
//           <View style={styles.centeredView}>
//             <View style={styles.modalView}>
//               <Text style={styles.modalText}>{verInfo}</Text>
//             </View>
//           </View>
//         </Modal>
//       </View>
//       <View style={styles.loginPage}>
//         <TouchableOpacity
//           activeOpacity={1}
//           onPress={() => { props.navigation.pop() }}>
//           <Iconon name="chevron-back" size={24} color='black' />
//         </TouchableOpacity>
//         <View style={styles.bigContent}>
//           <Text style={styles.bigText}>手机号登录</Text>
//         </View>
//         <View style={styles.row}>
//           <Text style={styles.textAlign}>手机号</Text>
//           <TextInput
//             onChangeText={(text) => {
//               const newText = text.replace(/[^\d]+/, '');
//               changeValue(newText);
//             }}
//             placeholder="手机号登录"
//             maxLength={11}
//             value={inputState}
//             keyboardType="numeric"
//           />
//         </View>

//         <View
//           style={[
//             styles.row,
//             styles.relative,
//             verColor ? styles.colorBorder : '',
//           ]}>
//           <Text style={styles.textAlign}>验证码</Text>
//           <TextInput
//             placeholder="请填写验证码"
//             onFocus={() => {
//               setVerColor(true);
//             }}
//             onBlur={() => {
//               setVerColor(false);
//             }}
//             maxLength={11}
//             value={ver}
//             onChangeText={(e) => {
//               setVer(e);
//             }}
//           />
//           {inputState.length != 11 ? (
//             <View style={styles.unverButton}>
//               <Text style={styles.verText}>获取验证码</Text>
//             </View>
//           ) : (
//               <View style={styles.verButton}>
//                 <TouchableOpacity
//                   style={styles.colorButton}
//                   activeOpacity={1}
//                   onPress={() => {
//                     getVer();
//                   }}>
//                   <Text style={styles.verText}>{onTimer ? time : '获取验证码'}</Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//         </View>

//         <TouchableOpacity
//           style={styles.emailContent}
//           onPress={() => props.navigation.navigate('emaillogin')}>
//           <Text style={styles.aText}>邮箱登录</Text>
//         </TouchableOpacity>
//         {inputState ? (
//           <TouchableOpacity style={styles.colorButton} onPress={putInfo}>
//             <Text style={styles.colorButtonText}>下一步</Text>
//           </TouchableOpacity>
//         ) : (
//             <View style={styles.button}>
//               <Text style={styles.buttonText}>下一步</Text>
//             </View>
//           )}
//         <TouchableOpacity style={styles.findPsw}>
//           <Text style={styles.findPswText}>找回密码</Text>
//         </TouchableOpacity>
//       </View>
//     </>
//   );
// }
// const mapDispatchToProps = (dispatch) => {
//   return {
//     login: () => { dispatch({ type: 'LOGIN' }) }
//   }
// }
// export default connect(null, mapDispatchToProps)(Login)

// const styles = StyleSheet.create({
//   unverButton: {
//     position: 'absolute',
//     right: 0,
//     height: 30,
//     borderRadius: 5,
//     overflow: 'hidden',
//     bottom: 10,
//     backgroundColor: '#bbb',
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22,
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   openButton: {
//     backgroundColor: '#F194FF',
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   verButton: {
//     position: 'absolute',
//     right: 0,
//     height: 30,
//     borderRadius: 5,
//     overflow: 'hidden',
//     bottom: 10,
//   },
//   verText: {
//     lineHeight: 20,
//     padding: 5,
//   },
//   relative: {
//     position: 'relative',
//   },
//   loginPage: {
//     padding: '2%',
//     position: 'relative',
//     height: '100%',
//   },
//   bigText: {
//     fontSize: 24,
//   },
//   aText: {
//     color: '#077acc',
//   },
//   button: {
//     // marginTop: 15,
//     backgroundColor: '#eee',
//     height: 30,
//     width: '100%',
//   },
//   colorButton: {
//     // marginTop: 15,
//     backgroundColor: '#4ba367',
//     height: 30,
//     width: '100%',
//   },
//   buttonText: {
//     color: '#999',
//     textAlign: 'center',
//     lineHeight: 30,
//   },
//   colorButtonText: {
//     color: '#fff',
//     textAlign: 'center',
//     lineHeight: 30,
//   },
//   row: {
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     marginTop: 10,
//     marginBottom: 10,
//     borderBottomColor: '#eee',
//   },
//   textAlign: {
//     textAlignVertical: 'center',
//   },
//   emailContent: {
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   bigContent: {
//     marginBottom: 20,
//     marginTop: 20,
//   },
//   findPsw: {
//     position: 'absolute',
//     bottom: '5%',
//     width: '100%',
//   },
//   findPswText: {
//     textAlign: 'center',
//     color: '#077acc',
//   },
// });



// import axios from 'axios'; 
import { loginInstance } from '../../http/axios'
import React, {
  useRef,
  useState,
  useContext
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  SafeAreaView
} from 'react-native';
import { loginContext } from '../../../Context'
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'react-redux'
import Iconon from 'react-native-vector-icons/Ionicons'
import { Input } from 'react-native-elements'
import usePicker from '../../components/Picker'
import validator from '../../js/phone'
import Loading from '../../components/Loading'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
let ti = 60
const CELL_COUNT = 6;
let timerr
function Registered(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [reginfo, setRegInfo] = useState(false);
  const [regText, setRegText] = useState('');
  const [nameState, setName] = useState('')
  const [phoneState, setPhone] = useState('')
  const [pswState, setPsw] = useState('')
  const [ver, setVer] = useState('')
  const [time, setTime] = useState(60)
  const [timer, setTimer] = useState(true)
  const [verInfo, setVerInfo] = useState('')
  const [nameColor, setNameColor] = useState(false)
  const [phoneColor, setPhoneColor] = useState(false)
  const [pswColor, setPswColor] = useState(false)
  const [verColor, setVerColor] = useState(false)
  const [token, setToken] = useState('')
  const timeRef = useRef()
  const [country, setCountry] = useState(['+86'])
  const [phoneValid, setPhoneValid] = useState(true)
  const [loading, setLoading] = useState(false);
  const [loadInfo, setLoadInfo] = useState('请求中');
  const [showLogin, setShowLogin] = useState(false)
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [Tprops, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const _storeData = async (data) => {
    try {
      await AsyncStorage.setItem("token", data)
      await AsyncStorage.setItem("user", phoneState)
    } catch (error) {
      // Error saving data
    }
  };


  /**
   * 点击验证码按钮请求验证码接口
   * 失败弹框
   * 执行验证码函数*/
  const getVer = () => {
    loginInstance.post(`oauth/register?type=sms&&phone=${phoneState}`).then(function (response) {
      if (response.data.code === 500) {
        setVerInfo(response.data.msg)
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(!modalVisible);
        }, 2000)
      }
    })
      .catch(function (error) {
      });
    countDown()
  }
  /**
   * 验证码函数*/
  const countDown = () => {
    if (ti === 0) {
      setTime(60)
      setTimer(true)
      // return
    } else {
      setTime(ti--)
      setTimer(false)
      setTimeout(countDown.bind(this), 1000);
    }
  }

  /**
   * 切换国家号码
  */
  const changeCountry = () => {
    let data = ['+86', '+66']
    usePicker(data, setCountry)
  }


  const phoneSubmitEditing = () => {
    const phoneT = validator.validatePhone(phoneState)
    console.log(phoneT)
    if (!phoneT) {
      setPhoneValid(phoneT)
      return
    }
    setPhoneValid(true)
    setShowLogin(true)

    loginInstance.post(`oauth/register?type=sms&&phone=${phoneState}`).then(function (response) {
        if (response.data.code === 200) {
            // setLoadInfo(response.data.msg)
            // setLoading(false)
        }
    })
        .catch(function (error) {
        });
    countDown()
  }
  /**
   * 点击注册按钮弹框
   * 1.请求成功切换登录后的路由
   * 保存token，手机号码
   * 2.失败弹框提示*/

  const putInfo = () => {
    setLoadInfo('请求中')
    setLoading(true)
    loginInstance
      .post(`oauth/mobile?phone=${phoneState}&code=${value}`)
      .then(function (response) {
        console.log(response)
        if (response.data.access_token) {
          setLoading(false)
          // onLogin();
          props.login()
          console.log(111)
          // changeTokens(response.data.access_token);
          // changePhone(inputState);
          console.info('token is:' + response.data.access_token);
          AsyncStorage.setItem(
            'token',
            JSON.stringify(response.data.access_token),
            (error) => {
              if (error) {
              } else {
              }
            },
          );
          //存储电话号码
          AsyncStorage.setItem('phone', JSON.stringify(inputState), (error) => {
            if (error) {
            } else {
            }
          });
          AsyncStorage.getItem('token', (error, result) => {
            if (!error) {
              const res = JSON.parse(result);
            }
          });
          AsyncStorage.getItem('phone', (error, result) => {
            if (!error) {
              const res = JSON.parse(result);
            }
          });
        } else {
          setLoadInfo(response.data.msg)
          setTimeout(() => {
            setLoading(false)
          }, 2000);
        }
      })
      .catch(function (error) {
        console.log(error)
        setLoadInfo('请检查手机网络')
        setTimeout(() => {
          setLoading(false);
        }, 2000)

      });
  };
  return (

    <>
      {loading ? <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: "center", zIndex: 1, position: 'absolute' }}>
        <View style={{ padding: 20, backgroundColor: '#555', justifyContent: 'center', alignItems: 'center' }}>
          <Loading text={loadInfo} />
        </View>
      </View> : null}

      {!showLogin ? <View style={styles.loginPage}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => { props.navigation.pop() }}>
          <Iconon name="chevron-back" size={24} color='black' />
        </TouchableOpacity>
        <View style={styles.bigContent}>

          <Text style={styles.bigText}>手机号登录</Text>
        </View>
        <View style={styles.flexDirection}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => { changeCountry() }}>
            <View><Input value={country[0]}
              disabled
            /></View>
          </TouchableOpacity>
          {/* <Text style={styles.countryNum}>+86</Text> */}
          <View style={{ flex: 6 }}>
            <Input
              placeholder='手机号码'
              maxLength={11}
              keyboardType='phone-pad'
              onChangeText={(text) => {
                setPhone(text)
              }}
              errorMessage={phoneValid ? '' : '手机号码格式不正确'}
              onSubmitEditing={() => { phoneSubmitEditing() }}
            /></View>

        </View>
        <View style={styles.Ubutton}>
          <TouchableOpacity style onPress={() => {
            phoneSubmitEditing(); //getVer() 
          }}>
            <Text style={styles.verText}>获取验证码</Text>
          </TouchableOpacity>
        </View>
      </View> :
        <>
          <View>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => { setShowLogin(false) }}>
              <Iconon name="chevron-back" size={24} color='black' />
            </TouchableOpacity>
            <View style={styles.bigContent}>
              <Text style={styles.bigText}>输入验证码</Text>
              <Text style={{ color: '#999', marginTop: 10 }}>86{phoneState}  重新发送</Text>
            </View>
            <SafeAreaView style={styles.root}>
              <CodeField
                ref={ref}
                {...Tprops}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                  <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                )}
              />
            </SafeAreaView>
          </View>
          <View style={styles.Tbutton}>
            <TouchableOpacity style onPress={() => {
              putInfo()
            }}>
              <Text style={styles.verText}>登录</Text>
            </TouchableOpacity>
          </View>
        </>
      }
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => { dispatch({ type: 'LOGIN' }) }
  }
}

export default connect(null, mapDispatchToProps)(Registered)

const styles = StyleSheet.create({
  Ubutton: {
    width: '96%',
    marginLeft: '2%',
    borderRadius: 20,
    backgroundColor: '#fff'
  },
  Tbutton: {
    width: '96%',
    marginLeft: '2%',
    borderRadius: 20,
    backgroundColor: '#fff',
    marginTop: 60
  },
  countryNum: {
    fontSize: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#86939e',
    paddingBottom: 6,
    marginBottom: 20
  },
  flexDirection: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  verticalAligns: {
    // verticalAlign : 'middle'
  },
  relative: {
    position: 'relative'
  },
  unverButton: {
    position: 'absolute',
    right: 0,
    height: 30,
    borderRadius: 5,
    overflow: 'hidden',
    bottom: 10,
    backgroundColor: '#bbb'
  },
  verButton: {
    position: 'absolute',
    right: 0,
    height: 30,
    borderRadius: 5,
    overflow: 'hidden',
    bottom: 10
  },
  verText: {
    lineHeight: 20,
    padding: 5,
    textAlign: 'center'
  },
  loginPage: {
    padding: '2%',
    position: 'relative',
    height: '100%'
  },
  bigText: {
    fontSize: 24
  },
  aText: {
    color: '#077acc'
  },
  button: {
    backgroundColor: '#eee',
    height: 30,
    width: '100%',
  },
  unColorButton: {
    backgroundColor: '#eee',
    height: 30,
    width: '100%',
    borderRadius: 5
  },
  colorButton: {
    backgroundColor: '#4ba367',
    height: 30,
    width: '100%',
    borderRadius: 5
  },
  buttonText: {
    color: '#999',
    textAlign: 'center',
    lineHeight: 30,
  },
  colorButtonText: {
    color: '#fff',
    textAlign: 'center',
    lineHeight: 30,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: '#eee'
  },
  colorBorder: {
    borderBottomColor: '#4ba367'
  },
  textAlign: {
    textAlignVertical: 'center',
    color: '#000'
  },
  emailContent: {
    marginTop: 10,
    marginBottom: 10
  },
  bigContent: {
    marginBottom: 20,
    marginTop: 20
  },
  findPsw: {
    position: 'absolute',
    bottom: '5%',
    width: '100%'
  },
  findPswText: {
    textAlign: 'center',
    color: '#077acc',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  root: { flex: 1, padding: 20 },
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderBottomWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
    color: "#7d53ea"
  },
  focusCell: {
    borderColor: '#7d53ea'
  },
})

