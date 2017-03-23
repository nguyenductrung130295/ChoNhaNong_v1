import React,{Component} from 'react';
import {AppRegistry,View,Image,Text} from 'react-native';

export default class InfoPersonal extends Component{
  constructor(props){
    super(props);
    this.state={
      imgyes:true
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
      <View>
        <Image source={require('../img/icondefault.jpg')} style={{width:50,height:50}}>
          {this.yesImg()}
        </Image>
        <Text>Nguyễn Đức Trung</Text>
        <Text>Số điện thoại</Text>

      </View>
    );
  }
}
AppRegistry.registerComponent('Component_API_Demo',()=>InfoPersonal);
