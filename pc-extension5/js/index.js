$('.dropdown').click(function(){
	$('.dropdown').css("height",'auto');
	$('.dropdown i').addClass('top');
	$(this).addClass('cur');
	return false;
})
$('.dropdown li').click(function(){
	$('.dropdown span').html($(this).html());
	$('.dropdown').css("height",'48px');
	$('.dropdown i').removeClass('top');
	$('.dropdown').removeClass('cur');
	return false;
})
$('body').click(function(){
	$('.dropdown').css("height",'48px');
	$('.dropdown i').removeClass('top');
	$('.dropdown').removeClass('cur');
});
$('#search').click(function(){
	return false;
})
//获取当前时间
var date = new Date();
$('#date').html(date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate());
setInterval(function(){
	var date = new Date();
	var counts=date.getTime();
	$("#date3").html(parseInt((parseInt(counts)-1481499937813+Math.random()*3000)/4310));
	$(".date1").html(parseInt((parseInt(counts)-1481499937793+Math.random()*3000)/4330));
	$(".date2").html(parseInt((parseInt(counts)-1481499937793+Math.random()*3000)/4320));	
},3000);
// 弹窗
$(".plus,.iconsearch").click(function(){
	$(".pop_ups").fadeIn(500);
	$(".f_bg").fadeIn(600);
});

$(".pop_ups").click(function(){
	$(".pop_ups").fadeOut(300);
	$(".f_bg").fadeOut(200);
});
//立即申请
$('#load').click(function(){
	var uname= $('.username').val();
	var phone = $('.phone').val();
	var ncode = $('#code').val();
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
        	alert('申请成功！');
        	$(".pop_ups").fadeOut(300);
			$(".f_bg").fadeOut(200);
        }else{
            alert(json.msginfo);
            return false;
        }
    });
})
//点击获取按钮
function Timer(){
	var num = 30;
	var code = $('#btn');
	var timer = setInterval(function(){
		--num;
		code.css('font-size','12px');
		code.css('background','#999999')
		code.html(num+'秒后重新获取...');
		if(num==0){
			clearInterval(timer);
			code.css('font-size','16px');
			code.css('background','#1a78c2')
			code.html('获取验证码');
		}
	},1000)
}
//短信验证码
$('#btn').click(function(){
	var phone = $('.phone').val();
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
})

//收藏本页
function addFavorite(){
    var url = window.location;
    var title = document.title;
    var ua = navigator.userAgent.toLowerCase();
    console.log(ua);
    console.log(document.all);
    console.log(window.sidebar);
    if(ua.indexOf("360se") > -1){
        alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！");
    }else if(ua.indexOf("msie 8") > -1){
        window.external.AddToFavoritesBar(url, title); //IE8
         alert(1);
    }else if(document.all){
		try{
		   window.external.addFavorite(url, title);
		   alert(1);
		}catch(e){
		   alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
		}
   }else if(window.sidebar){
        window.sidebar.addPanel(title, url, "");
         alert(1);
    }else{
		alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
    }
}
