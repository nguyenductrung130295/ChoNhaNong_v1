import React,{Component} from 'react';
import {AppRegistry,View,Text,Image} from 'react-native';
export default class ItemCommand extends Component{
  render(){
    return(
      <View>
        <View style={{flexDirection:'row'}}>
          <Image source={{uri:this.props.obj.img}} style={{width:20,height:20}}/>
          <Text style={{color:'blue'}}>{this.props.obj.username}
          </Text>
        </View>
        <Text>{this.props.obj.content}
        </Text>
        <Text style={{color:'gray'}}>{this.props.obj.time}</Text>
      </View>
    );
  }
}
AppRegistry.registerComponent('ChoNhaNong_v1',()=>ItemCommand);
