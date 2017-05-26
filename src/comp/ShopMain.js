import React,{Component} from 'react';
import {AppRegistry,View,Image,Text,TouchableHighlight,ListView,Button,Modal} from 'react-native';
import ItemListViewStatus from '../item_customer/ItemListViewStatus';
import ItemShowAllImage from '../item_customer/ItemShowAllImage'
import AddPostNew from './AddPostNew'
import firebase from '../entities/FirebaseAPI'
import Shops from '../entities/Shops'
import Users from '../entities/Users'
const ds=new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
const database=firebase.database();

export default class ShopMain extends Component{

  constructor(props){
    super(props);
    this.state={
      dataSource:ds.cloneWithRows([]),
      imgyes:false,
      options:1,//1:bài đăng,2:thông tin,3:ảnh
      mysefl:false,//false: là khách xem ,true: là ban than ca nhan ho xem minh
      modalVisible1: false,
      modalVisible2: false,
      shop:new Shops(),
      user_sohuu:new Users(),
    }
  }
  componentWillMount(){

    tb_shop=database.ref('db_marketsfarmers/table_shops');
    sh=new Shops();

    tb_shop.orderByKey().equalTo(this.props.sid).on('value',(snap)=>{
      if(snap.exists()){
        snap.forEach((data)=>{
          sh.shopid=data.key;
          sh.tencuahang=data.val().tencuahang;
          sh.loaisp=data.val().loaisp;
          sh.diachi_txh=data.val().diachi_txh;
          sh.diachi_t=data.val().diachi_t;
          sh.sdtcuahang=data.val().sdtcuahang;
          sh.score_star=data.val().score_star;
          sh.logoshop=data.val().logoshop;
          sh.anhbiashop=data.val().anhbiashop;
          sh.user_own=data.val().user_own;
        });
        this.setState({shop:sh});
        tb_user=database.ref('db_marketsfarmers/table_users');
        us=new Users();
        tb_user.orderByKey().equalTo(sh.user_own).on('value',(snap)=>{
          if(snap.exists()){
            snap.forEach((data)=>{
              us.uid=data.key;
              us.hovaten=data.val().hovaten;
              us.sdt=data.val().sdt;
              //us.diachi=data.val().diachi;
              //us.email=data.val().email;
              us.anhdaidien=data.val().anhdaidien;
              //us.anhbia=data.val().anhbia;
            });
            this.setState({user:us});
          }
          else{
            alert('firebase get user error');
          }
        });
      }
      else{
        alert('firebase error');
      }
  });

  tb_listposts=database.ref('db_marketsfarmers/table_posts');//trỏ đến chổ table_shops
  var postTam=[];//tạm lưu 1 post hiện tại

        tb_listposts.orderByChild('idshop_own')//xếp theo idpost_uid_own
        .equalTo(this.props.sid)//idpost_uid_own===idpostTam_uidsession
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
                //postTam[i].linkhinh=datahinh.val().linkpost;
                flag=1;//báo có tồn tại
                table_hinhs=database.ref('db_marketsfarmers/table_posts/'+data.key+'/images/');
                table_hinhs.limitToFirst(1).on('value',(snapHinh)=>{
                  snapHinh.forEach((datahinh)=>{
                    //alert(datahinh.val().linkpost);
                    postTam[i].linkhinh=datahinh.val().linkpost;
                  });
                });

              }
            }
            //console.log(datahinh.val().linkpost);
            if(flag===0){//không tồn tại, thêm mới post vào
              table_hinhs=database.ref('db_marketsfarmers/table_posts/'+data.key+'/images/');
              table_hinhs.limitToFirst(1).on('value',(snapHinh)=>{
                snapHinh.forEach((datahinh)=>{
                  //alert(datahinh.val().linkpost);
                  postTam.push({
                    idpost:data.val().idpost,
                    diachi_t:data.val().diachi_t,
                    giaban:data.val().giaban,
                    loaitien:data.val().loaitien,
                    thoigiandang:data.val().thoigiandang,
                    tieude:data.val().tieude,
                    linkhinh:datahinh.val().linkpost
                  });
                });
              });

            }

          });
          //thêm vào datasource cho listView in ra
          this.setState({dataSource:ds.cloneWithRows(postTam)});
          //alert(this.state.dataSource.length);
        });
  }
  setModalVisible1(visible) {
    this.setState({modalVisible1:visible});
  }
  setModalVisible2(visible) {
    this.setState({modalVisible2:visible});
  }
  yesImg(){
    if(this.state.imgyes){
      return(
        <Text onPress={()=>alert('doi anh')} style={{color:'red'}}>Đổi ảnh</Text>
      );
    }else{
      return(
        <Text onPress={()=>alert('thêm anh')} style={{color:'red'}}>Thêm ảnh</Text>
      );
    }
  }

  render(){
    return(
      <View style={{flex:1}}>
        <View style={{flex:1}}>
          <Image style={{width:'100%',height:'100%'}}
            source={{uri:this.state.shop.anhbiashop}}>
          <View style={{flexDirection:'row',backgroundColor:'#00000030'}}>
            <View style={{flex:1}}>
              <TouchableHighlight underlayColor='pink' onPress={()=>this.btn_Back_Click()}>
                <Image source={require('../img/ic_arrow_back_white_24dp.png')} style={{width:40,height:40,marginTop:5}}/>
              </TouchableHighlight></View>
            <View style={{flex:5}}>
            </View>
            <View style={{flex:1}}><TouchableHighlight underlayColor='pink' onPress={()=>this.btn_Event_Click()}>
              <Image source={require('../img/ic_event_white_24dp.png')} style={{width:40,height:40,marginTop:5}}/>
            </TouchableHighlight></View>
            <View style={{flex:1}}><TouchableHighlight underlayColor='pink' onPress={()=>this.btn_SendMessage_Click()}>
              <Image source={require('../img/ic_message_white_24dp.png')} style={{width:40,height:40,marginTop:5}}/>
            </TouchableHighlight></View>
          </View>
            <View style={{flexDirection:'row'}}>
              <View style={{flex:3}}>
                <Image style={{width:100,height:100,borderRadius:5,borderWidth:2,borderColor:'white',marginLeft:15,marginTop:40}}
                source={{uri:this.state.shop.logoshop}}/>
              </View>
              <View style={{flex:1}}></View>
            </View>

            <View style={{flexDirection:'row',height:40,backgroundColor:'#00000030'}}>
            <View style={{flex:6}}>
            <Text style={{marginLeft:10,marginTop:5,color:'white',fontSize:20}}>{this.state.shop.tencuahang}
            </Text>
              </View>
              <View style={{flex:2,paddingRight:10,paddingBottom:3,flexDirection:'row'}}>
<Image source={require('../img/ic_people_white_24dp.png')} style={{width:30,height:30,marginTop:5}}/>
<Text style={{color:'white'}}>20.0000 {"\n"} theo dõi</Text>
              </View>
            </View>
            </Image>

        </View>

        <View style={{flex:2,backgroundColor:'#E0E0E0'}}>
        <View style={{flexDirection:'row',height:40,backgroundColor:'#0288D1'}}>
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text style={{color:'white',fontSize:18}} onPress={()=>this.btn_ShowTabBaiDang()}>Bài Đăng</Text></View>
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text style={{color:'white',fontSize:18}} onPress={()=>this.btn_ShowTabThongTin()}>Thông Tin</Text></View>
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text style={{color:'white',fontSize:18}} onPress={()=>this.btn_ShowTabAnh()}>Ảnh</Text></View>
        </View>
        <View style={{height:1,backgroundColor:'#9E9E9Ed4'}}></View>
        <View style={{height:2,backgroundColor:'#BDBDBDc4'}}></View>
        <View style={{height:2,backgroundColor:'#E0E0E0'}}></View>
        {this._renderOptions()}
                <View style={{height:73,width:72,borderRadius:100,backgroundColor:'#BDBDBD',position: 'absolute',
                bottom: 50,
                right:20,}}><TouchableHighlight onPress={() => {
                  this.props.propsNavigator.push({
                    screen:'AddPostNew',
                    uidSession:this.props.uidSession,
                    sid:this.props.sid
                  });
                }}>

                <View style={{backgroundColor: '#0288D1',
              height: 70,
              width: 70,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: 'black',
              shadowOpacity: 1,
              shadowRadius: 2,
              shadowOffset: {
              height: 1,
              width: 1
              }}}>

                <Image source={require('../img/ic_add_white_24dp.png')} style={{width:50,height:50,borderRadius:100}}/>
                </View>
                </TouchableHighlight>
                      </View>
                      <Modal
                        animationType={"slide"}
                        transparent={true}
                        visible={this.state.modalVisible1}
                        onRequestClose={() => alert("Modal has been closed.")}
                        >
                       <View style={{flex:1,backgroundColor:'#000000a0'}}>
                        <View style={{flex:1}}></View>
                        <View style={{flex:2}}>
                        <View style={{margin:20,backgroundColor:'white',borderRadius:5}}>
                        <View style={{flexDirection:'row',backgroundColor:'#0288D1'}}>
                          <View style={{flex:7}}>
                            <Text style={{fontSize:20,color:'white',marginLeft:10,marginTop:10}}>Sự kiện của Cửa hàng</Text>
                          </View>
                          <View style={{flex:1}}>
                            <TouchableHighlight underlayColor='#E0F7FA' onPress={() => {
                              this.setModalVisible1(!this.state.modalVisible1)
                            }} style={{width:40,height:40,marginTop:5,borderRadius:20}}><Image source={require('../img/ic_clear_white_24dp.png')} /></TouchableHighlight>
                          </View>
                        </View>
                        <View style={{flexDirection:'row'}}>
                          <View style={{flex:1}}>
                            <Image source={require('../img/thaole.jpg')} style={{width:40,height:40,marginTop:10,marginLeft:10,borderColor:'white',borderWidth:1,borderRadius:100}}/>
                          </View>
                          <View style={{flex:3,borderColor:'#BDBDBD'}}>

                          </View>
                          <View style={{flex:4}}>

                          </View>
                        </View>

                            <View style={{padding: 10}}>

                          <Button onPress={()=>this.btn_DangNhap_Click()} title={'Đăng Ký'} color='#03A9F4'></Button>
                    </View>
                    </View>
                        </View>
                        <View style={{flex:1}}></View>
                       </View>
                      </Modal>

        </View>


      </View>
    );
  }
  _renderOptions(){
    switch (this.state.options) {
      case 1:
          return(
            <View>
            <ListView
              dataSource={this.state.dataSource}
              enableEmptySections={true}
              renderRow={(rowData)=><ItemListViewStatus obj={rowData}

              ></ItemListViewStatus>}
            />

            </View>
          );
        break;
      case 2:
      return(
        <View style={{padding:10}}>
        <View style={{flexDirection:'row',margin:5,justifyContent:'center',borderBottomWidth:1,borderBottomColor:'gray'}}>
          <Image source={require('../img/ic_star_black_24dp.png')} style={{width:40,height:40,marginRight:5}}/>
          <Image source={require('../img/ic_star_black_24dp.png')} style={{width:40,height:40,marginRight:5}}/>
          <Image source={require('../img/ic_star_black_24dp.png')} style={{width:40,height:40,marginRight:5}}/>
          <Image source={require('../img/ic_star_half_black_24dp.png')} style={{width:40,height:40,marginRight:5}}/>
          <Image source={require('../img/ic_star_border_black_24dp.png')} style={{width:40,height:40,marginRight:5}}/>
          <Text style={{fontSize:18,fontWeight:'bold'}}>{this.state.shop.score_star}</Text>

        </View>
        <View style={{height:30,marginLeft:10,flexDirection:'row',marginBottom:5,justifyContent:'center'}}>
        <Button title="đánh giá" onPress={()=>this.setModalVisible2(true)} color='#FFA000'></Button><Text>   </Text>
        <Button title="theo dõi" onPress={()=>alert('theo dõi')} color='#FF3D00'></Button>
        </View>
        <TouchableHighlight>
          <View style={{flexDirection:'row',margin:5,borderBottomWidth:1,borderBottomColor:'gray'}}>
            <Image source={require('../img/favorite.png')} style={{width:30,height:30,marginRight:5}}/>
            <Text style={{fontSize:18,fontWeight:'bold'}}>Lời giới thiệu: </Text>
            <Text style={{fontSize:18}}>{this.state.shop.gioithieu}</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight>
          <View style={{flexDirection:'row',margin:5,borderBottomWidth:1,borderBottomColor:'gray'}}>
            <Image source={require('../img/thaole.jpg')} style={{width:30,height:30,marginRight:5}}/>
            <Text style={{fontSize:18,fontWeight:'bold'}}>Tên cửa hàng: </Text>
            <Text style={{fontSize:18}}>{this.state.shop.tencuahang}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight>
          <View style={{flexDirection:'row',margin:5,borderBottomWidth:1,borderBottomColor:'gray'}}>
            <Image source={require('../img/thaole.jpg')} style={{width:30,height:30,marginRight:5}}/>
<Text style={{fontSize:18,fontWeight:'bold'}}>Số điện thoại: </Text>
            <Text style={{fontSize:18}}>{this.state.shop.sdtcuahang}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight>
          <View style={{flexDirection:'row',margin:5,borderBottomWidth:1,borderBottomColor:'gray'}}>
            <Image source={require('../img/thaole.jpg')} style={{width:30,height:30,marginRight:5}}/>
<Text style={{fontSize:18,fontWeight:'bold'}}>Địa chỉ: </Text>
            <Text style={{fontSize:18}}>{this.state.shop.diachi_txh}-{this.state.shop.diachi_t}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight>
          <View style={{flexDirection:'row',margin:5,borderBottomWidth:1,borderBottomColor:'gray'}}>
            <Image source={{uri:this.state.user.anhdaidien}}
            style={{width:30,height:30,marginRight:5}}/>
            <Text style={{fontSize:18,fontWeight:'bold'}}>Chủ sở hữu: </Text>
            <Text style={{fontSize:18}}>{this.state.user.hovaten}</Text>
          </View>
        </TouchableHighlight>
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalVisible2}
          onRequestClose={() => alert("Modal has been closed.")}
          >
         <View style={{flex:1,backgroundColor:'#000000a0'}}>
          <View style={{flex:1}}></View>
          <View style={{flex:2}}>
          <View style={{margin:20,backgroundColor:'white',borderRadius:5}}>
          <View style={{flexDirection:'row',backgroundColor:'#0288D1'}}>
            <View style={{flex:7}}>
              <Text style={{fontSize:20,color:'white',marginLeft:10,marginTop:10}}>Đánh giá cửa hàng</Text>
            </View>
            <View style={{flex:1}}>
              <TouchableHighlight underlayColor='#E0F7FA' onPress={() => {
                this.setModalVisible2(!this.state.modalVisible2)
              }} style={{width:40,height:40,marginTop:5,borderRadius:20}}><Image source={require('../img/ic_clear_white_24dp.png')} /></TouchableHighlight>
            </View>
          </View>
          <View style={{flexDirection:'row',margin:5,justifyContent:'center',borderBottomWidth:1,borderBottomColor:'gray'}}>
            <Image source={require('../img/ic_star_black_24dp.png')} style={{width:40,height:40,marginRight:5}}/>
            <Image source={require('../img/ic_star_black_24dp.png')} style={{width:40,height:40,marginRight:5}}/>
            <Image source={require('../img/ic_star_black_24dp.png')} style={{width:40,height:40,marginRight:5}}/>
            <Image source={require('../img/ic_star_half_black_24dp.png')} style={{width:40,height:40,marginRight:5}}/>
            <Image source={require('../img/ic_star_border_black_24dp.png')} style={{width:40,height:40,marginRight:5}}/>
            <Text style={{fontSize:18,fontWeight:'bold'}}> 4.5</Text>

          </View>

              <View style={{padding: 10}}>

            <Button onPress={()=>this.btn_DangNhap_Click()} title={'đánh giá'} color='#03A9F4'></Button>
        </View>
        </View>
          </View>
          <View style={{flex:1}}></View>
         </View>
        </Modal>

        </View>
      );
      break;
      case 3:
      return(
        <ItemShowAllImage/>
      );
      break;
    };
  }
  ShowInboxButton(){
    if(this.state.mysefl){
      return(
        <View>
          <Text>ShowModalButtonFloat,EditInfor</Text>
        </View>
      );

    }else{
      return(
<TouchableHighlight underlayColor='pink' onPress={()=>this.btn_Back_Click()}>
        <View style={{flexDirection:'row'}}>
<Image source={require('../img/calendar.png')} style={{width:40,height:40,marginRight:10}}/>
<Image source={require('../img/messendger.png')} style={{width:40,height:40}}/>
        </View>
        </TouchableHighlight>
      );
    }
  }
  btn_SendMessage(){
    this.props.propsNavigator.push({
      screen:'Messendger'
    })
  }
  btn_Event_Click(){
    this.setModalVisible1(true);
  }
  btn_ShowTabBaiDang(){
    this.setState({options:1});
  }
  btn_ShowTabThongTin(){
this.setState({options:2});
  }
  btn_ShowTabAnh(){
this.setState({options:3});
  }
  btn_Back_Click(){
    this.props.propsNavigator.pop();
  }
}

AppRegistry.registerComponent('Component_API_Demo',()=>InfoPersonal);
