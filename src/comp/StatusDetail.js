import React ,{Component} from 'react';
import {AppRegistry,Button,Text,Image,View,ListView,TextInput,TouchableHighlight,ScrollView} from 'react-native';
import ItemCommand from '../item_customer/ItemCommand';
import firebase from '../entities/FirebaseAPI';
import Users from '../entities/Users';
import Posts from '../entities/Posts';
const ds=new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
export default class StatusDetail extends Component{
  constructor(props){
    super(props);

    this.state={
      dataSource:ds.cloneWithRows([]),
      cur_img:-1,// thứ tự image dang hien trong cái xem hinh ở trên màn hình
      sum_img:0,//tổng image trong arrayImage
      arrayImage:[],//mảng chứa đường dẫn ảnh
      show:false,//false thì button expand more,ẩn nội dung
      //post_hinh:[],//array hình của post
      postState:new Posts(),//object Post
      txt_command:'',//noi dung command post
      key:'',//key post current
      user:new Users(),//state là user mới có thể thay đổi dc
      user_own:new Users(),//state là user mới có thể thay đổi dc

    };
  }
  componentWillMount(){
    database=firebase.database();
    table_hinhs=database.ref('db_marketsfarmers/table_hinhs');
    tb_listposts=database.ref('db_marketsfarmers/table_posts');//trỏ đến chổ table_shops
    var post_hinh=[];
    var cmtTam=[];//tạm lưu 1 list cmt hiện tại
    table_hinhs.orderByChild('idpost').equalTo(this.props.idPost)
    .on('value',(snaps)=>{
      snaps.forEach((datahinh)=>{
          post_hinh.push(datahinh.val().linkpost);
      });
      this.setState({arrayImage:post_hinh,cur_img:0,sum_img:post_hinh.length})
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
                <Button title="Nhắn tin" color="#FFAB00" onPress={()=>this.btn_NhanTin()}></Button>
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
      </View>
    );
  }
  renderHide(){
    if(this.state.show===true){
    return(
      <View style={{backgroundColor:'#EEEEEE'}}>
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
      {/* button expand */}
      <View style={{marginTop:5,justifyContent:'center',flexDirection:'row',borderWidth:1,borderColor:'#BDBDBD',backgroundColor:'#BDBDBD'}}>
         <TouchableHighlight  onPress={()=>this.setState({show:false})}>
          <Image source={require('../img/ic_expand_less_black_24dp.png')} style={{width:25,height:25}}/>
         </TouchableHighlight>
       </View>
       </View>
    );
  }
    else {
      return(
        <View style={{justifyContent:'center',flexDirection:'row',borderWidth:1,borderColor:'#BDBDBD',backgroundColor:'#BDBDBD'}}>
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
