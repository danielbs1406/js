var legend = "";
for (n = 0; n < NewGroup.length; n++) {
	if (n > 0) legend += ", ";
	legend += "<a name='legend' href='" + NewGroup[n][2] + "' onMouseover='ShowIt(" + n + ");' onMouseout='HideIt();'><span class='" + NewGroup[n][1] + "'>" + NewGroup[n][0] + "</span></a>";
}

function ShowIt(rawr) {
	var admin = [];
	a = $(".thin SPAN[class='" + NewGroup[rawr][1] + "']");
	$(a).each(function(){
		if (this.parentNode.name != "legend"){
			var isNewer = true;
			for(j = 0; j < admin.length; j++){
				if($(admin[j]).text() == $(this).text())
					isNewer = false;
			}
			if(isNewer)
				admin[admin.length] = this;
		}
	});
	var show = document.getElementById("showit");
	if (admin.length > 0) {
		show.innerHTML = "<span class='" + NewGroup[rawr][1] + "'>" + NewGroup[rawr][0] + "</span>(s) online: ";
		for (i = 0; i < admin.length; i++) {
			if (i > 0)
				show.innerHTML += ", ";
			show.innerHTML += admin[i].innerHTML;
		}
	} else {
		for (n = 0; n < NewGroup.length; n++) {
			show.innerHTML = "There are no <b>" + NewGroup[rawr][0] + "s</b> online.";
		}
	}
}

function HideIt() {
	document.getElementById("showit").innerHTML = "&nbsp;";
}

var show = document.getElementsByTagName('TD')
	for (i = 0; i < show.length; i++) {
		if (show[i].innerHTML.match(/anonymous members/i))
			if ((show[i].className == "row4") && (show[i].width == "95%")) {
				show[i].getElementsByTagName('DIV')[0].innerHTML += "<br /><hr><b>Member Legend</b>: " + legend
				show[i].getElementsByTagName('DIV')[0].innerHTML += "<br /><div id='showit'>&nbsp;</div>"
			}
	}
