import React,{Component} from 'react';
import {AppRegistry,Image,Text,TouchableHighlight,View} from 'react-native';

export default class ItemInbox extends Component{
  constructor(props){
    super(props);
    this.state={flag:false}
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
        <Text style={{color:'red'}}>-{this.props.inbox.time}-</Text>
      );
    }else{
      return null;
    }
  }
  render(){
    if(this.props.inbox.own){
      return(
        <View>
          <View style={{flexDirection:'row'}}>
            <TouchableHighlight onPress={()=>this.xemTime()}><Text>i:{this.props.inbox.contents}
            {this.renderhaha1()}
            </Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={()=>this.accessUser()}><Image source={require('../img/icondefault.jpg')} style={{height:20,width:20}}/>
            </TouchableHighlight>
          </View>
        </View>
      );
    }else{
      return(
        <View>
          <View style={{flexDirection:'row'}}>
            <TouchableHighlight onPress={()=>this.accessUser()}><Image source={require('../img/icondefault.jpg')} style={{height:20,width:20}}/>
            </TouchableHighlight>
            <TouchableHighlight onPress={()=>this.xemTime()}><Text>i:{this.props.inbox.contents}
            {this.renderhaha1()}
            </Text>

            </TouchableHighlight>
          </View>
        </View>
      );
    }

  }
}
AppRegistry.registerComponent('Component_API_Demo',()=>ItemInbox);
