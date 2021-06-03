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

        // loginInstance.post(`oauth/register?type=sms&&phone=${phoneState}`).then(function (response) {
        //     if (response.data.code === 200) {
        //         // setLoadInfo(response.data.msg)
        //         // setLoading(false)
        //     }
        // })
        //     .catch(function (error) {
        //     });
        countDown()
    }
    /**
     * 点击注册按钮弹框
     * 1.请求成功切换登录后的路由
     * 保存token，手机号码
     * 2.失败弹框提示*/
    const pushReg = () => {
        setLoading(true)
        setLoadInfo('正在加载...')
        loginInstance.post(`oauth/register?type=register&phone=${phoneState}&validateCode=${value}`).then(function (response) {
            if (response.data.access_token) {
                setModalVisible(false)
                props.login()
                AsyncStorage.setItem(
                    'token',
                    JSON.stringify(response.data.access_token),
                    (error) => {
                        if (error) {
                        } else {
                        }
                    },
                );
                AsyncStorage.setItem(
                    'phone',
                    JSON.stringify(phoneState),
                    (error) => {
                        if (error) {
                        } else {
                        }
                    },
                );
            } else {
                console.log('111')
                setLoadInfo(response.data.msg)
                setTimeout(() => {
                    setLoading(false);
                }, 2000)
            }
        })
            .catch(function (error) {
                console.log(error)
            });
    }
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

                    <Text style={styles.bigText}>手机号注册</Text>
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
                            <Text style={{color : '#999',marginTop : 10}}>86{phoneState}  重新发送</Text>
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
                            pushReg()
                            // props.login()
                        }}>
                            <Text style={styles.verText}>继续</Text>
                        </TouchableOpacity>
                    </View>
                </>
            }
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: () => { dispatch({ type: 'login' }) }
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
        marginTop : 60
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




{/* <View style={styles.loginPage}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => { props.navigation.pop() }}>
                    <Iconon name="chevron-back" size={24} color='black' />
                </TouchableOpacity>
                <View style={styles.bigContent}>
                    <Text style={styles.bigText}>手机号注册</Text>
                </View>
                <View style={[styles.row, nameColor ? styles.colorBorder : '']}>
                    <Text style={styles.textAlign}>
                        昵称
          </Text>
                    <TextInput placeholder='例如：李磊' onFocus={() => { setNameColor(true) }} onBlur={() => { setNameColor(false) }} maxLength={11} value={nameState} onChangeText={(e) => { setName(e) }}
                    />
                </View>
                <View style={[styles.row, phoneColor ? styles.colorBorder : '']}>
                    <Text style={styles.textAlign}>
                        手机号
          </Text>
                    <TextInput
                        onChangeText={(text) => {
                            const newText = text.replace(/[^\d]+/, '');
                            setPhone(newText)
                        }}
                        onFocus={() => { setPhoneColor(true) }}
                        onBlur={() => { setPhoneColor(false) }}
                        placeholder="手机号登录"
                        maxLength={11}
                        value={phoneState}
                        keyboardType='numeric'
                    />
                </View>

                <View style={[styles.row, styles.relative, verColor ? styles.colorBorder : '']}>
                    <Text style={styles.textAlign}>
                        验证码
          </Text>
                    <TextInput placeholder='请填写验证码' onFocus={() => { setVerColor(true) }} onBlur={() => { setVerColor(false) }} maxLength={11} value={ver} onChangeText={(e) => { setVer(e) }}
                    />
                    {phoneState.length != 11 ? <View style={styles.unverButton}>

                        <Text style={styles.verText}>获取验证码</Text>

                    </View> : timer ? <View style={styles.verButton}>
                        <TouchableOpacity style={styles.colorButton} onPress={() => { getVer() }}>
                            <Text style={styles.verText}>获取验证码</Text>
                        </TouchableOpacity>
                    </View> : <View style={styles.verButton}>
                                <View style={styles.unColorButton}>
                                    <Text style={styles.verText}>{time}</Text>
                                </View>
                            </View>}
                </View>
                <View style={[styles.row, pswColor ? styles.colorBorder : '']}>
                    <Text style={styles.textAlign}>
                        密码
          </Text>
                    <TextInput placeholder='请填写密码' secureTextEntry onFocus={() => { setPswColor(true) }} onBlur={() => { setPswColor(false) }} maxLength={11} value={pswState} onChangeText={(e) => { setPsw(e) }}
                    />
                </View>
                {nameState != '' && phoneState != '' && pswState != '' ?
                    <TouchableOpacity style={styles.colorButton} onPress={() => { pushReg() }}>
                        <Text style={styles.colorButtonText}>注册</Text>
                    </TouchableOpacity>
                    : <View style={styles.button}>
                        <Text style={styles.buttonText}>注册</Text>
                    </View>
                }

            </View> */}