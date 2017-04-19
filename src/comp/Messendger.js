import React,{Component} from 'react';
import {AppRegistry,View,Image,TextInput,TouchableHighlight,ListView,Text} from 'react-native';
import ItemInbox from '../item_customer/ItemInbox';
import firebase from '../entities/FirebaseAPI';
export default class Messendger extends Component{
  constructor(props){
    super(props);
    data=[
      {
        contents:'contents1',
        time:'15:30 2/3/2017',
        own:true
      },
      {
        contents:'contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 ',
        time:'15:30 2/3/2017',
        own:false
      },
      {
        contents:'contents3',
        time:'15:30 2/3/2017',
        own:false
      },{
        contents:'contents1',
        time:'15:30 2/3/2017',
        own:true
      },
      {
        contents:'contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 ',
        time:'15:30 2/3/2017',
        own:false
      },
      {
        contents:'contents3',
        time:'15:30 2/3/2017',
        own:false
      },{
        contents:'contents1',
        time:'15:30 2/3/2017',
        own:true
      },
      {
        contents:'contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 ',
        time:'15:30 2/3/2017',
        own:false
      },
      {
        contents:'contents3',
        time:'15:30 2/3/2017',
        own:false
      }];

      const ds=new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
      this.state={
        dataSource:ds.cloneWithRows(data),textip:'',
        txt_noidungtinnhan:'',
      };

  }
  componentWillMount(){
/*
    //list tin nhắn cửa  2 người
    list_messages=[];//rỗng
    //có thay đổi sẽ cập nhật lại
    const ds=new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
    //alert(this.props.us_uid);
    //khởi tạo dữ liệu firebase lấy danh sách tin nhắn
    database=firebase.database();
    tb_listshop=database.ref('db_marketsfarmers/table_messendgers');//trỏ đến chổ table_messendgers
    tb_listshop.orderByChild('uid_2').equalTo('-KhztO4GeK-W-l4VDzNb')
    .limitToLast(10).on('value',(snapshot)=>{
      snapshot.forEach((snap1)=>{
        let tb_listshop_child =tb_listshop=database.ref('db_marketsfarmers/table_messendgers');//trỏ đến chổ table_messendgers
        tb_listshop_child.child(snap1.key).orderByChild(snap1.val().uid_1).equalTo('-Khgu9ScZpRZoX-IxTNV')
        .on('value',(snap1)=>{
          snap1.forEach((data)=>{
            alert(data.val().noidungtinnhan);
          });
        });
      });
      list_messages=[];//cứ mỗi lần thây đổi là phải set nó rỗng chứ ko nó sẽ lặp lại danh sách

      //khi push xong hết rồi set nó vào dataSource của listview
      //this.setState({dataSource:ds.cloneWithRows(list_messages)})
    });
*/

  }
  btn_GuiTinNhanDi_Click(){
    database=firebase.database();
    insert_message=database.ref('db_marketsfarmers/table_messendgers');
    var d = new Date();//new time now
    var time = d.toString().slice(4,24);//cắt chuỗi thòi gian cần ngày thang năm giờ:phut:giay
    //người gửi
    insert_message.child('-Ki-7FYal1djjUuPf8c6')//uid 1
    .child('-KhztO4GeK-W-l4VDzNb')//uid 2
    .push({
      noidungtinnhan:this.state.txt_noidungtinnhan,//nội ding tin nhắn
      thoigiangui:time,//thời gian gửi tin nhắn
      seen_1:true,//user 1 đã xem gửi
      seen_2:false,//user 2 đã xem nhận
      sender:1// người gửi 1:uid_1, 2: là uid_2
    });//sau khi gửi
    //người nhận
    insert_message.child('-KhztO4GeK-W-l4VDzNb')//uid 1 nhận
    .child('-Ki-7FYal1djjUuPf8c6')//uid 2 gửi
    .push({
      noidungtinnhan:this.state.txt_noidungtinnhan,//nội ding tin nhắn
      thoigiangui:time,//thời gian gửi tin nhắn
      seen_1:false,//user 1 đã xem
      seen_2:true,//user 2 đã xem
      sender:2// người gửi 1:uid_1, 2: là uid_2
    },()=>this.AfterSendMessage());//sau khi gửi
  }
  AfterSendMessage(){
    this.setState({
      txt_noidungtinnhan:'',//sét về mặc định cho inputtext rỗng
    });
  }
  render(){

    return(
      <View style={{flex:1,backgroundColor:'#EEEEEE'}}>
        <View style={{flex:1}}>
        <View style={{backgroundColor:'#03A9F4'}}>
        <View style={{flexDirection:'row'}}>
          <View style={{flex:1}}><TouchableHighlight underlayColor='#E0F7FA' onPress={()=>this.btn_Back_Click()} style={{width:40,height:40,marginTop:5,borderRadius:20}}><Image source={require('../img/ic_arrow_back_white_24dp.png')} /></TouchableHighlight></View>
          <View style={{flex:7,paddingLeft:5}}>
{/* SEARCH INPUT */}
          <Text style={{fontSize:20,color:'white',marginTop:10}}>Nguyễn Đức Trung</Text>
          </View>

{/* ICON BUTTON options */}
          <View style={{flex:1}}><TouchableHighlight underlayColor='#E0F7FA' onPress={()=>this.btn_DangNhap_Click()} style={{width:40,height:40,marginTop:5,borderRadius:20}}><Image source={require('../img/ic_more_vert_white_24dp.png')} /></TouchableHighlight></View>
        </View>
        <View style={{height:1,backgroundColor:'#9E9E9Ed4'}}></View>
        <View style={{height:2,backgroundColor:'#BDBDBDc4'}}></View>
        <View style={{height:2,backgroundColor:'#E0E0E0'}}></View>
        </View>
        </View>
        <View style={{flex:12}}>
        <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData)=><ItemInbox inbox={rowData}/>}
        />
      </View>
      <View style={{flex:1,flexDirection:'row'}}>
        <View style={{flex:8,paddingLeft:5,marginTop:5}}>
        <TextInput style={{backgroundColor:'#E0E0E0',borderColor:'#0277BD',borderWidth:1,borderRadius:3,height:38,fontSize:15}} underlineColorAndroid="white" returnKeyType="send"
        value={this.state.txt_noidungtinnhan}
        onChangeText={(value)=>this.setState({txt_noidungtinnhan:value})}
        onSubmitEditing={()=>this.btn_GuiTinNhanDi_Click()}/>
        </View>
        <View style={{flex:1,marginTop:5,paddingLeft:5}}>
        <TouchableHighlight onPress={()=>this.btn_GuiTinNhanDi_Click()}><Image source={require('../img/ic_send_black_24dp.png')} style={{height:35,width:35}}/>
        </TouchableHighlight>
        </View>
        </View>

      </View>
    );
  }
  btn_Back_Click(){
    this.props.propsNavigator.pop();
  }
}
AppRegistry.registerComponent('Component_API_Demo',()=>Messendger);
