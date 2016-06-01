// IPB Shoutbox 2.5: Build F
// Original by Epsilekt, continued by Mwr247
// Modified by Scy
// Last updated: 04/04/15
// http://z9.invisionfree.com/ShoutBoxCode/

var sbfrm = shoutboxfid;
if (sbfrm.match('=') || sbfrm.match('&')) {
	sbfrm = sbfrm.split('=')[1].split('&')[0];
}
var sbtpc = shoutboxtid;
if (sbtpc.match('=') || sbtpc.match('&')) {
	sbtpc = sbtpc.split('=')[1].split('&')[0];
}
var sbd = document;
var sbwl = window.location;

if (location.href.charAt(7) == 's' && location.href.match('.invisionfree.com')) {
	location.href = 'http://z' + location.href.split('http://s')[1];
}
var sburl = sbwl.href.split('index.php')[0];
if (!sburl) {
	sburl = sbwl.href;
}
if (sburl.charAt(sburl.length - 1) != '/') {
	sburl += '/';
}

var cab = true;
var urlfix = sburl;
while (urlfix.match(' ')) {
	urlfix = urlfix.replace(' ', '_');
}
if (sbd.cookie.match(urlfix + 'theshoutbox=hide')) {
	var cab = false;
}

var isguest = 1;
if (sbd.getElementById('userlinks').innerHTML.match(/Log Out/i) != null) {
	var isguest = 0;
}

var hidefromguests = 0;
if (guestvisible == 0 && isguest == 1) {
	var hidefromguests = 1;
}

var ismod = 0;
if (sbd.getElementById('userlinks').innerHTML.match(/mod cp/i) != null) {
	var ismod = 1;
}

var isadmin = 0;
if (sbd.getElementById('userlinks').innerHTML.match(/admin cp/i) != null) {
	var isadmin = 1;
}

var viewmod = 0;
if (isadmin == 1 || (ismod == 1 && modlink == 1)) {
	var viewmod = 1;
}

var editopic = '';
if (viewlink == 1 && isguest == 0 && viewmod == 0) {
	var editopic = '- <a href="' + sburl + 'index.php?showtopic=' + sbtpc + '&view=getlastpost">View</a>';
}

var adminoptions = '';
if (viewmod == 1) {
	var adminoptions = '- <a href="javascript:togglemod();">Mod</a>';
}

function togglemod() {
	if (viewmod == 1) {
		sbd.getElementById('shoutcontent').innerHTML = '<table border="1" class="row4" cellspacing="0" cellpadding="0" height="100%"><tr><td valign="top" width="15%" height="15px" border="1"><center><b>Shoutbox Tools</b></center></td><td valign="top" width="15%" height="15px" border="1"><center><b>Admin Links</b></center></td><td valign="top" width="70%" height="15px" border="1"><center><b>Shoutbox News - 02/04/09</b></center></td></tr><tr><td width="15%" height="100%" border="1" valign="top">- <a href="' + sburl + 'index.php?act=ST&f=' + sbfrm + '&t=' + sbtpc + '&view=getnewpost" style="text-decoration:none;">Shoutbox Topic</a><br />- <a href="' + sburl + 'index.php?showforum=' + sbfrm + '" style="text-decoration:none;"> Shoutbox Forum</a><br />- <a href="' + sburl + 'index.php?act=Stats&CODE=who&t=' + sbtpc + '" style="text-decoration:none;">Shouter Stats</a></td><td width="15%" height="100%" border="1" valign="top">- <a href="http://if.invisionfree.com/topic/295322/" style="text-decoration:none;" target="sbp">Support Topic</a><br />- <a href="http://z9.invisionfree.com/ShoutboxCode/" style="text-decoration:none;" target="sbp">Support Forum</a><br />- <a href="http://bigboardsresources.com/index.php?showtopic=1508" style="text-decoration:none;" target="sbp">Big Boards</a></td><td width="70%" height="100%" border="1" valign="top">Update! About time too ;) Ok, this time I\'ve removed the whole \"<u>( Go to first unread post )</u>\" deal (in all but Google Chrome because it wants to be different), an old requested change. In addition, I also added a new and long awaited option to the shoutbox: the ability to load shouts from top to bottom! Simply add the following into the Basic Settings portion of the code: <u>var toptobottom=\'1\';</u></td></tr></table>';
		sbd.getElementById('shoutpages').innerHTML = '<b>Mod Area</b> - (<a href="javascript:sbrefresh();">Back to Shoutbox</a>)';
	}
}

