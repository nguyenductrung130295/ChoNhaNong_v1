import React,{Component} from 'react';
import {Platform,AppRegistry,View,Text,TouchableHighlight,Image} from 'react-native';

export default class ItemListMessendger extends Component{
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
        <View style={{flexDirection:'row',borderBottomWidth:1,borderBottomColor:'white'}}>
        <View>
          <Image source={{uri:this.props.obj.anhdaidien_send}} style={{width: 60, height: 60,borderRadius:30,marginLeft:10,marginTop:5,marginRight:5,marginBottom:5,borderWidth:1,borderColor:'white'}}>
          </Image>
        </View>
        <View style={{padding:5,width:'100%'}}>
          <Text style={{color:'blue',fontSize:18,marginTop:5}}>{this.props.obj.hovaten_send}</Text>
          <Text style={{fontSize:13}}>{this.props.obj.noidung_last}</Text>
          <Text style={{fontSize:13,color:'black'}}>{this.props.obj.thoigiangui}</Text>
        </View>
        </View>
        </TouchableHighlight>
      </View>


);
  }
  btn_ItemIsClick(){
    this.props.propsNavigator.push({
      screen:'Messendger',
      uidSession:this.props.obj.uid_send,
      uidGetMessage:this.props.obj.uid_get
    });
  }

}
