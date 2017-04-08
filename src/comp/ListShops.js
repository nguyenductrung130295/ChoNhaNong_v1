import React,{Component} from 'react'
import {Text,ListView,AppRegistry,TouchableHighlight,Image,View,Modal,TextInput,Picker,Button} from 'react-native'
import ItemShop from '../item_customer/ItemShop'

export default class ListShops extends Component{

  constructor(props){
    super(props);
    data=[
      {
        nameshop:"Bán bưởi 2 roi",
        imgsrc:"https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-1/c0.27.100.100/p100x100/16298502_1821740334734783_649746552886407600_n.jpg?oh=a82ab51c245047c0493edfc8a4252fac&oe=5930F951",
        loaisp:"Trái cây"
      },
      {
        nameshop:"Dưa gò công",
        imgsrc:"https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-1/c0.27.100.100/p100x100/16298502_1821740334734783_649746552886407600_n.jpg?oh=a82ab51c245047c0493edfc8a4252fac&oe=5930F951",
        loaisp:"Trái cây"
      },{
        nameshop:"Vú sữa lò rèn",
        imgsrc:"https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-1/c0.27.100.100/p100x100/16298502_1821740334734783_649746552886407600_n.jpg?oh=a82ab51c245047c0493edfc8a4252fac&oe=5930F951",
        loaisp:"Trái cây"
      },{
        nameshop:"Gà khỏa thân",
        imgsrc:"https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-1/c0.27.100.100/p100x100/16298502_1821740334734783_649746552886407600_n.jpg?oh=a82ab51c245047c0493edfc8a4252fac&oe=5930F951",
        loaisp:"Gia cầm"
      },{
        nameshop:"Heo xinh tươi",
        imgsrc:"https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-1/c0.27.100.100/p100x100/16298502_1821740334734783_649746552886407600_n.jpg?oh=a82ab51c245047c0493edfc8a4252fac&oe=5930F951",
        loaisp:"Gia súc"
      },{
        nameshop:"Ớt bao to bao dài bao cay",
        imgsrc:"https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-1/c0.27.100.100/p100x100/16298502_1821740334734783_649746552886407600_n.jpg?oh=a82ab51c245047c0493edfc8a4252fac&oe=5930F951",
        loaisp:"Rau củ"
      },{
        nameshop:"Bán bưởi 2 roi",
        imgsrc:"https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-1/c0.27.100.100/p100x100/16298502_1821740334734783_649746552886407600_n.jpg?oh=a82ab51c245047c0493edfc8a4252fac&oe=5930F951",
        loaisp:"Trái cây"
      },
      {
        nameshop:"Dưa gò công",
        imgsrc:"https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-1/c0.27.100.100/p100x100/16298502_1821740334734783_649746552886407600_n.jpg?oh=a82ab51c245047c0493edfc8a4252fac&oe=5930F951",
        loaisp:"Trái cây"
      },{
        nameshop:"Vú sữa lò rèn",
        imgsrc:"https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-1/c0.27.100.100/p100x100/16298502_1821740334734783_649746552886407600_n.jpg?oh=a82ab51c245047c0493edfc8a4252fac&oe=5930F951",
        loaisp:"Trái cây"
      },{
        nameshop:"Gà khỏa thân",
        imgsrc:"https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-1/c0.27.100.100/p100x100/16298502_1821740334734783_649746552886407600_n.jpg?oh=a82ab51c245047c0493edfc8a4252fac&oe=5930F951",
        loaisp:"Gia cầm"
      },{
        nameshop:"Heo xinh tươi",
        imgsrc:"https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-1/c0.27.100.100/p100x100/16298502_1821740334734783_649746552886407600_n.jpg?oh=a82ab51c245047c0493edfc8a4252fac&oe=5930F951",
        loaisp:"Gia súc"
      },{
        nameshop:"Ớt bao to bao dài bao cay",
        imgsrc:"https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-1/c0.27.100.100/p100x100/16298502_1821740334734783_649746552886407600_n.jpg?oh=a82ab51c245047c0493edfc8a4252fac&oe=5930F951",
        loaisp:"Rau củ"
      },
    ];
    const ds=new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
    this.state={
      dataSource:ds.cloneWithRows(data),
      modalVisible: false
    };
  }
  setModalVisible(visible) {
    this.setState({modalVisible:visible});
  }
  render(){
    return(
      <View>
      <View style={{backgroundColor:'#03A9F4'}}>
      <View style={{flexDirection:'row'}}>
        <View style={{flex:1}}><TouchableHighlight underlayColor='#E0F7FA' onPress={()=>this.btn_Back_Click()} style={{width:40,height:40,marginTop:5,borderRadius:20}}><Image source={require('../img/ic_arrow_back_white_24dp.png')} /></TouchableHighlight></View>
        <View style={{flex:7,paddingLeft:5}}>
{/* SEARCH INPUT */}
        <Text style={{fontSize:20,color:'white',marginTop:10}}>Cửa hàng của tôi</Text>
        </View>

{/* ICON BUTTON options */}
        <View style={{flex:1}}><TouchableHighlight underlayColor='#E0F7FA' onPress={()=>this.btn_DangNhap_Click()} style={{width:40,height:40,marginTop:5,borderRadius:20}}><Image source={require('../img/ic_more_vert_white_24dp.png')} /></TouchableHighlight></View>
      </View>
      <View style={{height:1,backgroundColor:'#9E9E9Ed4'}}></View>
      <View style={{height:2,backgroundColor:'#BDBDBDc4'}}></View>
      <View style={{height:2,backgroundColor:'#E0E0E0'}}></View>
      </View>



      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData)=><ItemShop propsNavigator={this.props.propsNavigator} obj={rowData}
        ></ItemShop>}
      />
      <View style={{height:73,width:72,borderRadius:100,backgroundColor:'#BDBDBD',position: 'absolute',
      bottom: 100,
      right:20,}}><TouchableHighlight onPress={() => {
        this.setModalVisible(true)
      }}>

