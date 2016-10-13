function checknumber(tel) {
	var reg = /^1[34578]\d{9}$/;
	console.log(tel)
 	if (reg.test(tel)) {
 		console.log(true);
      return true;
 	}else{
 		console.log(false);
      return false;
 	}
}
var sub = new Vue({
	el: '#sub-form',
	methods:{
		sub: function() {
			if ($('#dormitory').val()=='') {
				alert('请输入宿舍号');
				return false;
			}else if ($('#name').val()=='') {
				alert('请输入姓名');
				return false;
			}else if ($('#phone').val()=='') {
				alert('请输入电话');
				return false;
			}else if (isNaN($('#dormitory').val())==true) {
				alert('宿舍号不符合规范');
				return false;
			}else if (isNaN($('#phone').val())==true||checknumber($('#phone').val())==false) {
				alert('手机号不符合规范');
				return false;
			}
			params = {
				blockNumber: $('#block-select').val(),
				dormitory: $('#dormitory').val(),
				name: $('#name').val(),
				phone: $('#phone').val()
			}
			console.log($('#block-select').val());
			this.$http.get('http://localhost:8086/deliverwater',{params: params}).then((response)=>{
				console.log(response.data)
				if(response.data.code==1){
					alert("提交成功");
					$('#dormitory').val('');
					$('#name').val('');
					$('#phone').val('');
				}
				
			});
		}
	}
})