function getProfile(data){
	var regex = /\[doHTML\]([\s\S]*(user_profile_custom)+[\s\S]*&gt;)\[\/doHTML\]/gi;
	var _this = this.obj;
	var profile = regex.exec(data.toString());
	var unescape = $('<div />').html(profile[1]).text();
	$(_this).find(".user_profile").after(unescape);
};

(function ($) {
	if (location.href.indexOf('/topic') !== -1) {
		$(".user_profile").hide();

		$(".c_user").each(function(){
			var linkForm = $(this).find(".user_profile dd a");
			if( $(linkForm).length ){
				$.ajax({
					url: $(linkForm).html(),
					success: getProfile,
//					dataType: "text",
					obj: $(this)
				});
			}
		});
	}
})(jQuery);

