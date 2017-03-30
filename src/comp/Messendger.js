import React,{Component} from 'react';
import {AppRegistry,View,Image,TextInput,TouchableHighlight,ListView} from 'react-native';
import ItemInbox from '../item_customer/ItemInbox';
export default class Messendger extends Component{
  constructor(props){
    super(props);
    data=[
      {
        contents:'contents1',
        time:'time1',
        own:true
      },
      {
        contents:'contents2',
        time:'time2',
        own:false
      },
      {
        contents:'contents3',
        time:'time3',
        own:false
      }];

      const ds=new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
      this.state={
        dataSource:ds.cloneWithRows(data),textip:''
      };

  }
  render(){
    return(
      <View style={{flex:1}}>
        <View style={{flex:9}}>
        <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData)=><ItemInbox inbox={rowData}/>}
        />
      </View>
      <View style={{flex:1,flexDirection:'row'}}>
        <View style={{flex:7}}>
        <TextInput returnKeyType="send" onChangeText={(value)=>this.setState({text:value})} onSubmitEditing={()=>alert('send')}/>
        </View>
        <View style={{flex:1}}>
        <TouchableHighlight onPress={()=>alert('send '+this.state.text)}><Image source={require('../img/icondefault.jpg')} style={{height:25,width:25}}/>
        </TouchableHighlight>
        </View>
        </View>

      </View>
    );
  }
}
AppRegistry.registerComponent('Component_API_Demo',()=>Messendger);
