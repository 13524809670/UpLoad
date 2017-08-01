$(function(){
	$('.download,.clickdown').click(function(){
		$('.mask').show();
		$('.form').show();
		return false;
	})
	$('.close,.mask').click(function(){
		$('.mask').hide();
		$('.form').hide();
	})
	//发送验证码
	function Timer(node){
		var num = 30;
		var code = node;
		code.attr('disabled','disabled');
		code.addClass('cur');
		var timer = setInterval(function(){
			num--;
			code.val(num+'秒后重新获取...');
			if(num==0){
				clearInterval(timer);
				code.removeAttr('disabled')
				code.val('获取验证码');
				code.removeClass('cur');
			}
		},1000)
	}
	$('#btnSendCode').click(function(){
		var phone = $('#phone1').val();
		if(!(/^1[34578]\d{9}$/.test(phone))){
	        Alert('请输入正确的手机号码');
	        return false;
	    }
		var data = {
	        phoneNum : phone
	    };
	    //发送验证码
		$.post("http://vip.cnvppc.cn/index.php/index/sendCode",data,function(msg){
	        if(msg.status!=1){
	            alert(msg.msginfo);
	            return false;
	        }
	    })
		Timer($(this));
	})
	$('#download1').click(function(){
		var uname = $("#username1").val();
        var phone = $("#phone1").val();
        var ncode = $("#newcode").val();
        var url_page = "http://"+window.location.host;
     	if(uname==''){
            Alert("请输入用户名");
            return false;
        }
        if(phone==''){
            Alert("请输入手机号");
            return false;
        }
        if(ncode==''){
            Alert("请输入验证码");
            return false;
        }
        //提交数据
        $.post("http://vip.cnvppc.cn/index.php/index/postInfo",{"mobile":phone,"name":uname,"ncode":ncode,"url_page":url_page},function(json){
            if(json.status==1){
				$('.form').hide();
            	$('.form_down').show();
            }else{
                Alert(json.msginfo);
                return false;
            }
        });
        $('.android,.ios').click(function(){
        	window.location.href="http://dbymec.com/index/downloads.html?file=Content/2016-10-18/5805c5efc5075.apk";
        })
	})
})