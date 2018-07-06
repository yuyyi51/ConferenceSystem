const socket = io.connect();
function $$(id) {
    return document.getElementById(id);
};
function update() {
    ddlyear=$$('ddlyear');
    ddlmonth=$$('ddlmonth');
    ddlday=$$('ddlday');
    arrangement=$$('arrangement');
    if(ddlyear.value=='')
    {
        ddlyear.setCustomValidity("修改后的年份不能为空!")
    }
    else if(ddlmonth.value=='')
    {
        ddlmonth.setCustomValidity("修改后的月份不能为空!")
    }
    else if(ddlday.value=='')
    {
        ddlday.setCustomValidity("修改后的日期不能为空!")
    }
    else if(arrangement.value=='')
    {
        arrangement.setCustomValidity("日程安排不能为空")
    }

};
$$('updateform').onsubmit=()=>{
    let data={
        ddlyear:$$('ddlyear').value,
        ddlmonth:$$('ddlmonth').value,
        ddlday:$$('ddlday').value,
        arrangement:$$('arrangement').value,
        important_dates:{

        }
    };
    socket.emit('update',data);
    return false;
};
socket.on('update',(res)=>{
    if(res){
        alert("修改成功!");
        window.location.href="/mymeetings";
    }
    else{
        alert("修改失败，请检查修改内容!");
    }
});