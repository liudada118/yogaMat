import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import {createStackNavigator} from '@react-navigation/stack';
import Remind from '../settingTypes/Remind';
const Stack = createStackNavigator();
/**
 * 定义框框跟跳转的路由*/ 
const list = [
  {
    name: '提醒设置',
    url: 'remind',
  },
  {
    name: '奖励设置',
    url: 'reward',
  },
  {
    name: '连接设备',
    url: 'bluetooth',
  },
  {
    name: '历史记录',
    url: 'historyTime',
  },
  {
    name: '椅子设置',
    url: 'set',
  },
  {
    name: '传感器设置',
    url: 'sensor',
  },
  // more items
];
export default function Setting({navigation}) {
  return (
    <View>
      {list.map((l, i) => (
        <TouchableOpacity key={i} onPress={() => navigation.navigate(l.url)}>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{l.name}</ListItem.Title>
            </ListItem.Content>
            <Text style={styles.textStyle}>{'>'}</Text>
          </ListItem>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  textcolor: {
    color: '#ddd',
  },
});
