import React, {Component} from 'react';
import {Platform,PickerIOS,Modal,StyleSheet,Text,TouchableHighlight,TextInput,View,Image,Button,Picker,Item,StatusBar,AppRegistry} from 'react-native';
export default class HomeGuest extends Component{
  constructor(props){
    super(props);
    muaban=['Mua','Bán'];
    loai=['Trái cây','Gia súc'];
    tinh=['Hà Nội','Nha Trang','Hồ Chí Minh','Cà Mau'];
    this.state={
      //dataSource:ds.cloneWithRows([]),
      //modalVisible:false,
      modalMuahaybanIOS:false,//hiện ẩn modal menu
      modalLoaiSpIOS:false,//hiện ẩn modal menu
      modalTinhTpIOS:false,//hiện ẩn modal menu
      //uid:'-1',//
      selected1:'Mua',//mặc định
      selected2:'Trái cây',
      selected3:'Hồ Chí Minh',
      //user:new Users(),//state là user mới có thể thay đổi dc
    };

  }
  renderItemBan(){
    items=[];
    for(let item of muaban){
      items.push(<Picker.Item key={item} label={item} value={item}/>)
    }
    return items;
  }
  renderItemLoai(){
    items=[];
    for(let item of loai){
      items.push(<Picker.Item key={item} label={item} value={item}/>)
    }
    return items;
  }
  renderItemTinh(){
    items=[];
    for(let item of tinh){
      items.push(<Picker.Item key={item} label={item} value={item}/>)
    }
    return items;
  }
  renderItemBanIOS(){
    items=[];
    for(let item of muaban){
      items.push(<PickerIOS.Item key={item} label={item} value={item}/>)
    }
    return items;
  }
  renderItemLoaiIOS(){
    items=[];
    for(let item of loai){
      items.push(<PickerIOS.Item key={item} label={item} value={item}/>)
    }
    return items;
  }
  renderItemTinhIOS(){
    items=[];
    for(let item of tinh){
      items.push(<PickerIOS.Item key={item} label={item} value={item}/>)
    }
    return items;
  }
  render3PickerChoose(){
    if(Platform.OS==='ios'){
      return(

        <View style={{flexDirection:'row',marginTop:5,marginBottom:5}}>
  {/* PICKER BÁN MUA */}
          <View style={{flex:3}}>
          <View style={{marginLeft:5,backgroundColor:'#29b6f6',borderRadius:3,borderColor:'#81D4FA',borderWidth:1}}>
          <Text onPress={()=>this.setState({modalMuahaybanIOS:!this.state.modalMuahaybanIOS})}
                style={{color:'white'}}>{this.state.selected1}</Text>
          <Modal
            animationType={"slide"}
            transparent={true}
            visible={this.state.modalMuahaybanIOS}
            onRequestClose={() => alert("Modal has been closed.")}
            >
           <View style={{flex:1,backgroundColor:'#000000a0'}}>
            <View style={{flex:2}}></View>
            <View style={{flex:2}}>
            <View style={{margin:20,backgroundColor:'white',borderRadius:5}}>
            <View style={{flexDirection:'row',backgroundColor:'#0288D1'}}>
              <View style={{flex:7}}>
                <Text style={{fontSize:20,color:'white',marginLeft:10,marginTop:10}}>Mua hay ban</Text>
              </View>
              <View style={{flex:1}}>
                <TouchableHighlight underlayColor='#E0F7FA' onPress={() => {
                  this.setState({modalMuahaybanIOS:!this.state.modalMuahaybanIOS})
                }} style={{width:40,height:40,marginTop:5,borderRadius:20}}><Image source={require('../img/ic_clear_white_24dp.png')} /></TouchableHighlight>
              </View>
            </View>
            <View>
              <PickerIOS selectedValue={this.state.selected1}
              onValueChange={(value)=>this.setState({selected1:value})}>
                {this.renderItemBanIOS()}
              </PickerIOS>
              </View>
                <View style={{padding: 10}}>
              <Button onPress={()=>this.btn_TaoCuaHangMoi_Click()} title={'Tạo cửa hàng'} color='#03A9F4'></Button>
        </View>
        </View>
            </View>
            <View style={{flex:2}}></View>
           </View>
          </Modal>
          </View>

          </View>
  {/* PICKER LOẠI */}
          <View style={{flex:4}}><View style={{marginLeft:5,backgroundColor:'#29b6f6',borderRadius:3,borderColor:'#81D4FA',borderWidth:1}}>
          <Text onPress={()=>this.setState({modalLoaiSpIOS:!this.state.modalLoaiSpIOS})}
                style={{color:'white'}}>{this.state.selected2}</Text>
          <Modal
            animationType={"slide"}
            transparent={true}
            visible={this.state.modalLoaiSpIOS}
            onRequestClose={() => alert("Modal has been closed.")}
            >
           <View style={{flex:1,backgroundColor:'#000000a0'}}>
            <View style={{flex:1}}></View>
            <View style={{flex:2}}>
            <View style={{margin:20,backgroundColor:'white',borderRadius:5}}>
            <View style={{flexDirection:'row',backgroundColor:'#0288D1'}}>
              <View style={{flex:7}}>
                <Text style={{fontSize:20,color:'white',marginLeft:10,marginTop:10}}>Loai San Pham</Text>
              </View>
              <View style={{flex:1}}>
                <TouchableHighlight underlayColor='#E0F7FA' onPress={() => {
                  this.setState({modalLoaiSpIOS:!this.state.modalLoaiSpIOS})
                }} style={{width:40,height:40,marginTop:5,borderRadius:20}}><Image source={require('../img/ic_clear_white_24dp.png')} /></TouchableHighlight>
              </View>
            </View>

            <View>
            <PickerIOS selectedValue={this.state.selected2} onValueChange={(value)=>this.setState({selected2:value})}>
              {this.renderItemLoaiIOS()}
            </PickerIOS>
            </View>

                <View style={{padding: 10}}>

              <Button onPress={()=>this.btn_TaoCuaHangMoi_Click()} title={'Tạo cửa hàng'} color='#03A9F4'></Button>
          </View>
          </View>
            </View>
            <View style={{flex:1}}></View>
           </View>
          </Modal>
          </View>
          </View>
  {/* PICKER TỈNH THÀNH PHỐ */}
          <View style={{flex:5}}><View style={{marginLeft:5,backgroundColor:'#29b6f6',marginRight:5,borderRadius:3,borderColor:'#81D4FA',borderWidth:1}}>
          <Text onPress={()=>this.setState({modalTinhTpIOS:!this.state.modalTinhTpIOS})}
                style={{color:'white'}}>{this.state.selected3}</Text>
          <Modal
            animationType={"slide"}
            transparent={true}
            visible={this.state.modalTinhTpIOS}
            onRequestClose={() => alert("Modal has been closed.")}
            >
           <View style={{flex:1,backgroundColor:'#000000a0'}}>
            <View style={{flex:1}}></View>
            <View style={{flex:2}}>
            <View style={{margin:20,backgroundColor:'white',borderRadius:5}}>
            <View style={{flexDirection:'row',backgroundColor:'#0288D1'}}>
              <View style={{flex:7}}>
                <Text style={{fontSize:20,color:'white',marginLeft:10,marginTop:10}}>Tinh thanh pho</Text>
              </View>
              <View style={{flex:1}}>
                <TouchableHighlight underlayColor='#E0F7FA' onPress={() => {
                  this.setState({modalTinhTpIOS:!this.state.modalTinhTpIOS})
                }} style={{width:40,height:40,marginTop:5,borderRadius:20}}><Image source={require('../img/ic_clear_white_24dp.png')} /></TouchableHighlight>
              </View>
            </View>
            <View>
            <PickerIOS selectedValue={this.state.selected3} onValueChange={(value)=>this.setState({selected3:value})}>
              {this.renderItemTinhIOS()}
            </PickerIOS>
            </View>

                <View style={{padding: 10}}>

              <Button onPress={()=>this.btn_TaoCuaHangMoi_Click()} title={'Tạo cửa hàng'} color='#03A9F4'></Button>
          </View>
          </View>
            </View>
            <View style={{flex:1}}></View>
           </View>
          </Modal>
          </View>
          </View>
        </View>

      )
    }else{
      return(

        <View style={{flexDirection:'row',marginTop:5,marginBottom:5}}>
  {/* PICKER BÁN MUA */}
          <View style={{flex:3}}><View style={{marginLeft:5,backgroundColor:'#29b6f6',borderRadius:3,borderColor:'#81D4FA',borderWidth:1}}>
          <Picker style={{color:'white',height:30}} selectedValue={this.state.selected} onValueChange={(value)=>this.setState({selected:value})}>
            {this.renderItemBan()}
          </Picker></View>
          </View>
  {/* PICKER LOẠI */}
          <View style={{flex:4}}><View style={{marginLeft:5,backgroundColor:'#29b6f6',borderRadius:3,borderColor:'#81D4FA',borderWidth:1}}>
          <Picker style={{color:'white',height:30}} mode='dropdown' selectedValue={this.state.selected} onValueChange={(value)=>this.setState({selected:value})}>
            {this.renderItemLoai()}
          </Picker></View>
          </View>
  {/* PICKER TỈNH THÀNH PHỐ */}
          <View style={{flex:5}}><View style={{marginLeft:5,backgroundColor:'#29b6f6',marginRight:5,borderRadius:3,borderColor:'#81D4FA',borderWidth:1}}>
          <Picker style={{color:'white',height:30}}rr selectedValue={this.state.selected} onValueChange={(value)=>this.setState({selected:value})}>
            {this.renderItemTinh()}
          </Picker></View>
          </View>
        </View>

      );
    }

  }
  render(){
    return(

      <View style={styles.container}>
{/* STATUS BAR */}
        <StatusBar
       backgroundColor="#0288D1"
       barStyle="light-content"
     />
     <View style={{flex:1}}>


        <View style={{backgroundColor:'#03A9F4'}}>
        <View style={{flexDirection:'row'}}>
          <View style={{flex:7,paddingLeft:5}}>
{/* SEARCH INPUT */}
          <TextInput underlineColorAndroid="#29b6f6" style={{color:'white',borderColor:'#81D4FA',borderWidth:1,backgroundColor:'#29b6f6',borderRadius:5,height:38,fontSize:15,marginTop:5}} returnKeyType={'search'} placeholder="  search" onSubmitEditing={()=>this.btn_TimKiem_Click()}/>
          </View>
{/* ICON BUTTON SEARCH */}
          <View style={{flex:1}}><TouchableHighlight underlayColor='#E0F7FA' onPress={()=>this.btn_TimKiem_Click()} style={{width:40,height:40,marginTop:5,borderRadius:20}}><Image source={require('../img/ic_search_white_24dp.png')} /></TouchableHighlight></View>
{/* ICON BUTTON ACCOUNT */}
          <View style={{flex:1}}><TouchableHighlight underlayColor='#E0F7FA' onPress={()=>this.btn_DangNhap_Click()} style={{width:40,height:40,marginTop:5,borderRadius:20}}><Image source={require('../img/ic_person_white_24dp.png')} /></TouchableHighlight></View>
        </View>
        {this.render3PickerChoose()}
        </View>
        {/* SHADOW */}
                <View style={{height:1,backgroundColor:'#9E9E9Ed4'}}></View>
                <View style={{height:2,backgroundColor:'#BDBDBDc4'}}></View>
                <View style={{height:2,backgroundColor:'#E0E0E0'}}></View>
          <Text style={{fontWeight:'bold',color:'#0288D1',marginLeft:10}}>DANH MỤC SẢN PHẨM{"\n"}</Text>
      </View>

        <View style={{flex:5,padding:5}}>
          <View style={{flex:1}}>
          <TouchableHighlight underlayColor={'#ffffff'} onPress={()=>this.btn_Loai_HoaCanh_Click()}>
            <Image source={{uri:'https://firebasestorage.googleapis.com/v0/b/nodejsdemo-d89c7.appspot.com/o/photos%2Fimages_system%2Floai_hoacaycanh.jpg?alt=media&token=3413f79b-cc08-4902-82c7-64fa95675be4'}} style={styles.imageloai} resizeMode="stretch">
            <Text style={styles.nameloaisp}>Hoa, cây cảnh</Text>
            </Image>
            </TouchableHighlight>
          </View>
          <View style={{flex:1,flexDirection:'row'}}>
            <View style={{flex:1}}>
            <TouchableHighlight underlayColor={'#ffffff'} onPress={()=>this.btn_Loai_RauCu_Click()}>
              <Image source={{uri:'https://firebasestorage.googleapis.com/v0/b/nodejsdemo-d89c7.appspot.com/o/photos%2Fimages_system%2Floai_raucu.jpg?alt=media&token=ff2c7713-0ddf-4f79-90ce-e0f7ebf2a599'}} style={styles.imageloai} resizeMode="stretch">
              <Text style={styles.nameloaisp}>Rau củ</Text>
              </Image>
              </TouchableHighlight>
            </View>
            <View style={{flex:1}}>
            <TouchableHighlight underlayColor={'#ffffff'} onPress={()=>this.btn_Loai_TraiCay_Click()}>
              <Image source={{uri:'https://firebasestorage.googleapis.com/v0/b/nodejsdemo-d89c7.appspot.com/o/photos%2Fimages_system%2Floai_duahau.jpg?alt=media&token=e9a1c4e3-9879-4bb8-93d3-0ccdcd571edb'}} style={styles.imageloai} resizeMode="stretch">
              <Text style={styles.nameloaisp}>Trái cây</Text>
              </Image>
              </TouchableHighlight>
            </View>
            <View style={{flex:1}}>
            <TouchableHighlight underlayColor={'#ffffff'} onPress={()=>this.btn_Loai_CayTinhBot_Click()}>
              <Image source={{uri:'https://firebasestorage.googleapis.com/v0/b/nodejsdemo-d89c7.appspot.com/o/photos%2Fimages_system%2Floai_caytinhbot.jpg?alt=media&token=b3831ad2-732c-42ca-8b24-f9a37079dfa0'}} style={styles.imageloai} resizeMode="stretch">
              <Text style={styles.nameloaisp}>Cây tinh bột</Text>
              </Image>
              </TouchableHighlight>
            </View>
          </View>
          <View style={{flex:1}}>
          <TouchableHighlight underlayColor={'#ffffff'} onPress={()=>this.btn_Loai_ThuyHaiSan_Click()}>
            <Image source={{uri:'https://firebasestorage.googleapis.com/v0/b/nodejsdemo-d89c7.appspot.com/o/photos%2Fimages_system%2Floai_thuyhaisan.jpg?alt=media&token=dafc1897-e3dc-4d9f-9375-ec7b46e76930'}} style={styles.imageloai} resizeMode="stretch">
            <Text style={styles.nameloaisp}> Thủy,hải sản</Text>
            </Image>
            </TouchableHighlight>
          </View>
          <View style={{flex:1,flexDirection:'row'}}>
            <View style={{flex:1}}>
            <TouchableHighlight underlayColor={'#ffffff'} onPress={()=>this.btn_Loai_GiaSucGiaCam_Click()}>
              <Image source={{uri:'https://firebasestorage.googleapis.com/v0/b/nodejsdemo-d89c7.appspot.com/o/photos%2Fimages_system%2Floai_giacam.jpg?alt=media&token=ce4cc159-cfca-426e-a6ad-c210f84c4518'}} style={styles.imageloai} resizeMode="stretch">
              <Text style={styles.nameloaisp}>Gia súc, gia cầm</Text>
              </Image>
              </TouchableHighlight>
            </View>
            <View style={{flex:1}}>
            <TouchableHighlight underlayColor={'#ffffff'} onPress={()=>this.btn_Loai_CayCongNghiep_Click()}>
              <Image source={{uri:'https://firebasestorage.googleapis.com/v0/b/nodejsdemo-d89c7.appspot.com/o/photos%2Fimages_system%2Floai_caycongnghiep.jpg?alt=media&token=a66eb0e3-6fc6-48e7-b8cb-0815f2033de9'}} style={styles.imageloai} resizeMode="stretch">
              <Text style={styles.nameloaisp}>Cây công nghiệp</Text>
              </Image>
              </TouchableHighlight>
            </View>
            <View style={{flex:1}}>
            <TouchableHighlight underlayColor={'#ffffff'} onPress={()=>this.btn_Loai_CayThuoc_Click()}>
              <Image source={{uri:'https://firebasestorage.googleapis.com/v0/b/nodejsdemo-d89c7.appspot.com/o/photos%2Fimages_system%2Floai_caythuoc_matnhan.jpg?alt=media&token=e67df5b6-6703-4fc9-849b-9a2d8207f475'}} style={styles.imageloai} resizeMode="stretch">
              <Text style={styles.nameloaisp}>Cây thuốc</Text>
              </Image>
              </TouchableHighlight>
            </View>
          </View>
        </View>
</View>

    );
  }
  btn_Loai_CayThuoc_Click(){

  }
  btn_Loai_CayCongNghiep_Click(){

  }
  btn_Loai_GiaSucGiaCam_Click(){

  }
  btn_Loai_ThuyHaiSan_Click(){

  }
  btn_Loai_RauCu_Click(){

  }
  btn_Loai_TraiCay_Click(){

  }
  btn_Loai_CayTinhBot_Click(){

  }
  btn_Loai_HoaCanh_Click(){

  }
  btn_DangNhap_Click(){
    this.props.propsNavigator.push({
      screen:'Login'
    });
  }
  btn_TimKiem_Click(){
    alert('button Tim Kiem is clicked');
  }
}
var styles=StyleSheet.create({
  container:{
    flex:1
  },
  actionbar:{
    height:50,
    backgroundColor:'green',
    flexDirection:'row'
  },
  imageloai:{
    width:'100%',
    height:'100%',
    borderColor:'white',
    borderWidth:1
  },
  nameloaisp:{
    color:'white',
    fontSize:20,
    marginLeft:10
  }

});
AppRegistry.registerComponent('ChoNhaNong_v1',()=>HomeGuest);
