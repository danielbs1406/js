var oldButtons = new Array();
oldButtons[0] = ["sel", "align", ["center", "right", "left"], null, "Insert Align Text Tags"];
oldButtons[1] = ["si", " s ", null, "n", "Insert Strike Text (alt + s)"];
oldButtons[2] = ["si", "spoiler", null, null, "Insert Spoiler Tag (alt + p)"];

if(oldButtons.length > 0){
	for(var i = 0; i < oldButtons.length; i++){
		var name = oldButtons[i][1].toUpperCase().replace(/\s/g, '');
		var args = oldButtons[i][3];
		var textStat = oldButtons[i][4];
		newline_button = '';
		if(args != null && args.match('n')) {
			newline_button = '<br />';
		} 

		if(oldButtons[i][0] == "si"){ // simple input
			var bbcode = oldButtons[i][1].toUpperCase();
			if (oldButtons[i][2] != null)
				var value = oldButtons[i][2].toUpperCase();
			else var value = null;

			$(".pformright .codebuttons").last().after(newline_button + "<input type='button' value='" + bbcode + "' onmousedown='insertTag(\"" + name + "\"," + value + ")' class='codebuttons' name='" + name + "' id='" + name + "' onmouseover=\"hstat_2('" + textStat + "')\" >");
		}
		if(oldButtons[i][0] == "sel"){ // select
			var select =  newline_button + "<select name='"+ name + "' id='"+ name + "' class='codebuttons' onmousedown='selectedText();' onchange='insertTag(\"" + name + "\", this.options[this.selectedIndex].value.toUpperCase() )' onmouseover=\"hstat_2('" + textStat + "')\" >";
            select = select + "<option value='0'>" + oldButtons[i][1].toUpperCase() + "</option>";
            for(var j = 0; j < oldButtons[i][2].length; j++){
                var select = select + "<option value='"+oldButtons[i][2][j]+"'>"+oldButtons[i][2][j].toUpperCase()+"</option>";
            }
            select = select + "</select>";
            $(".pformright .codebuttons").last().after(select);
		}           
	}
} 

for(var i = 0; i <= 5; i++){ // replace only the 6 main bbcodes "B, U, I, FONT, SIZE, COLOR"
	var item = $(".pformright .codebuttons")[i];
	if($(item).is("select")){
		$(item).attr('onchange','');
		$(item).attr('name', $(item).attr("name").substring(1).toUpperCase());
		$(item).mousedown(function(){
			selectedText();
		});	
		$(item).change(function(){
			insertTag($(this).attr("name"), this.options[this.selectedIndex].value);			
		});
	}
	else{
		$(item).attr('onclick','');
		$(item).attr('accesskey','');
		$(item).mousedown(function(){
			insertTag($(this).attr("name"));
		});	
	}	

}

function selectedText(){
	if (document.getSelection && document.getSelection().toString().length > 0) {
		selectedText.text = document.getSelection().toString();
		var text = document.getElementsByName('Post')[0];
		selectedText.start = text.selectionStart;
		selectedText.end = text.selectionEnd;
	} else if (document.selection && document.selection.createRange().length > 0) {
		selectedText.text = document.selection.createRange().text;
		var text = document.getElementsByName('Post')[0];
		selectedText.start = text.selectionStart;
		selectedText.end = text.selectionEnd;
	}
	if(selectedText.text == undefined){
		selectedText.text = '';
	}
	return selectedText.text;
}

function insertTag(bbcode, variant) {
	if(variant != "NA"){
		var sbbt = selectedText();
		var sbbf = document.getElementsByName('Post')[0];
		var sbbc = document.getElementsByName(bbcode.toUpperCase())[0];
		var sbb1 = sbbf.value.substring(0, selectedText.start);
		var sbb2 = sbbf.value.substring(selectedText.end);
		var bbvar = '';
		if (variant != null) {
			bbvar = '\=' + variant;
		}
		if (sbbt != '') {
			sbbf.value = sbb1 + '[' + bbcode + bbvar + ']' + sbbt + '[/' + bbcode + ']' + sbb2;
		} else {
			if (sbbc.value.match('/')) {
				sbbc.value = sbbc.value.replace('/', '');
				sbbf.value += '[/' + bbcode + ']';
				popstack(bbtags, bbcode);
				cstat();
			} else {
				if (sbbc.value != bbcode && sbbc.value.replace(/\s/g, '') != bbcode) {
					sbbc.selectedIndex = 0;
					sbbf.value += '[' + bbcode + bbvar + '][/' + bbcode + ']';
				} else {
					sbbc.value = '/' + sbbc.value;
					sbbf.value += '[' + bbcode + bbvar + ']';
					pushstack(bbtags, bbcode);
					cstat();
				}
			}
		}
		selectedText.text = '';
		sbbf.focus();	
		if (sbbc.value != bbcode && sbbc.value.replace(/[\/\s]/g, '') != bbcode) {
			sbbc.selectedIndex = 0;
			var closeTag = '[/' + bbcode + ']';
			var pos = sbbf.value.length - closeTag.length;
			$(sbbf).setCursorPosition(pos);
		}
	}	
}


