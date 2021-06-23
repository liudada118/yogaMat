import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Echarts from 'native-echarts';


export default class App extends Component {
  constructor(props){
    super(props);
    console.log(this.props.muscle, this.props.flex, this.props.skill, this.props.endur, this.props.Concen)
  }
    render() {
      const option = {

        radar: {
            indicator: [
                { name: '专注度', max: 5},
                { name: '耐力', max: 5},
                { name: '下肢灵活性', max: 5},
                { name: '下肢肌力', max: 5},
                { name: '动作熟练度', max: 5},
            ]
        },
        series: [{
            type: 'radar',
            data: [
                {
                    value: [this.props.muscle, this.props.flex, this.props.skill, this.props.endur, this.props.Concen],
                    // value: [1,2,3,4,5]
                }
            ]
        }]
    };
      return (
        <Echarts option={option} height={300} />
      );
    }
  }