import React, { useState } from 'react'
import { SafeAreaView, View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Input } from 'react-native-elements'
import Iconon from 'react-native-vector-icons/Ionicons'
import Loading from '../../components/Loading'
import validator from '../../js/phone'
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 6;

export default function EmailReg(props) {
    const [loading, setLoading] = useState(false);
    const [loadInfo, setLoadInfo] = useState('请求中');
    const [email, setEmail] = useState('')
    const [emailVaild, setEmailVaild] = useState(true)
    const [account, setAccount] = useState('')
    const [accountVaild, setAccountVaild] = useState(true)
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [showLogin, setShowLogin] = useState(false)
    const [Tprops, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const phoneSubmitEditing = () => {
        const emailT = validator.validateEmail(email)
        console.log(emailT)
        if (!emailT) {
            setEmailVaild(emailT)
            return
        }
        setEmailVaild(true)
        setShowLogin(true)

        // loginInstance.post(`oauth/register?type=sms&&phone=${phoneState}`).then(function (response) {
        //     if (response.data.code === 200) {
        //         // setLoadInfo(response.data.msg)
        //         // setLoading(false)
        //     }
        // })
        //     .catch(function (error) {
        //     });
        // countDown()
    }

    return (
        <>
            {loading ? <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: "center", zIndex: 1, position: 'absolute' }}>
                <View style={{ padding: 20, backgroundColor: '#555', justifyContent: 'center', alignItems: 'center' }}>
                    <Loading text={loadInfo} />
                </View>
            </View> : null}
            { showLogin ? <>
                <View>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => { setShowLogin(false) }}>
                        <Iconon name="chevron-back" size={24} color='black' />
                    </TouchableOpacity>
                    <View style={styles.bigContent}>
                        <Text style={styles.bigText}>输入验证码</Text>
                        <Text style={{ color: '#999', marginTop: 10 }}>86{email}  重新发送</Text>
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
                        // pushReg()
                    }}>
                        <Text style={styles.verText}>登录</Text>
                    </TouchableOpacity>
                </View>
            </> : <><TouchableOpacity
                activeOpacity={1}
                onPress={() => { props.navigation.pop() }}>
                <Iconon name="chevron-back" size={24} color='black' />
            </TouchableOpacity>
                <View style={styles.bigContent}>

                    <Text style={styles.bigText}>邮箱注册</Text>
                </View>
                <Input
                    placeholder='输入邮箱号'
                    keyboardType='email-address'
                    onChangeText={(text) => {
                        setEmail(text)
                    }}
                    errorMessage={emailVaild ? '' : '邮箱格式不正确'}
                    // onSubmitEditing={() => { phoneSubmitEditing() }} 
                    />
                <Input
                    placeholder='输入新账号'
                    keyboardType='phone-pad'
                    onChangeText={(text) => {
                        setAccount(text)
                    }}
                    errorMessage={accountVaild ? '' : '手机号码格式不正确'}
                    // onSubmitEditing={() => { phoneSubmitEditing() }}
                     />

                <View style={styles.Ubutton}>
                    <TouchableOpacity style onPress={() => {
                        phoneSubmitEditing(); //getVer() 
                    }}>
                        <Text style={styles.verText}>获取验证码</Text>
                    </TouchableOpacity>
                </View></>}
        </>
    )
}

const styles = StyleSheet.create({
    Tbutton: {
        width: '96%',
        marginLeft: '2%',
        borderRadius: 20,
        backgroundColor: '#fff',
        marginTop : 60
    },
    bigContent: {
        marginBottom: 20,
        marginTop: 20
    },
    bigText: {
        fontSize: 24
    },
    Ubutton: {
        width: '96%',
        marginLeft: '2%',
        borderRadius: 20,
        backgroundColor: '#fff'
    },
    verText: {
        lineHeight: 20,
        padding: 5,
        textAlign: 'center'
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