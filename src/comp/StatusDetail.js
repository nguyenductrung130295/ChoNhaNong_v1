import React ,{Component} from 'react';
import {AppRegistry,Picker,Modal,Button,Text,Image,View,ListView,TextInput,TouchableHighlight,ScrollView} from 'react-native';
import ItemCommand from '../item_customer/ItemCommand';
import firebase from '../entities/FirebaseAPI';
import Users from '../entities/Users';
import Posts from '../entities/Posts';
import ImageViewer from 'react-native-image-zoom-viewer';
import DateTimePicker from 'react-native-modal-datetime-picker';
const ds=new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
export default class StatusDetail extends Component{
  constructor(props){
    super(props);

    this.state={
      isDateTimePickerVisiblebd: false,//cho cái chọn ngày thời gian ẩn hiện
      isDateTimePickerVisiblekt: false,//cho cái chọn ngày thời gian ẩn hiện
      datedb:'bắt đầu',//ngày sự kiện bắt đầu
      datekt:'kết thúc',//ngày sự  kiện kết thúc
      modalVisible: false,//ẩn hiện modal tạo cửa hàng mới
      dataSource:ds.cloneWithRows([]),
      cur_img:-1,// thứ tự image dang hien trong cái xem hinh ở trên màn hình
      sum_img:0,//tổng image trong arrayImage
      arrayImage:[],//mảng chứa đường dẫn ảnh
      show:false,//false thì button expand more,ẩn nội dung
      //post_hinh:[],//array hình của post
      postState:new Posts(),//object Post
      txt_command:'',//noi dung command post
      key:'',//key post current
      user:new Users(),//state là user session có thể thay đổi dc
      user_own:new Users(),//state là user sở hữu bài đăng có thể thay đổi dc
      modalImage:false,//modal xem full image
      imagesModal:[],//mảng chứa hình cho ImageViewer
      Isfollow:'Theo dõi',//trạng thái đang theo dõi hay không
      txt_noidungsk:'',//
      txt_tensukien:'',//
      dataSourceEvent:ds.cloneWithRows([]),
    };
  }
  componentWillMount(){
    database=firebase.database();
    table_hinhs=database.ref('db_marketsfarmers/table_hinhs');
    tb_listposts=database.ref('db_marketsfarmers/table_posts');//trỏ đến chổ table_shops
    var post_hinh=[];
    var imgArr=[];
    var cmtTam=[];//tạm lưu 1 list cmt hiện tại
    table_hinhs.orderByChild('idpost').equalTo(this.props.idPost)
    .on('value',(snaps)=>{
      snaps.forEach((datahinh)=>{
          post_hinh.push(datahinh.val().linkpost);
          imgArr.push({
            url:datahinh.val().linkpost
          });
      });
      this.setState({arrayImage:post_hinh,imagesModal:imgArr,cur_img:0,sum_img:post_hinh.length})
      tb_listposts.orderByChild('idpost')//xếp theo idpost_uid_own
      .equalTo(this.props.idPost)//idpost_uid_own===idpostTam_uidsession
      .on('value',(snapshot)=>{
        snapshot.forEach((data)=>{
                p=new Posts();
                p.idpost=data.val().idpost;
                p.tieude=data.val().tieude;
                p.noidung=data.val().noidung;
                p.loaisp=data.val().loaisp;
                p.diachi_txh=data.val().diachi_txh;
                p.diachi_t=data.val().diachi_t;
                p.giaban=data.val().giaban;
                p.loaitien=data.val().loaitien;
                p.giaban=data.val().giaban;
                p.muahayban=data.val().muahayban;
                p.thoigiandang=data.val().thoigiandang;
                p.uid_own=data.val().uid_own;
                p.idshop_own=data.val().idshop_own;
                this.setState({postState:p,key:data.key});
                table_commands=database.ref('db_marketsfarmers/table_posts/'+data.key+"/command");
                table_commands.orderByKey().on('value',(snapcmt)=>{
                  cmtTam=[];
                  dem=0;
                  snapcmt.forEach((datacmt)=>{
                    if(dem!==0){
                      cmtTam.push({
                            name_cmt:datacmt.val().name_cmt,
                            image_cmt:datacmt.val().image_cmt,
                            content_cmt:datacmt.val().content_cmt,
                            time:datacmt.val().time,
                            uid_cmt:datacmt.val().uid_cmt
                      });
                    }
                    dem++;
                  });

                  this.setState({dataSource:ds.cloneWithRows(cmtTam.reverse())});
                });

              tb_user=database.ref('db_marketsfarmers/table_users');
              //tạo user tạm us
              us=new Users();
              //orderByKey để chọn cột key,
              tb_user.orderByKey().equalTo(p.uid_own).on('value',(snap)=>{
                  if(snap.exists()){//kiểm tra tồn tại user
                    snap.forEach((data)=>{//data là 1 user lấy dc trong danh sách user trong list snap
                      //lưu thông tin vào user tạm us
                      us.uid=data.key;
                      console.log(us.uid);
                      us.hovaten=data.val().hovaten;
                      us.sdt=data.val().sdt;
                      //us.diachi=data.val().diachi;
                      //us.email=data.val().email;
                      us.anhdaidien=data.val().anhdaidien;
                      //us.anhbia=data.val().anhbia;
                    });
                    //sau khi lấy thông tin user ở code trên lưu vào state.user
                    console.log("us.uid"+us.uid);
                    this.setState({user_own:us});
                  }
                  else{
                    alert('firebase error');
                  }
              });
//listview danh sách sự kiện
              tb_sk=database.ref('db_marketsfarmers/table_posts/'+data.key+'/events');//data.key-->idpost
              var tam_event=[];
              tb_sk.on('value',(snap)=>{
                snap.forEach((dataevent)=>{
                  //alert(dataevent.val().tensk);
                  tam_event.push({
                    idsukien:dataevent.key,
                    tensukien:dataevent.val().tensk,
                    thoigianbatdau:dataevent.val().batdau,
                    thoigianketthuc:dataevent.val().ketthuc,
                    noidungsukien:dataevent.val().nodungsk,
                    trangthaisk:dataevent.val().trangthaisk
                  })
                });
                this.setState({dataSourceEvent:ds.cloneWithRows(tam_event)});
              });

        });
      });
      });
      tb_user=database.ref('db_marketsfarmers/table_users');
      //tạo user tạm us
      us_me=new Users();
      //orderByKey để chọn cột key,
      tb_user.orderByKey().equalTo(this.props.uidSession).on('value',(snap)=>{
          if(snap.exists()){//kiểm tra tồn tại user
            snap.forEach((data)=>{//data là 1 user lấy dc trong danh sách user trong list snap
              //lưu thông tin vào user tạm us
              us_me.uid=data.key;
              us_me.hovaten=data.val().hovaten;
              //us.sdt=data.val().sdt;
              //us.diachi=data.val().diachi;
              //us.email=data.val().email;
              us_me.anhdaidien=data.val().anhdaidien;
              //us.anhbia=data.val().anhbia;
            });
            //sau khi lấy thông tin user ở code trên lưu vào state.user
            this.setState({user:us_me});
          }
          else{
            alert('firebase error');
          }
      });

}
  btn_PreviousImage(){
    if(this.state.sum_img>0 && (this.state.cur_img > 0)){
      this.setState({
        cur_img:this.state.cur_img-1,
        imagePath:this.state.arrayImage[this.state.cur_img-1]
      });
    }

  }
  btn_NextImage(){
    if(this.state.sum_img>0 && (this.state.cur_img < this.state.sum_img-1)){
      this.setState({
        cur_img:this.state.cur_img+1,
        imagePath:this.state.arrayImage[this.state.cur_img+1]
      });
    }

  }
  btn_Back_Click(){
    this.props.propsNavigator.pop();
  }
  btn_CommandPost(){

    var flag=-1;
    var d = new Date();//new time now
    var time = d.toString().slice(4,24);//cắt chuỗi thòi gian cần ngày thang năm giờ:phut:giay
    table_commands=database.ref('db_marketsfarmers/table_posts/'+this.state.key+"/command");
    table_commands.orderByKey().limitToLast(1).//once('value')
  //.then(function(snap) {
    on('value',(snap)=>{

      snap.forEach((data)=>{
        console.log(flag+":"+parseInt(data.key));
        if(flag!==parseInt(data.key)){
          var maxid=parseInt(data.key)+1;
          //dem++;
          flag=maxid;
          table_commands=database.ref('db_marketsfarmers/table_posts/'+this.state.key+"/command");
          table_commands.child(maxid).set({
            name_cmt:this.state.user.hovaten,
            image_cmt:this.state.user.anhdaidien,
            content_cmt:this.state.txt_command,
            time:time,
            uid_cmt:this.props.uidSession
          },()=>{
            //set thông báo
            var flag=0;
            //    console.log(this.state.user_own.uid);
            notification=database.ref('db_marketsfarmers/table_notif/'+this.state.user_own.uid);

            notification.orderByKey().limitToLast(1).//once('value')
            //.then(function(snap) {
            on('value',(snap)=>{

              snap.forEach((data)=>{
                console.log(flag+":"+parseInt(data.key));
                if(flag!==parseInt(data.key)){
                  var maxid=parseInt(data.key)+1;
                  //dem++;
                  flag=maxid;
                  insert_noti=database.ref('db_marketsfarmers/table_notif/'+this.state.user_own.uid);
                  insert_noti.child(maxid).set({
                    idpost:this.state.postState.idpost,
                    content:'đã bình luận trong một bài đăng của bạn',
                    state:'dagui',
                    time:time,
                    title:this.state.user.hovaten,
                    type:'command'
                  },()=>{
                    table_commands.off('value');
                    notification.off('value');
                  });
                }
              });

            });

          });
        }
      });

    });

    //table_commands.off('value')
    //notification.off('value')
  }
  btn_NhanTin(){
    this.props.propsNavigator.push({
      screen:'Messendger',
      uidSession:this.props.uidSession,
      uidGetMessage:this.state.user_own.uid
    });
  }
  btn_ZoomImage(){
    this.setState({modalImage:!this.state.modalImage});
  }
  btn_TheoDoiPost(){
    if(this.state.Isfollow!=='Theo dõi'){
      //theo dõi post
    var flag=-1;
    var d = new Date();//new time now
    var time = d.toString().slice(4,24);//cắt chuỗi thòi gian cần ngày thang năm giờ:phut:giay
    table_follows=database.ref('db_marketsfarmers/table_posts/'+this.state.key+"/follow");
    table_follows.orderByKey().limitToLast(1).//once('value')
  //.then(function(snap) {
    on('value',(snap)=>{

      snap.forEach((data)=>{
        console.log(flag+":"+parseInt(data.key));
        if(flag!==parseInt(data.key)){
          var maxid=parseInt(data.key)+1;
          //dem++;
          flag=maxid;
          addfollow=database.ref('db_marketsfarmers/table_posts/'+this.state.key+"/follow");
          addfollow.child(maxid).set({
            uid_flw:this.props.uidSession,
            name:this.state.user.hovaten,
            time:time
          },()=>{
            //set thông báo
            var flag=0;
            //    console.log(this.state.user_own.uid);
            notification=database.ref('db_marketsfarmers/table_notif/'+this.state.user_own.uid);

            notification.orderByKey().limitToLast(1).//once('value')
            //.then(function(snap) {
            on('value',(snap)=>{

              snap.forEach((data)=>{
                console.log(flag+":"+parseInt(data.key));
                if(flag!==parseInt(data.key)){
                  var maxid=parseInt(data.key)+1;
                  //dem++;
                  flag=maxid;
                  insert_noti=database.ref('db_marketsfarmers/table_notif/'+this.state.user_own.uid);
                  insert_noti.child(maxid).set({
                    idpost:this.state.postState.idpost,
                    content:'đã theo dõi một bài đăng của bạn',
                    state:'dagui',
                    time:time,
                    title:this.state.user.hovaten,
                    type:'follow'
                  },()=>{
                    table_follows.off('value');
                    notification.off('value');
                    this.setState({Isfollow:'Bỏ theo dõi'})
                  });
                }
              });

            });

          });
        }
      });

    });
    }
    else{
      //bỏ theo dõi
    }

  }
  btn_TaoSuKienMoi(){
    this.setState({modalVisible:!this.state.modalVisible});
    addfollow=database.ref('db_marketsfarmers/table_posts/'+this.state.key+"/events");

    addfollow.push({
      batdau:this.state.datebd,
      ketthuc:this.state.datekt,
      noidungsk:this.state.txt_noidungsk,
      tensk:this.state.txt_tensukien,
      trangthaisk:'',
    });
  }

