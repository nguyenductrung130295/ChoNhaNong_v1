import React,{Component} from 'react'
import {Text,ListView,AppRegistry,TouchableHighlight,Image,View,Modal,TextInput,Picker,Button} from 'react-native'
import ItemListMessendger from '../item_customer/ItemListMessendger'
import firebase from '../entities/FirebaseAPI'
import Shops from '../entities/Shops'
export default class ListMessendger extends Component{

  constructor(props){
    super(props);

    this.state={
      dataSource:null,//datasource cho ListView
      modalVisible: false,//ẩn hiện modal tạo cửa hàng mới
      txt_tencuahangmoi:'',//tên cửa hàng mới
      diachi_t:'Hà Nội',//value địa chỉ, thành phố default
      loaisp:'Trái cây',//value loại sản phẩm cửa hàng mặc định
    };
  }
  //hàm này chạy trước khi render ra màn hình
  componentWillMount(){
    //list shops: danh sách shops rỗng, là mảng các đối tượng shops
    list_shop=[];
    const ds=new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
    //alert(this.props.us_uid);
    //khởi tạo dữ liệu firebase lấy danh sách shops
    database=firebase.database();
    tb_listshop=database.ref('db_marketsfarmers/table_shops');//trỏ đến chổ table_shops
    tb_listshop.on('value',(snapshot)=>{
      list_shop=[];//cứ mỗi lần thây đổi là phải set nó rỗng chứ ko nó sẽ lặp lại danh sách
      snapshot.forEach((data)=>{
        list_shop.push({//push đối tượng thông tin shops vào list_shop
          shopid:data.key,
          tencuahang:data.val().tencuahang,
          loaisp:data.val().loaisp,
          diachi_txh:data.val().diachi_txh,
          diachi_t:data.val().diachi_t,
          sdtcuahang:data.val().sdtcuahang,
          score_star:data.val().score_star,
          logoshop:data.val().logoshop,
          anhbiashop:data.val().anhbiashop,
          user_own:data.val().user_own,
        });

      });
      //khi push xong hết rồi set nó vào dataSource của listview
      this.setState({dataSource:ds.cloneWithRows(list_shop)})
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
          style={{borderRadius:4,borderWidth:1,borderColor:'#BDBDBD',height:38,color:'black'}}/>
        </View>
        <View style={{flex:2,paddingLeft:10,paddingRight:10,paddingTop:1}}>
          <Button title="Tìm kiếm" onPress={()=>alert('tìm')} color="orange"/>
        </View>

      </View>
      {this.renderList()}

      </View>
    );
  }
  btn_Back_Click(){
    this.props.propsNavigator.pop();
  }
}
