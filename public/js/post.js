const socket = io.connect();
function $$(id) { return document.getElementById(id); }
$$('form').onsubmit = () => {
  let data = {
    title: $$('meettitle').value,
    org: $$('org').value,
    location: $$('province').value + ' ' + $$('city').value + ' ' + $$('district').value,
    important_dates: {
      conference_start: $$('startyear').value + '-' + $$('startmonth').value + '-' + $$('startday').value,
      conference_end: $$('endyear').value  + '-' +$$('endmonth').value + '-'+$$('endday').value+ '-',
    },
    description: $$('meetdes').value,
    paper_info: $$('paperdes').value
  };
  socket.emit('user:add_conference', data);
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