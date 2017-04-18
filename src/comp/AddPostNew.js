import React,{Component} from 'react';
import {AppRegistry,View,ScrollView,Image,Text,TextInput,Platform,TouchableHighlight,Picker,Button} from 'react-native';
//import thư viện để lấy ảnh
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
//import thư viện firebase
import firebase from '../entities/FirebaseAPI';

//cái khỉ gì vậy?
const Blob=RNFetchBlob.polyfill.Blob;
const fs=RNFetchBlob.fs;
window.XMLHttpRequest=RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob=Blob;
// hàm uploadImage vào firebase uri là đường dẫn file ảnh
//ko cần hiểu biết xài là dc,
const uploadImage=(uri,imageName,mime='image/jpg')=>{
  return new Promise((resolve,reject)=>{
    //nếu là IOS thì uri.replace() không thì sau : uri
    const uploadUri=Platform.OS==='ios'? uri.replace('file://',''):uri;
    let uploadBlob=null;
    //lưu vào storage trên firebase
    const imageRef=firebase.storage().ref('photos/photo_posts').child(imageName);
    //chổ này ko cần quan tâm
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
    muaban=['Mua','Bán'];
    tien=['VND','USD'];//khởi tạo giá trị cho picker loại giá tiền
    loai=['Trái cây','Gia súc'];//khởi tạo giá trị cho picker Loại sẩn phẩm đăng tin
    tinh=['Hà Nội','Nha Trang','Hồ Chí Minh','Cà Mau'];// picker chứa tỉnh thành phố
    this.state={
      imagePath:'',//đường dẫn ảnh
      imageHeight:'',//chiều cao ảnh
      imageWidth:'',//rộng ảnh
      key:'',//?
      //thoogn tin posts input
      txt_tieude:'',//txt input tiêu đề
      txt_gia:'',//giá
      txt_diachi_txh:'',//thôn xã huyện
      txt_noidung:'',//nội dung bài đăng
      cur_img:-1,// thứ tự image dang hien trong cái xem hinh ở trên màn hình
      sum_img:0,//tổng image trong arrayImage
      arrayImage:[],//mảng chứa đường dẫn ảnh
      valueTienPicker:'VND',//chọn giá trị mặc đinh cho picker giá
      valueLoaiPicker:'Trái cây',//chọn giá trị mặc đinh cho picker loại
      valueTinhTPPicker:'Hồ Chí Minh',//chọn giá trị mặc đinh cho picker tỉnh/thành phố
      valueMuaBan:'Bán',//chọn giá trị mua hoặc bán
    };

  }
  renderItemTinh(){
    //render picker Tỉnh thành phố ra màn hình
    items=[];
    //lây mỗi item trong mảng tỉnh push "PICKEr.item" vào
    for(let item of tinh){
      items.push(<Picker.Item key={item} label={item} value={item}/>)
    }
    //trả về danh sách trong picker cho PICKER
    return items;
  }
  renderItemTien(){
    //render picker loại tiến ra màn hình
    items=[];
    for(let item of tien){
      items.push(<Picker.Item key={item} label={item} value={item}/>)
    }
    return items;
  }
  renderItemMuaBan(){
    //render picker loại tiến ra màn hình
    items=[];
    for(let item of muaban){
      items.push(<Picker.Item key={item} label={item} value={item}/>)
    }
    return items;
  }
  renderItemLoai(){
    //render picker loại sp ra màn hình
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
          {/* INPUT TIÊU ĐỀ BÀI ĐĂNG */}
        <TextInput placeholder="Tiêu đề bài đăng" underlineColorAndroid="white" style={{backgroundColor:'white',fontSize:18,color:'black',height:45,borderWidth:1,borderColor:'#03A9F4',borderRadius:2}}/>



          <View style={{flexDirection:'row',marginTop:5}}>
          <View style={{flex:4,justifyContent:'center'}}>
            <View style={{backgroundColor:'white',borderWidth:1,borderColor:'#03A9F4',borderRadius:2,height:45}}>
          {/* PICKER LOẠI SP */}
            <Picker mode='dropdown' selectedValue={this.state.valueLoaiPicker} onValueChange={(value)=>this.setState({valueLoaiPicker:value})}>
            {this.renderItemLoai()}
          </Picker></View>
          </View>

          {/* PICKER MuaBan */}
            <View style={{flex:3,justifyContent:'center'}}>
<View style={{backgroundColor:'white',borderWidth:1,borderColor:'#03A9F4',borderRadius:2,height:45,marginLeft:5}}>
            <Picker selectedValue={this.state.valueMuaBan} onValueChange={(value)=>this.setState({valueMuaBan:value})}>
              {this.renderItemMuaBan()}
            </Picker>
          </View>
            </View>
        </View>
        <View style={{flexDirection:'row',marginTop:5}}>
          <View style={{flex:6}}>
          {/* INPUT GIÁ */}
          <TextInput underlineColorAndroid="white"
          style={{backgroundColor:'white',fontSize:18,color:'black',height:45,borderWidth:1,borderColor:'#03A9F4',borderRadius:2}} placeholder="Giá"/></View>
          <View style={{flex:4}}><View style={{backgroundColor:'white',borderWidth:1,borderColor:'#03A9F4',borderRadius:2,height:45,marginLeft:5}}>
{/* PICKER LOẠI TIỀN */}
          <Picker selectedValue={this.state.valueTienPicker} onValueChange={(value)=>this.setState({valueTienPicker:value})}>
            {this.renderItemTien()}
          </Picker></View></View>
        </View>
        <View style={{flexDirection:'row',marginTop:5}}>
          <View style={{flex:6}}>
{/* INPUT DIACHI THÔN XÃ HUYỆN */}
          <TextInput underlineColorAndroid="white" style={{backgroundColor:'white',fontSize:18,color:'black',height:45,borderWidth:1,borderColor:'#03A9F4',borderRadius:2}} placeholder="Địa chỉ"/></View>
          <View style={{flex:4}}><View style={{backgroundColor:'white',borderWidth:1,borderColor:'#03A9F4',borderRadius:2,height:45,marginLeft:5}}>
{/* PICKER TỈNH THÀNH PHỐ */}
          <Picker selectedValue={this.state.valueTinhTPPicker}
           onValueChange={(value)=>this.setState({valueTinhTPPicker:value})}>
            {this.renderItemTinh()}
          </Picker></View></View>
        </View>
        {/* INPUT Nội dung  */}
        <TextInput underlineColorAndroid="white"
        placeholder="Nội dung" multiline={true}
        numberOfLines = {8}
        style={{backgroundColor:'white',marginTop:5,marginBottom:5,fontSize:18,color:'black',borderWidth:1,borderColor:'#03A9F4',borderRadius:2}}/>
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
  //bấm nút nét gọi hàm này
  btn_NextImage(){
    // kiểm tra tổng hình có >0 là coi có hình nào dc chọn chưa
    //cur_img<sum_img-1 là kiểm tra thử vị trí hình đang hiện ko là hình cuối trong danh sách, nói chung điều kiện để next tiếp
    if(this.state.sum_img>0 && (this.state.cur_img < this.state.sum_img-1)){
      //khi next dc thì set vị trí hình đang xem hiện tại lại, tăng lên 1 trong mang arrayImaàm
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
