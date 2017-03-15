import React, {Component} from 'react';
import {Text,TextInput,View,Image,Button,Picker,Item,AppRegistry} from 'react-native';
export default class HomeGuest extends Component{
  
  render(){
    return(
      <View>
        <Image source={require('../img/icondefault.jpg')}/>
        <View style={{flexDirection:'row'}}>
          <Text onPress={()=>this.btn_DangNhap()}> Đăng nhập
          </Text>
            <Image style={{height:10,width:10}} source={require('../img/icondefault.jpg')}/>
        </View>
        <View style={{flexDirection:'row'}}>
          <TextInput style={{width:150}} placeholder="tìm kiếm"/>
<Text onPress={()=>this.btn_TimKiem()} style={{width:100,height:30}}>
<Image source={require('../img/icondefault.jpg')}/>
</Text>

        </View>


      </View>

    );
  }
  btn_DangNhap(){
    alert('button dang nhap duoc click');
  }
  btn_TimKiem(){
    alert('button Tim Kiem is clicked');
  }
}
AppRegistry.registerComponent('ChoNhaNong_v1',()=>HomeGuest);
