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
      <View style={{flex:1,backgroundColor:'#B3E5FC'}}>
      <View style={{flex:1}}>
        <View style={{margin:5}}>
        <Image source={require('../img/logo1.png')} style={{width:'100%',height:'100%'}} resizeMode="contain">
          <TouchableHighlight style={{width:40,height:40,borderRadius:40}} onPress={()=>this.btn_BackScreen_Click()} underlayColor={'#E1F5FE'}>
          <Image source={require('../img/ic_clear_white_24dp.png')} style={{width:40,height:40,marginTop:5}}/></TouchableHighlight>
        </Image>
        </View>

      </View>
      <View style={{flex:2,padding:15}}>
        <Text style={{fontWeight:'bold',fontSize:20,color:'#01579B'}}>Họ và tên:</Text>
        <TextInput placeholder="họ và tên" style={{borderRadius:5,backgroundColor:'white',fontSize:20}} underlineColorAndroid="white"/>
<Text style={{fontWeight:'bold',fontSize:20,color:'#01579B'}}>Số điện thoại:</Text>
        <TextInput placeholder="số điện thoại" style={{borderRadius:5,backgroundColor:'white',fontSize:20}} underlineColorAndroid="white"/>
<Text style={{fontWeight:'bold',fontSize:20,color:'#01579B'}}>Mật khẩu:</Text>
        <TextInput placeholder="mật khẩu" style={{borderRadius:5,backgroundColor:'white',fontSize:20}} underlineColorAndroid="white"/>
<Text style={{fontWeight:'bold',fontSize:20,color:'#01579B'}}>Nhập lại mật khẩu:</Text>
        <TextInput placeholder="nhập lại mật khẩu" style={{borderRadius:5,backgroundColor:'white',fontSize:20}} underlineColorAndroid="white"/>
        <Text>{"\n"}</Text>
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