function toggleinfo() {
	sbd.getElementById('shoutcontent').innerHTML = '<b>Credits:</b><br />"<u>IPB Shoutbox 3.0</u>" (customized code) by Scy<br />"<u><a href="http://if.invisionfree.com/topic/295322/1/" target="sbp">IPB Shoutbox 2.5</a></u>" by <a href="http://if.invisionfree.com/profile/38680/" target="sbp">Mwr247</a><br />"<u>IPB Shoutbox 2.0</u>" (original code) by <a href="http://if.invisionfree.com/profile/41928/" target="sbp">Epsilekt</a>';
	sbd.getElementById('shoutpages').innerHTML = '<b>Shoutbox Info</b> - (<a href="javascript:sbrefresh();">Back to Shoutbox</a>)';
}

if (!enablebb) {
	var enablebb = 1;
}
if (enablebb == 0) {
	var sbbcodes = '';
} else {
	var sbbcodes = '<div style="float:right;margin-right:10px;"><input type="button" class="codebuttons" id="B" value="B" onmousedown="sbbcode(\'B\'); return false" style="font-weight:bold;" title="Bold" /> <input type="button" class="codebuttons" id="I" value="I" onmousedown="sbbcode(\'I\');" style="font-style:italic;" title="Italic" /> <input type="button" class="codebuttons" id="U" value="U" onmousedown="sbbcode(\'U\');" style="text-decoration:underline;" title="Underline" /> <input type="button" class="codebuttons" id="S" value="S" onmousedown="sbbcode(\'S\');" style="text-decoration:line-through;" title="Strikethrough" /> <select class="codebuttons" id="COLOR" onmousedown="highlightText();" onchange="sbbcode(\'COLOR\',this.options[this.selectedIndex].value);" title="Color"><option value="NA">COLOR</option><option value="blue" style="color:blue">Blue</option><option value="red" style="color:red">Red</option><option value="purple" style="color:purple">Purple</option><option value="orange" style="color:orange">Orange</option><option value="yellow" style="color:yellow">Yellow</option><option value="gray" style="color:gray">Gray</option><option value="green" style="color:green">Green</option></select> <select class="codebuttons" id="SIZE" onmousedown="highlightText();" onchange="sbbcode(\'SIZE\',this.options[this.selectedIndex].value);" title="Size"><option value="NA">SIZE</option><option value="-1">Small</option><option value="4">Middle</option><option value="7">Large</option></select> <select class="codebuttons" id="FONT" onmousedown="highlightText();" onchange="sbbcode(\'FONT\',this.options[this.selectedIndex].value);" title="Font"><option value="NA">FONT</option><option value="Arial" style="font-family:Arial">Arial</option><option value="Times" style="font-family:Times">Times</option><option value="Impact" style="font-family:Impact;">Impact</option><option value="Geneva" style="font-family:Geneva;">Geneva</option><option value="Optima" style="font-family:Optima;">Optima</option></select></div>';
}

if (!toptobottom) {
	var toptobottom = 0;
}

var onlyindex = 0;
var iof = sbd.getElementsByTagName('div');
for (i = 0; i < iof.length; i++) {
	if (indexonly == 1) {
		if (!location.href.match('idx') && location.href.match('=')) {
			var onlyindex = 1;
		} else if (iof[i].className == 'pformstrip' && iof[i].innerHTML == 'Post Preview') {
			var onlyindex = 1;
		}
	}
}

