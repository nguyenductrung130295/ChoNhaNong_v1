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
      <View>
        <View>
        <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData)=><ItemInbox inbox={rowData}/>}
        />

          <TextInput onChangeText={(value)=>this.setState({text:value})}/>
          <TouchableHighlight onPress={()=>alert('send '+this.state.text)}><Image source={require('../img/icondefault.jpg')} style={{height:10,width:10}}/>
          </TouchableHighlight>
        </View>

      </View>
    );
  }
}
AppRegistry.registerComponent('Component_API_Demo',()=>Messendger);
