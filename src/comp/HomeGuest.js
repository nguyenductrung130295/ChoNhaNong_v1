import React, {Component} from 'react';
import {StyleSheet,Text,TouchableHighlight,TextInput,View,Image,Button,Picker,Item,AppRegistry} from 'react-native';
export default class HomeGuest extends Component{
  constructor(props){
    super(props);
    muaban=['Mua','Bán'];
    this.state={
      selected:'Mua'
    };
    loai=['Trái cây','Gia súc'];
    this.state={
      selected:'Trái cây'
    };
    tinh=['Hà Nội','Nha Trang','Hồ Chí Minh','Cà Mau'];
    this.state={
      selected:'Hà Nội'
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
  render(){
    return(

      <View style={styles.container}>
      {/*
      <View style={styles.actionbar}>
        <View style={{flex:1}}><Image source={require('../img/ic_view_headline_black_24dp.png')} style={{width:40,height:40,marginTop:5,marginLeft:5}}/></View>
        <View style={{flex:6}}></View>
        <View style={{flex:1}}><Image source={require('../img/ic_account_circle_black_24dp.png')} style={{width:40,height:40,marginTop:5}}/></View>
        <View style={{flex:1}}><Image source={require('../img/ic_search_black_24dp.png')} style={{width:40,height:40,marginTop:5}}/></View>
      </View>
    */}
      <View style={{height:2,backgroundColor:'#9e9e9e'}}></View>

      <Image style={{height:200,width:'100%'}} source={require('../img/banner1.jpg')}>
      {/*
      <View style={{flexDirection:'row',backgroundColor:'#ffffff00'}}>
        <View style={{flex:1}}><Image source={require('../img/ic_view_headline_black_24dp.png')} style={{width:40,height:40,marginTop:5,marginLeft:5}}/></View>
        <View style={{flex:6}}></View>
        <View style={{flex:1}}><Image source={require('../img/ic_account_circle_black_24dp.png')} style={{width:40,height:40,marginTop:5}}/></View>
        <View style={{flex:1}}><Image source={require('../img/ic_search_black_24dp.png')} style={{width:40,height:40,marginTop:5}}/></View>
      </View>*/}
      </Image>
      <View style={{height:2,backgroundColor:'#9e9e9e'}} ></View>
{/*}
        <Image source={require('../img/icondefault.jpg')}/>
        <View style={{flexDirection:'row'}}>
          <Text onPress={()=>this.btn_DangNhap()}> Đăng nhập
          </Text>
            <Image style={{height:10,width:10}} source={require('../img/icondefault.jpg')}/>
        </View>
        <View style={{flexDirection:'row'}}>
          <TextInput style={{width:150}} placeholder="tìm kiếm"/>
<TouchableHighlight onPress={()=>this.btn_TimKiem()}>
<Image source={require('../img/icondefault.jpg')} style={{width:25,height:25}}/>
</TouchableHighlight>

        </View>
        */}
        <View>
        <View style={{flexDirection:'row'}}>
          <View style={{flex:6}}>
          <TextInput returnKeyType={'search'} placeholder="search" onSubmitEditing={()=>this.btn_TimKiem_Click()}/>
          </View>
          <View style={{flex:1}}><TouchableHighlight onPress={()=>this.btn_TimKiem_Click()}><Image source={require('../img/ic_search_black_24dp.png')} style={{width:40,height:40,marginTop:5}}/></TouchableHighlight></View>
          <View style={{flex:1}}><TouchableHighlight underlayColor='pink' onPress={()=>this.btn_DangNhap_Click()}><Image source={require('../img/ic_account_circle_black_24dp.png')} style={{width:40,height:40,marginTop:5}}/></TouchableHighlight></View>
        </View>
        <View style={{flexDirection:'row'}}>
          <View style={{flex:3}}>
          <Picker selectedValue={this.state.selected} onValueChange={(value)=>this.setState({selected:value})}>
            {this.renderItemBan()}
          </Picker>
          </View>
          <View style={{flex:4}}>
          <Picker mode='dropdown' selectedValue={this.state.selected} onValueChange={(value)=>this.setState({selected:value})}>
            {this.renderItemLoai()}
          </Picker>
          </View>
          <View style={{flex:5}}>
          <Picker selectedValue={this.state.selected} onValueChange={(value)=>this.setState({selected:value})}>
            {this.renderItemTinh()}
          </Picker>
          </View>
        </View>
        </View>


          <Text>DANH MỤC SẢN PHẨM</Text>
          <View style={{flexDirection:'row'}}>
          <View style={{marginLeft:5,marginRight:5,borderWidth:1,borderColor:'#dbdbdb',borderRadius:3}}>
            <Image source={require('../img/icondefault.jpg')} style={{width:130,height:150}}/>
            <Text>Rau Cu</Text>
          </View>
          <View style={{marginLeft:5,marginRight:5,borderWidth:1,borderColor:'#dbdbdb',borderRadius:3}}>
            <Image source={require('../img/quynhthao.jpg')} style={{width:130,height:150}}/>
            <Text>Rau Cu</Text>
          </View>
          <View style={{marginLeft:5,marginRight:5,borderWidth:1,borderColor:'#dbdbdb',borderRadius:3}}>
            <Image source={require('../img/thaole.jpg')} style={{width:130,height:150}}/>
            <Text>Rau Cu</Text>
          </View>
          </View>


          <View style={{flexDirection:'row'}}>
          <View style={{marginLeft:5,marginRight:5,borderWidth:1,borderColor:'#dbdbdb',borderRadius:3}}>
            <Image source={require('../img/thuyuyen.jpg')} style={{width:130,height:150}}/>
            <Text>Rau Cu</Text>
          </View>
          <View style={{marginLeft:5,marginRight:5,borderWidth:1,borderColor:'#dbdbdb',borderRadius:3}}>
            <Image source={require('../img/ngoctam.jpg')} style={{width:130,height:150}}/>
            <Text>Rau Cu</Text>
          </View>
          <View style={{marginLeft:5,marginRight:5,borderWidth:1,borderColor:'#dbdbdb',borderRadius:3}}>
            <Image source={require('../img/khatu.jpg')} style={{width:130,height:150}}/>
            <Text>Rau Cu</Text>
          </View>
          </View>

      </View>

    );
  }
  btn_RauCu(){
    alert('btn rau cu dc click');
  }
  btn_DangNhap_Click(){
    this.props.propsNavigator.push({
      screen:'Login'
    });
  }
  btn_TimKiem_Click(){
    alert('button Tim Kiem is clicked');
  }
}
var styles=StyleSheet.create({
  container:{
    backgroundColor:'#eeeeee',
    flex:1
  },
  actionbar:{
    height:50,
    backgroundColor:'green',
    flexDirection:'row'
  }
});
AppRegistry.registerComponent('ChoNhaNong_v1',()=>HomeGuest);
