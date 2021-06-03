import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  Modal,
  Dimensions,
  Image,
  Alert,
  StatusBar
} from 'react-native';
import Power from '../../components/Power';
import instance from '../../http/axios'
import Jpush from '../../../Appjpush'
import { VictoryChart, VictoryTheme, VictoryLine } from "victory-native";
import Progress from '../../components/Progress'
import Loading from '../../components/Loading'
import Iconon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import Echarts from 'native-echarts';
let timer = null
// function Home(props) {
//   const [token, setToken] = useState('');
//   const [devicesId, setDevicesId] = useState('');
//   const [charsX, setCharsX] = useState('');
//   const [charsY, setCharsY] = useState('');
//   const [data, setData] = useState();
//   const [power, setPower] = useState(1);
//   const _retrieveData = async () => {
//     try {
//       const value = await AsyncStorage.getItem('token', function (err, res) {
//         setToken(res);
//       });
//       const value1 = await AsyncStorage.getItem('id', function (err, res) {
//         setDevicesId(res);
//       });
//       if (value !== null) {
//         // We have data!!
//       }
//     } catch (error) {
//       // Error retrieving data
//     }
//   };
//   /**
//    * 请求数据的函数*/
//   const getChars = () => {
//     let end = new Date().getTime();
//     let start = end - 1000 * 60 * 10
//     AsyncStorage.getItem('nowDeviceId', (error, result) => {
//       if (!error) {
//         const res = JSON.parse(result);

//         instance
//           .get(
//             // `test/select?start=${start}&end=${end}&deviceId=${res}`,
//             `test/select?start=1612175817259&end=1612229203684&deviceId=40f52071f5d4`,
//           )
//           .then((res) => {
//             let x = [], y = []
//             for (let a of res.data.data.sensorList) {
//               x.push(parseInt(a.sitFlag))
//               y.push(`${a.time.split(' ')[1].split(':')[0]}:${a.time.split(' ')[1].split(':')[1]}`)

//             }
//             // setCharsX(x)
//             // setCharsY(y)
//             setNowSit(x[x.length - 1])
//             setPower(res.data.data.sensorList[res.data.data.sensorList.length - 1])
//             setData({
//               labels: y,
//               datasets: [
//                 {
//                   data: x
//                 }
//               ]
//             })
//           })
//           .catch((err) => { });
//       }
//     });
//   }

//   /**
//    * 给页面绑定一个一分钟发起一次请求数据的函数*/
//   useEffect(() => {
//     _retrieveData();
//     getChars()
//     timer = setInterval(() => {
//       getChars()
//     }, 60000)

//     return () => {
//       if (timer) {
//         clearInterval(timer)
//       }
//     }
//   }, []);
//   const [blance, setBlance] = useState('平衡');
//   const [forward, setForward] = useState('前倾');
//   const [nowTime, setNowTime] = useState([1, 12]);
//   const [today, setTodayTime] = useState([2, 30]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [verInfo, setVerInfo] = useState('');
//   const [nowSit, setNowSit] = useState('')
//   const [loading, setLoading] = useState(false);
//   const [loadInfo, setLoadInfo] = useState('请求中');
//   /**
//    * 获取token deviceid
//    * 发起请求弹框
//    * 请求成功进入实时页面
//    * 失败弹框内容修改*/
//   const real = () => {
//     setLoadInfo('请求中')
//     setLoading(true)
//     AsyncStorage.getItem('token', (error, token) => {
//       if (!error) {
//         const resultToken = JSON.parse(token);


//         AsyncStorage.getItem('nowDeviceId', (error, result) => {
//           if (!error) {
//             if (result) {
//               const res = JSON.parse(result);
//               instance
//                 .post(
//                   `api/dataOrder/sendOrder?deviceId=${res}&dataCommand=1001&access_token=${resultToken}`,
//                 )
//                 .then((res) => {
//                   setLoading(false);
//                   props.navigation.navigate('realTime');
//                 })
//                 .catch((err) => {
//                   setLoadInfo('服务器错误...')
//                   setTimeout(() => {
//                     setLoading(false);
//                   }, 2000)
//                 });
//             } else {
//               setLoadInfo('请选择设备')
//               setLoading(true)
//               setTimeout(() => {
//                 setLoading(false)
//                 props.navigation.navigate('sensor')
//               }, 2000);
//             }

//           }
//         });
//       }
//     });
//   };
//   const screenWidth = Dimensions.get("window").width * 0.9;
//   const chartConfig = {
//     backgroundGradientFrom: "#ccc",
//     // backgroundGradientFromOpacity: 1,
//     // backgroundGradientTo: "#08130D",
//     backgroundGradientTo: "#ccc",
//     // backgroundGradientToOpacity: 0.5,

