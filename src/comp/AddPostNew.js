import React,{Component} from 'react';
import {AppRegistry,View,ScrollView,Image,Text,TextInput,Platform,TouchableHighlight,Picker,Button} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';

const Blob=RNFetchBlob.polyfill.Blob;
const fs=RNFetchBlob.fs;
window.XMLHttpRequest=RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob=Blob;

const uploadImage=(uri,imageName,mime='image/jpg')=>{
  return new Promise((resolve,reject)=>{
    const uploadUri=Platform.OS==='ios'? uri.replace('file://',''):uri;
    let uploadBlob=null;
    const imageRef=firebase.storage().ref('photos').child(imageName);
    fs.readFile(uploadUri,'base64').then((data)=>{
      return Blob.build(data,{type:'${mime};BASE64'});
    }).then((blob)=>{
      uploadBlob=blob;
      return imageRef.put(blob,{contentType:mime});
    }).then(()=>{
      uploadBlob.close();
      return imageRef.getDownloadURL();
    }).then((url)=>{
      resolve(url);
    }).catch((error)=>{
      reject(error);
    })
  })
}
export default class AddPostNew extends Component{

  constructor(props){
    super(props);
    arrayImagePath=[];
    tien=['VND','USD'];
    loai=['Trái cây','Gia súc'];
    tinh=['Hà Nội','Nha Trang','Hồ Chí Minh','Cà Mau'];
    this.state={
      imagePath:'',
      imageHeight:'',
      imageWidth:'',
      key:'',
      firstname:'',
      lastname:'',
      cur_img:-1,// image dang hien
      sum_img:0,//tổng image trong arrayImage
      arrayImage:[],
      selected1:'VND',
      selected2:'Trái cây',
      selected3:'Hồ Chí Minh'
    };

  }
  renderItemTinh(){
    items=[];
    for(let item of tinh){
      items.push(<Picker.Item key={item} label={item} value={item}/>)
    }
    return items;
  }
  renderItemTien(){
    items=[];
    for(let item of tien){
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
  submit(){
    const db=firebase.database();
    const KhachHang=db.ref().child('Table_KhachHang');
    uploadImage(this.state.imagePath,'KH4.jpg').then((responseData)=>{
      KhachHang.child('KH4').set({
        url:responseData,
        age:'22',
        firstname:this.state.firstname,
        lastname:this.state.lastname,
      });
    }).done();
  }
  openImagePicker(){
    const  options={
      title:'select avatar',
      storageOption:{
        skipBackup:true,
        path:'images'
      },
    };
    ImagePicker.showImagePicker(options,(response)=>{
      if(response.didCancel){
        console.log('User cancelled image picker');
      }else if(response.error){
        console.log('Error'+response.error);
      }else if(response.customButton){
        console.log('User tapped custom button '+response.customButton);
      }
      else{
        data=this.state.arrayImage;
        data.push(response.uri);//thêm image vào cuối mảng
        //i=this.state.cur_img+1;
        this.setState({
          imagePath:response.uri,
          imageHeight:response.height,
          imageWidth:response.width,
          arrayImage:data,
          cur_img:this.state.cur_img+1,//cur_img:i,
          sum_img:this.state.sum_img+1,
        });
      }
    });

  }

  render(){
    return(
      <View style={{flex:1}}>
        <View style={{flexDirection:'row',backgroundColor:'#03A9F4',justifyContent:'center'}}>
<View style={{flex:1}}><TouchableHighlight underlayColor='pink' onPress={()=>this.btn_Back_Click()}>
<Image source={require('../img/ic_arrow_back_white_24dp.png')} style={{width:40,height:40}}/></TouchableHighlight></View>
        <View style={{flex:6,justifyContent:'center'}}><Text style={{color:'white',fontSize:20}}>Đăng bài</Text>
        </View>
        <View style={{flex:1}}><TouchableHighlight onPress={()=>this.btn_TimKiem_Click()}><Image source={require('../img/ic_more_vert_white_24dp.png')} style={{width:40,height:40}}/></TouchableHighlight></View>
        </View>
        <View style={{height:1,backgroundColor:'#9E9E9Ed4'}}></View>
        <View style={{height:2,backgroundColor:'#BDBDBDc4'}}></View>
        <View style={{height:2,backgroundColor:'#E0E0E0'}}></View>
<ScrollView>
          {this.state.imagePath ? <Image style={{width:"100%",height:200,borderWidth:1,borderColor:'#BDBDBD'}} source={{uri:this.state.imagePath}}>
          <View style={{flex:1,flexDirection:'row'}}>
            <View style={{flex:1,backgroundColor:'#00000010',justifyContent:'center'}}>
              <TouchableHighlight onPress={()=>this.btn_PreviousImage()}>
               <Image source={require('../img/ic_keyboard_arrow_left_white_24dp.png')}></Image>
              </TouchableHighlight>
            </View>
            <View style={{flex:7,justifyContent:'flex-end'}}>
            <View style={{flexDirection:'row'}}>
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'white',fontSize:18}}>{this.state.cur_img+1}/{this.state.sum_img} ảnh</Text>
              </View>
              <View style={{flex:1,alignItems:'center',flexDirection:'row'}}>
                <View style={{backgroundColor:'#00000030',margin:5,borderRadius:2}}>
                <TouchableHighlight onPress={()=>this.btn_AddImage()}>
                 <Image source={require('../img/ic_add_white_24dp.png')}></Image>
                </TouchableHighlight>
                </View>
                <View style={{backgroundColor:'#00000030',margin:5,borderRadius:2}}>
                <TouchableHighlight onPress={()=>this.btn_DeleteImageCurrent()}>
                 <Image source={require('../img/ic_remove_white_24dp.png')}></Image>
                </TouchableHighlight>
                </View>
              </View>
              </View>
            </View>
            <View style={{flex:1,backgroundColor:'#00000010',justifyContent:'center'}}>
              <TouchableHighlight onPress={()=>this.btn_NextImage()}><Image source={require('../img/ic_keyboard_arrow_right_white_24dp.png')}></Image>
              </TouchableHighlight>
            </View>
          </View>
          </Image>

          :
          <TouchableHighlight onPress={()=>this.btn_AddImage()}>
          <Image source={require('../img/add_image_postnew.png')} style={{backgroundColor:'#616161',width:"100%",height:200,borderWidth:1,borderColor:'#BDBDBD'}}>
          </Image></TouchableHighlight>}
          <View style={{padding:10,backgroundColor:'#E0E0E0'}}>
        <TextInput placeholder="Tiêu đề bài đăng" underlineColorAndroid="white" style={{backgroundColor:'white',fontSize:18,color:'black',height:45,borderWidth:1,borderColor:'#03A9F4',borderRadius:2}}/>
        <View style={{flexDirection:'row',marginTop:5}}>
          <View style={{flex:3,justifyContent:'center'}}><Text style={{fontSize:18,color:'black'}}>Loại sản phẩm: </Text></View>
          <View style={{flex:4,justifyContent:'center'}}>
            <View style={{backgroundColor:'white',borderWidth:1,borderColor:'#03A9F4',borderRadius:2,height:45}}><Picker mode='dropdown' selectedValue={this.state.selected2} onValueChange={(value)=>this.setState({selected2:value})}>
            {this.renderItemLoai()}
          </Picker></View>
          </View>
        </View>
        <View style={{flexDirection:'row',marginTop:5}}>
          <View style={{flex:6}}><TextInput underlineColorAndroid="white" style={{backgroundColor:'white',fontSize:18,color:'black',height:45,borderWidth:1,borderColor:'#03A9F4',borderRadius:2}} placeholder="Giá"/></View>
          <View style={{flex:4}}><View style={{backgroundColor:'white',borderWidth:1,borderColor:'#03A9F4',borderRadius:2,height:45,marginLeft:5}}><Picker selectedValue={this.state.selected1} onValueChange={(value)=>this.setState({selected1:value})}>
            {this.renderItemTien()}
          </Picker></View></View>
        </View>
        <View style={{flexDirection:'row',marginTop:5}}>
          <View style={{flex:6}}><TextInput underlineColorAndroid="white" style={{backgroundColor:'white',fontSize:18,color:'black',height:45,borderWidth:1,borderColor:'#03A9F4',borderRadius:2}} placeholder="Địa chỉ"/></View>
          <View style={{flex:4}}><View style={{backgroundColor:'white',borderWidth:1,borderColor:'#03A9F4',borderRadius:2,height:45,marginLeft:5}}><Picker selectedValue={this.state.selected3} onValueChange={(value)=>this.setState({selected:value})}>
            {this.renderItemTinh()}
          </Picker></View></View>
        </View>
        <TextInput underlineColorAndroid="white" placeholder="Nội dung" multiline={true} numberOfLines = {8} style={{backgroundColor:'white',marginTop:5,marginBottom:5,fontSize:18,color:'black',borderWidth:1,borderColor:'#03A9F4',borderRadius:2}}/>
        <View style={{flexDirection:'row'}}>
          <View style={{flex:1}}>
            <Button onPress={()=>alert('click button')} title="Hủy bỏ" color='#FF3D00'/>
          </View>
          <View style={{flex:3,marginLeft:10}}>
              <Button onPress={()=>alert('click button')} title="Đăng bài"/>
          </View>
        </View>


 </View>


      {/*
        {this.state.imagePath ? <Image style={{width:100,height:100}} source={{uri:this.state.imagePath}}/>:null}
        <Text>{this.state.imagePath}</Text>
        <Text onPress={this.openImagePicker.bind(this)}>OpenImage
        </Text>
        <Text>{this.state.arrayImage[0]}</Text>
        <TextInput placeholder="username" onChangeText={(value)=>this.setState({firstname:value})}/>
        <TextInput placeholder="password" onChangeText={(value)=>this.setState({lastname:value})}/>
        <Text onPress={this.submit.bind(this)}>push</Text>*/}

        </ScrollView>
      </View>
    );
  }
  btn_NextImage(){
    if(this.state.sum_img>0 && (this.state.cur_img < this.state.sum_img-1)){
      this.setState({
        cur_img:this.state.cur_img+1,
        imagePath:this.state.arrayImage[this.state.cur_img+1]
      });
    }

  }
  btn_AddImage(){
    this.openImagePicker();
  }
  btn_PreviousImage(){
    if(this.state.sum_img>0 && (this.state.cur_img > 0)){
      this.setState({
        cur_img:this.state.cur_img-1,
        imagePath:this.state.arrayImage[this.state.cur_img-1]
      });
    }

  }
  btn_DeleteImageCurrent(){

    var data=this.state.arrayImage;

    //xóa phần tử tại vị trí , nhưng không giảm số lượng phần tử arrayImage
    //delete data[this.state.cur_img];

    s=this.state.arrayImage.length-1;
    data.splice(this.state.cur_img,1);
    if(this.state.cur_img==s){
      this.setState({
        arrayImage:data,
        cur_img:this.state.cur_img-1,
        sum_img:this.state.sum_img-1,
        imagePath:data[this.state.cur_img-1]
      });
    }else{
      this.setState({
        arrayImage:data,
        sum_img:this.state.sum_img-1,
        imagePath:data[this.state.cur_img]
      });
    }



  }
  btn_Back_Click(){
    this.props.propsNavigator.pop();
  }
}
AppRegistry.registerComponent('ChoNhaNong_v1',()=>AddPostNew);
