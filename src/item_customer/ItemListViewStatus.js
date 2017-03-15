import React,{Component} from 'react';
import {AppRegistry,View,Text,TouchableHighlight,Picker,Button,Image} from 'react-native';

export default class ItemListViewStatus extends Component{


  render(){
    return(

      <View>
        <TouchableHighlight onPress={()=>this.btn_ItemIsClick()}>
        <View style={{flexDirection:'row'}}>
        <View>
          <Image source={{uri:this.props.obj.imgsrc}} style={{width: 60, height: 60}}/>
        </View>
        <View>
          <Text>{this.props.obj.title}</Text>
          <Text>{this.props.obj.price}</Text>
          <View style={{flexDirection:'row'}}>
            <Text>{this.props.obj.time}</Text>
            <Text>|</Text>
            <Text>{this.props.obj.address}</Text>
          </View>
        </View>
        </View>
        </TouchableHighlight>
      </View>

);
  }
  btn_ItemIsClick(){
    alert("item is click"+this.props.obj.title);
  }

}
AppRegistry.registerComponent('ChoNhaNong_v1',()=>ItemListViewStatus);
