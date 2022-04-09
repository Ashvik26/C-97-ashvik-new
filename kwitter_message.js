var firebaseConfig = {
    apiKey: "AIzaSyDNUnCBnd-hpjJYPFjYGJ4mu_9eP-U-Ja0",
    authDomain: "kwitter-5d475.firebaseapp.com",
    databaseURL: "https://kwitter-5d475-default-rtdb.firebaseio.com",
    projectId: "kwitter-5d475",
    storageBucket: "kwitter-5d475.appspot.com",
    messagingSenderId: "1081192968565",
    appId: "1:1081192968565:web:72842ccdce9be81403a33c"
  };
  firebase.initializeApp(firebaseConfig);
  var user_name=localStorage.getItem("user_name");
  var room_name=localStorage.getItem("room_name");
function send(){
var msg=document.getElementById("msg").value;
firebase.database().ref(room_name).push({
    name:user_name,
    message:msg,
    like:0
});
document.getElementById("msg").value="";

}
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
  firebase_message_id = childKey;
  message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
name= message_data["name"];
message=message_data["message"];
like=message_data["like"];
name_tag="<h4>"+name+"<img src='tick.png' class='user_tick'></h4>";
message_tag="<h4 class='message_h4'>"+message+"</h4>";
like_tag="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='update_like(this.id)'>";
span_tag="<span class='glyphicon glyphicon-thumbs-up'>like:"+like+"</span></button><hr>";
row_tag=name_tag+message_tag+like_tag+span_tag;
document.getElementById("output").innerHTML+=row_tag;

//End code
} });  }); }
getData();
function update_like(message_id){
  button_id=message_id;
  likes=document.getElementById(button_id).value;
  updated_likes=Number(likes) +1;
  firebase.database().ref(room_name).child(message_id).update({
    like: updated_likes
  });
}
function logout(){
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location="index.html";
}