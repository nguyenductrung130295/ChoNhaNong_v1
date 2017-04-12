import React,{Component} from 'react';
import {AppRegistry,Text,TextInput,Button,View,Image,TouchableHighlight} from 'react-native';
import Users from '../entities/Users'
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
        <TextInput onChangeText={(value)=>this.setState({ten:value})} style={{borderRadius:5,backgroundColor:'white',fontSize:20}} underlineColorAndroid="white"/>
<Text style={{fontWeight:'bold',fontSize:20,color:'#01579B'}}>Số điện thoại:</Text>
        <TextInput onChangeText={(value)=>this.setState({sdt:value})}  style={{borderRadius:5,backgroundColor:'white',fontSize:20}} underlineColorAndroid="white"/>
<Text style={{fontWeight:'bold',fontSize:20,color:'#01579B'}}>Mật khẩu:</Text>
        <TextInput onChangeText={(value)=>this.setState({mk:value})}  style={{borderRadius:5,backgroundColor:'white',fontSize:20}} underlineColorAndroid="white"/>
<Text style={{fontWeight:'bold',fontSize:20,color:'#01579B'}}>Nhập lại mật khẩu:</Text>
        <TextInput  onChangeText={(value)=>this.setState({xnmk:value})} style={{borderRadius:5,backgroundColor:'white',fontSize:20}} underlineColorAndroid="white"/>
        <Text>{"\n"}</Text>
        <View style={{flexDirection:'row'}}>
          <View style={{flex:1}}>
            <Button onPress={()=>alert('click button')} title="Hủy bỏ" color='#FF3D00'/>
          </View>
          <View style={{flex:3,marginLeft:10}}>
              <Button onPress={()=>this.btn_DangKy_Click()} title="Đăng Ký"/>
          </View>
        </View>
      </View>
      </View>
    );
  }
  btn_DangKy_Click(){
    //làm kiểu này thì nó chuyển trang trước khi nó thêm vào firebase, dù thành công hay ko
    //mà đc cái có oop
    var us=new Users();
    us.ten=this.state.ten;
    us.matkhau=this.state.mk;
    us.sdt=this.state.sdt;
    //gọi medthod Đăng ký
    us.DangKy(this.props);

  }
  btn_BackScreen_Click(){
    this.props.propsNavigator.pop();
  }
}
AppRegistry.registerComponent('ChoNhaNong_v1',()=>Register);
