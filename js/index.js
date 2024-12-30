var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var xEmpID = "";
var xEmpName = "";
var yEmpID = "";
var yEmpName = "";
var Eid = "";

$(document).ready(function () {
/*
  var str = "";
  var sLineID = "Ua6b6bf745bd9bfd01a180de1a05c23b3";
  var sLineName = "Website";
  var sLinePicture = "https://profile.line-scdn.net/0hoLlg-mNNMGNRHiaTpMdPNG1bPg4mMDYrKX8qVnIYOgYpe3QwbCp2AXVKaVN_fnMzOC16V3NMagF8";
  sessionStorage.setItem("LineID", sLineID);
  sessionStorage.setItem("LineName", sLineName);
  sessionStorage.setItem("LinePicture", sLinePicture);
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="user-profile"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  $("#MyProfile").html(str);  
  Connect_DB();
  CheckEmpID();
*/
  main();
});


async function main() {
  await liff.init({ liffId: "1660982639-V9ZLJRl0" });
  document.getElementById("isLoggedIn").append(liff.isLoggedIn());
  if(liff.isLoggedIn()) {
    getUserProfile();
  } else {
    liff.login();
  }
}


function openWindow() {
  liff.openWindow({
    url: "https://line.me",
    external: true     
  })
}


async function getUserProfile() {
  var str = "";
  const profile = await liff.getProfile();
  sessionStorage.setItem("LineID", profile.userId);
  sessionStorage.setItem("LineName", profile.displayName);
  sessionStorage.setItem("LinePicture", profile.pictureUrl);
  alert(profile.userId);

  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="user-profile"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  $("#MyProfile").html(str);  
  Connect_DB();
  CheckEmpID();
}


var xCheckUser = "";
function CheckEmpID() {
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  dbTMBcoopMember.where('LineID','==',sessionStorage.getItem("LineID"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      if(doc.data().EmpSataus==1) {
        xCheckUser = doc.data().EmpID;
        sessionStorage.setItem("TMBcoop_EmpID", doc.data().EmpID);
        sessionStorage.setItem("TMBcoop_EmpName", doc.data().EmpName);
        gotohome();
      }
    });
    if(xCheckUser=="") {
      $("#idmember").html("<input id='txtidmember' type='number' value=''>");
      $("#idname").html("<input id='txtidname' type='text' value=''>");
      document.getElementById('Loading').style.display='none';
      document.getElementById('NewMember').style.display='block';
    }
  });
}



function CheckUserID() {
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  var str = "";
  var xxCheck = 0;
  xEmpID = document.getElementById("txtidmember").value;
  xEmpName = document.getElementById("txtidname").value;
  if(xEmpID=="" || xEmpName=="") {
    str = "<div><img src='./img/false.png' style='width:100%; max-width:200px; margin-bottom: 15px;'></div>";
    str = "<div style='width:80%; text-align:center; margin:auto; font-size:14px;'><b>กรุณากรอกข้อมูลให้ครบ</b><br><br><font color='#ff0000'>";
    if(xEmpID=="") { str += "- เลขสมาชิก (สมาชิกสหกรณ์)<br>"; }
    if(xEmpName=="") { str += "- ชื่อ-นามสกุล (ภาษาไทย)<br>"; }
    str += "</font><br>ก่อนทำการบันทึกรายการ<br><br></div>";
    $("#CheckKeyIN").html(str);
    document.getElementById('id02').style.display='block';
    return;
  } else {
    dbTMBcoopMember.where('EmpID','==',parseFloat(xEmpID))
    .where('EmpName','==',xEmpName)
    .limit(1)
    .get().then((snapshot)=> {
      snapshot.forEach(doc=> {
        Eid = doc.id;
        sessionStorage.setItem("TMBcoop_EmpID", doc.data().EmpID);
        sessionStorage.setItem("TMBcoop_EmpName", doc.data().EmpName);
        xxCheck = 1;
      });
      if(xxCheck==0) {
        dbTMBcoopLog.add({
          EmpID : xEmpID,
          EmpName : xEmpName,
          Remark: "ไม่สำเร็จ",
          LineID: sessionStorage.getItem("LineID"),
          LineName: sessionStorage.getItem("LineName"),
          LinePicture: sessionStorage.getItem("LinePicture"),
          TimeStampDate: TimeStampDate,
          DateRegister : dateString
        });   
        str = "";
        str = "<div><img src='./img/false.png' style='width:100%; max-width:200px; margin-bottom: 15px;'></div>";
        str = "<div style='width:80%; text-align:center; margin:auto; font-size:14px;'><b>คุณกรอกข้อมูลไม่ถูกต้อง</b><br><br>";
        str += "กรุณาตรวจสอบ<br><font color='#ff0000'>1. รหัสสมาชิกสหกรณ์<br>2. ชื่อ-นามสกุล (ภาษาไทย</font>)<br>ให้ถูกต้องอีกครั้ง<br><br><br></div>";
        $("#CheckKeyIN").html(str);
        document.getElementById('id02').style.display='block';
      } else if(xxCheck==1) {
        if(Eid!="") {
          dbTMBcoopLog.add({
            EmpID : xEmpID,
            EmpName : xEmpName,
            Remark: "สำเร็จ",
            LineID: sessionStorage.getItem("LineID"),
            LineName: sessionStorage.getItem("LineName"),
            LinePicture: sessionStorage.getItem("LinePicture"),
            TimeStampDate: TimeStampDate,
            DateRegister : dateString
          }); 
          dbTMBcoopMember.doc(Eid).update({
            EmpSataus : 1,
            LineID: sessionStorage.getItem("LineID"),
            LineName: sessionStorage.getItem("LineName"),
            LinePicture: sessionStorage.getItem("LinePicture"),
            DateRegister : dateString
          });   
        }
        document.getElementById('id01').style.display='block';
      }
    });
  }
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
