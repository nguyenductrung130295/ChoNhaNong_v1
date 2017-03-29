import React,{Component} from 'react';
import {AppRegistry,Text,TextInput,View, Button,Image,TouchableHighlight} from 'react-native';
export default class Login extends Component {
  constructor(props){
    super(props);
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

      <TextInput placeholder="số điện thoại"/>
      <TextInput placeholder="mật khẩu" secureTextEntry={true} onSubmitEditing={()=>this.btn_DangNhap_Click()}/>
      <Button onPress={()=>this.btn_DangNhap_Click()} title={'Đăng nhập'} color='green'></Button>
      <Text>{"\n"}
      </Text>
      <Text onPress={()=>this.btn_DangKy_Click()} color="red"> Đăng ký tài khoản mới
      </Text>
      </View>
      <View style={{flex:1,flexDirection:'row'}}>
      {/*
        <View style={{flex:1}}>
          <Button title="Facebook" onPress={()=>this.btn_WithFacebook_Click()} color='blue'></Button>
        </View>
        <View style={{flex:1}}>
          <Button title="Google" onPress={()=>this.btn_WithGoogle_Click()} color='pink'></Button>
        </View>
        <View style={{flex:1}}>
          <Button title="Đăng ký" onPress={()=>this.btn_DangKy_Click()} color='yellow'></Button>
        </View>
        */}
      </View>
      </View>
    );

  }
  btn_DangNhap_Click(){
    alert('button danh nhap dc click');
  }
  btn_DangKy_Click(){
    this.props.propsNavigator.push({
      screen:'Register'
    })

  }
  btn_WithFacebook_Click(){
    alert('button Facebook dc click');
  }
  btn_WithGoogle_Click(){
    alert('button Google dc click');
  }
  btn_BackScreen_Click(){
    this.props.propsNavigator.pop();
  }
}
AppRegistry.registerComponent('ChoNhaNong_v1',()=>Login);