if (parent.sbwl.href.match('showtopic=' + sbtpc + '&') && sbd.getElementById('navstrip').innerHTML.match('showforum=' + sbfrm)) {
	if ((viewlink == 1 || viewmod == 1) && isguest == 0) {
		sbd.title = 'Shoutbox Control';
	} else {
		location.href = sburl;
	}
}

if (sbd.cookie.match(urlfix + 'theshoutbox=hide') && hidefromguests == 0 && onlyindex == 0) {
	sbd.getElementById('shoutbox').innerHTML = '<div class="tableborder"><div class="' + topclass + '" width="50%"><div style="float:right;"><a onclick="visShoutbox();window.location=window.location"></a>&nbsp;</div>Shoutbox ' + editopic + '</div></div>';
}

var x = sbd.getElementsByTagName('A');
for (i = 0; i < x.length; i++) {
	if (x[i].innerHTML == 'Pages:' && x[i].href.match('javascript:multi_page_jump')) {
		x[i].parentNode.id = 'shoutpagesbranchdiv';
	}
}

var st = sbwl.href.split('st=')[1];
if (!st) {
	st = 0;
} else {
	if (st.match('&')) {
		st = st.split('&')[0];
	}
}

var linkst = 0;
var linkhr = '';
var x = sbd.getElementsByTagName('A');
for (i = 0; i < x.length; i++) {
	if (x[i].parentNode.id == 'shoutpagesbranchdiv') {
		if (sbwl.href.match('&page=first')) {
			if (x[i].href.match('st=')) {
				var tlst = x[i].href.split('st=')[1];
				if (tlst.match('&')) {
					tlst = tlst.split('&')[0];
				}
				linkst = tlst;
				linkhr = x[i].href;
			}
		}
		x[i].href += '';
	}
}

