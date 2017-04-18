import React,{Component} from 'react';
import {AppRegistry,View,Text,TouchableHighlight,Image} from 'react-native';

export default class ItemListMessendger extends Component{
  constructor(props){
    super(props);

  }

  render(){
    return(
      <View style={{backgroundColor:'#E0E0E0'}}>
        <TouchableHighlight onPress={()=>this.btn_ItemIsClick()}>
        <View style={{flexDirection:'row',borderBottomWidth:1,borderBottomColor:'white'}}>
        <View>
          <Image source={{uri:this.props.obj.logoshop}} style={{width: 60, height: 60,borderRadius:100,marginLeft:10,marginTop:5,marginRight:5,marginBottom:5,borderWidth:1,borderColor:'white'}}>
          </Image>
        </View>
        <View style={{padding:5,width:'100%'}}>
          <Text style={{color:'blue',fontSize:18,marginTop:5}}>{this.props.obj.tencuahang}</Text>
          <Text style={{fontSize:13}}>{this.props.obj.loaisp}</Text>
          <Text style={{fontSize:13,color:'black'}}>15-2-2017 18:30</Text>
        </View>
        </View>
        </TouchableHighlight>
      </View>


);
  }
  btn_ItemIsClick(){
    this.props.propsNavigator.push({
      screen:'Messendger'
    });
  }

}
