function getProfile(data){
	var sentido = /&lt;span\sclass=&quot;sentido&quot;&gt;([\s\S]{1,20})&lt;\/span&gt;/gi;
	var rank =    /&lt;span\sclass=&quot;rank&quot;&gt;([\s\S]{1,10})&lt;\/span&gt;/gi;
	var evolucao = /&lt;span\sclass=&quot;evol&quot;&gt;<img\ssrc="([\s\S]*\.png)"[\s\S]{1,100}\/>&lt;\/span&gt;/gi
	
	var forca = /&lt;span\sclass=&quot;for&quot;&gt;([\s\S]{1,3})&lt;\/span&gt;/gi;
	var agi = /&lt;span\sclass=&quot;agi&quot;&gt;([\s\S]{1,3})&lt;\/span&gt;/gi;
	var per = /&lt;span\sclass=&quot;per&quot;&gt;([\s\S]{1,3})&lt;\/span&gt;/gi;
	var res = /&lt;span\sclass=&quot;res&quot;&gt;([\s\S]{1,3})&lt;\/span&gt;/gi;
	var car = /&lt;span\sclass=&quot;car&quot;&gt;([\s\S]{1,3})&lt;\/span&gt;/gi;
	var von = /&lt;span\sclass=&quot;von&quot;&gt;([\s\S]{1,3})&lt;\/span&gt;/gi;
	
	var _this = this.obj;
	var d = data.toString();
	
	sentido = sentido.exec(d);
	rank = rank.exec(d);
	evolucao = evolucao.exec(d);
	
	forca = forca.exec(d);
	agi = agi.exec(d);
	per = per.exec(d);
	res = res.exec(d);
	car = car.exec(d);
	von = von.exec(d);


//	var unescape = $('<div />').html(profile[2]).text();
	
/*	<dl class="user_profile_custom"><dt>Rank Cósmico:</dt><dd>A-</dd><dt>Sentido:</dt><dd>7º Sentido</dd><dt>Evolução Cósmica:</dt><dd><img src="http://i1016.photobucket.com/albums/af282/Alexjfranca/2star_zpsienoo5wq.png"></dd><dd class="spacer"></dd></dl>

*/
	$(_this).find(".user_profile").after("<dl class=\"user_profile_custom\"><dt>Rank Cósmico:</dt><dd>" + rank[1] + "</dd><dt>Sentido:</dt><dd>" + sentido[1] + "</dd><dt>Evolução Cósmica:</dt><dd><img src=\"" + evolucao[1] + "\"></dd></dl>");
	
	$(_this).find(".user_profile_custom").after("<canvas class=\"user_profile_custom\" style=\"background-color: #0f0f19;\" width=\"175px\" height=\"175px\"></canvas>");
	var ctx = $(_this).find(".user_profile_custom").get(1).getContext("2d");
	var arrayVal = [forca[1], res[1], car[1], von[1], per[1], agi[1]];
	radarData.datasets[0].data = arrayVal.map(Number);
	var nChart = new Chart(ctx).Radar(radarData, radarOptions);
};

(function ($) {
	if (location.href.indexOf('/topic') !== -1) {
		$(".user_profile dd a").parent().hide();

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

