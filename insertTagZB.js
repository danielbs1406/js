/* Code (C) Xanikseo 2009
Use but don't let loose. i.e. don't claim it.
---- Customized by Scy 2016
*/

var xan_bb_tags = '';
var regex_variable,regex_var_str,newline_button,x,i,bb_but;
undefined;null;

function while_replace(text,replacetext,withtext) {
	while(text.split(replacetext).length>1) {
		text = text.replace(replacetext,withtext);
	}
	return text;
}

function no_bb_codes() { 
	$("code").each(function(){$(this).html($(this).html().replace(/\[/g,'[<i/>'))});
}

function make_reg_ex(text) { 
	if(!text)return null;
	return '/' + text.replace(/\//g,'\\/') + '/';
}

function stringise_reg(reg_exxx) {
	if(!reg_exxx)return '';
	return reg_exxx.toString().replace(/^\/(.*|\s*)\/$/,'$1').replace(/\\\//g, '/');
}

function isPtype(ptype) { 
	switch(ptype) {
		case 'all': 	if((window.location.href.match(/\/(?:topic|post|msg|site|profile|single|search|blog(?:\/3)?)\//) || window.location.href.match(/\?c=32/)) && !window.location.href.match('&poll=') ) return true;
			break;
		case 'topic':	if(window.location.href.match(/\/(?:topic|single|search|blog)\//) || window.location.href.match(/\/msg\/\?c=1&folder=/) ) return true; 
			break;
		case 'post':	if(window.location.href.match(/\/(?:post|blog\/3)\//) && !window.location.href.match('&poll=') ) return true; 
			break;
		case 'sig':	if(window.location.href.match(/\?c=32/) ) return true; 
			break;
		case 'msg':	if(window.location.href.match(/\/msg\/\?c=1&folder=/) || window.location.href.match(/\/msg\/\?c=2/) ) return true; 
			break;
		case 'blog':	if(window.location.href.match(/\/blog(?:\/3)?\//)) return true;
			break;
		case 'profile':	if(window.location.href.match(/\profile\//) ) return true; 
			break;
		case 'portal':	if(window.location.href.match(/\/site\//) ) return true;
			break;
	}
	return false;		
}

if(isPtype('all')) {
	no_bb_codes();
}

function ubb_tag(name,beg,wrapHTML,variable,description,args,button_val) { 
	if(args == undefined || args == 0) args = '';
	if(isPtype('all') || args.match('t')) {
		ubb_tag2(beg,wrapHTML,variable,args,'div');
		ubb_tag2(beg,wrapHTML,variable,args,'td');
		if(args.match('t')) ubb_tag2(beg,wrapHTML,variable,args,'a'); ubb_tag2(beg,wrapHTML,variable,args,'ul'); ubb_tag2(beg,wrapHTML,variable,args,'th');
		if(args.match('f')) eval("xbb_"+beg+"();");
		if ((args.match('s') && isPtype('sig')) || (args.match('m') && isPtype('msg') || (args.match('l') && isPtype('blog')))) return; 
		if(isPtype('post') || isPtype('msg') || isPtype('sig')) {
			xan_bb_tags += "ubb_tag2('"+beg+"',stringise_reg("+make_reg_ex(wrapHTML)+"),'"+variable+"','"+args+"','div');";
			if(args.match('f')) xan_bb_tags += 'xbb_'+beg+'();';
			if(window.location.href.match(/\/msg\/\?c=1&folder=/) || args.match('b')) return;
			if(!args.match('z')) {
				if(!document.getElementById('xan_bb_z_but_row')) {
					bb_but = document.createElement('span');
					document.posting.fcolor.parentNode.insertBefore(bb_but, document.posting.fcolor.parentNode.getElementsByTagName('select')[0]);
					document.posting.fcolor.parentNode.getElementsByTagName('span')[0].id = 'xan_bb_z_but_row';
				}
				x = document.getElementById('xan_bb_z_but_row');
			} else { 
				if(!document.getElementById('xan_bb_x_but_row')) {
					bb_but = document.createElement('div');
					document.posting.helpbox.parentNode.insertBefore(bb_but, document.posting.helpbox.parentNode.getElementsByTagName('input')[0]);
					document.posting.helpbox.parentNode.getElementsByTagName('div')[0].id = 'xan_bb_x_but_row';
				}
				x = document.getElementById('xan_bb_x_but_row');
			}
			if(button_val != undefined){
				if(button_val == '')
					button_val = name;
				if(args.match('n')) {
					newline_button = '<br />';
				} else {
					newline_button = '';
				} 
				x.innerHTML += "<button type='button' onclick=\"add_ubb_tag_to_post('" + beg + "','" + variable + "','" + description + "')\" onmouseover=\"hstat_xanik('" + name + ": " + description.split('||')[0] + "')\" />" + button_val + "</button> " + newline_button;
			}
		}
	}
}

function ubb_tag2(beg,wrapHTML,variable,args,tagtag) {
	x = document.getElementById('wrap').getElementsByTagName(tagtag);
	i=x.length;
	while(i--) { 
		if(x[i].innerHTML.match(beg) && ((x[i].className == 'c_post' && !(isPtype('msg') && args.match('m'))) || ( x[i].className == 'c_sig' && x[i].id != 'c_post' && !args.match('s') ) || (!args.match('p') && (x[i].className == 'c_poll-choice' || x[i].className == 'c_poll-answer' || (isPtype('portal') && x[i].className == 'row1')) ) || x[i].className == 'portal_content' || x[i].parentNode.parentNode.parentNode.id == 'topic_review' || x[i].parentNode.parentNode.id == 'topic_review' || x[i].id == 'c_post-preview' || x[i].parentNode.className == 'search_results' || (args.match('u') && x[i].className == 'usertitle') || (args.match('t') && ((tagtag == 'a' && (x[i].href.match('/topic/') || x[i].href.match(/\?c=1&folder=/)) || (tagtag == 'ul' && x[i].id == 'nav') || (tagtag == 'th' && (x[i].parentNode.parentNode.parentNode.className == 'topic' || x[i].parentNode.parentNode.parentNode.className == 'posting' || (window.location.href.match(/c=1&folder=/) && x[i].parentNode.parentNode.parentNode.cellSpacing == '0')) )) )) || (x[i].className == 'blog_entry' && !args.match('l')) )) { 
			if(variable.indexOf("0") !== -1) {
				var regex_variable = new RegExp ("\\[" + beg + "\\](.*?|\\s*)\\[\\/" + beg + "\\]","gim");
	  			while(x[i].innerHTML.match(regex_variable)) {
					x[i].innerHTML = x[i].innerHTML.replace(regex_variable, wrapHTML = wrapHTML.replace(/<% INNER %>/g, '\$1'));
					if(beg.toLowerCase() == 'dohtml'){
						x[i].innerHTML = x[i].innerHTML.replace(/["<>]/g, function (c) {
							return {
								'"': "&quot;",
								'<': "&lt;",
								'>': "&gt;"
							}[c];
						});
						x[i].innerHTML = x[i].innerText;
					}
				}
				if(tagtag == 'th' && document.title.match(regex_variable)) document.title = document.title.replace(regex_variable,'$1');
			} 
			if(variable.indexOf("1") !== -1) {
				regex_variable = new RegExp ("\\[" + beg + "=([^\\],]+?)\\](.*?|\\s*)\\[\\/" + beg + "\\]","gim");
	  			while(x[i].innerHTML.match(regex_variable)) {
					x[i].innerHTML = x[i].innerHTML.replace(regex_variable, wrapHTML = wrapHTML.replace(/<% INNER %>/g, '\$2').replace(/<% VAR(?:1)? %>/g, '\$1'));
					if(tagtag == 'th' && document.title.match(regex_variable)) document.title = document.title.replace(regex_variable,'$2');
				}
			}
			if(variable.indexOf("-1") !== -1) {
				regex_variable = new RegExp ("\\[" + beg + "\\]","gim");
				x[i].innerHTML = x[i].innerHTML.replace(regex_variable,wrapHTML);
				if(tagtag == 'th' && document.title.match(regex_variable)) document.title = document.title.replace(regex_variable,wrapHTML);
			}
			var arrayNumber = variable.split(",");
			var ind = arrayNumber.length;
			while(ind--){
				var valueInt = parseInt(arrayNumber[ind].replace(/\s/g, ''));
				if(valueInt > 1){
					regex_var_str = "([^\\],]+?),([^\\],]+?)";
					var a = valueInt-2;
					while(a--) { 
						regex_var_str += ",([^\\],]+?)";
					}
					regex_variable = new RegExp ("\\[" + beg + "="+regex_var_str+"\\](.*?|\\s*)\\[\\/" + beg + "\\]","gim");
					while(x[i].innerHTML.match(regex_variable)) {
						x[i].innerHTML = x[i].innerHTML.replace(regex_variable, wrapHTML = wrapHTML.replace(/<% INNER %>/g, '\$' + (valueInt+1)).replace(/<% VAR(?:1)? %>/g, '\$1').replace(/<% VAR(\d+) %>/gim, "$$$1") );
						if(tagtag == 'th' && document.title.match(regex_variable)) document.title = document.title.replace(regex_variable,'\$' + (valueInt+1));
					}
				}
			}
		}
	}
}

// End of BB parsing function

function hstat_xanik(text) { //Button of BB Code description put into little box
	document.posting.helpbox.value = text;
}

function add_ubb_tag_to_post(opentag,variable,description) {
	description = description.split('||');
	var input_array = new Array();

	if(variable.indexOf("-1") !== -1) {
		ZetaInsert("["+opentag+"]")
		return;
	} else if(variable.indexOf("0") !== -1) {
		ZetaInsert("["+opentag+"]","[/"+opentag+"]")
	} else {
		for(ggjj=0;ggjj<description.length-1;ggjj++) { //Prompt for right variables with box
			input_array[ggjj] = prompt(description[0] + '\n' + description[ggjj+1],'');
			if(!input_array[ggjj]) {
				alert('Action Cancelled');
				return;
			}
		}
		ZetaInsert('[' + opentag + '=' + input_array.join(",").replace(input_array[0] + ',','') + ']' + input_array[0] + '[/' + opentag + ']');
	}
}

function Preview(e) {
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
    if ($('#c_post-preview').length || $('#c_post textarea').val() || $('#txt_quote').val()) {
        if (!$('#c_post-preview').length) {
            $('#c_post').prepend("<div id='c_post-preview'></div>");
        }
        
        var quote = $('#txt_quote'),
        prepend_quote = quote.length && quote.val() ? "[quote]" + quote.val() + "[\/quote]" : "",
        xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        
        xhr.open('POST', main_url + 'tasks/', true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.setRequestHeader("Accepts", "*/*");
        
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                $('#c_post-preview').html(xhr.responseText);
				no_bb_codes();
				eval(xan_bb_tags);
                $('#c_post-preview div.spoiler_toggle').click(function () {
                    $(this).next().toggle();
                });
            }
        };
        
/*		var regex_variable = new RegExp ("\\[doHTML\\](.*?|\\s*)\\[\\/doHTML\\]","gim");
		if($("#c_post textarea").val().match(regex_variable)){
			alert("Deu certo!");
		}
*/	  			
        xhr.send($.param({ task: 5, post: prepend_quote + $("#c_post textarea").val() }));
    }
}