if (Math.floor(linkst) > Math.floor(st)) {
	sbwl = linkhr + '&stop=script';
	var cab = false;
}
if (cab) {

	String.prototype.noHTML = function () {
		var string = this;
		while (string.match('<') && string.match('>')) {
			var html = string.split('<')[1].split('>')[0];
			string = string.replace('<' + html + '>', '');
		}
		return string;
	}

	if (sbwl.href.match('showtopic=' + sbtpc + '&')) {
		var shoutpages = parent.sbd.getElementById('shoutpages');
		var shoutcontent = parent.sbd.getElementById('shoutcontent');
		var sbpages = '&nbsp;';
		if(shoutcontent){
			shoutcontent.innerHTML = '';
		}
		if(shoutpages){
			shoutpages.style.display = 'block';
			shoutpages.style.padding = '8px';
		}
		
		var x = sbd.getElementsByTagName('A');
		for (i = 0; i < x.length; i++) {
			if (x[i].parentNode.id == 'shoutpagesbranchdiv') {
				x[i].href += '';
				x[i].target = 'shoutframe';
			}
		}

		var x = sbd.getElementsByTagName('A');
		for (i = 0; i < x.length; i++) {
			if (x[i].innerHTML == 'Pages:' && x[i].href.match('javascript:multi_page_jump')) {
				if (sbpages == '&nbsp;') {
					sbpages = x[i].parentNode.innerHTML.split('&nbsp;\( ')[0].split(' \( ')[0];
				}
			}
		}

		if(shoutpages){
			if (sbpages == '&nbsp;' && enablebb == 0) {
				shoutpages.style.display = 'none';
			} else {
				shoutpages.innerHTML = sbbcodes + sbpages;
			}
		}
		
		var x = sbd.getElementsByTagName('DIV');
		for (i = 0; i < x.length; i++) {
			if (x[i].className == 'postcolor') {
				x[i].className = 'smallpost';
			}
			if (x[i].className == 'signature') {
				x[i].parentNode.innerHTML = x[i].parentNode.innerHTML.substring(0, x[i].parentNode.innerHTML.lastIndexOf('<br><br>--------------------'));
				x[i].innerHTML = '';
			}
		}

		var sbposts = '';
		var x = sbd.getElementsByTagName('TD');
		var a = sbd.getElementsByTagName('A');
		for (i = 0; i < x.length; i++) {
			var sbauthor = '';
			var sbdate = '';
			var sbedit = '';
			var sbdelete = '';
			var sbpost = '';
			var sbr = '';
			if (x[i].className == 'post1' || x[i].className == 'post2') {
				if (x[i].parentNode.cells[1] == x[i]) {
					sbauthor = x[i].parentNode.parentNode.rows[0].cells[0];
					sbdate = x[i].parentNode.parentNode.rows[0].cells[1].innerHTML.noHTML().split('Posted: ')[1].split('Edit')[0].split('Quote')[0];
					sbdate = sbdate.trim();
					for (j = 0; j < a.length; j++) {
						if (a[j].parentNode.parentNode == sbauthor) {
							/* uncomment to insert edit mode
								by Scy
							*/
/*							if (a[j + 5].href.match('CODE=08')) {
								sbedit = ' (<a href="' + a[j + 5].href + '" class="links">Edit</a>) ';
							} else if (a[j + 4].href.match('CODE=08')) {
								sbedit = ' (<a href="' + a[j + 4].href + '" class="links">Edit</a>) ';
							}
*/							if (a[j + 4].href.match('act=Mod&CODE=04')) {
								sbdelete = ' (<a href="javascript:sbdel(' + a[j + 4].href.split("\(")[1].split("\)")[0] + ');" class="links" title="Delete">X</a>) ';
							} // check position to get delete button by Scy
							else if (a[j + 3].href.match('act=Mod&CODE=04')) {
								sbdelete = ' (<a href="javascript:sbdel(' + a[j + 3].href.split("\(")[1].split("\)")[0] + ');" class="links" title="Delete">X</a>) ';
							}
							if (sbedit != '' || sbdelete != '') {
								sbr = '<br />';
							}
						}
					}
					post = x[i].innerHTML.split('This post has been edited by')[0].split('<br><br><span class="edit">')[0];
					/* fixed the utf-8 to iso-9958-1 caused by ajax callback 
						by Scy
					*/
					try{
						post = decodeURIComponent(escape(post));
					}
					catch(e){}
					post = post.substr(0, post.indexOf('</div>')) + sbedit + sbdelete + '</div>';
				
					/*  
						customized by Scy 
					*/
					if (toptobottom == 1) {
						sbposts = sbposts + '<tr><td valign="top" width="20%" class="' + x[i].className + '"><span style="font-size: 6pt;">' + sbdate + '</span><br /><span>' + sbauthor.innerHTML + '</span></td><td valign="bottom" width="80%" class="' + x[i].className + '">' + x[i].innerHTML.split('This post has been edited by')[0].split('<br><br><span class="edit">')[0] +'</font></td></tr>';
					} else {
						sbposts = '<tr><td valign="top" width="20%" class="' + x[i].className + '"><span style="font-size: 6pt;">' + sbdate + '</span><br /><span>' + sbauthor.innerHTML + '</span></td><td valign="bottom" width="80%" class="' + x[i].className + '">' + post +'</font></td></tr>' + sbposts;
					}
				}
			}
		}

		if (shoutcontent) {
			if (sbauthor == null) {
				shoutcontent.innerHTML = 'There was an error loading the Shoutbox...';
			} else {
				shoutcontent.innerHTML = '<table width="100%" cellspacing="1px" cellpadding="4px">' + sbposts + '</table>';
				if (toptobottom == 1) {
					shoutcontent.scrollTop = shoutcontent.scrollHeight;
				}
			}
		}
	} else {
		var sbreply = '';
		if (isguest == 0 || guestshouts == 1) {
			var sbreply = '<center><input type="text" class="forminput" id="postmessage" action="postShout();" size="' + textlength + '" value=""/>&nbsp;<input type="submit" class="forminput" onclick="postShout();" value="Shout" />&nbsp;<button type="reset" class="forminput">Clear</button>&nbsp;<button type="button" class="forminput" id="refresh" onclick="sbrefresh();">Refresh</button></center>';
		} else {
			var sbreply = '<center><input type="text" class="forminput" size="' + textlength + '" value="You must be logged in to use the shoutbox." disabled />&nbsp;<button type="button" class="forminput" onclick="sbrefresh();">Refresh</button>&nbsp;<button type="button" class="forminput" onclick="window.location=' + sburl + 'index.php?act=Login&CODE=00;">Login</button>&nbsp;<button type="button" class="forminput" onclick="window.location=' + sburl + 'index.php?act=Reg&CODE=00;">Register</button></center>';
		}

		var shoutbox = sbd.getElementById('shoutbox');
		var jumpfix = sbd.getElementById('jumpfix');
		if (onlyindex == 0 && hidefromguests == 0) {
			shoutbox.innerHTML = '<div class="tableborder"><div class="' + topclass + '"><div style="float:right;"><a onclick="visShoutbox();noloadhide();"><img src="http://i1.ifrm.com/6539/182/pip/collapse.gif" border="0" id="onoff" /></a>&nbsp;</div><a href="javascript:toggleinfo();">Shoutbox</a> ' + adminoptions + editopic + '</div><div id="shoutarea" style="display:block;"><div class="row2" id="shoutpages"></div><form action="javascript:postShout();" id="shoutboxform" class="shoutboxform" style="display:inline;" method="get" accept-charset="iso-8859-15"><div id="shoutcontent"><center><br />Loading Shoutbox...<br /><img src="http://i1.ifrm.com/6539/182/pip/sbbar.gif" style="margin-top:4px;" /></center></div><div class="darkrow2" style="padding:6px;" id="replyarea">' + sbreply + '</div></form></div></div><br />';
			/* by Scy */ 
			jumpfix.innerHTML = '<iframe src="' + sburl + 'index.php?showtopic=' + sbtpc + '&st=99999" id="shoutframe" name="shoutframe" width="0" height="0" frameborder="no"></iframe>';
		}
	}
	
}

