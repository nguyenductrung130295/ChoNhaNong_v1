import React,{Component} from 'react';
import {AppRegistry,View,Image,Text,TouchableHighlight,ListView} from 'react-native';
import ItemListViewStatus from '../item_customer/ItemListViewStatus';
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
      imgyes:false,
      options:1,//1:bài đăng,2:thông tin,3:ảnh
      mysefl:false,//false: là khách xem ,true: là ban than ca nhan ho xem minh
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
            {this.ShowInboxButton()}
          </Image>
          <View style={{flexDirection:'row'}}>
            <View style={{flex:1,backgroundColor:'yellow'}}><Text onPress={()=>this.btn_ShowTabBaiDang()}>BÀI ĐĂNG</Text></View>
            <View style={{flex:1,backgroundColor:'green'}}><Text onPress={()=>this.btn_ShowTabThongTin()}>THÔNG TIN</Text></View>
            <View style={{flex:1,backgroundColor:'green'}}><Text onPress={()=>this.btn_ShowTabAnh()}>ẢNH</Text></View>
          </View>
        </View>

        <View style={{flex:2}}>
        <View style={{marginTop:20}}>
{this._renderOptions()}
        </View>


        </View>


      </View>
    );
  }
  _renderOptions(){
    switch (this.state.options) {
      case 1:
          return(
            <View>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={(rowData)=><ItemListViewStatus obj={rowData}

              ></ItemListViewStatus>}
            />

            </View>
          );
        break;
      case 2:
      return(
        <View>
        <TouchableHighlight>
          <View style={{flexDirection:'row'}}>
            <Image source={require('../img/thaole.jpg')} style={{width:15,height:15}}/>
            <Text>Thảo Lê</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight>
          <View style={{flexDirection:'row'}}>
            <Image source={require('../img/thaole.jpg')} style={{width:15,height:15}}/>
            <Text>0987654321</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight>
          <View style={{flexDirection:'row'}}>
            <Image source={require('../img/thaole.jpg')} style={{width:15,height:15}}/>
            <Text>Xuân Nam-Diên Xuân -Diên Khánh-Khánh Hòa</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight>
          <View style={{flexDirection:'row'}}>
            <Image source={require('../img/thaole.jpg')} style={{width:15,height:15}}/>
            <Text>Lời giới thiệu</Text>
          </View>
        </TouchableHighlight>



          <Text>Cửa hàng sở hữu</Text>

          <TouchableHighlight>
            <View style={{flexDirection:'row'}}>
              <Image source={require('../img/thaole.jpg')} style={{width:15,height:15}}/>
              <Text>Bưởi 5 roi chị Sáu</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight>
            <View style={{flexDirection:'row'}}>
              <Image source={require('../img/thaole.jpg')} style={{width:15,height:15}}/>
              <Text>Bắm cao sản siêu cứng</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight>
            <View style={{flexDirection:'row'}}>
              <Image source={require('../img/thaole.jpg')} style={{width:15,height:15}}/>
              <Text>Sầu riêng ko ruột</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight>
            <View style={{flexDirection:'row'}}>
              <Image source={require('../img/thaole.jpg')} style={{width:15,height:15}}/>
              <Text>Ớt to cho chị em</Text>
            </View>
          </TouchableHighlight>

        </View>
      );
      break;
      case 3:
      return(
        <View>
          <Text>3
          </Text>
        </View>
      );
      break;
    };
  }
  ShowInboxButton(){
    if(this.state.mysefl){
      return(
        <View>
          <Text>ShowModalButtonFloat,EditInfor</Text>
        </View>
      );

    }else{
      return(
        <View>
          <Text onPress={()=>this.btn_SendMessage()}>Gửi tin nhắn
          </Text>
        </View>
      );
    }
  }
  btn_SendMessage(){
    this.props.propsNavigator.push({
      screen:'Messendger'
    })
  }
  btn_ShowTabBaiDang(){
    this.setState({options:1});
  }
  btn_ShowTabThongTin(){
this.setState({options:2});
  }
  btn_ShowTabAnh(){
this.setState({options:3});
  }
}
AppRegistry.registerComponent('Component_API_Demo',()=>InfoPersonal);
