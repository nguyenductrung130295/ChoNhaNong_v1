import React,{Component} from 'react';
import {AppRegistry,View,Navigator} from 'react-native';

import FirstDisplay from './FirstDisplay';
import GuestMain from './GuestMain';
import HomeGuest from './HomeGuest';
import Login from './Login';
import Register from './Register'
import InfoPersonal from './InfoPersonal'
export default class NavigatorChuyenTrang extends Component{

  _renderScene(route,navigator){
    let name=route.screen;
    let data=route.datanavi;
    switch (name) {
      // hiển thị trang đầu tiên, chọn mua hoặc bán
      case 'InfoPersonal':
          return <InfoPersonal propsNavigator={navigator}/>
          break;
      case 'Register':
          return <Register propsNavigator={navigator}/>
          break;
      case 'FirstDisplay':
        return <FirstDisplay propsNavigator={navigator}/>
        break;
      case 'Login':
          return <Login propsNavigator={navigator}/>
          break;
      // hiển thị màn hình trang chủ khách
      case 'GuestMain':
        return <GuestMain propsNavigator={navigator}/>
        break;
      case 'HomeGuest':
          return <HomeGuest propsNavigator={navigator}/>
          break;
      //case 'FirebaseKey':return <FirebaseKey propsNavigator={navigator} {...data}/>
    }
  }
  render(){
    //initialRoute là màn hình chạy đầu tiên
    return(
      <Navigator
        initialRoute={{screen:'InfoPersonal'}}
        renderScene={this._renderScene.bind(this)}
      />
    );
  }
}
AppRegistry.registerComponent('Component_API_Demo',()=>NavigatorChuyenTrang);
