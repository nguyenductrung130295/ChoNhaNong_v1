import React,{Component} from 'react';
import {AppRegistry,View,Image,Text,TouchableHighlight,ListView,Button} from 'react-native';
import ItemListViewStatus from '../item_customer/ItemListViewStatus';
import ItemShowAllImage from '../item_customer/ItemShowAllImage'
import AddPostNew from './AddPostNew'
export default class ShopMain extends Component{
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

      },
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

      },
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
          <View style={{flexDirection:'row',backgroundColor:'#00000030'}}>
<View style={{flex:1}}><TouchableHighlight underlayColor='pink' onPress={()=>this.btn_Back_Click()}><Image source={require('../img/ic_arrow_back_white_24dp.png')} style={{width:40,height:40,marginTop:5}}/></TouchableHighlight></View>
          <View style={{flex:6}}>
          </View>
          <View style={{flex:1}}><TouchableHighlight onPress={()=>this.btn_TimKiem_Click()}><Image source={require('../img/ic_more_vert_white_24dp.png')} style={{width:40,height:40,marginTop:5}}/></TouchableHighlight></View>
          </View>
            <Image style={{width:100,height:100,borderRadius:100,borderWidth:1,borderColor:'white',marginLeft:15,marginTop:30}} source={require('../img/ngoctam.jpg')}/>
            <View style={{flexDirection:'row',height:30}}>
            <View style={{flex:6}}>
            <Text style={{marginLeft:10,marginTop:5,color:'white',fontSize:20}}>Trần Thị Ngọc Tâm
            </Text>
              </View>
              <View style={{flex:2,paddingRight:10,paddingBottom:3}}>
              {this.ShowInboxButton()}
              </View>
            </View>
            </Image>

        </View>

        <View style={{flex:2,backgroundColor:'#E0E0E0'}}>
        <View style={{flexDirection:'row',height:40,backgroundColor:'#0288D1'}}>
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text style={{color:'white',fontSize:18}} onPress={()=>this.btn_ShowTabBaiDang()}>Bài Đăng</Text></View>
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text style={{color:'white',fontSize:18}} onPress={()=>this.btn_ShowTabThongTin()}>Thông Tin</Text></View>
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text style={{color:'white',fontSize:18}} onPress={()=>this.btn_ShowTabAnh()}>Ảnh</Text></View>
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text style={{color:'white',fontSize:18}} onPress={()=>this.btn_ShowTabAnh()}>Sự Kiện</Text></View>
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text style={{color:'white',fontSize:18}} onPress={()=>this.btn_ShowTabAnh()}>Theo Dỏi</Text></View>
        </View>
        <View style={{height:1,backgroundColor:'#9E9E9Ed4'}}></View>
        <View style={{height:2,backgroundColor:'#BDBDBDc4'}}></View>
        <View style={{height:2,backgroundColor:'#E0E0E0'}}></View>
        {this._renderOptions()}
                <View style={{height:73,width:72,borderRadius:100,backgroundColor:'#BDBDBD',position: 'absolute',
                bottom: 50,
                right:20,}}><TouchableHighlight onPress={() => {
                  this.props.propsNavigator.push({
                    screen:'AddPostNew'
                  });
                }}>

                <View style={{backgroundColor: '#0288D1',
              height: 70,
              width: 70,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: 'black',
              shadowOpacity: 1,
              shadowRadius: 2,
              shadowOffset: {
              height: 1,
              width: 1
              }}}>

                <Image source={require('../img/ic_add_white_24dp.png')} style={{width:50,height:50,borderRadius:100}}/>
                </View>
                </TouchableHighlight>
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
        <View style={{padding:10}}>
        <TouchableHighlight>
          <View style={{flexDirection:'row',margin:5,borderBottomWidth:1,borderBottomColor:'gray'}}>
            <Image source={require('../img/thaole.jpg')} style={{width:30,height:30,marginRight:5}}/>
            <Text style={{fontSize:18,fontWeight:'bold'}}>Họ và tên: </Text>
            <Text style={{fontSize:18}}>Thảo Lê</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight>
          <View style={{flexDirection:'row',margin:5,borderBottomWidth:1,borderBottomColor:'gray'}}>
            <Image source={require('../img/thaole.jpg')} style={{width:30,height:30,marginRight:5}}/>
<Text style={{fontSize:18,fontWeight:'bold'}}>Số điện thoại: </Text>
            <Text style={{fontSize:18}}>0987654321</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight>
          <View style={{flexDirection:'row',margin:5,borderBottomWidth:1,borderBottomColor:'gray'}}>
            <Image source={require('../img/thaole.jpg')} style={{width:30,height:30,marginRight:5}}/>
<Text style={{fontSize:18,fontWeight:'bold'}}>Địa chỉ: </Text>
            <Text style={{fontSize:18}}>Xuân Nam-Diên Xuân -Diên Khánh-Khánh Hòa</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight>
          <View style={{flexDirection:'row',margin:5,borderBottomWidth:1,borderBottomColor:'gray'}}>
            <Image source={require('../img/thaole.jpg')} style={{width:30,height:30,marginRight:5}}/>
            <Text style={{fontSize:18,fontWeight:'bold'}}>Lời giới thiệu: </Text>
            <Text style={{fontSize:18}}>Anh đẹp trai to con</Text>
          </View>
        </TouchableHighlight>


        </View>
      );
      break;
      case 3:
      return(
        <ItemShowAllImage/>
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
<TouchableHighlight underlayColor='pink' onPress={()=>this.btn_Back_Click()}>
        <View style={{flexDirection:'row',backgroundColor:'#03A9F4',borderRadius:2,height:30}}>
<Image source={require('../img/ic_send_black_24dp.png')} style={{width:30,height:30}}/>
<Text style={{fontSize:15,color:'white',marginTop:5}}>Nhắn tin</Text>
        </View>
        </TouchableHighlight>
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
  btn_Back_Click(){
    this.props.propsNavigator.pop();
  }
}

AppRegistry.registerComponent('Component_API_Demo',()=>InfoPersonal);
