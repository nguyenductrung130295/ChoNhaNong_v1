import React,{Component} from 'react';
import {AppRegistry,View,Text,TouchableHighlight,Picker,Button,Image} from 'react-native';

export default class ItemShop extends Component{
  constructor(props){
    super(props);

  }

  render(){
    return(
      <View style={{backgroundColor:'#E0E0E0'}}>
        <TouchableHighlight onPress={()=>this.btn_ItemIsClick()}>
        <View style={{flexDirection:'row'}}>
        <View>
          <Image source={{uri:this.props.obj.imgsrc}} style={{width: 60, height: 60,borderRadius:100,marginLeft:10,marginTop:5,marginRight:5,marginBottom:5,borderColor:'white',borderWidth:1}}>
          </Image>
        </View>
        <View style={{padding:5,borderBottomWidth:1,borderBottomColor:'white',width:'100%'}}>
          <Text style={{color:'black',fontSize:18,marginTop:5}}>{this.props.obj.nameshop}</Text>
          <Text style={{fontSize:13}}>{this.props.obj.loaisp}</Text>
        </View>
        </View>
        </TouchableHighlight>
      </View>


);
  }
  btn_ItemIsClick(){
    this.props.propsNavigator.push({
      screen:'ShopMain'
    });
  }

}
