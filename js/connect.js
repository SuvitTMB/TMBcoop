var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;

/*
function Connect_DB() {
  var firebaseConfig = {
    apiKey: "AIzaSyAciknEYhZU7AwOdfYytC1t_AnW2Ee11us",
    authDomain: "faifah-ttb.firebaseapp.com",
    databaseURL: "https://file-upload-faifah-ttb.firebaseio.com",
    projectId: "faifah-ttb",
    storageBucket: "faifah-ttb.appspot.com",
    messagingSenderId: "842980876200",
    appId: "1:842980876200:web:f33bfad2ccbf263075079d",
    measurementId: "G-DFMSBDT6W8"
  };
  firebase.initializeApp(firebaseConfig);
  dbTMBcoopMember = firebase.firestore().collection("TMBcoop_User");
  dbTMBcoopLog = firebase.firestore().collection("TMBcoop_Log");
}
*/

function Connect_Profile() {
  var str = "";
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="user-profile"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  $("#MyProfile").html(str);  
}


function addCommas(nStr) {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}


function numberWithCommas(num) {
  var valueString=num; //can be 1500.0 or 1500.00 
  var amount=parseFloat(valueString).toFixed(2);
  return formattedString= amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function gotoindex() {
  location.href = "index.html";
}


function gotohome() {
  location.href = "viewpage.html";
}


function CloseAll() {
  document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='none';
}

function NewDate() {
  var today = new Date();
  var day = today.getDate() + "";
  var month = (today.getMonth() + 1) + "";
  var year = today.getFullYear() + "";
  var hour = today.getHours() + "";
  var minutes = today.getMinutes() + "";
  var seconds = today.getSeconds() + "";
  var ampm = hour >= 12 ? 'PM' : 'AM';
  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);
  hour = checkZero(hour);
  minutes = checkZero(minutes);
  seconds = checkZero(seconds);
  dateString = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds +" "+ ampm;
}


function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}
