import React,{Component} from 'react';
import {AsyncStorage,AppRegistry,View,
  Modal,Text,TextInput,Item,TouchableHighlight,Picker,Button,Image,ListView} from 'react-native';
import ItemListViewStatus from '../item_customer/ItemListViewStatus';
import Users from '../entities/Users'
import firebase from '../entities/FirebaseAPI';
export default class GuestMain extends Component{
  constructor(props){
    super(props);//
    muaban=['Mua','Bán'];
    loai=['Trái cây','Gia súc'];
    tinh=['Hà Nội','Nha Trang','Hồ Chí Minh','Cà Mau'];

    data=[
      {
        title:"Dinh Khung",
        imgsrc:"https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-1/c0.27.100.100/p100x100/16298502_1821740334734783_649746552886407600_n.jpg?oh=a82ab51c245047c0493edfc8a4252fac&oe=5930F951",
        price:"120000",
        time:"12-2-2017 15:00",
        address:"Khanh Hoa"

      },
      {
        title:"Dinh Khung",
        imgsrc:"https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-1/c0.27.100.100/p100x100/16298502_1821740334734783_649746552886407600_n.jpg?oh=a82ab51c245047c0493edfc8a4252fac&oe=5930F951",
        price:"120000",
        time:"12-2-2017 15:00",
        address:"Khanh Hoa"

      },
      {
        title:"Dinh Khung",
        imgsrc:"https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-1/c0.27.100.100/p100x100/16298502_1821740334734783_649746552886407600_n.jpg?oh=a82ab51c245047c0493edfc8a4252fac&oe=5930F951",
        price:"120000",
        time:"12-2-2017 15:00",
        address:"Khanh Hoa"

      },
      {
        title:"Trung Khung",
        imgsrc:"https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-1/c0.27.100.100/p100x100/16298502_1821740334734783_649746552886407600_n.jpg?oh=a82ab51c245047c0493edfc8a4252fac&oe=5930F951",
        price:"120000",
        time:"12-2-2017 15:00",
        address:"Khanh Hoa"

      },
      {
        title:"Trung Khung",
        imgsrc:"https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-1/c0.27.100.100/p100x100/16298502_1821740334734783_649746552886407600_n.jpg?oh=a82ab51c245047c0493edfc8a4252fac&oe=5930F951",
        price:"120000",
        time:"12-2-2017 15:00",
        address:"Khanh Hoa"

      },
      {
        title:"Trung Khung",
        imgsrc:"https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-1/c0.27.100.100/p100x100/16298502_1821740334734783_649746552886407600_n.jpg?oh=a82ab51c245047c0493edfc8a4252fac&oe=5930F951",
        price:"120000",
        time:"12-2-2017 15:00",
        address:"Khanh Hoa"

      },
      {
        title:"Trung Khung",
        imgsrc:"https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-1/c0.27.100.100/p100x100/16298502_1821740334734783_649746552886407600_n.jpg?oh=a82ab51c245047c0493edfc8a4252fac&oe=5930F951",
        price:"120000",
        time:"12-2-2017 15:00",
        address:"Khanh Hoa"

      }
    ];
    const ds=new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
    this.state={
      dataSource:ds.cloneWithRows(data),
      modalVisible:false,//hiện ẩn modal menu
      uid:'-1',//
      selected1:'Mua',//mặc định
      selected2:'Trái cây',
      selected3:'Hồ Chí Minh',
      user:new Users(),//state là user mới có thể thay đổi dc
    };


  }
  componentWillMount(){
    //kiểm tra uid session
    if(this.props.uidSession!=='0' && this.props.uidSession!=='-1'){//
      //khởi tạo firebase để lấy thông tin user từ uid đó
      database=firebase.database();
      tb_user=database.ref('db_marketsfarmers/table_users');
      //tạo user tạm us
      us=new Users();
      //orderByKey để chọn cột key,
      tb_user.orderByKey().equalTo(this.props.uidSession).on('value',(snap)=>{
          if(snap.exists()){//kiểm tra tồn tại user
            snap.forEach((data)=>{//data là 1 user lấy dc trong danh sách user trong list snap
              //lưu thông tin vào user tạm us
              us.uid=data.key;
              us.hovaten=data.val().hovaten;
              us.sdt=data.val().sdt;
              us.diachi=data.val().diachi;
              us.email=data.val().email;
              us.anhdaidien=data.val().anhdaidien;
              us.anhbia=data.val().anhbia;
            });
            //sau khi lấy thông tin user ở code trên lưu vào state.user
            this.setState({user:us});
          }
          else{
            alert('firebase error');
          }
      });

    }
  }
  renderItemBan(){
    items=[];
    for(let item of muaban){
      items.push(<Picker.Item key={item} label={item} value={item}/>)
    }
    return items;
  }
  renderItemLoai(){
    items=[];
    for(let item of loai){
      items.push(<Picker.Item key={item} label={item} value={item}/>)
    }
    return items;
  }
  renderItemTinh(){
    items=[];
    for(let item of tinh){
      items.push(<Picker.Item key={item} label={item} value={item}/>)
    }
    return items;
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  Logined(){

//nếu uid =0 tức là chưa đăng nhập thì hiện ra ko có modal menu
//cái này dành cho người dùng tìm kiếm mà ko cần đăng nhập
    if(this.props.uidSession==='0'){
      return(
        <View style={{backgroundColor:'#03A9F4'}}>
        <View style={{flexDirection:'row'}}>
          <View style={{flex:7,paddingLeft:5}}>
{/* SEARCH INPUT */}
          <TextInput underlineColorAndroid="#29b6f6" style={{color:'white',borderColor:'#81D4FA',borderWidth:1,backgroundColor:'#29b6f6',borderRadius:5,height:38,fontSize:15,marginTop:5}} returnKeyType={'search'} placeholder="  search" onSubmitEditing={()=>this.btn_TimKiem_Click()}/>
          </View>
{/* ICON BUTTON SEARCH */}
          <View style={{flex:1}}><TouchableHighlight underlayColor='#E0F7FA' onPress={()=>this.btn_TimKiem_Click()} style={{width:40,height:40,marginTop:5,borderRadius:20}}><Image source={require('../img/ic_search_white_24dp.png')} /></TouchableHighlight></View>
{/* ICON BUTTON ACCOUNT */}
          <View style={{flex:1}}><TouchableHighlight underlayColor='#E0F7FA' onPress={()=>this.btn_DangNhap_Click()} style={{width:40,height:40,marginTop:5,borderRadius:20}}><Image source={require('../img/ic_person_white_24dp.png')} /></TouchableHighlight></View>
        </View>
        <View style={{flexDirection:'row',marginTop:5,marginBottom:5}}>
{/* PICKER BÁN MUA */}
          <View style={{flex:3}}><View style={{marginLeft:5,backgroundColor:'#29b6f6',borderRadius:3,borderColor:'#81D4FA',borderWidth:1}}>
          <Picker style={{color:'white',height:30}} selectedValue={this.state.selected} onValueChange={(value)=>this.setState({selected:value})}>
            {this.renderItemBan()}
          </Picker></View>
          </View>
{/* PICKER LOẠI */}
          <View style={{flex:4}}><View style={{marginLeft:5,backgroundColor:'#29b6f6',borderRadius:3,borderColor:'#81D4FA',borderWidth:1}}>
          <Picker style={{color:'white',height:30}} mode='dropdown' selectedValue={this.state.selected} onValueChange={(value)=>this.setState({selected:value})}>
            {this.renderItemLoai()}
          </Picker></View>
          </View>
{/* PICKER TỈNH THÀNH PHỐ */}
          <View style={{flex:5}}><View style={{marginLeft:5,backgroundColor:'#29b6f6',marginRight:5,borderRadius:3,borderColor:'#81D4FA',borderWidth:1}}>
          <Picker style={{color:'white',height:30}}rr selectedValue={this.state.selected} onValueChange={(value)=>this.setState({selected:value})}>
            {this.renderItemTinh()}
          </Picker></View>
          </View>
        </View>
        <View style={{height:1,backgroundColor:'#9E9E9Ed4'}}></View>
        <View style={{height:2,backgroundColor:'#BDBDBDc4'}}></View>
        <View style={{height:2,backgroundColor:'#E0E0E0'}}></View>
        </View>

      );

    }
    else if(this.props.uidSession!==' ' && this.props.uidSession!=='-1' && this.props.uidSession!==null){
//đã đăng nhập: render ra modal chứa menu
      return (
        <View>
        <View style={{backgroundColor:'#03A9F4'}}>
        <View style={{flexDirection:'row'}}>
          <View style={{flex:1}}><TouchableHighlight underlayColor='#E0F7FA' onPress={()=>this.btn_Menu_Click()} style={{width:40,height:40,marginTop:5,borderRadius:20}}><Image source={require('../img/ic_reorder_white_24dp.png')} /></TouchableHighlight></View>
          <View style={{flex:7,paddingLeft:5}}>
{/* SEARCH INPUT */}
          <TextInput underlineColorAndroid="#29b6f6" style={{color:'white',borderColor:'#81D4FA',borderWidth:1,backgroundColor:'#29b6f6',borderRadius:5,height:38,fontSize:15,marginTop:5}} returnKeyType={'search'} placeholder="  search" onSubmitEditing={()=>this.btn_TimKiem_Click()}/>
          </View>
{/* ICON BUTTON SEARCH */}
          <View style={{flex:1}}><TouchableHighlight underlayColor='#E0F7FA' onPress={()=>this.btn_TimKiem_Click()} style={{width:40,height:40,marginTop:5,borderRadius:20}}><Image source={require('../img/ic_search_white_24dp.png')} /></TouchableHighlight></View>
{/* ICON BUTTON RING */}
          <View style={{flex:1}}><TouchableHighlight underlayColor='#E0F7FA' onPress={()=>this.btn_DangNhap_Click()} style={{width:40,height:40,marginTop:5,borderRadius:20}}><Image source={require('../img/ic_notifications_none_white_24dp.png')} /></TouchableHighlight></View>
        </View>
        <View style={{flexDirection:'row',marginTop:5,marginBottom:5}}>
{/* PICKER BÁN MUA */}
          <View style={{flex:3}}><View style={{marginLeft:5,backgroundColor:'#29b6f6',borderRadius:3,borderColor:'#81D4FA',borderWidth:1}}>
          <Picker style={{color:'white',height:30}} selectedValue={this.state.selected} onValueChange={(value)=>this.setState({selected:value})}>
            {this.renderItemBan()}
          </Picker></View>
          </View>
{/* PICKER LOẠI */}
          <View style={{flex:4}}><View style={{marginLeft:5,backgroundColor:'#29b6f6',borderRadius:3,borderColor:'#81D4FA',borderWidth:1}}>
          <Picker style={{color:'white',height:30}} mode='dropdown' selectedValue={this.state.selected} onValueChange={(value)=>this.setState({selected:value})}>
            {this.renderItemLoai()}
          </Picker></View>
          </View>
{/* PICKER TỈNH THÀNH PHỐ */}
          <View style={{flex:5}}><View style={{marginLeft:5,backgroundColor:'#29b6f6',marginRight:5,borderRadius:3,borderColor:'#81D4FA',borderWidth:1}}>
          <Picker style={{color:'white',height:30}}rr selectedValue={this.state.selected} onValueChange={(value)=>this.setState({selected:value})}>
            {this.renderItemTinh()}
          </Picker></View>
          </View>
        </View>
        <View style={{height:1,backgroundColor:'#9E9E9Ed4'}}></View>
        <View style={{height:2,backgroundColor:'#BDBDBDc4'}}></View>
        <View style={{height:2,backgroundColor:'#E0E0E0'}}></View>
        </View>

{/* modal menu nè */}
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{flex:1,flexDirection:'row'}}>
          <View style={{flex:2,backgroundColor:'#FFF9C4'}}>
          {/* load ảnh bìa, ảnh đại diện, tên người dùng vào menu  từ state.user đã lấy thông tin lúc nãy*/}
          <Image source={{uri:this.state.user.anhbia}} style={{width:'100%',height:150,borderBottomWidth:1,borderColor:'gray'}}>
            <Image source={{uri:this.state.user.anhdaidien}} style={{width:80,height:80,marginTop:25,marginLeft:10,borderColor:'white',borderWidth:1,borderRadius:100}}/>
            <Text style={{color:'white',fontSize:20,marginTop:5,marginLeft:10}}>{this.state.user.hovaten}</Text>
</Image>
            <TouchableHighlight  onPress={()=>this.btn_TinNhan_Click()}>
              <View style={{flexDirection:'row',borderBottomWidth:1,borderBottomColor:'#BDBDBD',height:55}}>
              <Image source={require('../img/messendger.png')} style={{width:50,height:50,marginTop:3,marginLeft:5}}/>
              <Text style={{color:'black',fontSize:20,marginLeft:10,marginTop:15}}>Tin nhắn</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => this.btn_CuaHang_Click()}>
              <View style={{flexDirection:'row',borderBottomWidth:1,borderBottomColor:'#BDBDBD',height:55}}>
              <Image source={require('../img/shops.png')} style={{width:50,height:50,marginTop:3,marginLeft:5}}/>
              <Text style={{color:'black',fontSize:18,marginLeft:10,marginTop:15}}>Cửa hàng</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <View style={{flexDirection:'row',borderBottomWidth:1,borderBottomColor:'#BDBDBD',height:55}}>
              <Image source={require('../img/favorite.png')} style={{width:50,height:50,marginTop:3,marginLeft:5}}/>
              <Text  style={{color:'black',fontSize:18,marginLeft:10,marginTop:15}}>Đang theo dỏi</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <View style={{flexDirection:'row',borderBottomWidth:1,borderBottomColor:'#BDBDBD',height:55}}>
              <Image source={require('../img/calendar.png')} style={{width:50,height:50,marginTop:3,marginLeft:5}}/>
              <Text  style={{color:'black',fontSize:18,marginLeft:10,marginTop:15}}>Sự kiện</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => this.btn_CaNhan_Click()}>
              <View style={{flexDirection:'row',borderBottomWidth:1,borderBottomColor:'#BDBDBD',height:55}}>
              <Image source={require('../img/user.png')} style={{width:50,height:50,marginTop:3,marginLeft:5}}/>
              <Text  style={{color:'black',fontSize:18,marginLeft:10,marginTop:15}}>Cá nhân</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <View style={{flexDirection:'row',borderBottomWidth:1,borderBottomColor:'#BDBDBD',height:55}}>
              <Image source={require('../img/support.png')} style={{width:50,height:50,marginTop:3,marginLeft:5}}/>
              <Text  style={{color:'black',fontSize:18,marginLeft:10,marginTop:15}}>Trợ giúp</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => {
              this.btn_Caidat_Click()
            }}>
              <View style={{flexDirection:'row',borderBottomWidth:1,borderBottomColor:'#BDBDBD',height:55}}>
              <Image source={require('../img/settings.png')} style={{width:50,height:50,marginTop:3,marginLeft:5}}/>
              <Text style={{color:'black',fontSize:18,marginLeft:10,marginTop:15}}>Cài đặt</Text>
              </View>
            </TouchableHighlight>


