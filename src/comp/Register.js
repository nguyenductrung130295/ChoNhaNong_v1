import React,{Component} from 'react';
import {AppRegistry,Text,TextInput,Button,View,Image,TouchableHighlight,Platform} from 'react-native';
import Users from '../entities/Users'
import firebase from '../entities/FirebaseAPI';
export default class Register extends Component{
  constructor(props){
    super(props);
    this.state={
      //input
      ten:'',// họ và tên người dùng
      sdt:'',// số điện thoại
      mk:'',//mật khẩu
      mkxn:''//nhập lại mật khẩu
    }
  }
  btn_DangKy_Click(){
    //khởi tạo dữ liệu kết nối tới fireabase
    database=firebase.database();
    //trỏ tới bảng table_users
    tb_user=database.ref('db_marketsfarmers/table_users');

    //tạo key-tương đương với id của một users, sdt là duy nhất
    tb_user.push({//số điện thoại ko trùng nhau
      //khi push đây, cái màu xanh lá cây sẽ lưu trên firebase luôn
      //do ko có cấu trúc, nên sai là trên firebase cũng lưu sai,
      //mình lưu theo cấu trúc user entities
      hovaten:this.state.ten,
      matkhau:this.state.mk,
      sdt_mk:this.state.sdt+this.state.mk,//cái này dùng để kiểm tra điều kiện đăng nhập, do ko kiểm tra 2 mục 1 lần, nên kết hợp nó lại thành một
      sdt:this.state.sdt,
      diachi:'',//để trống user chỉnh sửa sau
      email:'',//như trên
      anhbia:'https://firebasestorage.googleapis.com/v0/b/nodejsdemo-d89c7.appspot.com/o/photos%2Fbanner_users%2Fthiennhiendep201633.jpg?alt=media&token=43daf4e8-8d4c-4203-a355-5b121223095c',
      anhdaidien:'https://firebasestorage.googleapis.com/v0/b/nodejsdemo-d89c7.appspot.com/o/photos%2Favatar_users%2Fuserdefault.png?alt=media&token=e6ce673e-4f9e-4819-bd4a-ca3b2a85edf7'
    },()=>{
      var d = new Date();//new time now
      var time = d.toString().slice(4,24);
      tb_user.orderByChild('sdt_mk').equalTo(this.state.sdt+this.state.mk).once('value',(snap)=>{
        snap.forEach((data)=>{
          insert_noti=database.ref('db_marketsfarmers/table_notif/'+data.key);
          insert_noti.child('1').set({
            content:'Chào'+data.val().hovaten+' .Chúc mừng bạn đã đăng ký thành công.',
            state:'dagui',
            time:time,
            title:'Đăng ký thành công',
            type:'system'
          },()=>
            this.props.propsNavigator.push({//push xong rồi chuyển sang màn hình guest,cái này phải lấy uid mới vừa đk để cho màn hình guestmain, mà chưa làm
            screen:'GuestMain',
            uidSession:data.key
          })
          );
        });
      });
  });
}
  btn_BackScreen_Click(){
    this.props.propsNavigator.pop();
  }
  renderInput(){
    if(Platform.OS==='ios'){
      return(
        <View style={{flex:2,padding:15}}>
        {/* INPUT ho va ten - onChangeText để lấy dữ liệu nhập vào lưu vào state  */}
          <Text style={{fontWeight:'bold',fontSize:20,color:'#01579B'}}>Họ và tên:</Text>
          <TextInput onChangeText={(value)=>this.setState({ten:value})}
          style={{borderRadius:5,backgroundColor:'white',fontSize:20,height:45}}
          />
          <Text style={{fontWeight:'bold',fontSize:20,color:'#01579B'}}>Số điện thoại:</Text>
  {/* INPUT số điện thoại */}
          <TextInput onChangeText={(value)=>this.setState({sdt:value})}
          style={{borderRadius:5,backgroundColor:'white',fontSize:20,height:45}}
          />
          <Text style={{fontWeight:'bold',fontSize:20,color:'#01579B'}}>Mật khẩu:</Text>
  {/* INPUT mật khẩu */}
          <TextInput onChangeText={(value)=>this.setState({mk:value})}
          style={{borderRadius:5,backgroundColor:'white',fontSize:20,height:45}}
          />
          <Text style={{fontWeight:'bold',fontSize:20,color:'#01579B'}}>Nhập lại mật khẩu:</Text>
  {/* INPUT xác nhận mật khẩu */}
          <TextInput  onChangeText={(value)=>this.setState({xnmk:value})}
          style={{borderRadius:5,backgroundColor:'white',fontSize:20,height:45}}
          />

          <View style={{flexDirection:'row'}}>
            <View style={{flex:1}}>
            <View style={{height:35,width:'100%',flexDirection:'row',justifyContent:'center',backgroundColor:'red',borderRadius:5,alignItems:'center',marginTop:15}}>
              <TouchableHighlight onPress={()=>this.btn_Huybo_Click()}>
              <Text style={{fontSize:20,color:'white'}}>Huỷ</Text>
              </TouchableHighlight>
              </View>
            </View>
            <View style={{flex:3,marginLeft:10}}>
                <View style={{height:35,width:'100%',flexDirection:'row',justifyContent:'center',backgroundColor:'#03A9F4',borderRadius:5,alignItems:'center',marginTop:15}}>
                  <TouchableHighlight onPress={()=>this.btn_DangKy_Click()}>
                  <Text style={{fontSize:20,color:'white'}}>Đăng nhập</Text>
                  </TouchableHighlight>
                  </View>
            </View>
          </View>
        </View>
      );
    }
    else{
      return(
        <View style={{flex:2,padding:15}}>
        {/* INPUT ho va ten - onChangeText để lấy dữ liệu nhập vào lưu vào state  */}
          <Text style={{fontWeight:'bold',fontSize:20,color:'#01579B'}}>Họ và tên:</Text>
          <TextInput onChangeText={(value)=>this.setState({ten:value})}
          style={{borderRadius:5,backgroundColor:'white',fontSize:20}} underlineColorAndroid="white"/>
          <Text style={{fontWeight:'bold',fontSize:20,color:'#01579B'}}>Số điện thoại:</Text>
  {/* INPUT số điện thoại */}
          <TextInput onChangeText={(value)=>this.setState({sdt:value})}
          style={{borderRadius:5,backgroundColor:'white',fontSize:20}} underlineColorAndroid="white"/>
          <Text style={{fontWeight:'bold',fontSize:20,color:'#01579B'}}>Mật khẩu:</Text>
  {/* INPUT mật khẩu */}
          <TextInput onChangeText={(value)=>this.setState({mk:value})}
          style={{borderRadius:5,backgroundColor:'white',fontSize:20}} underlineColorAndroid="white"/>
          <Text style={{fontWeight:'bold',fontSize:20,color:'#01579B'}}>Nhập lại mật khẩu:</Text>
  {/* INPUT xác nhận mật khẩu */}
          <TextInput  onChangeText={(value)=>this.setState({xnmk:value})}
          style={{borderRadius:5,backgroundColor:'white',fontSize:20}} underlineColorAndroid="white"/>
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
      );
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
      {this.renderInput()}
      </View>
    );
  }

}
AppRegistry.registerComponent('ChoNhaNong_v1',()=>Register);
