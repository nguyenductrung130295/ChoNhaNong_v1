import React,{Component} from 'react';
import {AppRegistry,View,Text,Image} from 'react-native';
export default class ItemCommand extends Component{
  render(){
    return(
      <View style={{backgroundColor:'#E0E0E0',marginTop:10,borderRadius:5}}>
        <View style={{flexDirection:'row'}}>
          <Image source={{uri:this.props.obj.img}} style={{width:30,height:30,borderRadius:100}}/>
          <Text style={{color:'blue',fontSize:16,marginLeft:10}} onPress={()=>alert('link tới trang cá nhân')}>{this.props.obj.username}
          </Text>
        </View>
        <Text style={{color:'gray',marginLeft:40}}>{this.props.obj.time}</Text>
        <Text style={{color:'black',marginLeft:40}}>{this.props.obj.content}
        </Text>

      </View>
    );
  }
}
AppRegistry.registerComponent('ChoNhaNong_v1',()=>ItemCommand);
