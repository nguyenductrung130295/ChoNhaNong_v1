import firebase from './FirebaseAPI';

//constructor method
function Users(){
  this.uid=null;
  this.hovaten=null;
  this.sdt=null;
  this.matkhau=null;
  this.diachi=null;
  this.email=null;
  this.anhdaidien=null;
  this.anhbia=null;
}
//add medthod
Users.prototype.DangKy=function(props){
  //khởi tạo dữ liệu kết nối tới fireabase
  database=firebase.database();
  //trỏ tới bảng table_users
  tb_user=database.ref('db_marketsfarmers/table_users');
  //tạo key-tương đương với id của một users, sdt là duy nhất
  tb_user.child('uid'+this.sdt).set({//số điện thoại ko trùng nhau
    hovaten:this.ten,
    matkhau:this.matkhau,
    sdt_mk:this.sdt+this.matkhau,//cái này dùng để kiểm tra điều kiện đăng nhập, do ko kiểm tra 2 mục 1 lần, nên kết hợp nó lại thành một
    sdt:this.sdt,
    diachi:'',//để trống user chỉnh sửa sau
    email:'',//như trên
    anhbia:'https://firebasestorage.googleapis.com/v0/b/nodejsdemo-d89c7.appspot.com/o/photos%2Fbanner_users%2Fthiennhiendep201633.jpg?alt=media&token=43daf4e8-8d4c-4203-a355-5b121223095c',
    anhdaidien:'https://firebasestorage.googleapis.com/v0/b/nodejsdemo-d89c7.appspot.com/o/photos%2Favatar_users%2Fuserdefault.png?alt=media&token=e6ce673e-4f9e-4819-bd4a-ca3b2a85edf7'
  },()=>props.propsNavigator.push({
    screen:'GuestMain'
  }));
}
Users.prototype.DanhNhap=function(propsdn){
  database=firebase.database();
  tb_user=database.ref('db_marketsfarmers/table_users');
  //câu truy vấn kiểm tra điều kiện đăng nhập
  const query=tb_user.orderByChild('sdt_mk').equalTo(this.sdt+this.matkhau);
  query.on('value',(snap)=>{
      if(snap.exists()){//kiểm tra tồn tại user
        snap.forEach((data)=>{//data là user lấy dc trong danh sách user trong list snap
            //luu uid trên máy sau khi đăn nhập
            //AsyncStorage.setItem('uid_store',data.key);//lấy uid

        });
        propsdn.propsNavigator.push({
          screen:'GuestMain'
        })
      }else{
        alert('đăng nhập ko thành công');
      }

  });
}
export default Users;
