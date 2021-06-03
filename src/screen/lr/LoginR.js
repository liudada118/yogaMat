import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  Image
} from 'react-native';
import axios from 'axios'
import qs from 'qs'
import { connect } from 'react-redux';
import instance from '../../http/axios'
import Iconon from 'react-native-vector-icons/Ionicons'
class LoginR extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      registered: false,
      login: false
    }
  }
  static getDerivedStateFromProps(props, state) {
    AsyncStorage.getItem('token', (error, token) => {
      if (!error) {
        const resultToken = JSON.parse(token);
        console.log(resultToken)
        // props.login()
        AsyncStorage.getItem('phone', (error, result) => {
          if (!error) {
            const res = JSON.parse(result);
            console.log(res)
            var url =
              'api/sensor/selectSensorListByPhone?phone=' +
              res +
              '&access_token=' +
              resultToken +
              '';
            instance.get(url).then((res) => {
              console.log(res,'ress')
              props.login()
            }).catch((err) => {
              console.log(err)
            });
          }
        });
      }
    });
    return null
  }
  // onPress={() => this.props.navigation.navigate('login')}
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/bgc.png')}
        />
        {this.state.registered ?
          <View style={{ position: 'absolute', top: 20, left: 5 }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => { this.setState({ registered: false }) }}>
              <Iconon name="chevron-back" size={24} color='black' />
            </TouchableOpacity>
          </View>
          : this.state.login ?
            <View style={{ position: 'absolute', top: 20, left: 5 }}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => { this.setState({ login: false }) }}>
                <Iconon name="chevron-back" size={24} color='black' />
              </TouchableOpacity>
            </View>
            : null}

        <View style={styles.button}>

          {!this.state.registered && !this.state.login ? <>
            <TouchableOpacity
              onPress={() => this.setState({ registered: true })}
            ><View style>
                <Text style={styles.RbuttonText}>新用户注册</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({ login: true })}
            ><View style={styles.marginTop}>
                <Text style={styles.LbuttonText}>登录</Text>
              </View>
            </TouchableOpacity>
          </>
            : this.state.login ? <>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('login')}
              ><View style>
                  <Text style={styles.RbuttonText}>手机验证码登录</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('emaillogin')}
              ><View style={styles.marginTop}>
                  <Text style={styles.LbuttonText}>账号密码登录</Text>
                </View>
              </TouchableOpacity>
            </> :
              <>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('registered')}
                ><View style>
                    <Text style={styles.RbuttonText}>手机号注册</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('EmailReg')}
                ><View style={styles.marginTop}>
                    <Text style={styles.LbuttonText}>邮箱注册</Text>
                  </View>
                </TouchableOpacity>
              </>}
        </View>
      </View>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    login: () => { dispatch({ type: "LOGIN" }) }
  }
}
export default connect(null, mapDispatchToProps)(LoginR)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    position: 'relative',
  },
  button: {
    width: '90%',
    position: 'absolute',
    left: '5%',
    bottom: '10%',
  },
  Lbutton: {
    alignItems: "center",
    width: '20%',
    height: 40,
    backgroundColor: '#4ba367',
    borderRadius: 5

  },
  LbuttonText: {
    lineHeight: 40,
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e85a24',
    color: '#e85a24'
  },
  Rbutton: {
    alignItems: "center",
    width: '20%',
    height: 40,
    backgroundColor: '#eee',
    borderRadius: 5,
    position: 'absolute',
    right: 0,
  },
  RbuttonText: {
    lineHeight: 40,
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e85a24',
    color: '#e85a24',
  },
  relative: {
    position: 'relative'
  },
  marginTop: {
    marginTop: 10
  }
})