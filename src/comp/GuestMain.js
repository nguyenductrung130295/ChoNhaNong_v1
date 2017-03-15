import React,{Component} from 'react';
import {AppRegistry,View,Text,TextInput,Item,TouchableHighlight,Picker,Button,Image,ListView} from 'react-native';
import ItemListViewStatus from '../item_customer/ItemListViewStatus';
export default class GuestMain extends Component{
  constructor(props){
    super(props);
    data=[
      {
        title:"Dinh Khung",
        imgsrc:"https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-1/c0.27.100.100/p100x100/16298502_1821740334734783_649746552886407600_n.jpg?oh=a82ab51c245047c0493edfc8a4252fac&oe=5930F951",
        price:"120000",
        time:"12-2-2017 15:00",
        address:"Khanh Hoa"

      },
      {
        title:"Trung Khung",
        imgsrc:"https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-1/c0.27.100.100/p100x100/16298502_1821740334734783_649746552886407600_n.jpg?oh=a82ab51c245047c0493edfc8a4252fac&oe=5930F951",
        price:"120000",
        time:"12-2-2017 15:00",
        address:"Khanh Hoa"

      }
    ];
    const ds=new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
    this.state={
      dataSource:ds.cloneWithRows(data)
    };


  }

  render(){

    return(
      <View>
      <Image source={require('../img/icondefault.jpg')}>
          <Text>Logo</Text>
      </Image>
      <TextInput placeholder="tim kiem"/>
      <TouchableHighlight onPress={()=>this.btn_TimKiem()}>
      <Image source={require('../img/icondefault.jpg')} style={{width:25,height:25}}/>
      </TouchableHighlight>
      <Picker>
        <Item label={'Ho Chi Minh'}/>
        <Item label={'Ha noi'}/>
        <Item label={'Nha trang'}/>
      </Picker>
      <Picker>
        <Item label={'Thuy San'}/>
        <Item label={'Trai Cay'}/>
        <Item label={'Gia Cam'}/>
      </Picker>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData)=><ItemListViewStatus obj={rowData}

        ></ItemListViewStatus>}
      />
      </View>

    );
  }
  btn_TimKiem(){
    alert('tim kiem');
  }
}
