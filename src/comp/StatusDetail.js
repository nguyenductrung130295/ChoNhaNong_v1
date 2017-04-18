import React ,{Component} from 'react';
import {AppRegistry,Button,Text,Image,View,ListView,TextInput,TouchableHighlight,ScrollView} from 'react-native';
import ItemCommand from '../item_customer/ItemCommand';
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
    };
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

    <Image style={{width:"100%",height:200,borderWidth:1,borderColor:'#BDBDBD'}} source={require('../img/thaole.jpg')}>
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
            <Text style={{color:'blue',fontWeight:'bold',fontSize:25}}>Bán: Tiêu đề sản phẩm</Text>

            <View style={{height:1,backgroundColor:'#9E9E9Ed4'}}></View>
            <View style={{flexDirection:'row',marginLeft:10,marginTop:5}}>
              <Image source={require('../img/alarm-clock.png')}
              style={{width:25,height:25,borderRadius:100}}/>
              <Text style={{color:'black',marginLeft:5}}>29-3-2019 15:30</Text>
            </View>
            <View style={{flexDirection:'row',marginLeft:10,marginTop:5,marginBottom:10}}>
              <View style={{flex:7}}>

              <Text  style={{color:'red',fontWeight:'bold',fontSize:25,marginLeft:5}}>20000 VND</Text>
            </View>

              <View style={{flex:2}}>
                <Button title="Nhắn tin" color="#FFAB00" onPress={()=>alert('Messendger')}></Button>
              </View>
            </View>

      </View>
      {this.renderHide()}
<View style={{padding:10}}>
        <Text style={{color:'black',fontSize:18}}>Ngày thứ 7, vào lúc 4h chiều mấy bạn lên trường mình nói tí về chuyện chụp kỷ yếu nha. Vì tính chất quan trọng nên mong mọi người đi để nắm rõ thông tin.
Kun Nguyen bữa đó giúp t đứng ra nói rõ nhé.
Lúc đăng ký đồ, mình quên thêm trường số giày của các bạn nam. Nên lát nữa các bạn Nam điền số giày vào phần trả lời comment dưới đây của mình dùm nha.
Còn mấy bạn chưa đóng tiền cho mình thì đóng dùm cho bạn Trần Quốc Thiện giúp nha.</Text>
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
        <Text style={{color:'black',marginLeft:5}}>Trái cây</Text>
      </View>
      <View style={{flexDirection:'row',marginTop:5,marginLeft:10,marginRight:10}}>
      <Image source={require('../img/icondefault.jpg')} style={{width:25,height:25,borderRadius:100}}/>
      <Text  style={{color:'black',marginLeft:5}}>Nguyễn Đức Trung
      </Text>
      </View>
      <View style={{flexDirection:'row',marginTop:5,marginLeft:10,marginRight:10}}>
        <Image source={require('../img/placeholder.png')} style={{width:25,height:25,borderRadius:100}}/>
        <Text style={{color:'black',marginLeft:5}}>xuan nam - dien xuan - dien khanh-Nha trang</Text>
      </View>
      <View style={{flexDirection:'row',marginTop:5,marginLeft:10,marginRight:10}}>
        <Image source={require('../img/mobile-phone.png')} style={{width:25,height:25,borderRadius:100}}/>
        <Text style={{color:'black',marginLeft:5}}>091809452986729</Text>
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