$.fn.setCursorPosition = function(start, end) {
	if(!end) end = start;
	this.each(function(index, elem) {
		if (elem.setSelectionRange) {
			elem.focus();
			elem.setSelectionRange(start, end);
		} else if (elem.createTextRange) {
			var range = elem.createTextRange();
			range.collapse(true);
			range.moveEnd('character', start);
			range.moveStart('character', end);
			range.select();
		}
	});
	return this;
};

shortcut = {
	'all_shortcuts':{},//All the shortcuts are stored in this array
	'add': function(shortcut_combination,callback,opt) {
		//Provide a set of default options
		var default_options = {
			'type':'keydown',
			'propagate':false,
			'disable_in_input':false,
			'target':document,
			'keycode':false
		}
		if(!opt) opt = default_options;
		else {
			for(var dfo in default_options) {
				if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
			}
		}

		var ele = opt.target;
		if(typeof opt.target == 'string') ele = document.getElementById(opt.target);
		var ths = this;
		shortcut_combination = shortcut_combination.toLowerCase();

		//The function to be called at keypress
		var func = function(e) {
			e = e || window.event;
			
			if(opt['disable_in_input']) { //Don't enable shortcut keys in Input, Textarea fields
				var element;
				if(e.target) element=e.target;
				else if(e.srcElement) element=e.srcElement;
				if(element.nodeType==3) element=element.parentNode;

				if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
			}
	
			//Find Which key is pressed
			if (e.keyCode) code = e.keyCode;
			else if (e.which) code = e.which;
			var character = String.fromCharCode(code).toLowerCase();
			
			if(code == 188) character=","; //If the user presses , when the type is onkeydown
			if(code == 190) character="."; //If the user presses , when the type is onkeydown

			var keys = shortcut_combination.split("+");
			//Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
			var kp = 0;
			
			//Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
			var shift_nums = {
				"`":"~",
				"1":"!",
				"2":"@",
				"3":"#",
				"4":"$",
				"5":"%",
				"6":"^",
				"7":"&",
				"8":"*",
				"9":"(",
				"0":")",
				"-":"_",
				"=":"+",
				";":":",
				"'":"\"",
				",":"<",
				".":">",
				"/":"?",
				"\\":"|"
			}
			//Special Keys - and their codes
			var special_keys = {
				'esc':27,
				'escape':27,
				'tab':9,
				'space':32,
				'return':13,
				'enter':13,
				'backspace':8,
	
				'scrolllock':145,
				'scroll_lock':145,
				'scroll':145,
				'capslock':20,
				'caps_lock':20,
				'caps':20,
				'numlock':144,
				'num_lock':144,
				'num':144,
				
				'pause':19,
				'break':19,
				
				'insert':45,
				'home':36,
				'delete':46,
				'end':35,
				
				'pageup':33,
				'page_up':33,
				'pu':33,
	
				'pagedown':34,
				'page_down':34,
				'pd':34,
	
				'left':37,
				'up':38,
				'right':39,
				'down':40,
	
				'f1':112,
				'f2':113,
				'f3':114,
				'f4':115,
				'f5':116,
				'f6':117,
				'f7':118,
				'f8':119,
				'f9':120,
				'f10':121,
				'f11':122,
				'f12':123
			}
	
			var modifiers = { 
				shift: { wanted:false, pressed:false},
				ctrl : { wanted:false, pressed:false},
				alt  : { wanted:false, pressed:false},
				meta : { wanted:false, pressed:false}	//Meta is Mac specific
			};
                        
			if(e.ctrlKey)	modifiers.ctrl.pressed = true;
			if(e.shiftKey)	modifiers.shift.pressed = true;
			if(e.altKey)	modifiers.alt.pressed = true;
			if(e.metaKey)   modifiers.meta.pressed = true;
                        
			for(var i=0; k=keys[i],i<keys.length; i++) {
				//Modifiers
				if(k == 'ctrl' || k == 'control') {
					kp++;
					modifiers.ctrl.wanted = true;

				} else if(k == 'shift') {
					kp++;
					modifiers.shift.wanted = true;

				} else if(k == 'alt') {
					kp++;
					modifiers.alt.wanted = true;
				} else if(k == 'meta') {
					kp++;
					modifiers.meta.wanted = true;
				} else if(k.length > 1) { //If it is a special key
					if(special_keys[k] == code) kp++;
					
				} else if(opt['keycode']) {
					if(opt['keycode'] == code) kp++;

				} else { //The special keys did not match
					if(character == k) kp++;
					else {
						if(shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
							character = shift_nums[character]; 
							if(character == k) kp++;
						}
					}
				}
			}
			
			if(kp == keys.length && 
						modifiers.ctrl.pressed == modifiers.ctrl.wanted &&
						modifiers.shift.pressed == modifiers.shift.wanted &&
						modifiers.alt.pressed == modifiers.alt.wanted &&
						modifiers.meta.pressed == modifiers.meta.wanted) {
				callback(e);
	
				if(!opt['propagate']) { //Stop the event
					//e.cancelBubble is supported by IE - this will kill the bubbling process.
					e.cancelBubble = true;
					e.returnValue = false;
	
					//e.stopPropagation works in Firefox.
					if (e.stopPropagation) {
						e.stopPropagation();
						e.preventDefault();
					}
					return false;
				}
			}
		}
		this.all_shortcuts[shortcut_combination] = {
			'callback':func, 
			'target':ele, 
			'event': opt['type']
		};
		//Attach the function with the event
		if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);
		else if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func);
		else ele['on'+opt['type']] = func;
	},

	//Remove the shortcut - just specify the shortcut and I will remove the binding
	'remove':function(shortcut_combination) {
		shortcut_combination = shortcut_combination.toLowerCase();
		var binding = this.all_shortcuts[shortcut_combination];
		delete(this.all_shortcuts[shortcut_combination])
		if(!binding) return;
		var type = binding['event'];
		var ele = binding['target'];
		var callback = binding['callback'];

		if(ele.detachEvent) ele.detachEvent('on'+type, callback);
		else if(ele.removeEventListener) ele.removeEventListener(type, callback, false);
		else ele['on'+type] = false;
	}
}

