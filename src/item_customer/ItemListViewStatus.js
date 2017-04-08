import React,{Component} from 'react';
import {AppRegistry,View,Text,TouchableHighlight,Picker,Button,Image} from 'react-native';

export default class ItemListViewStatus extends Component{
  constructor(props){
    super(props);

  }

  render(){
    return(
      <View>
      <View style={{marginLeft:8,marginRight:8,marginTop:5,backgroundColor:'white',borderRightWidth:2,borderRightColor:'#BDBDBD'}}>
        <TouchableHighlight onPress={()=>this.btn_ItemIsClick()}>
        <View style={{flexDirection:'row'}}>
        <View>
          <Image source={{uri:this.props.obj.imgsrc}} style={{width: 100, height: 101,borderTopLeftRadius:2,borderBottomLeftRadius:2}}>
          <Image source={require('../img/ic_folder_white_24dp.png')} style={{width:40,height:40}}>
          <Text style={{marginLeft:5,fontSize:20,marginTop:5}}>3</Text>
          </Image>
          </Image>
        </View>
        <View style={{marginLeft:8,padding:5}}>
          <Text style={{color:'black',fontSize:16}}>{this.props.obj.title}</Text>
          <Text style={{color:'red'}}>{this.props.obj.price} VND</Text>
          <View style={{flexDirection:'row'}}>
            <Text>{this.props.obj.time}</Text>
            <Text>|</Text>
            <Text>{this.props.obj.address}</Text>
          </View>
        </View>
        </View>
        </TouchableHighlight>
      </View>
      <View style={{marginLeft:8,marginRight:8,height:1,backgroundColor:'#9E9E9E'}}></View>
      <View style={{marginLeft:8,marginRight:8,height:2,backgroundColor:'#BDBDBD'}}></View>
      <View style={{marginLeft:8,marginRight:8,height:2,backgroundColor:'#E0E0E0'}}></View>
      </View>

);
  }
  btn_ItemIsClick(){
    this.props.propsNavigator.push({
      screen:'StatusDetail'
    });
  }

}
AppRegistry.registerComponent('ChoNhaNong_v1',()=>ItemListViewStatus);
