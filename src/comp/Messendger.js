import React,{Component} from 'react';
import {AppRegistry,View,Image,TextInput,TouchableHighlight,ListView,Text} from 'react-native';
import ItemInbox from '../item_customer/ItemInbox';
export default class Messendger extends Component{
  constructor(props){
    super(props);
    data=[
      {
        contents:'contents1',
        time:'15:30 2/3/2017',
        own:true
      },
      {
        contents:'contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 ',
        time:'15:30 2/3/2017',
        own:false
      },
      {
        contents:'contents3',
        time:'15:30 2/3/2017',
        own:false
      },{
        contents:'contents1',
        time:'15:30 2/3/2017',
        own:true
      },
      {
        contents:'contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 ',
        time:'15:30 2/3/2017',
        own:false
      },
      {
        contents:'contents3',
        time:'15:30 2/3/2017',
        own:false
      },{
        contents:'contents1',
        time:'15:30 2/3/2017',
        own:true
      },
      {
        contents:'contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 contents2 ',
        time:'15:30 2/3/2017',
        own:false
      },
      {
        contents:'contents3',
        time:'15:30 2/3/2017',
        own:false
      }];

      const ds=new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
      this.state={
        dataSource:ds.cloneWithRows(data),textip:''
      };

  }
  render(){

    return(
      <View style={{flex:1,backgroundColor:'#EEEEEE'}}>
        <View style={{flex:1}}>
        <View style={{backgroundColor:'#03A9F4'}}>
        <View style={{flexDirection:'row'}}>
          <View style={{flex:1}}><TouchableHighlight underlayColor='#E0F7FA' onPress={()=>this.btn_Back_Click()} style={{width:40,height:40,marginTop:5,borderRadius:20}}><Image source={require('../img/ic_arrow_back_white_24dp.png')} /></TouchableHighlight></View>
          <View style={{flex:7,paddingLeft:5}}>
{/* SEARCH INPUT */}
          <Text style={{fontSize:20,color:'white',marginTop:10}}>Nguyễn Đức Trung</Text>
          </View>

{/* ICON BUTTON options */}
          <View style={{flex:1}}><TouchableHighlight underlayColor='#E0F7FA' onPress={()=>this.btn_DangNhap_Click()} style={{width:40,height:40,marginTop:5,borderRadius:20}}><Image source={require('../img/ic_more_vert_white_24dp.png')} /></TouchableHighlight></View>
        </View>
        <View style={{height:1,backgroundColor:'#9E9E9Ed4'}}></View>
        <View style={{height:2,backgroundColor:'#BDBDBDc4'}}></View>
        <View style={{height:2,backgroundColor:'#E0E0E0'}}></View>
        </View>
        </View>
        <View style={{flex:12}}>
        <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData)=><ItemInbox inbox={rowData}/>}
        />
      </View>
      <View style={{flex:1,flexDirection:'row'}}>
        <View style={{flex:8,paddingLeft:5,marginTop:5}}>
        <TextInput style={{backgroundColor:'#E0E0E0',borderColor:'#0277BD',borderWidth:1,borderRadius:3,height:38,fontSize:15}} underlineColorAndroid="white" returnKeyType="send" onChangeText={(value)=>this.setState({text:value})} onSubmitEditing={()=>alert('send')}/>
        </View>
        <View style={{flex:1,marginTop:5,paddingLeft:5}}>
        <TouchableHighlight onPress={()=>alert('send '+this.state.text)}><Image source={require('../img/ic_send_black_24dp.png')} style={{height:35,width:35}}/>
        </TouchableHighlight>
        </View>
        </View>

      </View>
    );
  }
  btn_Back_Click(){
    this.props.propsNavigator.pop();
  }
}
AppRegistry.registerComponent('Component_API_Demo',()=>Messendger);
