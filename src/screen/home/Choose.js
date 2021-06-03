import * as React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Button
} from 'react-native';
import usePicker from '../../components/Picker'
import Carousel from 'react-native-snap-carousel';
import { useState } from 'react';
import Picker from 'react-native-picker';
const Data = ["儿童椅" ,"桌子","凳子","Item 4","Item 5",]
export default class App extends React.Component {
  

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      carouselItems: [
        {
          title: "儿童椅",
          text: "Text 1",
        },
        {
          title: "桌子",
          text: "Text 2",
        },
        {
          title: "凳子",
          text: "Text 3",
        },
        {
          title: "Item 4",
          text: "Text 4",
        },
        {
          title: "Item 5",
          text: "Text 5",
        },
      ]
    }
  }

  _renderItem({ item, index }) {
    return (
      <View style={{
        backgroundColor: 'floralwhite',
        borderRadius: 5,
        height: 250,
        padding: 0,
        marginLeft: 25,
        marginRight: 25,
      }}>
        <Text style={{ fontSize: 30 }}>{item.title}</Text>
        <Text>{item.text}</Text>
      </View>

    )
  }
  addPicker() {
    Picker.init({
      pickerData: Data,
      pickerConfirmBtnText: '确认',
      pickerCancelBtnText: '取消',
      pickerTitleText: '请选择',
      // selectedValue: [equip],
      onPickerConfirm: data => {
        let index = Data.indexOf(data.join(''))
        console.log(data,index);
        this.setState({
          activeIndex: index
        })
      },
      onPickerCancel: data => {
        console.log(data);
      },
      onPickerSelect: data => {
        console.log(data);
      }
    });
    Picker.show();
  }
  render() {
    return (
      <View style={{ backgroundColor: '#eee', flex: 1 }}>
        <Text >现有设备</Text>
        <Text  onPress={() => {
              this.addPicker()
            }}>{this.state.carouselItems[this.state.activeIndex].title}</Text>
        <SafeAreaView style={{ flex: 1, paddingTop: 50, }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
            <Carousel
              layout={"default"}
              ref={ref => this.carousel = ref}
              data={this.state.carouselItems}
              sliderWidth={300}
              itemWidth={100}
              loop={true}
              renderItem={this._renderItem}
              onSnapToItem={index => this.setState({ activeIndex: index })} />
          </View>
          <Button
            title='添加设备'
            onPress={() => {
             this.props.navigation.navigate('AddEquip', {state : this.state.carouselItems[this.state.activeIndex].title}) 
            }}
          />
        </SafeAreaView>
      </View>
    );
  }
}


