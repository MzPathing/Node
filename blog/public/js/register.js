var checkInfo={};//这个变量用于验证格式
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
			$('#username').parent().next().removeClass('hidden')
			console.log(result);
			if(result.num==1){
				$('#username').parent().next().removeClass('text-danger')
				$('#username').parent().next().addClass('text-success')
				$('#username').parent().next().html("<span class='glyphicon glyphicon-ok'></span>"+result.message)
			}else{
				$('#username').parent().next().removeClass('text-success')
				$('#username').parent().next().addClass('text-danger')
				$('#username').parent().next().html("<span class='glyphicon glyphicon-remove'></span>"+result.message)
			}
		}
	})
})
$('#password').on('blur',function(){
	var regexp=new RegExp('\\w{6,20}','i')//正则表达式，测试是否为6-20位字符或者数字
	var notAllNum=new RegExp('[a-zA-Z]+')//正则表达式，测试是否不全为纯数字
	console.log($('#password').val())
	if(regexp.test($('#password').val())&&notAllNum.test($('#password').val())){//是6-20位并且不是全数字
		checkInfo.num=1
		checkInfo.message='密码格式正确'
	}else if(regexp.test($('#password').val())&&!notAllNum.test($('#password').val())){//是6-20位，但是全是数字
		checkInfo.num=0
		checkInfo.message='密码不能为纯数字，请重新输入'
	}else if(!regexp.test($('#password').val())){//不是6-20位
		checkInfo.num=0
		checkInfo.message='密码必须在6-20位之间，请重新输入'
	}
	if(checkInfo.num==1){//密码格式正确
		$(this).parent().next().removeClass('text-danger')
		$(this).parent().next().addClass('text-success')
		$(this).parent().next().html("<span class='glyphicon glyphicon-ok'></span>"+checkInfo.message)
	}else if(checkInfo.num==0){//密码格式不正确
		$(this).parent().next().removeClass('text-success')
		$(this).parent().next().addClass('text-danger')
		$(this).parent().next().html("<span class='glyphicon glyphicon-remove'></span>"+checkInfo.message)
	}
})
$('#repassword').on('blur',function(){
	if($(this).val()!=$('#password').val()){//两次输入的密码不一样
		$(this).parent().next().removeClass('text-success')
		$(this).parent().next().addClass('text-danger')
		$(this).parent().next().html("<span class='glyphicon glyphicon-remove'></span>"+"两次输入的密码不一致")
	}else{//两次输入的密码一样
		$(this).parent().next().removeClass('text-danger')
		$(this).parent().next().addClass('text-success')
		$(this).parent().next().html("<span class='glyphicon glyphicon-ok'></span>"+"格式正确")
	}
})
$('#signup').on('click',function(){
	$.ajax({
		type:'post',
		url:'/signup',
		data:{
			username:$('#username'),
			password:$('#password'),
			repassword:$('#repassword'),
			contact:$('#contact')
		},
		async:true,
		dataType:'json'
	})
})