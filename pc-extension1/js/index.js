$(document).ready(function(){

	// 弹窗
	$(".plus").click(function(){
		$(".pop_ups").fadeIn(500);
		$(".f_bg").fadeIn(600);
    });
    $(".pop_ups").click(function(){
		$(".pop_ups").fadeOut(300);
		$(".f_bg").fadeOut(200);
	});


	// k线图
	$(".table img").fadeIn(3000);

	// 聚焦提示
	$('form :input').blur(function(){ 
        var $parent = $(this).parent(); 
        if($(this).is('#name')){ 
           if($.trim(this.value) == "" || !/^[\da-zA-Z\u4E00-\u9FA5]{2,10}$/.test($.trim(this.value))){ 
              var errorMsg = '请输入2-10位中文姓名'; 
              $parent.append('<span class="tip onError">'+ errorMsg +'</span>'); 
           }
           else{ 
               var okMsg = '输入正确'; 
               $parent.append('<span class="tip onSuccess">'+ okMsg +'</span>'); 
           } 
        } 
        if($(this).is('#phone')){ 
            if(this.value=="" || (this.value!="" && !/^1[3|4|5|7|8][0-9]{9}$/.test(this.value))){ 
                var errorMsg = '请输入正确的手机号码'; 
                $parent.append('<span class="tip onError">'+ errorMsg +'</span>'); 
            }
            else{ 
                var okMsg = '输入正确'; 
                $parent.append('<span class="tip onSuccess">'+ okMsg +'</span>'); 
            } 
        } 
        if($(this).is('#code')){
			if($.trim(this.value) == "" || !/^\d{6}$/.test($.trim(this.value))){
				var errorMsg = "请输入正确的验证码！";
				$parent.append("<span class='tip onError'>" + errorMsg + "</span>");
			}
			else{
				var okMsg = "输入正确";
				$parent.append("<span class='tip onSuccess'>" + okMsg + "</span>");
			}
		}
    }); 
	// 失焦删除
    $("form :input").focus(function(){ 
        var $parent = $(this).parent(); 
        $parent.find(".tip").remove(); 
    }); 



    //点击获取按钮
	function Timer(){
		var num = 30;
		var code = $('#btn');
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

	// 点击获取验证码
	$('#btn').click(function(){
		var phone = $('#phone').val();
		if(!(/^1[34578]\d{9}$/.test(phone))){
			alert('请输入正确的手机号码');
			return false;
		}
		var data = {
			phoneNum : phone
		};
		// 发送验证码
		$.post("http://vip.cnvppc.cn/index.php/index/sendCode",data,function(msg){
			if(msg.status!=1){
				alert(msg.msginfo);
				return false;
			}
		})
		Timer();
	});


    // 提交表单
    $("#load").click(function(){ 

    	var a = $("#name").val();
	    var b = $("#phone").val();
	    var c = $("#code").val();
		var url_page = "http://"+window.location.host;
		var $parent = $(this).parent().parent(); 
		$parent.find(".tip").remove(); 
		$("form :input").trigger('blur'); 
		var numError = $('form .onError').length; 
		if(numError){ 
			return false; 
		};

    	$("#day").text(Number($('#day').text())+1);
    	$("#grand").text(Number($('#grand').text())+1);
		
		if($("#name").val() == ""){
			 return false;
		}
		if($("#phone").val() == ""){
			 return false;
		}
		if($("#code").val() == ""){
			return false;
		}
		window.open("http://dbymec.com/index/downloads.html?file=Content/2017-02-27/58b380d379978.exe");

	    $.post("http://vip.cnvppc.cn/index.php/index/postInfo",{
	      "mobile":b,
	      "name":a,
	      "ncode":c,
		  "url_page":url_page
	    },function(json){
	        if(json.status==1){
	            $('.pop_ups').fadeOut(200);
	            $('.f_bg').fadeOut(200);
	            $(".plus").attr("href","http://dbymec.com/index/downloads.html?file=Content/2017-02-27/58b380d379978.exe");
	            $(".an_btn").attr("href","http://dbymec.com/index/downloads.html?file=Content/2016-10-18/5805c5efc5075.apk");
	            $(".pc_btn").attr("href","http://dbymec.com/index/downloads.html?file=Content/2016-10-18/5805c5efc5075.apk");
	            $(".ap_btn").attr("href","http://dbymec.com/index/downloads.html?file=Content/2016-10-18/5805c5efc5075.apk");
	        }
	        else{
	            alert(json.msginfo);
	            return false;
	        }
	    });
    }); 
})