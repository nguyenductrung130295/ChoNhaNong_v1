import React,{Component} from 'react';
import {AsyncStorage,AppRegistry,View,Modal,Text,TextInput,Item,TouchableHighlight,Picker,Button,Image,ListView} from 'react-native';
import ItemListViewStatus from '../item_customer/ItemListViewStatus';
export default class GuestMain extends Component{
  constructor(props){
    super(props);
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
      modalVisible:false,
      selected1:'Mua',
      selected2:'Trái cây',
      selected3:'Hồ Chí Minh'
    };


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
    var t=true;
    if(!t){
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
    else{
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


        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{flex:1,flexDirection:'row'}}>
          <View style={{flex:2,backgroundColor:'#FFF9C4'}}>
          <Image source={require('../img/ngoctam.jpg')} style={{width:'100%',height:150,borderBottomWidth:1,borderColor:'gray'}}>
            <Image source={require('../img/thaole.jpg')} style={{width:80,height:80,marginTop:25,marginLeft:10,borderColor:'white',borderWidth:1,borderRadius:100}}/>
            <Text style={{color:'white',fontSize:20,marginTop:5,marginLeft:10}}>Kiều Nữ Ngọc Dinh</Text>
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
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <View style={{flexDirection:'row',borderBottomWidth:1,borderBottomColor:'#BDBDBD',height:55}}>
              <Image source={require('../img/settings.png')} style={{width:50,height:50,marginTop:3,marginLeft:5}}/>
              <Text style={{color:'black',fontSize:18,marginLeft:10,marginTop:15}}>Cài đặt</Text>
              </View>
            </TouchableHighlight>


            <TouchableHighlight onPress={() => {
                AsyncStorage.setItem('uid_store',null);
            }}>
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
      screen:'Messendger'
    });
  }
  btn_CuaHang_Click(){
    this.setModalVisible(!this.state.modalVisible);
    this.props.propsNavigator.push({
      screen:'ListShops'
    });
  }
  btn_CaNhan_Click(){
    this.setModalVisible(!this.state.modalVisible);
    this.props.propsNavigator.push({
      screen:'InfoPersonal'
    });
  }

}
