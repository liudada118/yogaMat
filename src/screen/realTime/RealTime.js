import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  AsyncStorage,
} from 'react-native';
import Canvas from '../../components/Canvas';
import instance from '../../http/axios';

class Com extends React.Component {
  shouldComponentUpdate() {
    return false
  }
  constructor(props) {
    super(props);
  }
  render() {
    return this.props.children
  }
}

class RealTime extends React.Component {
  state = {
    seating: '深坐',
    seatHeight: '正常',
    badSeat: '无',
    body: '正常',
    nowTime: [1, 12],
    today: [2, 30],
    img: [1, 0, 0]
  };
  changeState(obj) {
    this.setState(obj)
  }
  changeSeat(a) {
    console.log(a, 'hehe')
    this.setState({ seating: a })
  }
  changeImg(a) {
    this.setState({
      img: a
    })
  }
  constructor() {
    super();
    this.img1Ref = React.createRef();
    this.img2Ref = React.createRef();
    this.img3Ref = React.createRef();
  }
  componentDidMount() {
    console.log('hehhehe')
    console.log(this.ref)
  }
  componentWillUnmount() {
    AsyncStorage.getItem('token', (error, token) => {
      if (!error) {
        const getToken = JSON.parse(token);
        console.log('AsyncStorage******************', token);

        AsyncStorage.getItem('nowDeviceId', (error, result) => {
          if (!error) {
            const res = JSON.parse(result);
            console.log('AsyncStorage******************', res);

            instance
              .post(
                `api/dataOrder/sendOrder?deviceId=${res}&dataCommand=1005&access_token=${getToken}`,
              )
              .then((res) => {
                console.log(res, 1);
              })
              .catch((err) => console.log(err));
          }
        });
      }
    });
  }
  render() {

    return (
      <>
        <Com>
          <Canvas changeImg={(e) => { this.changeImg(e) }} changeState={(e) => { this.changeState(e) }} changeSeat={(e) => { this.changeSeat(e) }} img1={this.img1Ref} img2={this.img2Ref} img3={this.img3Ref} />
        </Com>
        <ScrollView
          style={[styles.scrool, styles.relative1]}
        >
          <View style={[styles.card, styles.imgInfo]}>
            <View style={styles.imageInfo}>
              <View style={styles.smallPadding}>
                <Text style={styles.text} >左右平衡</Text>
                <View style>
                  <Text style={styles.greenText}>{this.state.seatHeight}</Text>
                </View>
              </View>
              <View style={styles.smallPadding}>
                <Text style={styles.text}>入座位置</Text>
                <Text style={styles.greenText}>{this.state.seating}</Text>
              </View>
              <View style={styles.smallPadding}>
                <Text style={styles.text}>入座情况</Text>
                <Text style={styles.greenText}>{this.state.body}</Text>
              </View>
              <View style={styles.smallPadding}>
                <Text style={styles.text}>不良坐姿</Text>
                <Text style={styles.badText}>{this.state.badSeat}</Text>
              </View>
            </View>
            <View style={styles.img}>
              <Image
                style={styles.stretch}
                source={this.state.seating == '深坐' || this.state.seating == '中间' ? this.state.body == '前倾' ? require('../../assets/qianqing.png') : require('../../assets/normal.png') : require('../../assets/wrong.png')}
              />
            </View>
          </View>

          <View style={[styles.flexRow, styles.spaceBetween, styles.padding]}>
            <Text style={styles.text}>今天</Text>
          </View>
          <View style={styles.smallCard}>
            <Text style={styles.smallText}>今日常用坐姿</Text>
            <View style={styles.flexRow}>
              <Text style={[styles.bigText, styles.flex1]}>脊柱前倾</Text>
              <Text style={[styles.flex1, styles.textRight]}>
                <Text style={styles.smallText}>累计</Text>
                <Text style={styles.bigText}>{this.state.nowTime[0]}</Text>
                <Text style={styles.smallText}>时</Text>
                <Text style={styles.bigText}>{this.state.nowTime[1]}</Text>
                <Text style={styles.smallText}>分</Text>
              </Text>
            </View>
          </View>

          <View style={styles.smallCard}>
            <Text style={styles.smallText}>运动建议</Text>
            <View style>
              <Text style={styles.advice}>
                18-64岁成年人每周至少150分钟中等强度有氧身体活动，或每周至少75分钟高强度有氧身体活动，或中等和高强度两种活动相当量的组合。
                有氧活动应该每次至少持续10分钟。
                为获得更多的健康效益，成人应增加有氧身体活动，达到每周300分钟中等强度或每周150分钟高强度有氧身体活动，或中等和高强度两种活动相当量的组合。
                有氧活动应该每次至少持续10分钟。
                为获得更多的健康效益，成人应增 有氧活动应该每次至少持续10分钟。
                为获得更多的健康效益，成人应增 有氧活动应该每次至少持续10分钟。
                为获得更多的健康效益，成人应增 有氧活动应该每次至少持续10分钟。
                为获得更多的健康效益，成人应增
                有氧活动应该每次至少持续10分钟。
                为获得更多的健康效益，成人应增 有氧活动应该每次至少持续10分钟。fs
                </Text>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}
export default RealTime;
const styles = StyleSheet.create({
  scrool: {
    flex: 1
  },
  textRight: {
    textAlign: 'right',
  },
  imgInfo: {
    flexDirection: 'row',
  },
  imageInfo: {
    flex: 1,
  },
  img: {
    flex: 1,
    position: 'relative',
  },
  stretch: {
    width: 180,
    height: 210,
    resizeMode: 'stretch',
  },
  stretch1: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  stretch2: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
    position: 'absolute'
  },
  stretch3: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
    position: 'absolute'
  },
  badText: {
    fontSize: 18,
    color: '#999',
  },
  greenText: {
    fontSize: 18,
    color: 'green',
  },
  relative: {
    position: 'relative',
    top: -20,
    flex: 1.25
  },
  relative1: {
    position: 'relative',
    top: -20,
    flex: 1
  },
  vh: {
    flex: 1
  },
  titleText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  flexRow: {
    flexDirection: 'row',
  },
  flex1: {
    flex: 1,
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  card: {
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '5%',
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: '5%',
  },
  smallCard: {
    marginLeft: '5%',
    marginTop: '2%',
    marginBottom: '2%',
    marginRight: '5%',
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: '5%',
  },
  padding: {
    paddingLeft: '5%',
    paddingRight: '5%',
    marginLeft: '5%',
    marginRight: '5%',
  },
  position: {
    position: 'absolute',
    top: '-20%',
  },
  bigText: {
    fontSize: 20,
    color: 'black',
  },
  text: {
    color: '#bbb',
    fontSize: 14,
  },
  smallText: {
    color: 'black',
    fontSize: 14,
  },
  smallPadding: {
    paddingTop: '2%',
    paddingBottom: '2%',
    flex: 1,
  },
  advice: {
    color: '#bbb',
    fontWeight: '500',
  },
});
