import React,{Component} from 'react';
import {View,Text,Image,StyleSheet,TextInput,ListView} from 'react-native';

export default class ItemShowAllImage extends Component {
  constructor(props){
    super(props);
    data=[];
    for(let i=0;i<10;i++){
      data.push(i);
      const ds=new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
      this.state={
        dataSource:ds.cloneWithRows(data),
      }
    }
  }
  _renderRow(data){
    return(
      <View style={styles.box}>
      <Text>{data}</Text>
      </View>
    );
  }
  render() {
    return(
      <View style={styles.conatiner}>
      <ListView
      renderRow={this._renderRow.bind(this)}
      dataSource={this.state.dataSource}
      contentContainerStyle={{flexDirection:'row',flexWrap:'wrap'}}
      pageSize={data.length}
      />
      </View>
    );

  }
}
const styles=StyleSheet.create({
  conatiner:{
    flex:1,
  },
  textInput:{
    width: 200,
    borderWidth: 1,
    borderColor:'black'
  },
  image:{
    width:200,
    height:200
  },
  box:{
    width:100,
    height:100,
    backgroundColor:'gray',
    margin:5,
    justifyContent:'center',
    alignItems:'center'
  }
});