//     color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
//     strokeWidth: 2, // optional, default 3
//     barPercentage: 0.5,
//     useShadowColorFromDataset: false // optional
//   };
//   const option = {
//     title: {
//         text: 'ECharts demo'
//     },
//     tooltip: {},
//     legend: {
//         data:['销量']
//     },
//     xAxis: {
//         data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
//     },
//     yAxis: {},
//     series: [{
//         name: '销量',
//         type: 'bar',
//         data: [5, 20, 36, 10, 10, 20]
//     }]
//   };
//   return (
//     <>
//       {loading ? <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: "center", zIndex: 1, position: 'absolute' }}>
//         <View style={{ padding: 20, backgroundColor: '#555', justifyContent: 'center', alignItems: 'center' }}>
//           <Loading text={loadInfo} />
//         </View>
//       </View> : null}
//       <View style={styles.vh}>
//         {/* <StatusBar
//           translucent={true}
//           backgroundColor="transparent"
//         /> */}
//         <Jpush />
//         {/* <Modal
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
//         </Modal> */}
//         <View style={styles.title}>
//           <TouchableOpacity
//             activeOpacity={1}
//             onPress={() => { props.back() }}>
//             <Iconon name="chevron-back" size={24} color='#fff' />
//           </TouchableOpacity>
//           <Text style={styles.titleText}>米家智能椅</Text>
//           <Power power={power} />
//         </View>
//         <View style={styles.relative}>
//           <View style={styles.card}>
//             <View style={[styles.flexRow, styles.spaceBetween]}>
//               <Text style={styles.bigText}>当前状态</Text>
//               <Text style={styles.bigText}>{nowSit === '' ? '...' : nowSit === 0 ? '离座' : '入座'}</Text>
//             </View>
//           </View>
//           <ScrollView>
//             <View style={styles.contents}>

//               {/* {data ? */}
//               <TouchableOpacity
//                 onPress={() => {
//                   real();
//                 }}>

//                 <View style={styles.borderRadius}>
//                   <Text style={styles.chars}>今日坐姿表</Text>
//                   {/* <VictoryChart
//                     theme={VictoryTheme.material}
//                     height={200}
//                   >
//                     <VictoryLine
//                       interpolation="natural"
//                       style={{
//                         data: { stroke: "#ddd" },
//                         parent: { border: "1px solid #ccc" }
//                       }}
//                       data={[
//                         { x: 1, y: '浅睡', },
//                         { x: 2, y: '深睡', },
//                         { x: 3, y: '翻身', },
//                         { x: 4, y: '深睡', },
//                         { x: 5, y: '浅睡', }
//                       ]}
//                     />
//                   </VictoryChart> */}
//                   <Echarts option={option} height={300} />
//                   <View style={{ marginTop: 10, marginBottom: 10 }}>
//                     <Progress>
//                       <Text style={{ color: '#fff', position: 'relative' }}>1</Text>
//                       <Text style={{ position: 'absolute', color: '#fff', left: 40 }}>31</Text>
//                       <Text style={{ color: '#aaa' }}>9:12-9:44</Text>
//                     </Progress>
//                   </View>
//                   <View style={{ marginTop: 10, marginBottom: 10 }}>
//                     <Progress style={{ width: '50%' }}>
//                       <Text style={{ color: '#fff', position: 'relative' }}>1</Text>
//                       <Text style={{ position: 'absolute', color: '#fff', left: 40 }}>31</Text>
//                       <Text style={{ color: '#aaa' }}>9:12-9:44</Text>
//                     </Progress>
//                   </View>
//                   <View style={{ marginTop: 10, marginBottom: 10 }}>
//                     <Progress>
//                       <Text style={{ color: '#fff', position: 'relative' }}>1</Text>
//                       <Text style={{ position: 'absolute', color: '#fff', left: 40 }}>31</Text>
//                       <Text style={{ color: '#aaa' }}>9:12-9:44</Text>
//                     </Progress>
//                   </View>
//                   <View style={{ marginTop: 10, marginBottom: 10 }}>
//                     <Progress>
//                       <Text style={{ color: '#fff', position: 'relative' }}>1</Text>
//                       <Text style={{ position: 'absolute', color: '#fff', left: 40 }}>31</Text>
//                       <Text style={{ color: '#aaa' }}>9:12-9:44</Text>
//                     </Progress>
//                   </View>
//                 </View>
//               </TouchableOpacity>
//               {/* : 
//             <View style={[styles.card, styles.content]} width={screenWidth} height={100}>
//               <Text >正在加载您的数据...</Text>
//             </View>} */}


//             </View>
//             <TouchableOpacity onPress={() => props.navigation.navigate('historyTime')}>
//               <View style={[styles.flexRow, styles.spaceBetween, styles.padding]}>
//                 <Text style={styles.text}>今天</Text>
//                 <Text style={styles.text}>详细{'>'}</Text>
//               </View>
//             </TouchableOpacity>