            <TouchableHighlight onPress={() => this.btn_DangXuat_Click()}>
              <View style={{flexDirection:'row',borderBottomWidth:1,borderBottomColor:'#BDBDBD',height:55}}>
              <Image source={require('../img/logout.png')} style={{width:50,height:50,marginTop:3,marginLeft:5}}/>
              <Text style={{color:'black',fontSize:18,marginLeft:10,marginTop:15}}>Đăng xuất</Text>
              </View>
            </TouchableHighlight>

          </View>
          <TouchableHighlight underlayColor='#ffffff00' style={{flex:1,backgroundColor:'#212121a0'}} onPress={() => {
            this.setModalVisible(!this.state.modalVisible)
          }}><View></View></TouchableHighlight>
         </View>

        </Modal>
        </View>

      );
    };

  }
  render(){

    return(
      <View style={{backgroundColor:'#E0E0E0',flex:1}}>
{this.Logined(this)}

      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData)=><ItemListViewStatus propsNavigator={this.props.propsNavigator} obj={rowData}

        ></ItemListViewStatus>}
      />
      </View>

    );
  }
  btn_DangXuat_Click(){
    this.setModalVisible(false);
    AsyncStorage.setItem('uid_store','0');//đăng xuất , lưu uid_store chứa uid user thành 0
    this.props.propsNavigator.push({
      screen:'Login'
    });
  }
  btn_DangNhap_Click(){
    this.props.propsNavigator.push({
      screen:'Login'
    });
  }
  btn_TimKiem_Click(){
    alert('button Tim Kiem is clicked');
  }
  btn_Menu_Click(){
    this.setModalVisible(true);
  }
  btn_TinNhan_Click(){
    this.setModalVisible(!this.state.modalVisible);
    this.props.propsNavigator.push({
      screen:'ListMessendger',
      uidSession:this.state.user.uid
    });
  }
  btn_Caidat_Click(){
    this.setModalVisible(!this.state.modalVisible);
    this.props.propsNavigator.push({
      screen:'ListUser_Admin'
    });
  }
  btn_CuaHang_Click(){
    this.setModalVisible(!this.state.modalVisible);
    this.props.propsNavigator.push({
      screen:'ListShops',//chạy tới màn hình tiếp
      userSession:{//gửi thông tin user qua màn hình tiếp theo, thấy sida chưa
        us_hovaten:this.state.user.hovaten,
        us_uid:this.state.user.uid,
        us_sdt:this.state.user.sdt,
        us_diachi:this.state.user.diachi,
        us_anhbia:this.state.user.anhbia,
        us_anhdaidien:this.state.user.anhdaidien,
        us_email:this.state.user.email
      }
    });
  }
  btn_CaNhan_Click(){
    this.setModalVisible(!this.state.modalVisible);
    this.props.propsNavigator.push({
      screen:'InfoPersonal',
      //làm đi, gửi uidSession qua, thôi để tui làm mẫu, chưa có chổ nào làm đâu mà tìm
      uidSession:this.state.user.uid
    });
  }

}
