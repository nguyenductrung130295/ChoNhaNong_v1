import React, {Component} from 'react';
import {Text,View,Button,Picker,Item,AppRegistry} from 'react-native';
export default class FirstDisplay extends Component{
  constructor(props){
    super(props);
    vung=['Hà Nội','Nha Trang','Hồ Chí Minh','Cà Mau'];
    this.state={
      selected:'Hà Nội'
    }
  }
  renderItem(){
    items=[];
    for(let item of vung){
      items.push(<Picker.Item key={item} label={item} value={item}/>)
    }
    return items;
  }

  btn_CanMua(){
    alert('Can Mua clicked!!!'+this.state.selected);
  }
  btn_CanBan(){
    alert('Can Ban clicked!!!'+this.state.selected);
  }
  render(){
    return(
      <View>
        <Text>CHỢ NHÀ NÔNG
        </Text>
        <Text>Chọn vùng gần bạn
        </Text>
        <Picker selectedValue={this.state.selected} onValueChange={(value)=>this.setState({selected:value})}>
          {this.renderItem()}
        </Picker>
        <Button title={'Cần Mua'} onPress={()=>this.btn_CanMua()}></Button>
        <Button title={'Cần Bán'} onPress={()=>this.btn_CanBan()}></Button>
      </View>

    );
  }
}
AppRegistry.registerComponent('ChoNhaNong_v1',()=>FirstDisplay);