//             <View style={styles.smallCard}>
//               <Text style={styles.bigText}>当前入座时长</Text>
//               <View style>
//                 <Text>
//                   {nowTime.map((a, index) => {
//                     return (
//                       <Text key={index} style={styles.bigText}>
//                         {a}
//                         <Text style={styles.text}>
//                           {index === 0 ? '小时' : '分钟'}
//                         </Text>
//                       </Text>
//                     );
//                   })}
//                 </Text>
//               </View>
//             </View>
//             <View style={styles.smallCard}>
//               <Text style={styles.bigText}>今日时长</Text>
//               <View style>
//                 <Text>
//                   {today.map((a, index) => {
//                     return (
//                       <Text key={index} style={styles.bigText}>
//                         {a}
//                         <Text style={styles.text}>
//                           {index === 0 ? '小时' : '分钟'}
//                         </Text>
//                       </Text>
//                     );
//                   })}
//                 </Text>
//               </View>
//             </View>
//             <View style={styles.smallCard}>
//               <Text style={styles.bigText}>当前入座时长</Text>
//               <View style>
//                 <Text>
//                   {nowTime.map((a, index) => {
//                     return (
//                       <Text key={index} style={styles.bigText}>
//                         {a}
//                         <Text style={styles.text}>
//                           {index === 0 ? '小时' : '分钟'}
//                         </Text>
//                       </Text>
//                     );
//                   })}
//                 </Text>
//               </View>
//             </View>
//             <View style={styles.smallCard}>
//               <Text style={styles.bigText}>当前入座时长</Text>
//               <View style>
//                 <Text>
//                   {nowTime.map((a, index) => {
//                     return (
//                       <Text key={index} style={styles.bigText}>
//                         {a}
//                         <Text style={styles.text}>
//                           {index === 0 ? '小时' : '分钟'}
//                         </Text>
//                       </Text>
//                     );
//                   })}
//                 </Text>
//               </View>
//             </View>
//             <View style={styles.smallCard}>
//               <Text style={styles.bigText}>当前入座时长</Text>
//               <View style>
//                 <Text>
//                   {nowTime.map((a, index) => {
//                     return (
//                       <Text key={index} style={styles.bigText}>
//                         {a}
//                         <Text style={styles.text}>
//                           {index === 0 ? '小时' : '分钟'}
//                         </Text>
//                       </Text>
//                     );
//                   })}
//                 </Text>
//               </View>
//             </View>

//           </ScrollView>
//           <View style={styles.buttonAds}>
//             <TouchableOpacity onPress={() => props.navigation.navigate('remind')}>
//               <View style={styles.buttonCard}>
//                 <Text style={styles.button}>设置久坐提醒</Text>
//               </View>
//             </TouchableOpacity>
//           </View>
//         </View>



//       </View>
//     </>
//   );
// }
// const mapDispatchToProps = (dispatch) =>{
//   return {
//     back : () => {dispatch({type : 'BACK'})}
//   }
// }
// export default connect(null,mapDispatchToProps)(Home)

const styles = StyleSheet.create({
  chars: {
    color: '#000',
    textAlign: 'center',
    position: 'absolute',
    zIndex: 1,
    left: '5%',
    top: '5%',
    fontSize: 20
  },
  borderRadius: {
    // width : '100%',
    // borderRadius: 10,
    // overflow: 'hidden',
    // marginBottom: 20
  },
  content: {
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#ccc',
    width: '90%',
    marginLeft: '5%',
    height: '50%'
  },
  contents: {
    width: '90%',
    // height: '50%',
    padding: 0,
    margin: 0,
    marginLeft: '5%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  relative: {
    position: 'relative',
    top: '-10%',
    height: '90%',
  },
  vh: {
  },
  scrool: {
  },
  title: {
    backgroundColor: 'black',
    height: '15%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5
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
  buttonCard: {
    margin: '2%',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '2%',
    marginBottom: '2%',
    borderRadius: 10,
    backgroundColor: '#ccc',
    padding: '3%',
  },
  buttonAds: {
    width: '100%',
  },
  card: {
    margin: '5%',
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
  button: {
    fontSize: 18,
    textAlign: 'center',
  },
});


export default function Home() {
  const [loading, setLoading] = useState(false);
  const [loadInfo, setLoadInfo] = useState('请求中');
  return (
    <>
      {loading ? <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: "center", zIndex: 1, position: 'absolute' }}>
        <View style={{ padding: 20, backgroundColor: '#555', justifyContent: 'center', alignItems: 'center' }}>
          <Loading text={loadInfo} />
        </View>
      </View> : null}
    </>
  )
}