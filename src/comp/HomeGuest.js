import React, {Component} from 'react';
import {Text,TouchableHighlight,TextInput,View,Image,Button,Picker,Item,AppRegistry} from 'react-native';
export default class HomeGuest extends Component{

  render(){
    return(
      <View>
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
          <View style={{flexDirection:'row'}}>
              <TouchableHighlight onPress={()=>this.btn_RauCu()}>
              <View>
                <Image source={require('../img/icondefault.jpg')}/>
                <Text>Rau Cu</Text>
              </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={()=>this.btn_RauCu()}>
              <View>
                <Image source={require('../img/icondefault.jpg')}/>
                <Text>Rau Cu</Text>
              </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={()=>this.btn_RauCu()}>
              <View>
                <Image source={require('../img/icondefault.jpg')}/>
                <Text>Rau Cu</Text>
              </View>
              </TouchableHighlight>
          </View>
          <View style={{flexDirection:'row'}}>
              <TouchableHighlight onPress={()=>this.btn_RauCu()}>
              <View>
                <Image source={require('../img/icondefault.jpg')}/>
                <Text>Rau Cu</Text>
              </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={()=>this.btn_RauCu()}>
              <View>
                <Image source={require('../img/icondefault.jpg')}/>
                <Text>Rau Cu</Text>
              </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={()=>this.btn_RauCu()}>
              <View>
                <Image source={require('../img/icondefault.jpg')}/>
                <Text>Rau Cu</Text>
              </View>
              </TouchableHighlight>
          </View>

      </View>

    );
  }
  btn_RauCu(){
    alert('btn rau cu dc click');
  }
  btn_DangNhap(){
    alert('button dang nhap duoc click');
  }
  btn_TimKiem(){
    alert('button Tim Kiem is clicked');
  }
}
AppRegistry.registerComponent('ChoNhaNong_v1',()=>HomeGuest);
