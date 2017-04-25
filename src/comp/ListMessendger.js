import React,{Component} from 'react'
import {Text,ListView,AppRegistry,TouchableHighlight,Image,View,Modal,TextInput,Picker,Button} from 'react-native'
import ItemListMessendger from '../item_customer/ItemListMessendger'
import firebase from '../entities/FirebaseAPI'
export default class ListMessendger extends Component{

  constructor(props){
    super(props);

    this.state={
      dataSource:null,//datasource cho ListView
      modalVisible: false,//ẩn hiện modal tạo cửa hàng mới
      txt_sdt_user:'',//input tìm kiếm user qua số điện thoại
      ten_user_found:'',//tên user tìm được,
      uid_user_found:'-1',//uid user tìm được,nếu bằng trừ 1 thì ko render,0 thì render tìm ko thấy,khác cả 2 thì tìm thấy
    };
  }
  //hàm này chạy trước khi render ra màn hình
  componentWillMount(){
    //list shops: danh sách shops rỗng, là mảng các đối tượng shops
    list_inbox=[];
    const ds=new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
    //alert(this.props.us_uid);
    //khởi tạo dữ liệu firebase lấy danh sách shops
    database=firebase.database();
    tb_listshop=database.ref('db_marketsfarmers/table_messendgers');//trỏ đến chổ table_shops
    tb_listshop.child(this.props.uidSession)//this.props.uidSession
    .on('value',(snapshot)=>{

      list_inbox=[];//cứ mỗi lần thây đổi là phải set nó rỗng chứ ko nó sẽ lặp lại danh sách
      snapshot.forEach((data1)=>{

        tb_detaiInbox=database.ref('db_marketsfarmers/table_messendgers/'+this.props.uidSession)
        .child(data1.key).limitToLast(1);//uid2, user 2,ng nhận
        tb_detaiInbox.on('value',(snapshot_detai)=>{
          snapshot_detai.forEach((data_mess)=>{//

            tb_user=database.ref('db_marketsfarmers/table_users');
            tb_user.orderByKey().equalTo(data1.key).limitToLast(1)//uid2
            .on('value',(snap)=>{
              snap.forEach((data2)=>{//infor user 2
                list_inbox.push({//push đối tượng thông tin shops vào list_shop
                  uid_send:this.props.uidSession,
                  hovaten_send:data2.val().hovaten,
                  anhdaidien_send:data2.val().anhdaidien,
                  noidung_last:data_mess.val().noidungtinnhan,
                  seen_1:data_mess.val().seend_1,
                  seen_2:data_mess.val().seend_2,
                  sender:data_mess.val().sender,
                  thoigiangui:data_mess.val().thoigiangui,
                  uid_get:data1.key
                });
              });
            this.setState({dataSource:ds.cloneWithRows(list_inbox)})
          });
        });
        });


      });
      //khi push xong hết rồi set nó vào dataSource của listview
      //this.setState({dataSource:ds.cloneWithRows(list_inbox)})
    });


  }
  btn_TaoCuaHangMoi_Click(){
    //khởi tạo dữ liệu kết nối tới fireabase
    database=firebase.database();
    //trỏ tới bảng table_shops
    tb_shops=database.ref('db_marketsfarmers/table_shops');
    //insert
    tb_shops.push({
      tencuahang:this.state.txt_tencuahangmoi,//ten cửa hàng mới
      loaisp:this.state.loaisp,//loại sản phẩm( picker )
      sdtcuahang:'',//so dien thoại cửa hàng
      diachi_txh:'',//thôn xã huyện
      diachi_t:this.state.diachi_t,//tỉnh/tp (picker)
      score_star:'0',//số sao đánh giá
      anhbiashop:'https://firebasestorage.googleapis.com/v0/b/nodejsdemo-d89c7.appspot.com/o/photos%2Fbanner_users%2Fthiennhiendep201633.jpg?alt=media&token=43daf4e8-8d4c-4203-a355-5b121223095c',
      logoshop:'https://firebasestorage.googleapis.com/v0/b/nodejsdemo-d89c7.appspot.com/o/photos%2Flogo_shops%2Fshops.png?alt=media&token=53c1c3ca-bab4-4a05-94f5-5fbe38972131',
      user_own:this.props.us_uid,//user chủ sở hữu cửa hàng
    },()=>alert('thành công'));// hiện thông báo sau khi làm push xong
  }
  setModalVisible(visible) {
    this.setState({modalVisible:visible});
  }
  renderList(){
    if(this.state.dataSource!==null){
      return(
        <ListView
          dataSource={this.state.dataSource}
          enableEmptySections={true}
          renderRow={(rowData)=><ItemListMessendger propsNavigator={this.props.propsNavigator} obj={rowData}
          ></ItemListMessendger>}
        />
      );
    }else if(this.state.dataSource===null){
      return(
        <View><Text>Waiting</Text></View>
      );
    }

  }
  btn_GuiTinNhan_Search(){
    this.props.propsNavigator.push({
      screen:'Messendger',
      uidSession:this.props.uidSession,
      uidGetMessage:this.state.uid_user_found
    });
  }
  renderResultSearch(){
    if(this.state.uid_user_found==='0'){
      return(
        <Text>Không tìm thấy</Text>
      );
    }else if(this.state.uid_user_found==='-1')
    return null;
    else if(this.state.uid_user_found!=='-1' &&this.state.uid_user_found!=='0' &&this.state.uid_user_found!==null){
      return(
        <View>
          <Text onPress={()=>this.btn_GuiTinNhan_Search()}>{this.state.ten_user_found}</Text>
        </View>
      );
    }
  }
  render(){
    return(
      <View style={{flex:1}}>
      <View style={{backgroundColor:'#03A9F4'}}>
      <View style={{flexDirection:'row'}}>
        <View style={{flex:1}}><TouchableHighlight underlayColor='#E0F7FA' onPress={()=>this.btn_Back_Click()} style={{width:40,height:40,marginTop:5,borderRadius:20}}><Image source={require('../img/ic_arrow_back_white_24dp.png')} /></TouchableHighlight></View>
        <View style={{flex:7,paddingLeft:5}}>
{/* SEARCH INPUT */}
        <Text style={{fontSize:20,color:'white',marginTop:10}}>Nhắn tin</Text>
        </View>

{/* ICON BUTTON options */}
        <View style={{flex:1}}><TouchableHighlight underlayColor='#E0F7FA' onPress={()=>this.btn_DangNhap_Click()} style={{width:40,height:40,marginTop:5,borderRadius:20}}><Image source={require('../img/ic_more_vert_white_24dp.png')} /></TouchableHighlight></View>
      </View>
      <View style={{height:1,backgroundColor:'#9E9E9Ed4'}}></View>
      <View style={{height:2,backgroundColor:'#BDBDBDc4'}}></View>
      <View style={{height:2,backgroundColor:'#E0E0E0'}}></View>
      </View>
      <View style={{flexDirection:'row',marginTop:5,marginBottom:5}}>
        <View style={{flex:5,paddingLeft:10}}>
          <TextInput placeholder="  Số điện thoại..."
          style={{borderRadius:4,borderWidth:1,borderColor:'#BDBDBD',height:38,color:'black'}}
          onChangeText={(value)=>this.setState({txt_sdt_user:value})}
          />
        </View>
        <View style={{flex:2,paddingLeft:10,paddingRight:10,paddingTop:1}}>
          <Button title="Tìm kiếm" onPress={()=>this.btn_TimKiemUserBySdt()} color="orange"/>
        </View>

      </View>
      {this.renderResultSearch()}
      {this.renderList()}

      </View>
    );
  }
  btn_TimKiemUserBySdt(){

    tb_user=database.ref('db_marketsfarmers/table_users');
    tb_user.orderByChild('sdt').equalTo(this.state.txt_sdt_user).limitToLast(1)//uid2
    .on('value',(snap)=>{
      if(snap.exists()){
        snap.forEach((data)=>{//infor user 2
            this.setState({uid_user_found:data.key,ten_user_found:data.val().hovaten});
        });
      }else{
        this.setState({uid_user_found:'0'});
      }

    });
  }
  btn_Back_Click(){
    this.props.propsNavigator.pop();
  }
}
