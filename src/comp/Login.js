import React,{Component} from 'react';
import {AppRegistry,Text,TextInput,View, Button,Image,TouchableHighlight} from 'react-native';
export default class Login extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <View style={{flex:1,backgroundColor:'#B3E5FC'}}>
      <View style={{flex:1}}>
        <View style={{margin:5}}>
        <Image source={require('../img/logo2.png')} style={{width:'100%',height:'85%',alignItems:'flex-end'}} resizeMode="contain">
          <TouchableHighlight style={{width:40,height:40,borderRadius:40}} onPress={()=>this.btn_BackScreen_Click()} underlayColor={'#E1F5FE'}>
          <Image source={require('../img/ic_clear_white_24dp.png')} style={{width:40,height:40,marginTop:5}}/></TouchableHighlight>
        </Image>
        </View>

      </View>
      <View style={{flex:1}}>
      <View style={{margin:15}}>
        <Text style={{fontWeight:'bold',fontSize:20,color:'#01579B'}}>Số điện thoại</Text>
        <TextInput style={{borderRadius:5,backgroundColor:'white',fontSize:20}} underlineColorAndroid="white"/>

        <View style={{flexDirection:'row',marginTop:7}}>
          <View style={{flex:1}}><Text style={{fontWeight:'bold',fontSize:20,color:'#01579B',marginTop:7}}>Mật khẩu</Text></View>
          <View style={{flex:2,alignItems:'flex-end'}}><Text style={{fontStyle:'italic',marginTop:7,fontSize:15,color:'#FF9800'}}>Quên mật khẩu?</Text></View>
        </View>

        <TextInput secureTextEntry={true} onSubmitEditing={()=>this.btn_DangNhap_Click()} style={{borderRadius:5,backgroundColor:'white',fontSize:20}} underlineColorAndroid="white"/>
        <Text>{"\n"}</Text>
        <Button onPress={()=>this.btn_DangNhap_Click()} title={'Đăng nhập'} color='#03A9F4'></Button>
<Text>{"\n"}</Text>
        <View style={{alignItems:'flex-end'}}>
        <Text onPress={()=>this.btn_DangKy_Click()}  style={{fontStyle:'italic',marginTop:7,fontSize:20,color:'#FF9800'}}> Đăng ký tài khoản mới</Text></View>
      </View>
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