  render(){
    return(
      <View>


  {/* Listview trượt nằm ngang
    <ListView
      horizontal={true}
    dataSource={this.state.dataSource}
      renderRow={(rowData)=><Image source={require('../img/icondefault.jpg')} style={{width:200,height:100}}/>}
    />

    */}
    <View style={{flexDirection:'row',backgroundColor:'#03A9F4',justifyContent:'center'}}>
    <View style={{flex:1}}><TouchableHighlight underlayColor='pink' onPress={()=>this.btn_Back_Click()}>
    <Image source={require('../img/ic_arrow_back_white_24dp.png')} style={{width:40,height:40}}/></TouchableHighlight></View>
    <View style={{flex:6,justifyContent:'center'}}><Text style={{color:'white',fontSize:20}}>Bài đăng</Text>
    </View>
    <View style={{flex:1}}><TouchableHighlight onPress={()=>this.btn_TimKiem_Click()}><Image source={require('../img/ic_more_vert_white_24dp.png')} style={{width:40,height:40}}/></TouchableHighlight></View>
    </View>
    <View style={{height:1,backgroundColor:'#9E9E9Ed4'}}></View>
    <View style={{height:2,backgroundColor:'#BDBDBDc4'}}></View>
    <View style={{height:2,backgroundColor:'#E0E0E0'}}></View>
<ScrollView>

    <Image style={{width:"100%",height:200,borderWidth:1,borderColor:'#BDBDBD'}}
    source={{uri:this.state.arrayImage[this.state.cur_img]}}>
    <View style={{flex:1,flexDirection:'row'}}>
      <View style={{flex:1,backgroundColor:'#00000010',justifyContent:'center'}}>
        <TouchableHighlight onPress={()=>this.btn_PreviousImage()}>
         <Image source={require('../img/ic_keyboard_arrow_left_white_24dp.png')}></Image>
        </TouchableHighlight>
      </View>
      <View style={{flex:7,justifyContent:'flex-end'}}>
      <View style={{justifyContent:'center',flexDirection:'row'}}>
        <View style={{alignItems:'center',backgroundColor:'#00000010'}}>
          <Text style={{color:'white',fontSize:18}}> {this.state.cur_img+1}/{this.state.sum_img} ảnh </Text>
        </View>
        <View style={{backgroundColor:'#00000010',width:30,height:30}}>
          <TouchableHighlight onPress={()=>this.btn_ZoomImage()}>
          <Image style={{width:30,height:30}} source={require('../img/ic_zoom_out_map_white_24dp.png')}></Image>
          </TouchableHighlight>
        </View>
        </View>
      </View>
      <View style={{flex:1,backgroundColor:'#00000010',justifyContent:'center'}}>
        <TouchableHighlight onPress={()=>this.btn_NextImage()}>
        <Image source={require('../img/ic_keyboard_arrow_right_white_24dp.png')}></Image>
        </TouchableHighlight>
      </View>
    </View>
    </Image>
    <View style={{backgroundColor:'#EEEEEE',paddingLeft:10,paddingRight:10}}>
            <Text style={{color:'blue',fontWeight:'bold',fontSize:25}}>{this.state.postState.muahayban}: {this.state.postState.tieude}</Text>

            <View style={{height:1,backgroundColor:'#9E9E9Ed4'}}></View>
            <View style={{flexDirection:'row',marginLeft:10,marginTop:5}}>
              <Image source={require('../img/alarm-clock.png')}
              style={{width:25,height:25,borderRadius:100}}/>
              <Text style={{color:'black',marginLeft:5}}>{this.state.postState.thoigiandang}</Text>
            </View>
            <View style={{flexDirection:'row',marginLeft:10,marginTop:5,marginBottom:10}}>
              <View style={{flex:7}}>

              <Text  style={{color:'red',fontWeight:'bold',fontSize:25,marginLeft:5}}>{this.state.postState.giaban} {this.state.postState.loaitien}</Text>
            </View>

              <View style={{flex:2}}>
              {
                this.props.uidSession!==this.state.user_own.uid ?
                  <Button title={this.state.Isfollow} color="#FFAB00" onPress={()=>this.btn_TheoDoiPost()}></Button>
                : null
              }
              </View>
            </View>

      </View>
      {this.renderHide()}
<View style={{padding:10}}>
        <Text style={{color:'black',fontSize:18}}>{this.state.postState.noidung}</Text>
  <View style={{backgroundColor:'#BDBDBD',marginTop:10,marginBottom:10}}>
    <Text style={{color:'black',fontSize:18,marginLeft:10}}>Bình luận</Text>
    <View style={{flex:1,flexDirection:'row'}}>
      <View style={{flex:8,paddingLeft:5,marginTop:5}}>
      <TextInput placeholder="Nhập bình luận..."
      style={{backgroundColor:'#E0E0E0',borderColor:'#0277BD',borderWidth:1,borderRadius:3,height:38,fontSize:15}} underlineColorAndroid="white" returnKeyType="send" onChangeText={(value)=>this.setState({text:value})}
      onChangeText={(value)=>this.setState({txt_command:value})}
      onSubmitEditing={()=>this.btn_CommandPost()}/>
      </View>
      <View style={{flex:1,marginTop:5,paddingLeft:5}}>
      <TouchableHighlight onPress={()=>this.btn_CommandPost()}><Image source={require('../img/ic_send_black_24dp.png')} style={{height:35,width:35}}/>
      </TouchableHighlight>
      </View>
      </View>
  </View>
      <ListView
      dataSource={this.state.dataSource}
      enableEmptySections={true}
      renderRow={(rowData)=><ItemCommand obj={rowData}></ItemCommand>}
      />

      </View>
</ScrollView>

<Modal visible={this.state.modalImage}
transparent={true}
onRequestClose={() => alert("Modal has been closed.")}>
                <ImageViewer imageUrls={this.state.imagesModal}
                onDoubleClick={()=>this.setState({modalImage:!this.state.modalImage})}/>
            </Modal>
            <Modal
              animationType={"slide"}
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => alert("Modal has been closed.")}
              >
             <View style={{flex:1,backgroundColor:'#000000a0'}}>
              <View style={{flex:1}}></View>
              <View style={{flex:2}}>
              <View style={{margin:20,backgroundColor:'white',borderRadius:5}}>
              <View style={{flexDirection:'row',backgroundColor:'#0288D1'}}>
                <View style={{flex:7}}>
                  <Text style={{fontSize:20,color:'white',marginLeft:10,marginTop:10}}>Tạo Sự kiện mới</Text>
                </View>
                <View style={{flex:1}}>
                  <TouchableHighlight underlayColor='#E0F7FA' onPress={() => {
                    this.setState({modalVisible:!this.state.modalVisible})
                  }} style={{width:40,height:40,marginTop:5,borderRadius:20}}><Image source={require('../img/ic_clear_white_24dp.png')} /></TouchableHighlight>
                </View>
              </View>

                  <View style={{padding: 10}}>
            <TextInput
              style={{color:'black',height: 40,marginBottom:10,borderColor:'#BDBDBD',borderWidth:1,borderRadius:2}}
              underlineColorAndroid="white"
              placeholder="Tên sự kiện"
              onChangeText={(value)=>this.setState({txt_tensukien:value})}
              />
              <TextInput
                style={{color:'black',height: 40,marginBottom:10,borderColor:'#BDBDBD',borderWidth:1,borderRadius:2}}
                underlineColorAndroid="white"
                placeholder="nội dung"
                onChangeText={(value)=>this.setState({txt_noidungsk:value})}
                />
                <View style={{flexDirection:'row',marginBottom:10}}>
                  <View style={{flex:1,paddingRight:5}}>
                    <Button onPress={()=>this.setState({ isDateTimePickerVisiblebd: true })}
                    title={this.state.datebd+" "} color='#BDBDBD'></Button>
                  </View>
                  <View style={{flex:1,paddingLeft:5}}>
                  {/* picker loại sp cúả cửa hàng*/}
                    <Button onPress={()=>this.setState({ isDateTimePickerVisiblekt: true })}
                    title={this.state.datekt+" "} color='#BDBDBD'></Button>
                  </View>
                </View>
                <Button onPress={()=>this.btn_TaoSuKienMoi()} title={'Tạo'} color='#03A9F4'></Button>
          </View>
          </View>
              </View>
              <View style={{flex:1}}></View>
             </View>
             <DateTimePicker
                       isVisible={this.state.isDateTimePickerVisiblebd}
                       onConfirm={(date_bd)=>this.setState({datebd:date_bd.toString().slice(4,21),isDateTimePickerVisiblebd:!this.state.isDateTimePickerVisiblebd})}
                       onCancel={()=>this.setState({isDateTimePickerVisiblebd:!this.state.isDateTimePickerVisiblebd})}
                       mode={'datetime'}
                     />
                     <DateTimePicker
                               isVisible={this.state.isDateTimePickerVisiblekt}
                               onConfirm={(date_kt)=>this.setState({datekt:date_kt.toString().slice(4,21),isDateTimePickerVisiblekt:!this.state.isDateTimePickerVisiblekt})}
                               onCancel={()=>this.setState({isDateTimePickerVisiblekt:!this.state.isDateTimePickerVisiblekt})}
                               mode={'datetime'}
                             />
            </Modal>
      </View>
    );
  }
  renderHide(){
    if(this.state.show===true){
    return(
      <View style={{backgroundColor:'#EEEEEE'}}>
      <View style={{height:1,backgroundColor:'#9E9E9Ed4',margin:10}}></View>
      <Text>Thông tin người "Bán"</Text>
      {this.props.uidSession!==this.state.user_own.uid ?<Button title="Nhắn tin" color="#FFAB00" onPress={()=>this.btn_NhanTin()}></Button>:null}
      <View style={{height:1,backgroundColor:'#9E9E9Ed4',margin:10}}></View>
      <View style={{flexDirection:'row',marginTop:5,marginLeft:10,marginRight:10}}>
        <Image source={require('../img/icondefault.jpg')} style={{width:25,height:25,borderRadius:100}}/>
        <Text style={{color:'black',marginLeft:5}}>{this.state.postState.loaisp}</Text>
      </View>
      <View style={{flexDirection:'row',marginTop:5,marginLeft:10,marginRight:10}}>
      <Image source={require('../img/icondefault.jpg')} style={{width:25,height:25,borderRadius:100}}/>
      <Text  style={{color:'black',marginLeft:5}}>{this.state.user_own.hovaten}
      </Text>
      </View>
      <View style={{flexDirection:'row',marginTop:5,marginLeft:10,marginRight:10}}>
        <Image source={require('../img/placeholder.png')} style={{width:25,height:25,borderRadius:100}}/>
        <Text style={{color:'black',marginLeft:5}}>{this.state.postState.diachi_txh} {this.state.postState.diachi_t}</Text>
      </View>
      <View style={{flexDirection:'row',marginTop:5,marginLeft:10,marginRight:10}}>
        <Image source={require('../img/mobile-phone.png')} style={{width:25,height:25,borderRadius:100}}/>
        <Text style={{color:'black',marginLeft:5}}>{this.state.user_own.sdt}</Text>
      </View>
      <View style={{height:1,backgroundColor:'#9E9E9Ed4',margin:10}}></View>
      <Text>Danh sách sự kiện</Text>
      <ListView
      dataSource={this.state.dataSourceEvent}
      enableEmptySections={true}
      renderRow={(rowData)=><View style={{flexDirection:'row'}}>
      <View style={{flext:1,color:'black',paddingLeft:10  }}>
        <Text>{rowData.thoigianbatdau.slice(0,17)}</Text>
      </View>
        <View style={{flext:2,paddingLeft:10,color:'black'}}>
          <Text>{rowData.tensukien}</Text>
        </View></View>}
      />


      {this.props.uidSession===this.state.user_own.uid?
        <Button title="Tạo sự kiện mới" color="#FFAB00" onPress={()=>this.setState({datebd:'bắt đầu',datekt:'kết thúc',modalVisible:true})}></Button>:null}

      <View style={{height:1,backgroundColor:'#9E9E9Ed4',margin:10}}></View>
      <View style={{flexDirection:'row',marginTop:5,marginLeft:10,marginRight:10}}>
        <Image source={require('../img/mobile-phone.png')} style={{width:25,height:25,borderRadius:100}}/>
        <Text style={{color:'black',marginLeft:5}}>{this.state.user_own.sdt}</Text>
      </View>
      {/* button expand */}
      <View style={{marginTop:5,justifyContent:'center',flexDirection:'row',borderWidth:1,borderColor:'#BDBDBD',backgroundColor:'#BDBDBD'}}>
         <TouchableHighlight  onPress={()=>this.setState({show:false})}>
          <Image source={require('../img/ic_expand_less_black_24dp.png')} style={{width:25,height:25}}/>
         </TouchableHighlight>
         <Text style={{color:'black'}}>Thu gọn</Text>
       </View>
       </View>
    );
  }
    else {
      return(
        <View style={{justifyContent:'center',flexDirection:'row',borderWidth:1,borderColor:'#BDBDBD',backgroundColor:'#BDBDBD'}}>
            <Text style={{color:'black'}}>Xem thêm</Text>
           <TouchableHighlight onPress={()=>this.setState({show:true})}>
            <Image source={require('../img/ic_expand_more_black_24dp.png')} style={{width:25,height:25}}/>
           </TouchableHighlight>
         </View>
      );
    }
  }
  btn_postCommand(){
    alert('post command');
  }
  btn_previous(){
    alert('previous');
  }
  btn_next(){
    alert('next');
  }

}
AppRegistry.registerComponent('ChoNhaNong_v1',()=>StatusDetail);
