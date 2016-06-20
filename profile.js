function getProfile(data){
	var sentido = /\[doHTML\]([\s\S]*&lt;span\sclass="sentido"+[\s\S]*\/span&gt;)\[\/doHTML\]/gi;
	var rank = /\[doHTML\]([\s\S]*&lt;span\sclass="rank"&gt;([\s\S]*)&lt;\/span&gt;)\[\/doHTML\]/gi;
	var evolucao = /\[doHTML\]([\s\S]*&lt;span\sclass="evol"&gt;[\s\S]*src="([\s\S]*)"[\s\S]*&lt;\/span&gt;)\[\/doHTML\]/gi;
	
	var forca = /\[doHTML\]([\s\S]*&lt;span\sclass="for"&gt;([\s\S]*)&lt;\/span&gt;)\[\/doHTML\]/gi;
	var agi = /\[doHTML\]([\s\S]*&lt;span\sclass="agi"&gt;([\s\S]*)&lt;\/span&gt;)\[\/doHTML\]/gi;
	var per = /\[doHTML\]([\s\S]*&lt;span\sclass="per"&gt;([\s\S]*)&lt;\/span&gt;)\[\/doHTML\]/gi;
	var res = /\[doHTML\]([\s\S]*&lt;span\sclass="res"&gt;([\s\S]*)&lt;\/span&gt;)\[\/doHTML\]/gi;
	var car = /\[doHTML\]([\s\S]*&lt;span\sclass="car"&gt;([\s\S]*)&lt;\/span&gt;)\[\/doHTML\]/gi;
	var von = /\[doHTML\]([\s\S]*&lt;span\sclass="von"&gt;([\s\S]*)&lt;\/span&gt;)\[\/doHTML\]/gi;
	
	var _this = this.obj;
	var d = data.toString();
	
	sentido = sentido.exec(d)[2];
	rank = rank.exec(d)[2];
	evolucao = evolucao.exec(d)[2];
	
/*	forca = forca.exec(d)[2];
	agi = agi.exec(d)[2];
	per = per.exec(d)[2];
	res = res.exec(d)[2];
	car = car.exec(d)[2];
	von = von.exec(d)[2];
*/

//	var unescape = $('<div />').html(profile[2]).text();
	
/*	<dl class="user_profile_custom"><dt>Rank Cósmico:</dt><dd>A-</dd><dt>Sentido:</dt><dd>7º Sentido</dd><dt>Evolução Cósmica:</dt><dd><img src="http://i1016.photobucket.com/albums/af282/Alexjfranca/2star_zpsienoo5wq.png"></dd><dd class="spacer"></dd></dl>

*/
	$(_this).find(".user_profile").after("<dl class=\"user_profile_custom\"><dt>" + rank + "</dd><dt>Sentido:</dt><dd>" + sentido + "</dd><dt>Evolução Cósmica:</dt><dd><img src=\"" + evolucao + "\"></dd></dl>");
	
//	$(_this).find(".user_profile_custom").after()
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