if (sbwl.href.match('act=Online')) {
	var x = sbd.getElementsByTagName('A');
	for (i = 0; i < x.length; i++) {
		if (x[i].href.match('showtopic=' + sbtpc)) {
			x[i].parentNode.innerHTML = 'Viewing Board Index';
		}
	}
}

if (!sbwl.href.match('&view=log')) {
	var x = sbd.getElementsByTagName('A');
	for (i = 0; i < x.length; i++) {
		if (sbwl.href.match('act=Search')) {
			if (x[i].href.match('showtopic=' + sbtpc + '&view=getlastpost')) {
				x[i].parentNode.parentNode.style.display = 'none';
			}
		} else if (sbwl.href.match('showforum=' + sbfrm) || sbwl.href.match('act=SF&f=' + sbfrm)) {
			if (x[i].href.match('showtopic=' + sbtpc + '&view=getlastpost')) {
				x[i].parentNode.parentNode.parentNode.style.display = 'none';
			}
		}
	}
}

function postShout() {

	var postmessage = sbd.getElementById('postmessage');
	if (postmessage.value.length < 1) {
		alert('You must provide a message to post.');
	} else {
		sbd.getElementById('shoutframe').src = sburl + 'index.php?act=Post&CODE=02&f=' + sbfrm + '&t=' + sbtpc + '&auto=3post';
	}
}

if (sbwl.href.match('&auto=3post')) {
	var postmessage = parent.sbd.getElementById('postmessage');
	if (postmessage.value.length < 1) {
		alert('You must provide a message to post.');
	} else {
		var replyForm = sbd.forms['REPLIER'];
		if (replyForm) {
			replyForm.Post.value = postmessage.value;
			replyForm.enablesig.checked = false;
			postmessage.value = '';
			/*
				Method to send post without refresh page
				by Scy 
			*/
			var formData = $(replyForm).serialize();
			formData = decodeURIComponent(formData);
			$(replyForm).click(function () {
				$.ajax({
					type : "POST",
					url : $(this).attr("action"), 
					scriptCharset: "iso-8859-15", 
					contentType: "application/x-www-form-urlencoded; charset=iso-8859-15",
					data : formData,
					cache: false,
					success : function (data) {
						// auto refresh after post 
						var refresh = parent.sbd.getElementsByTagName("button")[1]; 
						$(refresh).click();
					},
					error : function () {
						alert("There was an error on submit message in Shoutbox");
					}
				});
				
				return false; // ignore submit default
			});

			replyForm.submit.click();
		} else {
			alert('You do not have permission to shout.');
		}
	}
}