shortcut.add("alt+b", function() {
	var elem = $(".pformright .codebuttons[name='B']")[0];
	insertTag(elem.name)	
}); 
shortcut.add("alt+i", function() {
	var elem = $(".pformright .codebuttons[name='I']")[0];
	insertTag(elem.name)
});   
shortcut.add("alt+u", function() {
	var elem = $(".pformright .codebuttons[name='U']")[0];
	insertTag(elem.name)	
}); 


// funcao para inserir efeito show/hidden do spoiler
var show_spoil = function (ele, e) {
    if (e.preventDefault) {
        e.preventDefault();
    } else {
        e.returnValue = false;
    }

    var j = ele.nextSibling;
    if (j.style.display === 'none') {
        j.style.display = 'block';
    } else {
        j.style.display = 'none';
    }
};

/*(function () {
    var b = document.getElementsByClassName('postcolor'), c = b.length;
    while (c--) {
		b[c].innerHTML = b[c].innerHTML.replace('/\[\/?spoiler/gim', function(tag){
			return tag.toUpperCase();
		});
		if (b[c].innerHTML.indexOf('[SPOILER') !== -1) {
				b[c].innerHTML = b[c].innerHTML.replace('/\[SPOILER(?:=(.+?))?\](.|[^]+?)\[\/SPOILER\]/gim', function (total, title, inside) {
				return "<input type='button' value='" + (title || "Spoiler") + "' class='forminput spoil_button' onclick='show_spoil(this, event)' /><span class='spoil_context' style='display:none'><hr />" + 
					inside + "<hr /></span>";
			});
		}
	}
})();
*/

var customButtons =  new Array();
//customButtons = ["name", "bbcode", "wrapHTML", "numArgs", "evalCallback"];
customButtons[0] = ["img", "img", "<img src='<% INNER %>' style='width: <% VAR1 %>px; height: <% VAR2 %>px; float: <% VAR3 %>;' />", "3,2,1", ""];
customButtons[1] = ["spoiler", "spoiler", "<div><input type='button' value='<% VAR1 %>' class='forminput spoil_button' onclick='show_spoil(this, event)' /><div class='spoil_context' style='display:none'><hr /><% INNER %><hr /></div></div>", "1,0", ""];
customButtons[2] = ["hr", "hr", "<hr style='color: <% VAR1 %>; width: <% VAR2 %>%; margin: 6 0 6 0;' align='<% VAR3 %>' />", "1,2,3", ""];
//customButtons[3] = ["table", "table", "<table border='<% VAR1 %>' width='<% VAR2 %>%' align='center'><% INNER %></table>", "0,1,2", ""];
//customButtons[4] = ["tr", "tr", "<tr><% INNER %></tr>", "0,1", ""];
//customButtons[5] = ["td", "td", "<td><% INNER %></td>", "0,1,2", ""];
//customButtons[3] = ["note", "note", "<a href='./#<% VAR1 %>' name='<% VAR2 %>'><sup>[<% INNER %>]</sup></a>", "2", ""];

