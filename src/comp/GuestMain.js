import React,{Component} from 'react';
import {AppRegistry,View,Modal,Text,TextInput,Item,TouchableHighlight,Picker,Button,Image,ListView} from 'react-native';
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
        <View style={{flexDirection:'row'}}>
        <View style={{flex:6}}>
        <TextInput returnKeyType={'search'} placeholder="search" onSubmitEditing={()=>this.btn_TimKiem_Click()}/>
        </View>
        <View style={{flex:1}}><TouchableHighlight onPress={()=>this.btn_TimKiem_Click()}><Image source={require('../img/ic_search_black_24dp.png')} style={{width:40,height:40,marginTop:5}}/></TouchableHighlight></View>
        <View style={{flex:1}}><TouchableHighlight underlayColor='pink' onPress={()=>this.btn_DangNhap_Click()}><Image source={require('../img/ic_account_circle_black_24dp.png')} style={{width:40,height:40,marginTop:5}}/></TouchableHighlight></View>

        </View>

      );

    }
    else{
      return (
        <View style={{flexDirection:'row'}}>
        <View style={{flex:1}}><TouchableHighlight underlayColor='pink' onPress={()=>this.btn_Menu_Click()}><Image source={require('../img/ic_view_headline_black_24dp.png')} style={{width:40,height:40,marginTop:5}}/></TouchableHighlight></View>
        <View style={{flex:6}}>
        <TextInput returnKeyType={'search'} placeholder="search" onSubmitEditing={()=>this.btn_TimKiem_Click()}/>
        </View>
        <View style={{flex:1}}><TouchableHighlight onPress={()=>this.btn_TimKiem_Click()}><Image source={require('../img/ic_search_black_24dp.png')} style={{width:40,height:40,marginTop:5}}/></TouchableHighlight></View>
        <View style={{flex:1}}>
          <TouchableHighlight onPress={()=>this.btn_TimKiem_Click()}>
            <Image source={require('../img/ic_notifications_none_black_24dp.png')} style={{width:40,height:40,marginTop:5}}>
              <Text style={{color:'red',fontSize:15}}>1</Text>
            </Image>
          </TouchableHighlight>
        </View>

        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{flex:1,flexDirection:'row'}}>
          <View style={{flex:2,backgroundColor:'gray',borderRightWidth:2,borderRightColor:'blue'}}>
          <Image source={require('../img/ngoctam.jpg')} style={{width:'100%',height:150}}>
            <Image source={require('../img/thaole.jpg')} style={{width:100,height:100,marginTop:10,marginLeft:10,borderColor:'white',borderWidth:1,borderRadius:100}}/>
            <Text style={{color:'white'}}>Thảo Lê</Text>
</Image>
            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <View style={{flexDirection:'row'}}>
              <Image source={require('../img/ic_power_settings_new_black_24dp.png')} style={{width:25,height:25}}/>
              <Text>Tin nhắn</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <View style={{flexDirection:'row'}}>
              <Image source={require('../img/ic_power_settings_new_black_24dp.png')} style={{width:25,height:25}}/>
              <Text>Cửa hàng</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <View style={{flexDirection:'row'}}>
              <Image source={require('../img/ic_power_settings_new_black_24dp.png')} style={{width:25,height:25}}/>
              <Text>Đang theo dỏi</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <View style={{flexDirection:'row'}}>
              <Image source={require('../img/ic_power_settings_new_black_24dp.png')} style={{width:25,height:25}}/>
              <Text>Sự kiện</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <View style={{flexDirection:'row'}}>
              <Image source={require('../img/ic_power_settings_new_black_24dp.png')} style={{width:25,height:25}}/>
              <Text>Thông tin cá nhân</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <View style={{flexDirection:'row'}}>
              <Image source={require('../img/ic_power_settings_new_black_24dp.png')} style={{width:25,height:25}}/>
              <Text>Trợ giúp</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <View style={{flexDirection:'row'}}>
              <Image source={require('../img/ic_power_settings_new_black_24dp.png')} style={{width:25,height:25}}/>
              <Text>Cài đặt</Text>
              </View>
            </TouchableHighlight>


            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <View style={{flexDirection:'row'}}>
              <Image source={require('../img/ic_power_settings_new_black_24dp.png')} style={{width:25,height:25}}/>
              <Text>Đăng xuất</Text>
              </View>
            </TouchableHighlight>


            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>

          </View>
          <TouchableHighlight style={{flex:1}} onPress={() => {
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
      <View>
      <View>
{this.Logined(this)}
      <View style={{flexDirection:'row'}}>
        <View style={{flex:3}}>
        <Picker selectedValue={this.state.selected} onValueChange={(value)=>this.setState({selected:value})}>
          {this.renderItemBan()}
        </Picker>
        </View>
        <View style={{flex:4}}>
        <Picker mode='dropdown' selectedValue={this.state.selected1} onValueChange={(value)=>this.setState({selected:value})}>
          {this.renderItemLoai()}
        </Picker>
        </View>
        <View style={{flex:5}}>
        <Picker selectedValue={this.state.selected2} onValueChange={(value)=>this.setState({selected:value})}>
          {this.renderItemTinh()}
        </Picker>
        </View>
      </View>
      </View>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData)=><ItemListViewStatus obj={rowData}

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
}
