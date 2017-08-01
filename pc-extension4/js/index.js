$(function(){
	// 弹窗
	$(".clickdown").click(function(){
		$(".mask").fadeIn(500);
		$(".silder").fadeIn(600);
	});
	$(".down").click(function(){
		$(".mask").fadeIn(500);
		$(".silder").fadeIn(600);
	});
	$(".mask").click(function(){
		$(".mask").fadeOut(200);
		$(".silder").fadeOut(300);
	});
	//点击获取按钮
	function Timer(){
		var num = 30;
		var code = $('.code');
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
	$('.code').click(function(){
		var phone = $('#phone').val();
		if(!(/^1[34578]\d{9}$/.test(phone))){
	        alert('请输入正确的手机号码');
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
		Timer();
	});
	//提交信息
	$('.rjdown').click(function(){
		var uname = $("#username").val();
        var phone = $("#phone").val();
        var ncode = $("#ncode").val();
		var url_page = "http://"+window.location.host;
     	if(uname==''){
            alert("请输入用户名");
            return false;
        }
        if(phone==''){
            alert("请输入手机号");
            return false;
        }
        if(ncode==''){
            alert("请输入验证码");
            return false;
        }
        $.post("http://vip.cnvppc.cn/index.php/index/postInfo",{"mobile":phone,"name":uname,"ncode":ncode,"url_page":url_page},function(json){
            if(json.status==1){
                $('.mask').fadeOut(200);
				$('#login').fadeOut(200);
				$('#down').fadeIn(600);
				$('.mask').fadeIn(500);
                $(".pcdown").attr("href","http://dbymec.com/index/downloads.html?file=Content/2017-02-27/58b380d379978.exe");
                $(".ios").attr("href","http://dbymec.com/index/downloads.html?file=Content/2016-10-18/5805c5efc5075.apk");
                $(".android").attr("href","http://dbymec.com/index/downloads.html?file=Content/2016-10-18/5805c5efc5075.apk");
            }else{
                alert(json.msginfo);
                return false;
            }
        });
	})
	//滚动事件
    $(document).scroll(function(){  
        var scrollTop =$(this).scrollTop();//滚动高度  
        if(scrollTop > 1000){
        	$('.centerc .image').css({'top':'-100px','opacity':'0.4'})
        	$('.centerc .image').animate({top:'-65px',opacity:'1'},"slow")
        }  
    });  
})