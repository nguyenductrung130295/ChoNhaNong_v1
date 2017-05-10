import React,{Component} from 'react';
import {AppRegistry,Text,TextInput,View, Button,Image,TouchableHighlight,AsyncStorage,Platform} from 'react-native';
//import Users from '../entities/Users'
import firebase from './src/entities/FirebaseAPI';
export default class Demo extends Component {
  constructor(props){
    super(props);
    var a="d";
    database=firebase.database();
    tb_cm=database.ref('db_marketsfarmers/table_notif/-Ki-7FYal1djjUuPf8c6');
    tb_cm.orderByChild('state').equalTo('dagui').on('value',(datasnapshot)=>{
      datasnapshot.forEach((haha)=>{
        if(haha.key!==a){
          a=haha.key;
          console.log(a);
        }
      });


    });
  }
  render(){
    return(
      <View style={{flex:1,backgroundColor:'#B3E5FC'}}>
      <Text>demo</Text>
      </View>
    );

  }

}
AppRegistry.registerComponent('ChoNhaNong_v1',()=>Login);