convertTag();

// correção Spoiler sem nome
$(".spoil_button").each(function(){
	if($(this).val() == ''){
		$(this).val("Spoiler");
	}
});

function convertTag() { 
    var b = document.getElementsByClassName('postcolor'), c = b.length;
    while (c--) {
		for(i = 0; i < customButtons.length; i++){
			var name = customButtons[i][0].toLowerCase();
			var bbcode = customButtons[i][1].toUpperCase();
			var wrapHTML = customButtons[i][2];
			var varNumber = customButtons[i][3];
			var evalCallback = customButtons[i][4];
			var args = customButtons[i][5];
			
			var regexLowerCase = new RegExp ("\\[\\/?" + bbcode.toLowerCase(), 'gim');
			b[c].innerHTML = b[c].innerHTML.replace(regexLowerCase, function(tag){
				return tag.toUpperCase();
			});
			if (b[c].innerHTML.indexOf('[' + bbcode) !== -1) {
				
				if(varNumber.indexOf("0") !== -1) {
					var regex_variable = new RegExp ("\\[" + bbcode + "\\](.*?|\\s*)\\[\\/" + bbcode + "\\]","gim");
					if(b[c].innerHTML.match(regex_variable)) {
						var inner = '\$1';
						if(evalCallback != ''){
							inner = eval(evalCallback);
						}
						wrapHTML = wrapHTML.replace(/<% VAR(?:1)? %>/g, '').replace(/<% VAR(\d+) %>/gim, '');
						b[c].innerHTML = b[c].innerHTML.replace(regex_variable, wrapHTML = wrapHTML.replace(/<% INNER %>/g, inner));
					}
				}	 
				if(varNumber.indexOf("1") !== -1) {
					var regex_variable = new RegExp ("\\[" + bbcode + "=([^\\],]+?)\\](.*?|\\s*)\\[\\/" + bbcode + "\\]","gim");
					if(b[c].innerHTML.match(regex_variable)) {
						var var1 = '\$1';
						if(evalCallback != ''){
							var1 = eval(evalCallback);
						}
						b[c].innerHTML = b[c].innerHTML.replace(regex_variable, wrapHTML = wrapHTML.replace(/<% INNER %>/g, '\$2').replace(/<% VAR(?:1)? %>/g, var1));
					}
				} 
				if(varNumber.indexOf("-1") !== -1) {
					var regex_variable = new RegExp ("\\[" + bbcode + "\\]","gim");
					if(b[c].innerHTML.match(regex_variable)) {
						b[c].innerHTML = b[c].innerHTML.replace(regex_variable, wrapHTML);
					}
				}

				var arrayNumber = varNumber.split(",");
				var ind = arrayNumber.length;
				while(ind--){
					var valueInt = parseInt(arrayNumber[ind].replace(/\s/g, ''));
					if(valueInt > 1){
						regex_var_str = "([^\\],]+?),([^\\],]+?)";
						var j = valueInt-2;
						while(j--) { 
							regex_var_str += ",([^\\],]+?)";
						}
						var regex_variable = new RegExp ("\\[" + bbcode + "="+regex_var_str+"\\](.*?|\\s*)\\[\\/" + bbcode + "\\]","g");
						if(b[c].innerHTML.match(regex_variable)) {
							b[c].innerHTML = b[c].innerHTML.replace(regex_variable, wrapHTML = wrapHTML.replace(/<% INNER %>/g, '\$' + (valueInt+1)).replace(/<% VAR(?:1)? %>/g, '\$1').replace(/<% VAR(\d+) %>/gim, "$$$1") );
						}
					}	
				} 
			}
		}
    }
}

function hstat_2(text) { //Button of BB Code description put into little box
	$("input[name='helpbox']").val(text);
}

var a = document.getElementsByClassName("copyright")[0].lastChild;
a.innerHTML = a.innerHTML + "<div>Saint Seiya: The Chaotic Chronicles by Scy &middot; Skin modified by Scy</div>";
