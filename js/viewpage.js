var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var Eid = "";
var EdateConfirm = "";
var EmpMemo = "";



$(document).ready(function () {
  if(sessionStorage.getItem("TMBcoop_EmpID")==null || sessionStorage.getItem("TMBcoop_EmpID")=="") { location.href = "index.html"; }
  sessionStorage.removeItem("Promote");
  Connect_Profile();
  Connect_DB();
  CheckMember();
});


var xCheckUser = 0;
function CheckMember() {
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  var str = "";
  var btn = "";

  dbTMBcoopMember.where('LineID','==',sessionStorage.getItem("LineID"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      if(doc.data().EmpSataus==1) {
        xCheckUser = 1;
        Eid = doc.id;
        EdateConfirm = doc.data().DateConfirm;
        if(doc.data().ConfirmMeeting==0) {
          btn += '<div onclick="NoMeeting()" class="btn btn-info btn-info-font red" style="margin-top:20px;">ไม่เข้าร่วม</div>';
          btn += ' <div onclick="YesMeeting()" class="btn btn-info btn-info-font green" style="margin-top:20px;">เข้าร่วม</div>';
          btn += ' <div onclick="CloseAll()" class="btn btn-info btn-info-font grey" style="margin-top:20px;">ปิดหน้าต่าง</div>';
          $("#StatusMeeting").html(btn);
        } else if(doc.data().ConfirmMeeting==1) {
          $("#StatusMeeting").html('<div style="font-size: 13px; color:#32e639; line-height:1.2;"><br><b>คุณแจ้งเข้าร่วมประชุมใหญ่ ประจำปี 2567</b><br><font color="#999">เมื่อวันที่ '+ dateString +'</font></div><div onclick="CloseAll()" class="btn btn-info btn-info-font grey" style="margin-top:20px;">ปิดหน้าต่าง</div>');
          //$("#StatusMeeting").html('<div style="font-size: 13px; color:green; line-height:1.2;"><b>คุณแจ้งเข้าร่วมประชุม</b><br><font color="#999">เมื่อวันที่ '+ doc.data().DateMeeting +'</font></div>');
        } else if(doc.data().ConfirmMeeting==2) {
          $("#StatusMeeting").html('<div style="font-size: 13px; color:#ff0000; line-height:1.2;"><br><b>คุณแจ้งไม่เข้าร่วมประชุมใหญ่ ประจำปี 2567</b><br><font color="#999">เมื่อวันที่ '+ dateString +'</font></div><div onclick="CloseAll()" class="btn btn-info btn-info-font grey" style="margin-top:20px;">ปิดหน้าต่าง</div>');
          //$("#StatusMeeting").html('<div style="font-size: 13px; color:red; line-height:1.2;"><b>คุณแจ้งไม่เข้าร่วมประชุม</b><br><font color="#999">เมื่อวันที่ '+ doc.data().DateMeeting +'</font></div>');
        }
        if(sessionStorage.getItem("Promote")==null) { 
          document.getElementById('id03').style.display='block';
        }
        sessionStorage.setItem("Promote", Eid);

        $("#DisplayUser").html('เรียน <b><font color="#0056ff">คุณ'+ doc.data().EmpName +'</font></b>');
        str += '<div class="row" style="margin-top:-6px;">';
        str += '<div class="col-sm-3 mb-0" style="width: 55%; padding-top:13px;">เงินปันผล (บาท)</div>';
        str += '<div class="col-sm-9 text-secondary" style="width: 45%;float: left;">';
        str += '<div><input type="text" value="'+ addCommas(doc.data().Dividend) +'" style="text-align: right;""></div>';
        str += '</div></div><hr>';
        str += '<div class="row" style="margin-top:-6px;">';
        str += '<div class="col-sm-3 mb-0" style="width: 55%; padding-top:13px;">เงินเฉลี่ยคืน (บาท)</div>';
        str += '<div class="col-sm-9 text-secondary" style="width: 45%;float: left;">';
        str += '<div><input type="text" value="'+ addCommas(doc.data().PayBack) +'" style="text-align: right;""></div>';
        str += '</div></div><hr>';
        str += '<div class="row" style="margin-top:-6px;">';
        str += '<div class="col-sm-3 mb-0" style="width: 55%; padding-top:13px;">สมนาคุณ (บาท)</div>';
        str += '<div class="col-sm-9 text-secondary" style="width: 45%;float: left;">';
        str += '<div><input type="text" value="'+ addCommas(doc.data().Reward) +'" style="text-align: right;""></div>';
        str += '</div></div><hr>';
        str += '<div class="row" style="margin-top:-6px;">';
        str += '<div class="col-sm-3 mb-0" style="width: 55%; padding-top:13px;">รับสุทธิ (บาท)</div>';
        str += '<div class="col-sm-9 text-secondary" style="width: 45%;float: left;">';
        str += '<div><input type="text" value="'+ addCommas(doc.data().NetPayment) +'" style="text-align: right;""></div>';
        str += '</div></div><hr>';
        $("#DisplayMoney").html(str);
        document.getElementById('Loading').style.display='none';
        document.getElementById('DisplayData').style.display='block';
        if(doc.data().CheckConfirm==0) {
          document.getElementById('DateConfirm').style.display='block';
        } else if(doc.data().CheckConfirm==1) {
          document.getElementById('ShowConfirm').style.display='block';
          $("#DisplayDate").html('<div style="font-size: 13px; color:#21db29; line-height:1.2;"><b>คุณได้ทำการยืนยันข้อมูลแล้ว</b><br><font color="#999">เมื่อวันที่ '+ doc.data().DateConfirm +'</font></div>');
        } else if(doc.data().CheckConfirm==2) {
          document.getElementById('ShowConfirm').style.display='block';
          $("#DisplayDate").html('<div style="font-size: 13px; color:#ff0000; line-height:1.2;"><b>คุณได้ทำการแจ้งรายการไม่ถูกต้อง</b><br><font color="#999">'+ doc.data().EmpMemo +'</font><br>เมื่อวันที่ '+ doc.data().DateConfirm +'</div>');
        }
        dbTMBcoopLog.add({
          EmpID : doc.data().EmpID,
          EmpName : doc.data().EmpName,
          Remark: "Login",
          LineID: sessionStorage.getItem("LineID"),
          LineName: sessionStorage.getItem("LineName"),
          LinePicture: sessionStorage.getItem("LinePicture"),
          TimeStampDate: TimeStampDate,
          DateRegister : dateString
        }); 

      }
    });
    if(xCheckUser==0) {
      gotoindex();
    }
  });
}

