import React,{Component} from 'react';
import {AppRegistry,Text,TextInput,Button,View,Image,TouchableHighlight} from 'react-native';
import firebase from './FirebaseAPI'
export default class Register extends Component{
  constructor(props){
    super(props);
    this.state={
      ten:'',// họ và tên người dùng
      sdt:'',// số điện thoại
      mk:'',//mật khẩu
      mkxn:''//nhập lại mật khẩu
    }
  }

  render(){
    return(
      <View style={{flex:1,backgroundColor:'#eeeeee'}}>
      <View style={{flex:5}}>
        <Image source={require('../img/thaole.jpg')} style={{width:'100%',height:'100%'}}>
          <TouchableHighlight onPress={()=>this.btn_BackScreen_Click()}><Image source={require('../img/ic_search_black_24dp.png')} style={{width:40,height:40,marginTop:5}}/></TouchableHighlight>
        </Image>
      </View>
      <View style={{flex:4}}>
        <Text>ĐĂNG KÝ</Text>
        <TextInput placeholder="họ và tên"/>
        <TextInput placeholder="số điện thoại"/>
        <TextInput placeholder="mật khẩu"/>
        <TextInput placeholder="nhập lại mật khẩu"/>
        <Button onPress={()=>this.btn_DangKy()}  title={'Đăng ký'}></Button>
      </View>
      </View>
    );
  }
  btn_DangKy(){
    //kiểm tra hợp lệ

    //kết nối firebase

    //insert vào table_users

//insert không thành công

  }
  btn_BackScreen_Click(){
    this.props.propsNavigator.pop();
  }
}
AppRegistry.registerComponent('ChoNhaNong_v1',()=>Register);
