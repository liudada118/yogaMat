import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Echarts from 'native-echarts';


export default class App extends Component {
    render() {
      const option = {

        radar: {
            indicator: [
                { name: '专注度', max: 6500},
                { name: '耐力', max: 16000},
                { name: '下肢灵活性', max: 30000},
                { name: '下肢肌力', max: 38000},
                { name: '动作熟练度', max: 52000},
            ]
        },
        series: [{
            type: 'radar',
            data: [
                {
                    value: [4200, 3000, 20000, 35000, 50000, 18000],
                }
            ]
        }]
    };
      return (
        <Echarts option={option} height={300} />
      );
    }
  }