function CancelItem() {
  NewDate();
  xEmpMemo = document.getElementById("txtmemo").value;

  if(xEmpMemo!== "") {
    dbTMBcoopMember.doc(Eid).update({
      CheckConfirm : 2,
      EmpMemo : xEmpMemo,
      DateConfirm : dateString
    });   
    //alert(xEmpMemo);
    $("#DisplayDate").html('<div style="font-size: 13px; color:#ff0000; line-height:1.2;"><b>คุณได้ทำการแจ้งรายการไม่ถูกต้อง</b><br><font color="#999">'+ xEmpMemo +'</font><br>เมื่อวันที่ '+ dateString +'</div>');
    document.getElementById('DateConfirm').style.display='none';
    document.getElementById('ShowConfirm').style.display='block';
    CloseAll();
  } else {
    //alert(xEmpMemo);
    alert("กรุณากรอกรายละเอียดก่อนส่งข้อความ");
  }

  // body...
}



function DataFalse() {
  document.getElementById('id01').style.display='block';
}



function DataTrue() {
  NewDate();
  //var TimeStampDate = Math.round(Date.now() / 1000);
  if(Eid!="") {
    dbTMBcoopMember.doc(Eid).update({
      CheckConfirm : 1,
      DateConfirm : dateString
    });    
    $("#DisplayDate").html('<div style="font-size: 13px; color:#21db29; line-height:1.2;"><b>คุณได้ทำการยืนยันข้อมูลแล้ว</b><br><font color="#999">เมื่อวันที่ '+ dateString +'</font></div>');
    $("#DisplayDate1").html('<div style="font-size: 13px; color:#21db29; line-height:1.2;"><b>คุณได้ทำการยืนยันข้อมูลแล้ว</b><br><font color="#999">เมื่อวันที่ '+ dateString +'</font></div>');
    document.getElementById('DateConfirm').style.display='none';
    document.getElementById('ShowConfirm').style.display='block';
    document.getElementById('id02').style.display='block';
  } else {
    gotoindex();
  }
}


function YesMeeting() {
  NewDate();
  if(Eid!='') {
    dbTMBcoopMember.doc(Eid).update({
      ConfirmMeeting : 1,
      DateMeeting : dateString
    });    
    $("#StatusMeeting").html('<div style="font-size: 13px; color:#32e639; line-height:1.2;"><br><b>คุณแจ้งเข้าร่วมประชุมใหญ่ ประจำปี 2567</b><br><font color="#999">เมื่อวันที่ '+ dateString +'</font></div><div onclick="CloseAll()" class="btn btn-info btn-info-font grey" style="margin-top:20px;">ปิดหน้าต่าง</div>');
  }
}


function NoMeeting() {
  NewDate();
  if(Eid!='') {
    dbTMBcoopMember.doc(Eid).update({
      ConfirmMeeting : 2,
      DateMeeting : dateString
    });    
    $("#StatusMeeting").html('<div style="font-size: 13px; color:#ff0000; line-height:1.2;"><br><b>คุณแจ้งไม่เข้าร่วมประชุมใหญ่ ประจำปี 2567</b><br><font color="#999">เมื่อวันที่ '+ dateString +'</font></div><div onclick="CloseAll()" class="btn btn-info btn-info-font grey" style="margin-top:20px;">ปิดหน้าต่าง</div>');
  }
}


function UpdateData() {
  loadData();
}


function CloseAll() {
  document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='none';
  document.getElementById('id03').style.display='none';
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
