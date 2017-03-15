import React,{Component} from 'react';
import {AppRegistry,Text,TextInput,View, Button} from 'react-native';
export default class Login extends Component {
  render(){
    return(
      <View>

      <TextInput placeholder="số điện thoại"/>
      <TextInput placeholder="số điện thoại"/>
      <Button onPress={()=>this.btn_DangNhap()} title={'Đăng nhập'}></Button>
      </View>
    );

  }
  btn_DangNhap(){
    alert('button danh nhap dc click');
  }
}
AppRegistry.registerComponent('ChoNhaNong_v1',()=>Login);
