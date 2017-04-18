import React,{Component} from 'react';
import {AppRegistry,Text,TextInput,View, Button,Image,TouchableHighlight,AsyncStorage} from 'react-native';
import Users from '../entities/Users'
import firebase from '../entities/FirebaseAPI';
export default class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      sdt:'',
      mk:'',
      us_uid:''// cái này là uid session chứa cái data.key là uid cửa user mới đăng nhập
    };
  }
  btn_DangNhap_Click(){
    //kết nối firebase
    database=firebase.database();
    //trỏ đến bảng table_users
    tb_user=database.ref('db_marketsfarmers/table_users');
    //câu truy vấn kiểm tra điều kiện đăng nhập
    //orderByChild() dùng để so sánh tại cột sdt_mk
    //equalTo(): chứa giá trị so sánh
    const query=tb_user.orderByChild('sdt_mk').equalTo(this.state.sdt+this.state.mk);
    //flag
    co='0';
    query.on('value',(snap)=>{//snap hay snapshot do mình đặt, chứa dữ liệu lấy về dc
        if(snap.exists()){//kiểm tra tồn tại user
          snap.forEach((data)=>{//data là "1" user lấy dc trong danh sách user trong list snap

            if(co==='0'){
              co='1';
              //luu uid trên máy sau khi đăn nhập
              //hàm setItem để lưu uid của user vào biến uid_store lưu trên máy, lần sau mở ứng dụng
              //sẽ tự động lấy thông tin user,ko cần đăng nhập
            AsyncStorage.setItem('uid_store',data.key);//set uid
            this.setState({us_uid:data.key});//set uid session for guestmain
            }
            else
              co='0';
          });
          if(co==='1'){
            this.props.propsNavigator.push({
              screen:'GuestMain',
              uidSession:this.state.us_uid,//gửi uid sesion tới màn hình tiếp
            });//
          }
        }else{
          alert('đăng nhập ko thành công');
        }
    });
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
  render(){
    return(
      <View style={{flex:1,backgroundColor:'#B3E5FC'}}>
      <View style={{flex:1}}>
        <View style={{margin:5}}>
        <Image source={require('../img/logo1.png')} style={{width:'100%',height:'85%',alignItems:'flex-end'}} resizeMode="contain">
          <TouchableHighlight style={{width:40,height:40,borderRadius:40}} onPress={()=>this.btn_BackScreen_Click()} underlayColor={'#E1F5FE'}>
          <Image source={require('../img/ic_clear_white_24dp.png')} style={{width:40,height:40,marginTop:5}}/></TouchableHighlight>
        </Image>
        </View>

      </View>
      <View style={{flex:1}}>
      <View style={{margin:15}}>
        <Text style={{fontWeight:'bold',fontSize:20,color:'#01579B'}}>Số điện thoại</Text>
{/* INPUT  số diendj thoại*/}
        <TextInput style={{borderRadius:5,backgroundColor:'white',fontSize:20}}
        underlineColorAndroid="white" onChangeText={(value)=>this.setState({sdt:value})}/>

        <View style={{flexDirection:'row',marginTop:7}}>
          <View style={{flex:1}}><Text style={{fontWeight:'bold',fontSize:20,color:'#01579B',marginTop:7}}>Mật khẩu</Text></View>
          <View style={{flex:2,alignItems:'flex-end'}}><Text style={{fontStyle:'italic',marginTop:7,fontSize:15,color:'#FF9800'}}>Quên mật khẩu?</Text></View>
        </View>
{/* INPUT  mật khẩu  -underlineColorAndroid: màu gạch chân trong input,
  onSubmitEditing: gọi hàm btn_DangNhap_Click() khi nhập xong password*/}
        <TextInput secureTextEntry={true}
        onSubmitEditing={()=>this.btn_DangNhap_Click()}
        style={{borderRadius:5,backgroundColor:'white',fontSize:20}}
        underlineColorAndroid="white"
         onChangeText={(value)=>this.setState({mk:value})}/>
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

}
AppRegistry.registerComponent('ChoNhaNong_v1',()=>Login);
