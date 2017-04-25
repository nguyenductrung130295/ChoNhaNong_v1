import React,{Component} from 'react';
import {Platform,AppRegistry,Image,Text,TouchableHighlight,View} from 'react-native';

export default class ItemInbox extends Component{
  constructor(props){
    super(props);
    i=100;
    if(Platform.OS==='ios')
      i=20;
    this.state={
      flag:false,
      radius:i,
    }
  }
  accessUser(){
    alert('to user');
  }
  xemTime(){
    this.setState({flag:!this.state.flag});

  }
  renderhaha1(){
    if(this.state.flag){
      return(
        <Text style={{color:'white',fontSize:12,marginLeft:40}}>{"\n\n     "}{this.props.inbox.thoigiangui+"    "+this.props.inbox.tinhtrang}</Text>
      );
    }else{
      return null;
    }
  }
  render(){
    if(this.props.inbox.own){
      return(
        <View>
          <View style={{flexDirection:'row',marginTop:5}}>
          <View style={{flex:2}}>
          </View>
            <View style={{flex:5,backgroundColor:'#4FC3F7',borderRadius:10,padding:5}}>
            <TouchableHighlight onPress={()=>this.xemTime()}>
            <Text style={{fontSize:17,color:'black'}}>{this.props.inbox.noidungtinnhan}
            {this.renderhaha1()}
            </Text>
            </TouchableHighlight>
            </View>
            <View style={{flex:1,marginLeft:5}}>
            <TouchableHighlight onPress={()=>this.accessUser()}>
            <Image source={{uri:this.props.inbox.linkavartar}}
            style={{height:40,width:40,borderRadius:this.state.radius}}/>
            </TouchableHighlight>
            </View>
          </View>
        </View>
      );
    }else{
      return(

          <View style={{flexDirection:'row',marginTop:5}}>
            <View style={{flex:1}}>
            <TouchableHighlight onPress={()=>this.accessUser()}>
            <Image source={{uri:this.props.inbox.linkavartar}}
            style={{height:40,width:40,borderRadius:this.state.radius,marginLeft:5}}/>
            </TouchableHighlight>
            </View>
            <View style={{flex:5,backgroundColor:'#9E9E9E',borderRadius:10,padding:5}}>
            <TouchableHighlight onPress={()=>this.xemTime()}>
            <Text style={{fontSize:17,color:'white'}}>{this.props.inbox.noidungtinnhan}
            {this.renderhaha1()}
            </Text>

            </TouchableHighlight>
            </View>
            <View style={{flex:2}}>
            </View>
          </View>
      );
    }

  }
}
AppRegistry.registerComponent('Component_API_Demo',()=>ItemInbox);
