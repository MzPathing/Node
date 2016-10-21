var checkInfo;//这个变量用于验证格式
$('#username').on('blur',function(){
	$.ajax({
		type:'post',
		url:'/register',
		async:true,
		data:{
			username:$('#username').val(),
			password:$('#password').val()
		},
		dataType:'json',
		success:function(result){
			console.log(result);
		}
	})
})
