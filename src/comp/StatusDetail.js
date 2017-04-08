import React ,{Component} from 'react';
import {AppRegistry,Text,Image,View,ListView,TextInput,TouchableHighlight,ScrollView} from 'react-native';
import ItemCommand from '../item_customer/ItemCommand';
export default class StatusDetail extends Component{
  constructor(props){
    super(props);
    data=[
        {
        username:'Nguyễn Đức Trung',
        img:'https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-1/c0.27.100.100/p100x100/16298502_1821740334734783_649746552886407600_n.jpg?oh=a82ab51c245047c0493edfc8a4252fac&oe=5930F951',
        content:' nội dung command nội dung command nội dung command nội dung command'+
        'nội dung command nội dung command nội dung command'+
        'nội dung command nội dung command nội dung command nội dung command nội dung command'+
        'nội dung command nội dung command nội dung command nội dung command nội dung command',
        time:'12-2-2018'
      },
      {
        username:'Kiều Nữ Ngọc Dinh',
        img:'https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-1/c0.27.100.100/p100x100/16298502_1821740334734783_649746552886407600_n.jpg?oh=a82ab51c245047c0493edfc8a4252fac&oe=5930F951',
        content:' nội dung command nội dung command nội dung command nội dung command'+
        'nội dung command nội dung command nội dung command'+
        'nội dung command nội dung command nội dung command nội dung command nội dung command'+
        'nội dung command nội dung command nội dung command nội dung command nội dung command',
        time:'12-2-2010'
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
      
<ScrollView>
  {/* Listview trượt nằm ngang
    <ListView
      horizontal={true}
    dataSource={this.state.dataSource}
      renderRow={(rowData)=><Image source={require('../img/icondefault.jpg')} style={{width:200,height:100}}/>}
    />

    */}
        <Image source={require('../img/icondefault.jpg')} style={{width:200,height:100}}>
        <View style={{flexDirection:'row'}}>
          <Text onPress={()=>this.btn_previous()} style={{color:'red'}}>P
          </Text>
          <Text>  1/3
          </Text>
          <Text onPress={()=>this.btn_next()} style={{color:'red'}}>N
          </Text>
          </View>
        </Image>
        <Text style={{color:'blue'}}>Tiều đề sản phẩm
        </Text>
        <Text  style={{color:'red'}}>20000 VND</Text>
        <Text>Ngày 29-3-2019
        </Text>
        <Text>xuan nam - dien xuan - dien khanh</Text>
        <Text>Nha trang</Text>
        <Text>Loại:Thủy sản</Text>
        <Text>Số điện thoại:0987654321</Text>
        <View style={{flexDirection:'row'}}>
        <Image source={require('../img/icondefault.jpg')} style={{width:20,height:20}}/>
        <Text style={{color:'pink'}}>Nguyễn Đức Trung
        </Text>
        </View>
        <View style={{flexDirection:'row'}}>
        <Text>Đánh giá:</Text>
          <Image source={require('../img/icondefault.jpg')} style={{width:20,height:20}}/>
          <Image source={require('../img/icondefault.jpg')} style={{width:20,height:20}}/>
          <Image source={require('../img/icondefault.jpg')} style={{width:20,height:20}}/>
          <Image source={require('../img/icondefault.jpg')} style={{width:20,height:20}}/>
          <Image source={require('../img/icondefault.jpg')} style={{width:20,height:20}}/>
        </View>
        <Text>Nội Dung Nội Dung Nội Dung Nội Dung Nội Dung Nội Dung Nội Dung Nội Dung
        Nội Dung Nội Dung Nội Dung Nội Dung Nội Dung Nội Dung Nội Dung Nội Dung Nội Dung
        Nội Dung Nội Dung Nội Dung Nội Dung Nội Dung Nội Dung Nội Dung Nội Dung Nội Dung
        Nội Dung Nội Dung Nội Dung Nội Dung Nội Dung Nội Dung Nội Dung Nội Dung Nội Dung </Text>
        <View style={{flexDirection:'row'}}>

        <TextInput placeholder={"command"} style={{width:200}}/>
        <TouchableHighlight onPress={()=>this.btn_postCommand()}>
        <Image source={require('../img/icondefault.jpg')} style={{width:20,height:20}}/>
        </TouchableHighlight>
        </View>
      <ListView
      dataSource={this.state.dataSource}
      renderRow={(rowData)=><ItemCommand obj={rowData}></ItemCommand>}
      />
</ScrollView>
      </View>
    );
  }
  btn_postCommand(){
    alert('post command');
  }
  btn_previous(){
    alert('previous');
  }
  btn_next(){
    alert('next');
  }

}
AppRegistry.registerComponent('ChoNhaNong_v1',()=>StatusDetail);
