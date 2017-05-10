import React,{Component} from 'react';
import {AppRegistry,View,Text,Image} from 'react-native';
export default class ItemCommand extends Component{
  render(){
    return(
      <View style={{backgroundColor:'#E0E0E0',marginTop:10,borderRadius:3,borderWidth:1,borderColor:'#BDBDBD'}}>
        <View style={{flexDirection:'row',backgroundColor:'#BDBDBD'}}>
          <Image source={{uri:this.props.obj.image_cmt}} style={{width:40,height:40,borderRadius:2}}/>
          <View>
            <Text style={{color:'blue',fontSize:16,marginLeft:10}} onPress={()=>alert('link tới trang cá nhân'+this.props.obj.uid_cmt)}>{this.props.obj.name_cmt}  </Text>
            <Text style={{color:'gray',marginLeft:10}}>{this.props.obj.time}</Text>
          </View>
        </View>

        <Text style={{color:'black',margin:5}}>{this.props.obj.content_cmt}
        </Text>

      </View>
    );
  }
}
AppRegistry.registerComponent('ChoNhaNong_v1',()=>ItemCommand);
