import React,{Component} from 'react';
import {AppRegistry,View,Image,Text,TextInput,Platform,TouchableHighlight,Picker,Button} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import firebase from './FirebaseAPI';
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
        <View style={{flex:1}}>
          {this.state.imagePath ? <Image style={{width:"100%",height:200}} source={{uri:this.state.imagePath}}>
          <View style={{flex:1,flexDirection:'row'}}>
            <View style={{flex:1}}>
              <TouchableHighlight onPress={()=>this.btn_PreviousImage()}><Text>Pr
              </Text>
              </TouchableHighlight>
            </View>
            <View style={{flex:3}}>
              <View style={{flex:1}}>
                <Text>{this.state.cur_img+1}/{this.state.sum_img} ảnh</Text>
              </View>
              <View style={{flex:1}}>
                <Text onPress={()=>this.btn_AddImage()}>add</Text><Text>|||</Text><Text onPress={()=>this.btn_DeleteImageCurrent()}>del</Text>
              </View>
            </View>
            <View style={{flex:1}}>
              <TouchableHighlight onPress={()=>this.btn_NextImage()}><Text>N
              </Text>
              </TouchableHighlight>
            </View>
          </View>
          </Image>

          :

          <Image source={require('../img/ngoctam.jpg')} style={{width:"100%",height:200}}>
            <View style={{flex:1,flexDirection:'row'}}>
              <View style={{flex:1}}>
                <TouchableHighlight onPress={()=>this.btn_PreviousImage()}><Text>Pr
                </Text>
                </TouchableHighlight>
              </View>
              <View style={{flex:3}}>
                <View style={{flex:1}}>
                  <Text>{this.state.cur_img+1}/{this.state.sum_img} ảnh</Text>
                </View>
                <View style={{flex:1}}>
                  <Text onPress={()=>this.btn_AddImage()}>add</Text><Text>|||</Text><Text onPress={()=>this.btn_DeleteImageCurrent()}>Del</Text>
                </View>
              </View>
              <View style={{flex:1}}>
                <TouchableHighlight onPress={()=>this.btn_NextImage()}><Text>{"\n"}N
                </Text>
                </TouchableHighlight>
              </View>
            </View>
          </Image>}
        </View>
        <View style={{flex:2}}>
        <TextInput placeholder="tiêu đề"/>
        <View style={{flexDirection:'row'}}>
          <View style={{flex:1}}><Image source={require('../img/quynhthao.jpg')} style={{width:25,height:25}}></Image></View>
          <View style={{flex:5}}><Picker mode='dropdown' selectedValue={this.state.selected2} onValueChange={(value)=>this.setState({selected2:value})}>
            {this.renderItemLoai()}
          </Picker></View>
        </View>
        <View style={{flexDirection:'row'}}>
          <View style={{flex:5}}><TextInput placeholder="giá"/></View>
          <View style={{flex:3}}><Picker selectedValue={this.state.selected1} onValueChange={(value)=>this.setState({selected1:value})}>
            {this.renderItemTien()}
          </Picker></View>
        </View>
        <View style={{flexDirection:'row'}}>
          <View style={{flex:5}}><TextInput placeholder="địa chỉ"/></View>
          <View style={{flex:3}}><Picker selectedValue={this.state.selected3} onValueChange={(value)=>this.setState({selected:value})}>
            {this.renderItemTinh()}
          </Picker></View>
        </View>
        <TextInput placeholder="nội dung" multiline={true} numberOfLines = {10}/>
        <Button onPress={()=>alert('click button')} title="Đăng bài"/>
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
}
AppRegistry.registerComponent('ChoNhaNong_v1',()=>AddPostNew);