      <View style={{backgroundColor: '#FF6F00',
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

            <Modal
              animationType={"slide"}
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => alert("Modal has been closed.")}
              >
             <View style={{flex:1,backgroundColor:'#000000a0'}}>
              <View style={{flex:1}}></View>
              <View style={{flex:2}}>
              <View style={{margin:20,backgroundColor:'white',borderRadius:5}}>
              <View style={{flexDirection:'row',backgroundColor:'#0288D1'}}>
                <View style={{flex:7}}>
                  <Text style={{fontSize:20,color:'white',marginLeft:10,marginTop:10}}>Tạo Cửa hàng mới</Text>
                </View>
                <View style={{flex:1}}>
                  <TouchableHighlight underlayColor='#E0F7FA' onPress={() => {
                    this.setModalVisible(!this.state.modalVisible)
                  }} style={{width:40,height:40,marginTop:5,borderRadius:20}}><Image source={require('../img/ic_clear_white_24dp.png')} /></TouchableHighlight>
                </View>
              </View>
              <View style={{flexDirection:'row'}}>
                <View style={{flex:1}}>
                  <Image source={require('../img/thaole.jpg')} style={{width:40,height:40,marginTop:10,marginLeft:10,borderColor:'white',borderWidth:1,borderRadius:100}}/>
                </View>
                <View style={{flex:3,borderColor:'#BDBDBD'}}>
                <Picker
          selectedValue={this.state.language}
          onValueChange={(lang) => this.setState({language: lang})}>
          <Picker.Item label="Trái Cây" value="java" />
          <Picker.Item label="Gia Cầm" value="js" />
                </Picker>
                </View>
                <View style={{flex:4}}>
                <Picker
          selectedValue={this.state.language}
          onValueChange={(lang) => this.setState({language: lang})}>
          <Picker.Item label="Trái Cây" value="java" />
          <Picker.Item label="Gia Cầm" value="js" />
                </Picker>
                </View>
              </View>

                  <View style={{padding: 10}}>
            <TextInput
              style={{color:'black',height: 40,marginBottom:10,borderColor:'#BDBDBD',borderWidth:1,borderRadius:2}}
              underlineColorAndroid="white"
              placeholder="Tên cửa hàng mới"/>
                <Button onPress={()=>this.btn_DangNhap_Click()} title={'Đăng Ký'} color='#03A9F4'></Button>
          </View>
          </View>
              </View>
              <View style={{flex:1}}></View>
             </View>
            </Modal>

      </View>
    );
  }
  btn_Back_Click(){
    this.props.propsNavigator.pop();
  }
}
