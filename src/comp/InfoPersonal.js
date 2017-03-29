import React,{Component} from 'react';
import {AppRegistry,View,Image,Text,TouchableHighlight,ListView} from 'react-native';

export default class InfoPersonal extends Component{
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
      dataSource:ds.cloneWithRows(data),
      imgyes:false
    }
  }
  yesImg(){
    if(this.state.imgyes){
      return(
        <Text onPress={()=>alert('doi anh')} style={{color:'red'}}>Đổi ảnh</Text>
      );
    }else{
      return(
        <Text onPress={()=>alert('thêm anh')} style={{color:'red'}}>Thêm ảnh</Text>
      );
    }
  }
  render(){
    return(
      <View style={{flex:1}}>
        <View style={{flex:1}}>
          <Image style={{width:'100%',height:'100%'}} source={require('../img/icondefault.jpg')}>
          <View style={{flexDirection:'row'}}>
<View style={{flex:1}}><TouchableHighlight underlayColor='pink' onPress={()=>this.btn_DangNhap_Click()}><Image source={require('../img/ic_account_circle_black_24dp.png')} style={{width:40,height:40,marginTop:5}}/></TouchableHighlight></View>
          <View style={{flex:6}}>
          </View>
          <View style={{flex:1}}><TouchableHighlight onPress={()=>this.btn_TimKiem_Click()}><Image source={require('../img/ic_search_black_24dp.png')} style={{width:40,height:40,marginTop:5}}/></TouchableHighlight></View>
          </View>
            <Image style={{width:100,height:100}} source={require('../img/ngoctam.jpg')}/>
            <Text>Trần Thị Ngọc Tâm
            </Text>
          </Image>
          <View style={{flexDirection:'row'}}>
            <View style={{flex:1,backgroundColor:'yellow'}}><Text>BÀI ĐĂNG</Text></View>
            <View style={{flex:1,backgroundColor:'green'}}><Text>THÔNG TIN</Text></View>
            <View style={{flex:1,backgroundColor:'green'}}><Text>ẢNH</Text></View>
          </View>
        </View>

        <View style={{flex:2}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData)=><ItemListViewStatus obj={rowData}

          ></ItemListViewStatus>}
        />
        </View>        


      </View>
    );
  }
}
AppRegistry.registerComponent('Component_API_Demo',()=>InfoPersonal);
