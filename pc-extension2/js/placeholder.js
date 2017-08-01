//placeholder
(function placeholder(){
	//检测是否是Ie浏览器
	function isIE() { //ie?
	    var browser=navigator.appName
	    var b_version=navigator.appVersion
	    var version=b_version.split(";");
	    var trim_Version=version[1].replace(/[ ]/g,"");
	    if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE7.0"){
	        return true;
	    }else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE8.0"){
	        return true;
	    }else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE9.0"){
	        return true;
	    } else {
	        return false;
	    }
	}
	//解决ie不支持placeholder
	$('.placeholder').each(function () {
	    if(isIE()) {
	        var $this = $(this);
	        if(!$this.prev().val() || $this.prev().val() == "" ) {
	            $this.show();
	        }
	    }
	})
	$('.placeholder').bind("click",function(){
	    if(isIE()){
	        $(this).hide();
	        $(this).prev().focus();
	    }
	})
	$('input').bind({
	    focus:focus,
	    blur:blur
	})
	function focus() {
	    if(isIE()) {
	        var $this = $(this);
	        $this.next().hide();
	    }
	}
	function blur() {
	    if(isIE()){
	        var $this = $(this);
	        if($this.val() == ""){
	            $this.next().show();
	        }
	    }
	}
})();