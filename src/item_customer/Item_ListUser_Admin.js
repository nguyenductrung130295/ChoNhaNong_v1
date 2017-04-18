import React,{Component} from 'react'
import {View, Text}

export default class Item_ListUser_Admin extends Component{

  render()
  {
    return({
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
      </View>
    });
  }
}
