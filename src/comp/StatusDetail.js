import React ,{Component} from 'react';
import {AppRegistry,Button,Text,Image,View,ListView,TextInput,TouchableHighlight,ScrollView} from 'react-native';
import ItemCommand from '../item_customer/ItemCommand';
import firebase from '../entities/FirebaseAPI';
import Users from '../entities/Users';
import Posts from '../entities/Posts';

export default class StatusDetail extends Component{
  constructor(props){
    super(props);
    data=[
        {
        username:'Nguyễn Đức Trung',
        img:'https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-1/c0.27.100.100/p100x100/16298502_1821740334734783_649746552886407600_n.jpg?oh=a82ab51c245047c0493edfc8a4252fac&oe=5930F951',
        content:' nội dung command nội dung command nội dung command nội dung command'+
        'nội dung command nội dung command nội dung command'+
        'nội dung command nội dung command nội dung command nội dung command nội dung command'+
        'nội dung command nội dung command nội dung command nội dung command nội dung command',
        time:'12-2-2018'
      },
      {
        username:'Kiều Nữ Ngọc Dinh',
        img:'https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-1/c0.27.100.100/p100x100/16298502_1821740334734783_649746552886407600_n.jpg?oh=a82ab51c245047c0493edfc8a4252fac&oe=5930F951',
        content:' nội dung command nội dung command nội dung command nội dung command'+
        'nội dung command nội dung command nội dung command'+
        'nội dung command nội dung command nội dung command nội dung command nội dung command'+
        'nội dung command nội dung command nội dung command nội dung command nội dung command',
        time:'12-2-2010'
      }
    ];
    const ds=new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
    this.state={
      dataSource:ds.cloneWithRows(data),
      cur_img:-1,// thứ tự image dang hien trong cái xem hinh ở trên màn hình
      sum_img:0,//tổng image trong arrayImage
      arrayImage:[],//mảng chứa đường dẫn ảnh
      show:false,//false thì button expand more,ẩn nội dung
      //post_hinh:[],//array hình của post
      postState:new Posts(),//object Post
    };
  }
  componentWillMount(){
    database=firebase.database();
    table_hinhs=database.ref('db_marketsfarmers/table_hinhs');
    tb_listposts=database.ref('db_marketsfarmers/table_posts');//trỏ đến chổ table_shops
    var post_hinh=[];
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
                this.setState({postState:p});
        });
      });
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

        </View>
      </View>
      <View style={{flex:1,backgroundColor:'#00000010',justifyContent:'center'}}>
        <TouchableHighlight onPress={()=>this.btn_NextImage()}><Image source={require('../img/ic_keyboard_arrow_right_white_24dp.png')}></Image>
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
                <Button title="Nhắn tin" color="#FFAB00" onPress={()=>alert('Messendger')}></Button>
              </View>
            </View>

      </View>
      {this.renderHide()}
<View style={{padding:10}}>
        <Text style={{color:'black',fontSize:18}}>{this.state.postState.noidung}</Text>
  <View style={{backgroundColor:'#BDBDBD',marginTop:10,marginBottom:10}}>
    <Text style={{color:'black',fontSize:18,marginLeft:10}}>Bình luận</Text>
  </View>
      <ListView
      dataSource={this.state.dataSource}
      renderRow={(rowData)=><ItemCommand obj={rowData}></ItemCommand>}
      />
      <View style={{flex:1,flexDirection:'row'}}>
        <View style={{flex:8,paddingLeft:5,marginTop:5}}>
        <TextInput placeholder="Nhập bình luận..." style={{backgroundColor:'#E0E0E0',borderColor:'#0277BD',borderWidth:1,borderRadius:3,height:38,fontSize:15}} underlineColorAndroid="white" returnKeyType="send" onChangeText={(value)=>this.setState({text:value})} onSubmitEditing={()=>alert('send')}/>
        </View>
        <View style={{flex:1,marginTop:5,paddingLeft:5}}>
        <TouchableHighlight onPress={()=>alert('send '+this.state.text)}><Image source={require('../img/ic_send_black_24dp.png')} style={{height:35,width:35}}/>
        </TouchableHighlight>
        </View>
        </View>
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
      <Text  style={{color:'black',marginLeft:5}}>Nguyễn Đức Trung???
      </Text>
      </View>
      <View style={{flexDirection:'row',marginTop:5,marginLeft:10,marginRight:10}}>
        <Image source={require('../img/placeholder.png')} style={{width:25,height:25,borderRadius:100}}/>
        <Text style={{color:'black',marginLeft:5}}>{this.state.postState.diachi_txh} {this.state.postState.diachi_t}</Text>
      </View>
      <View style={{flexDirection:'row',marginTop:5,marginLeft:10,marginRight:10}}>
        <Image source={require('../img/mobile-phone.png')} style={{width:25,height:25,borderRadius:100}}/>
        <Text style={{color:'black',marginLeft:5}}>091809452986729 ??</Text>
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
