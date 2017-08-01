//下载
$('.download').click(function(){
	var login = $('.box').html();
	$('body').append($('<div class="mask"></div>').append($('<div class="silder box"></div>').html(login)));
	$('.silder .ftitle').html('软件下载');
	$('.silder .lq').val('立即申请');
	var sc = $('.silder .code')
	sc.removeAttr('disabled')
	sc.val('获取验证码');
	sc.removeClass('cur');
	document.onclick=function(event){
		if(event.target.className == 'mask'){
			$('.mask').remove();
			$('.silder').remove();
		}
	}
	$('.silder .code').click(function(){
		var phone = $('.silder #tel').val();
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
		Timer($(this));
	});
	//立即申请
	$(".silder #receive").click(function(){
		var uname = $(".silder #name").val();
        var phone = $(".silder #tel").val();
        var ncode = $(".silder #yzm").val();
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
               	alert('申请已提交！');
               	$('.mask').remove();
				$('.silder').remove();
            }else{
                alert(json.msginfo);
                return false;
            }
        });
        return false;
	});
});
//点击获取按钮
function Timer(th){
	var num = 30;
	var code = th;
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
$('.receive .code').click(function(){
	var phone = $('.receive #tel').val();
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
	Timer($(this));
});
//立即领取
$(".receive #receive").click(function(){
	var uname = $("#name").val();
    var phone = $("#tel").val();
    var ncode = $("#yzm").val();
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
           	alert('申请已提交！');
        }else{
            alert(json.msginfo);
            return false;
        }
    });
});
//计算
function jisuan() {
    var zj = $('#zj').val();
    if (isNaN(zj)) {
        alert('请输入正确的投资金额');
        return false;
    }
    if (zj < 2000) {
        alert('金额不能小于2000元');
        return false;
    }
    var su = Math.floor(zj / 2000);
    var yk = su * 50 * 15;

    $('#su').val(su);
    $('#yk').val(yk);
}