function sbrefresh() {
	sbd.getElementById('shoutframe').src = sburl + 'index.php?showtopic=' + sbtpc + '&st=99999';
}

function noloadhide() {
	var h1 = sbd.getElementById('shoutarea');
	if (h1.style.display == 'block') {
		h1.style.display = 'none';
		sbd.getElementById('onoff').src = 'http://i1.ifrm.com/6539/182/pip/expand.gif'
	} else {
		h1.style.display = 'block';
		sbd.getElementById('onoff').src = 'http://i1.ifrm.com/6539/182/pip/collapse.gif';
	}
}

function visShoutbox() {
	if (sbd.cookie.match(urlfix + 'theshoutbox=hide')) {
		sbd.cookie = urlfix + 'theshoutbox=; expires=Sun, 19 Sep 0000 6:10:10 UTC; path=/';
	} else {
		sbd.cookie = urlfix + 'theshoutbox=hide; expires=Sun, 19 Sep 9999 6:10:10 UTC; path=/';
	}
}

function sbdel(sbdellink) {
	var sbdelcon = confirm("Are you sure you wish to delete this shout?");
	if (sbdelcon) {
		sbd.getElementById('shoutframe').src = sbdellink;
	}
}
/*
	by Scy
	function to get selected text and insert tag around
*/
function highlightText(){
	if (document.getSelection && document.getSelection().toString().length > 0) {
		highlightText.text = document.getSelection().toString();
		var text = document.getElementById('postmessage');
		highlightText.start = text.selectionStart;
		highlightText.end = text.selectionEnd;
	} else if (document.selection && document.selection.createRange().length > 0) {
		highlightText.text = document.selection.createRange().text;
		var text = document.getElementById('postmessage');
		highlightText.start = text.selectionStart;
		highlightText.end = text.selectionEnd;
	}
	if(highlightText.text == undefined){
		highlightText.text = '';
	}

	return highlightText.text;
}

function sbbcode(bbcode, variant) {
	if(variant != "NA"){	
		var sbbt = highlightText();
		var sbbf = document.getElementById('postmessage');
		var sbbc = document.getElementById(bbcode);
		var sbb1 = sbbf.value.substring(0, highlightText.start);
		var sbb2 = sbbf.value.substring(highlightText.end);
		var bbvar = '';
		if (variant != null) {
			bbvar = '\=' + variant.toUpperCase();
		}
		if (sbbt != '') {
			sbbf.value = sbb1 + '[' + bbcode + bbvar + ']' + sbbt + '[/' + bbcode + ']' + sbb2;
		} else {
			if (sbbc.value.match('/')) {
				sbbc.value = sbbc.value.replace('/', '');
				sbbf.value += '[/' + bbcode + ']';
			} else {
				if (sbbc.value != bbcode) {
					sbbc.selectedIndex = 0;
					sbbf.value += '[' + bbcode + bbvar + '][/' + bbcode + ']';
				} else {
					sbbc.value = '/' + sbbc.value;
					sbbf.value += '[' + bbcode + bbvar + ']';
				}
			}
		}
		if (sbbc.value != bbcode) {
			sbbc.selectedIndex = 0;
		}
		highlightText.text = '';
		sbbf.focus();	
	}	
}

$("#shoutpages a").each(function(){
	$(this).click(function(e){
		e.preventDefault();
		sbd.getElementById('shoutframe').src = this.href;
		return false;
	});
});

$(parent.document).find("#shoutpages a").each(function(){
	$(this).click(function(e){
		e.preventDefault();
		parent.sbd.getElementById('shoutframe').src = this.href;
		return false;
	});
});