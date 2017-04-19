import React,{Component} from 'react';
import {AppRegistry,View,Image,Text,TouchableHighlight,ListView,Button} from 'react-native';
import ItemListViewStatus from '../item_customer/ItemListViewStatus';
import ItemShowAllImage from '../item_customer/ItemShowAllImage';
import AddPostNew from './AddPostNew'
import firebase from '../entities/FirebaseAPI'
import Users from '../entities/Users'
export default class InfoPersonal extends Component{
  constructor(props){
    super(props);

    this.state={
      dataSource:null,
      imgyes:false,
      options:1,//1:bài đăng,2:thông tin,3:ảnh
      mysefl:false,
      //false: là khách xem ,true: là ban than ca nhan ho xem minh
      user:new Users(),
    }
  }
  componentWillMount(){

    database=firebase.database();
    tb_user=database.ref('db_marketsfarmers/table_users');
    us=new Users();

    tb_user.orderByKey().equalTo(this.props.uidSession).on('value',(snap)=>{
      if(snap.exists()){
        snap.forEach((data)=>{
          us.uid=data.key;
          us.hovaten=data.val().hovaten;
          us.sdt=data.val().sdt;
          us.diachi=data.val().diachi;
          us.email=data.val().email;
          us.anhdaidien=data.val().anhdaidien;
          us.anhbia=data.val().anhbia;
        });
        this.setState({user:us});
      }
      else{
        alert('firebase error');
      }
  });

  list_posts=[];
  const ds=new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
  table_hinhs=database.ref('db_marketsfarmers/table_hinhs');
  tb_listposts=database.ref('db_marketsfarmers/table_posts');//trỏ đến chổ table_shops
  tb_listposts.on('value',(snapshot)=>{
    this.setState({dataSource:null});
    snapshot.forEach((data)=>{

      list_posts=[];//cứ mỗi lần thây đổi là phải set nó rỗng chứ ko nó sẽ lặp lại danh sách
      linkhinh="";//tạm lưu
      table_hinhs.orderByChild('idpost')
      .equalTo(data.val().idpost).limitToFirst(1).on('value',(snaps)=>{
        snaps.forEach((datahinh)=>{
          //xong lấy link trong table_hinhs gán cho linkhinh
          //bo trong nay cho no theo thu tu xu ly
                  list_posts.push({//push đối tượng thông tin shops vào lítpost
                    idpost:data.val().idpost,
                    diachi_t:data.val().diachi_t,
                    giaban:data.val().giaban,
                    loaitien:data.val().loaitien,
                    thoigiandang:data.val().thoigiandang,
                    tieude:data.val().tieude,
                    hinhpost:datahinh.val().linkpost
                  });
        });

      });
    });
    //khi push xong hết rồi set nó vào dataSource của listview
    this.setState({dataSource:ds.cloneWithRows(list_posts)});
  });

  }
  renderList(){
    if(this.state.dataSource!==null){
      //con nho props ko ko hay lam
      //been nay gui du lieu vao obj cho ItemListViewStatus
      // zo ItemListViewStatus thif lay du lieu tu obj
      //trong cai dataSource chua list_posts
      //rowData trong ListView la  1 cai post
      //nay baf lay cai nao thi ben kia lay cai do
      return(
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData)=>
            <ItemListViewStatus propsNavigator={this.props.propsNavigator} obj={rowData}
          ></ItemListViewStatus>}
        />
      );
    }else if(this.state.dataSource===null){
      return(
        <View><Text>Waiting</Text></View>
      );
    }

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
          <Image style={{width:'100%',height:'100%'}}  source={{uri:this.state.user.anhbia}}>
          <View style={{flexDirection:'row',backgroundColor:'#00000030'}}>
<View style={{flex:1}}><TouchableHighlight underlayColor='pink' onPress={()=>this.btn_Back_Click()}><Image source={require('../img/ic_arrow_back_white_24dp.png')} style={{width:40,height:40,marginTop:5}}/></TouchableHighlight></View>
          <View style={{flex:6}}>
          </View>
          <View style={{flex:1}}><TouchableHighlight onPress={()=>this.btn_TimKiem_Click()}><Image source={require('../img/ic_more_vert_white_24dp.png')} style={{width:40,height:40,marginTop:5}}/></TouchableHighlight></View>
          </View>
            <Image style={{width:100,height:100,borderRadius:100,borderWidth:1,borderColor:'white',marginLeft:15,marginTop:30}} source={{uri:this.state.user.anhdaidien}}/>
            <View style={{flexDirection:'row',height:30}}>
            <View style={{flex:6}}>
            <Text style={{marginLeft:10,marginTop:5,color:'white',fontSize:20}}>{this.state.user.hovaten}
            </Text>
              </View>
              <View style={{flex:2,paddingRight:10,paddingBottom:3}}>
              {this.ShowInboxButton()}
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
                    uidSession:this.props.uidSession
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
        </View>


      </View>
    );
  }
  _renderOptions(){
    switch (this.state.options) {
      case 1:
          return(
            <View>
            {this.renderList()}
            </View>
          );
        break;
      case 2:
      return(
        <View style={{padding:10}}>
        <TouchableHighlight>
          <View style={{flexDirection:'row',margin:5,borderBottomWidth:1,borderBottomColor:'gray'}}>
            <Image source={{uri:this.state.user.anhdaidien}} style={{width:30,height:30,marginRight:5}}/>
            <Text style={{fontSize:18,fontWeight:'bold'}}>Họ và tên: </Text>
            <Text style={{fontSize:18}}>{this.state.user.hovaten}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight>
          <View style={{flexDirection:'row',margin:5,borderBottomWidth:1,borderBottomColor:'gray'}}>
            <Image source={require('../img/mobile-phone.png')} style={{width:30,height:30,marginRight:5}}/>
<Text style={{fontSize:18,fontWeight:'bold'}}>Số điện thoại: </Text>
            <Text style={{fontSize:18}}>{this.state.user.sdt}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight>
          <View style={{flexDirection:'row',margin:5,borderBottomWidth:1,borderBottomColor:'gray'}}>
            <Image source={require('../img/placeholder.png')} style={{width:30,height:30,marginRight:5}}/>
<Text style={{fontSize:18,fontWeight:'bold'}}>Địa chỉ: </Text>
            <Text style={{fontSize:18}}>{this.state.user.diachi}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight>
          <View style={{flexDirection:'row',margin:5,borderBottomWidth:1,borderBottomColor:'gray'}}>
            <Image source={require('../img/letter.png')} style={{width:30,height:30,marginRight:5}}/>
            <Text style={{fontSize:18,fontWeight:'bold'}}>Email: </Text>
            <Text style={{fontSize:18}}>{this.state.user.email}</Text>
          </View>
        </TouchableHighlight>


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
        <View style={{flexDirection:'row',backgroundColor:'#03A9F4',borderRadius:2,height:30}}>
<Image source={require('../img/ic_send_black_24dp.png')} style={{width:30,height:30}}/>
<Text style={{fontSize:15,color:'white',marginTop:5}}>Nhắn tin</Text>
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
