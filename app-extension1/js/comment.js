var Alert = function(msg){
	var mask = $('<div class="alert_mask"></div>');
	var box = $('<div class="alert_box"></div>');
	mask.css({'position':'fixed','width':'100%','height':'100%','top':'0px','left':'0px','background':'rgba(0,0,0,.5)','z-index':'11'});
	box.css({'position':'fixed','width':'200px','top':'50%','left':'50%','background':'#fff','margin-left':'-100px','z-index':'12','margin-top':'-50px','border-radius':'4px'});
	box.append($(
		'<h2 style="text-align: center;margin-bottom: 10px;font-weight: normal;border-bottom: 1px solid #ddd;padding: 10px;font-size: 18px;">提示</h2>'+
		'<p style="text-align: center;padding-bottom: 10px;">'
		+msg+
		'</p><a id="alert_btn" style="width: 100%;text-align: center;display: inline-block;border-top: 1px solid #ddd;padding: 10px 0px;">确定</a>'));
	box.appendTo($('body'));
	$('body').append(mask);
	$('#alert_btn').bind('click',function(){
		$('.alert_mask').remove();
		$('.alert_box').remove();
	})
}
