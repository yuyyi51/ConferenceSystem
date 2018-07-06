const socket = io.connect();
function $$(id) { return document.getElementById(id); }

$$('form').onsubmit = (event) => {
  var validation = $$('form').checkValidity();
  $$('form').classList.add('was-validated');
  if (validation){
      let data = {
          title: $$('meettitle').value,
          org: $$('org').value,
          location: $$('province').value + ' ' + $$('city').value + ' ' + $$('district').value,
          important_dates: {
              conference_start: $$('startDate').value,
              conference_end: $$('endDate').value,
          },
          description: $$('meetdes').value,
          paper_info: $$('paperdes').value
      };
      socket.emit('user:add_conference', data);
      return false;
  }
  return false;
};
socket.on('user:add_conference', (res) => {
  if (res){
    alert("发布成功");
    window.location.href = '/meetinfo';
  }
  else {
    alert("发布失败");
  }
});
function loadTime() {
    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth();
    var day = time.getDate();
    month = month+1;
    if (month < 10){
        month = '0'+month;
    }
    if (day < 10){
        day = '0'+day;
    }
    var defaultdate = year+'-'+month+'-'+day;
    $$('startDate').min = defaultdate;
    $$('endDate').min = defaultdate;
}


$$('startDate').oninput= ()=>{
    $$('endDate').value ='';
    $$('endDate').min = $$('startDate').value;
}


window.onload = loadTime;
