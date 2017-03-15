import React,{Component} from 'react';
import {AppRegistry,Text,TextInput,Button,View} from 'react-native';

export default class Register extends Component{
  render(){
    return(
      <View>

        <Text>ĐĂNG KÝ</Text>
        <TextInput placeholder="họ và tên"/>
        <TextInput placeholder="số điện thoại"/>
        <TextInput placeholder="mật khẩu"/>
        <TextInput placeholder="nhập lại mật khẩu"/>
        <Button onPress={()=>this.btn_DangKy()}  title={'Đăng ký'}></Button>
      </View>
    );
  }
  btn_DangKy(){
    alert("button dang ky dc click");
  }
}
AppRegistry.registerComponent('ChoNhaNong_v1',()=>Register);
