const socket = io.connect();
function $$(id) {
    return document.getElementById(id);
};
$$('updateform').onsubmit=(evemt)=>{
    var validation=$$('updateform').checkValidity();
    $$('updateform').classList.add('was-validated');
    if (validation) {
        let data = {
            important_dates: {
                paper_end: $$('paperDate').value,
            },
            arrangement:$$('arrangement').value,
            creator: creator,
        };
        socket.emit('update', data);
        return false;
    }
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
