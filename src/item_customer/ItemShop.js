import React,{Component} from 'react';
import {AppRegistry,Platform,View,Text,TouchableHighlight,Picker,Button,Image} from 'react-native';

export default class ItemShop extends Component{
  constructor(props){
    super(props);
    i=100;
    if(Platform.OS==='ios')
      i=30;
    this.state={
      radius:i
    }
  }

  render(){
    return(
      <View style={{backgroundColor:'#E0E0E0'}}>
        <TouchableHighlight onPress={()=>this.btn_ItemIsClick()}>
        <View style={{flexDirection:'row'}}>
        <View>
          <Image source={{uri:this.props.obj.logoshop}} style={{width: 60, height: 60,borderRadius:this.state.radius,marginLeft:10,marginTop:5,marginRight:5,marginBottom:5,borderColor:'white',borderWidth:1}}>
          </Image>
        </View>
        <View style={{padding:5,borderBottomWidth:1,borderBottomColor:'white',width:'100%'}}>
          <Text style={{color:'black',fontSize:18,marginTop:5}}>{this.props.obj.tencuahang}</Text>
          <Text style={{fontSize:13}}>{this.props.obj.loaisp}</Text>
        </View>
        </View>
        </TouchableHighlight>
      </View>


);
  }
  btn_ItemIsClick(){
    this.props.propsNavigator.push({
      screen:'ShopMain',
      uidSession:this.props.uidSession,
      sid:this.props.sid
    });
  }

}
