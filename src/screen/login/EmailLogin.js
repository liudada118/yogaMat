import React, {
    useRef,
    Suspense,
    useState,
    useEffect,
    useCallback,
    useMemo,
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Button,
    TextInput
} from 'react-native';
import Iconon from 'react-native-vector-icons/Ionicons'
export default function EmailLogin({ navigation }) {
    const [nameValue, setValue] = useState('')
    const [pswValue, setPswValue] = useState('')
    const [nameColor, setNameColor] = useState(false)
    const [pswColor, setPswsColor] = useState(false)
    return (
        <View style={styles.loginPage}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => { navigation.pop() }}>
                <Iconon name="chevron-back" size={24} color='black' />
            </TouchableOpacity>
            <View style={styles.bigContent}>
                <Text style={styles.bigText}>
                    用户登录
        </Text>
            </View>
            <View style={[styles.row, nameColor ? styles.colorBorder : '']}>
                <Text style={styles.textAlign}>
                    用户名
          </Text>
                <TextInput placeholder='请输入用户名' maxLength={11} onFocus={() => { setNameColor(true) }} onBlur={() => { setNameColor(false) }} value={nameValue} onChangeText={e => { setValue(e) }}
                />
            </View>
            <View style={[styles.row, pswColor ? styles.colorBorder : '']}>
                <Text style={styles.textAlign}>
                    密码
          </Text>
                <TextInput placeholder='请输入密码' maxLength={11} onFocus={() => { setPswsColor(true) }} onBlur={() => { setPswsColor(false) }} value={pswValue} onChangeText={e => { setPswValue(e) }}
                />
            </View>
            <TouchableOpacity style={styles.emailContent}
                onPress={() => navigation.navigate('login')}
            >
                <Text style={styles.aText}>
                    手机号登录
        </Text>
            </TouchableOpacity>
            {
                nameValue === '' || pswValue === '' ? <View style={styles.button}>
                    <Text style={styles.buttonText}>下一步</Text>
                </View>
                    : <TouchableOpacity style={styles.colorButton}>
                        <Text style={styles.colorButtonText}>下一步</Text>
                    </TouchableOpacity>
            }
            <TouchableOpacity style={styles.findPsw}>
                <Text style={styles.findPswText}>
                    找回密码
        </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    loginPage: {
        padding: '2%',
        // justifyContent: 'center',
        // alignItems: 'center'
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
        // marginTop: 15,
        backgroundColor: '#eee',
        height: 30,
        width: '100%',
    },
    colorButton: {
        // marginTop: 15,
        backgroundColor: '#4ba367',
        height: 30,
        width: '100%',
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
    textAlign: {
        textAlignVertical: 'center'
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
    colorBorder: {
        borderBottomColor: '#4ba367'
    },
})