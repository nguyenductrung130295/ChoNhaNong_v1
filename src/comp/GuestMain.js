import React,{Component} from 'react';
import {Platform,AsyncStorage,AppRegistry,View,
  Modal,Text,TextInput,Item,TouchableHighlight,Picker,PickerIOS,Button,Image,ListView} from 'react-native';
import ItemListViewStatus from '../item_customer/ItemListViewStatus';
import Users from '../entities/Users'
import firebase from '../entities/FirebaseAPI';
const ds=new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});

export default class GuestMain extends Component{
  constructor(props){
    super(props);//
    muaban=['Mua','Bán'];
    loai=['Trái cây','Gia súc'];
    tinh=['Hà Nội','Nha Trang','Hồ Chí Minh','Cà Mau'];

    const ds=new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
    this.state={
      dataSource:ds.cloneWithRows([]),
      modalVisible:false,
      modalMuahaybanIOS:false,//hiện ẩn modal menu
      modalLoaiSpIOS:false,//hiện ẩn modal menu
      modalTinhTpIOS:false,//hiện ẩn modal menu
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
    idpostTam=' ';//post tạm để nếu post đó đã có thì ko lấy nữa
    table_hinhs=database.ref('db_marketsfarmers/table_hinhs');
    tb_listposts=database.ref('db_marketsfarmers/table_posts');//trỏ đến chổ table_shops
    var postTam=[];//tạm lưu 1 post hiện tại
    table_hinhs.orderByChild('idpost')//xếp theo idpost trong table_hinhs
    .on('value',(snaps)=>{
      snaps.forEach((datahinh)=>{
        if(datahinh.val().idpost!==idpostTam){//idpost mới
          idpostTam=datahinh.val().idpost;//gán vào để phân biệt post khác
          tb_listposts//.orderByChild('idpost_uid_own')//xếp theo idpost_uid_own
          //.equalTo(idpostTam+"_"+this.props.uidSession)//idpost_uid_own===idpostTam_uidsession
          .on('value',(snapshot)=>{
            snapshot.forEach((data)=>{
              flag=0;//chưa tồn tại post trong list

              for(let i=0;i<postTam.length;i++){
                if(postTam[i].idpost===data.val().idpost){
                  //có tồn tại rồi, update lại thôi
                  postTam[i].idpost=data.val().idpost;
                  postTam[i].diachi_t=data.val().diachi_t;
                  postTam[i].giaban=data.val().giaban;
                  postTam[i].loaitien=data.val().loaitien;
                  postTam[i].thoigiandang=data.val().thoigiandang;
                  postTam[i].tieude=data.val().tieude;
                  postTam[i].linkhinh=datahinh.val().linkpost;
                  flag=1;//báo có tồn tại
                }
              }
              if(flag===0){//không tồn tại, thêm mới post vào
                postTam.push({
                  idpost:data.val().idpost,
                  diachi_t:data.val().diachi_t,
                  giaban:data.val().giaban,
                  loaitien:data.val().loaitien,
                  thoigiandang:data.val().thoigiandang,
                  tieude:data.val().tieude,
                  linkhinh:datahinh.val().linkpost
                });
              }

            });
            //thêm vào datasource cho listView in ra
            this.setState({dataSource:ds.cloneWithRows(postTam)});
            //alert(this.state.dataSource.length);
          });
        }
      });
});
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
  renderItemBanIOS(){
    items=[];
    for(let item of muaban){
      items.push(<PickerIOS.Item key={item} label={item} value={item}/>)
    }
    return items;
  }
  renderItemLoaiIOS(){
    items=[];
    for(let item of loai){
      items.push(<PickerIOS.Item key={item} label={item} value={item}/>)
    }
    return items;
  }
  renderItemTinhIOS(){
    items=[];
    for(let item of tinh){
      items.push(<PickerIOS.Item key={item} label={item} value={item}/>)
    }
    return items;
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  render3PickerChoose(){
    if(Platform.OS==='ios'){
      return(

        <View style={{flexDirection:'row',marginTop:5,marginBottom:5}}>
  {/* PICKER BÁN MUA */}
          <View style={{flex:3}}>
          <View style={{marginLeft:5,backgroundColor:'#29b6f6',borderRadius:3,borderColor:'#81D4FA',borderWidth:1}}>
          <Text onPress={()=>this.setState({modalMuahaybanIOS:!this.state.modalMuahaybanIOS})}
                style={{color:'white'}}>{this.state.selected1}</Text>
          <Modal
            animationType={"slide"}
            transparent={true}
            visible={this.state.modalMuahaybanIOS}
            onRequestClose={() => alert("Modal has been closed.")}
            >
           <View style={{flex:1,backgroundColor:'#000000a0'}}>
            <View style={{flex:2}}></View>
            <View style={{flex:2}}>
            <View style={{margin:20,backgroundColor:'white',borderRadius:5}}>
            <View style={{flexDirection:'row',backgroundColor:'#0288D1'}}>
              <View style={{flex:7}}>
                <Text style={{fontSize:20,color:'white',marginLeft:10,marginTop:10}}>Mua hay ban</Text>
              </View>
              <View style={{flex:1}}>
                <TouchableHighlight underlayColor='#E0F7FA' onPress={() => {
                  this.setState({modalMuahaybanIOS:!this.state.modalMuahaybanIOS})
                }} style={{width:40,height:40,marginTop:5,borderRadius:20}}><Image source={require('../img/ic_clear_white_24dp.png')} /></TouchableHighlight>
              </View>
            </View>
            <View>
              <PickerIOS selectedValue={this.state.selected1}
              onValueChange={(value)=>this.setState({selected1:value})}>
                {this.renderItemBanIOS()}
              </PickerIOS>
              </View>
                <View style={{padding: 10}}>
              <Button onPress={()=>this.btn_TaoCuaHangMoi_Click()} title={'Tạo cửa hàng'} color='#03A9F4'></Button>
        </View>
        </View>
            </View>
            <View style={{flex:2}}></View>
           </View>
          </Modal>
          </View>

          </View>
  {/* PICKER LOẠI */}
          <View style={{flex:4}}><View style={{marginLeft:5,backgroundColor:'#29b6f6',borderRadius:3,borderColor:'#81D4FA',borderWidth:1}}>
          <Text onPress={()=>this.setState({modalLoaiSpIOS:!this.state.modalLoaiSpIOS})}
                style={{color:'white'}}>{this.state.selected2}</Text>
          <Modal
            animationType={"slide"}
            transparent={true}
            visible={this.state.modalLoaiSpIOS}
            onRequestClose={() => alert("Modal has been closed.")}
            >
           <View style={{flex:1,backgroundColor:'#000000a0'}}>
            <View style={{flex:1}}></View>
            <View style={{flex:2}}>
            <View style={{margin:20,backgroundColor:'white',borderRadius:5}}>
            <View style={{flexDirection:'row',backgroundColor:'#0288D1'}}>
              <View style={{flex:7}}>
                <Text style={{fontSize:20,color:'white',marginLeft:10,marginTop:10}}>Loai San Pham</Text>
              </View>
              <View style={{flex:1}}>
                <TouchableHighlight underlayColor='#E0F7FA' onPress={() => {
                  this.setState({modalLoaiSpIOS:!this.state.modalLoaiSpIOS})
                }} style={{width:40,height:40,marginTop:5,borderRadius:20}}><Image source={require('../img/ic_clear_white_24dp.png')} /></TouchableHighlight>
              </View>
            </View>

            <View>
            <PickerIOS selectedValue={this.state.selected2} onValueChange={(value)=>this.setState({selected2:value})}>
              {this.renderItemLoaiIOS()}
            </PickerIOS>
            </View>

                <View style={{padding: 10}}>

              <Button onPress={()=>this.btn_TaoCuaHangMoi_Click()} title={'Tạo cửa hàng'} color='#03A9F4'></Button>
          </View>
          </View>
            </View>
            <View style={{flex:1}}></View>
           </View>
          </Modal>
          </View>
          </View>
  {/* PICKER TỈNH THÀNH PHỐ */}
          <View style={{flex:5}}><View style={{marginLeft:5,backgroundColor:'#29b6f6',marginRight:5,borderRadius:3,borderColor:'#81D4FA',borderWidth:1}}>
          <Text onPress={()=>this.setState({modalTinhTpIOS:!this.state.modalTinhTpIOS})}
                style={{color:'white'}}>{this.state.selected3}</Text>
          <Modal
            animationType={"slide"}
            transparent={true}
            visible={this.state.modalTinhTpIOS}
            onRequestClose={() => alert("Modal has been closed.")}
            >
           <View style={{flex:1,backgroundColor:'#000000a0'}}>
            <View style={{flex:1}}></View>
            <View style={{flex:2}}>
            <View style={{margin:20,backgroundColor:'white',borderRadius:5}}>
            <View style={{flexDirection:'row',backgroundColor:'#0288D1'}}>
              <View style={{flex:7}}>
                <Text style={{fontSize:20,color:'white',marginLeft:10,marginTop:10}}>Tinh thanh pho</Text>
              </View>
              <View style={{flex:1}}>
                <TouchableHighlight underlayColor='#E0F7FA' onPress={() => {
                  this.setState({modalTinhTpIOS:!this.state.modalTinhTpIOS})
                }} style={{width:40,height:40,marginTop:5,borderRadius:20}}><Image source={require('../img/ic_clear_white_24dp.png')} /></TouchableHighlight>
              </View>
            </View>
            <View>
            <PickerIOS selectedValue={this.state.selected3} onValueChange={(value)=>this.setState({selected3:value})}>
              {this.renderItemTinhIOS()}
            </PickerIOS>
            </View>

                <View style={{padding: 10}}>

              <Button onPress={()=>this.btn_TaoCuaHangMoi_Click()} title={'Tạo cửa hàng'} color='#03A9F4'></Button>
          </View>
          </View>
            </View>
            <View style={{flex:1}}></View>
           </View>
          </Modal>
          </View>
          </View>
        </View>

      )
    }else{
      return(

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

      );
    }

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
        {this.render3PickerChoose()}
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
        {this.render3PickerChoose()}
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
            <Image source={{uri:this.state.user.anhdaidien}} style={{width:80,height:80,marginTop:25,marginLeft:10,borderColor:'white',borderWidth:1,borderRadius:40}}/>
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
        enableEmptySections={true}
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
      uidSession:this.state.user.uid
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
