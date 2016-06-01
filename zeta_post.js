// Post JavaScript
/*
 * Send the current post via AJAX to preview it in the browser
 */
function Preview(e) {
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
    // Deal with character encoding issues
    if ($('#c_post-preview').length || $('#c_post textarea').val() || $('#txt_quote').val()) {

        var quote = $('#txt_quote'),
        prepend_quote = quote.length && quote.val() ? "[quote]" + quote.val() + "[\/quote]" : "",
        xhr = typeof XMLHttpRequest !== 'undefined' ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

        xhr.open('POST', main_url + 'tasks/', true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.setRequestHeader("Accepts", "*/*");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (!$('#c_post-preview').length) {
                    $('#c_post').prepend("<div id='c_post-close'>[x]</div><div id='c_post-preview'></div>");
                    $('#c_post-close').click(function () {
                        $('#c_post-preview').add(this).fadeOut(function () {
                            $(this).remove();
                        });
                    }).css({
                        'float': 'right',
                        position: 'relative',
                        top: '2px',
                        right: '11px',
                        cursor: 'pointer'
                    }).attr('title', 'Close Preview');
                }
                $('#c_post-preview').html(xhr.responseText);
                $('#c_post-preview div.spoiler_toggle').click(function () {
                    $(this).next().toggle();
                });
            }
        };

        xhr.send($.param({ task: 5, post: prepend_quote + $("#c_post textarea").val() }));
    }
}
/*
 * Change the size of the posting textbox.
 * @param direction
 *      1 = Increase size
 *      0 = Decrease size
 */
function postSize($direction) {
    var $height = $("#c_post-text").height() - 50 + (100 * $direction);
    $height = ($height < 175) ? 175 : $height;
    $("#c_post-text").height($height);
};

/*
 * Add an additional file input box for uploads.
 * @param me
 *      The file input box that spawned the request
 */
function addFileInput($me) {
    var $files = $("input[type='file']", "#files_upload");
    if ($files.length == 10) { return; }
    if(window.FormData !== undefined)
    {
    	$($me).removeAttr("onchange");
    }
    else
    {
    $($me).removeAttr("onchange");
    var $newFile = $("<input type='file'>").attr({
        "name": "attach[]",
        "size": 30,
        "onchange": "addFileInput(this)"
    });
    $("#files_upload").append($newFile);
    }
};

/*
 * Show all emots in the emot box.
 */
function allEmots() {
    $.get(main_url + "keys/", function($txt) {
        $("#emot_list").remove();
        $("#emot_end").remove();
        $("#emot_wrap").append('<div id="emot_list">' + $txt + '</div>');
        $("#emot_list img").click(function() { emot($(this).attr("title")); });
        });
    if (typeof fixPNG == 'function') { fixPNG(); }
    return false;
};

/*
 * BBCode
 */
var zbValue={};
var zbTagsOpen=[];
var zbTagImage={};
var table_open = false, current_textarea = false;

function ZetaInsert(tStart, tEnd){
    // Selection functions
    function selMoz(){
        var b=rPost.selectionStart, e=rPost.selectionEnd, l=rPost.textLength, pVal=rPost.value, pTop=rPost.scrollTop;
        var beg=pVal.substring(0,b), sel=pVal.substring(b,e), end=pVal.substring(e,l), begL=beg.length;

        if( sel.length>0 ){ tStart += sel; }
        else{ tClosed=true; }

        rPost.value=beg + tStart + tEnd + end;
        rPost.setSelectionRange( (sel)? begL: begL + tStart.length + tEnd.length, begL + tStart.length + tEnd.length );
        if( 0<pTop ){ rPost.scrollTop=pTop; }
    };
    function selIE(){
        var sel=d.selection.createRange();

        if( sel.parentElement()!=rPost ){ selDefault(); return; }

        if( sel.text.length>0 ){ tStart += sel.text; }
        //else if( tStart==="" ){ tStart=tEnd; }
        else{ tClosed=true; }

        sel.text = tStart + tEnd;
        sel.collapse();
    };
    function selDefault(){
        if( tEnd!=="" ){ tClosed=true; }
        rPost.value += (tStart + tEnd);
    };

    var d=document, tClosed=false;
    tStart=tStart||""; tEnd=tEnd||"";
    if( !d.posting ){return;}
    var rPost = table_open && typeof current_textarea === 'number' ? $('#table_bbcode_generator textarea').eq(current_textarea)[0] : d.posting.post;

    rPost.focus();

    if( rPost.setSelectionRange ){ selMoz(); }
    else if( d.selection ){ selIE(); }
    else{ selDefault(); }

    rPost.focus();
    return tClosed;
};

function ZetaHelp(iTag){
    var dRep=document.posting, accel, aKey="";
    if( !dRep.helpbox ){ return; }
    accel=( navigator.userAgent.toLowerCase().indexOf("mac")<0 )? "Alt" : "Ctrl";
    if( dRep[iTag] && dRep[iTag].accessKey ){ aKey=" ( "+ accel +"+"+ dRep[iTag].accessKey.toUpperCase() +" ) "; }
    dRep.helpbox.value=( helpMsg[iTag] )? helpMsg[iTag]: iTag;
    if(dRep.accelbox){ dRep.accelbox.value=aKey; }
};

function ZetaPrompt($tag, $value){
    var $prompt = "";
    $value = $value || "";

    while ($prompt === "") {
        $prompt = prompt(promptMsg[$tag], $value);
        if ($prompt === null) { return null; }
        if (!checkURL($prompt, $value)) {
            alert(errorMsg[$tag]);
            $prompt="";
        }
    }

    return $prompt;
};

function checkURL($txt, $which){
    var $chk=false;
    if( !$txt ){ $chk=false; }
    switch( $which ){
        case "http://" : $chk = !($txt == $which || $txt.length < 4 || $txt.indexOf(".") < 0 ); break; // URL
        case "@"       : $chk = !($txt.indexOf("@") < 1 || $txt.length < 4); break; // Email address
        case 0         : $chk = (isNaN($txt)); break; // Number
        default        : $chk = ($txt.length > 0);
    }
    return $chk;
};

function ZetaTag(iTag, closeStyle, tValue, addTxt){
    var newTag=iTag.toLowerCase(), closeTag=iTag.toLowerCase(), vTag=ZetaValue(iTag);
    tValue=tValue||false; addTxt=addTxt||"";

    if( tValue ){ newTag += "="+ tValue; }

    /*if( vTag || ZetaCompare(vTag, tValue) ){
        for(var oLast=zbTagsOpen.length-1; oLast>=0; oLast--){
            if( zbTagsOpen[oLast]==iTag ){ break; }
        }
        while(zbTagsOpen[oLast]){ ZetaCloseLast(); }
    }
    if( !vTag || ( tValue && !ZetaCompare(vTag, tValue) ) ){*/
        //if( closeStyle ){ ZetaCloseStyles(); }
        //if(
        if(!closeStyle)
         ZetaInsert("["+ newTag +"]" + addTxt, "[/"+ closeTag +"]");
        else
         ZetaInsert("["+ newTag +"]" + addTxt, "");
        /*){
            zbTagsOpen[zbTagsOpen.length]=iTag;
            ZetaToggle(iTag, true, tValue);
            ZetaHelp("Clk2Cls");
        }
    }*/
};

function ZetaSelect(menu, iTag){
    var mVal=menu.options[menu.selectedIndex].value;
    if( mVal=="-" ){ return; }

    ZetaTag(iTag, false, mVal);
    menu.selectedIndex=0;
};

function ZetaURL(){
    var pURL=ZetaPrompt("URL", "http://");
    if( pURL===null ){ return; }
    var pTxt=ZetaPrompt("Title", "My Webpage");
    if( pURL && pTxt ){ ZetaInsert("[URL="+ pURL +"]"+ pTxt +"[/URL]"); }
};

function ZetaImage(){
    var tVal=ZetaPrompt("IMG", "http://");
    if( tVal ){ ZetaInsert("[IMG]"+ tVal +"[/IMG]"); }
};

function ZetaFlash(){
    var tVal=ZetaPrompt("FLASH", "http://");
    if( tVal===null ){ return; }
    var y=ZetaPrompt("FLASH_Y", "250");
    var x=ZetaPrompt("FLASH_X", "250");
    if( y===null ){ y=250; }
    if( x===null ){ x=250; }
    if( tVal ){ ZetaInsert("[FLASH="+x+","+y+"]"+ tVal +"[/FLASH]"); }
};

function ZetaEmail(){
    var tVal=ZetaPrompt("EMAIL", "@");
    if( tVal ){ ZetaInsert("[EMAIL]"+ tVal +"[/EMAIL]"); }
};

function ZetaList(bulletType){
    ZetaTag("List", false, bulletType, "\n[*]\n");
};

function ZetaListItem(){
    var $tag=ZetaValue("List");
//  ZetaCloseStyles();

    if(!$tag) {
        ZetaTag("List", false, "", "\n[*]");
    } else {
        ZetaInsert("\n[*]");
    }
};

function ZetaClass() {
    var class_prompt = prompt("Please enter a class to use");
    if (class_prompt) {
        ZetaInsert("[class=" + class_prompt + "]", "[/class]");
    }
}

function emot($tag){
    ZetaInsert("", " "+ $tag +" ");
};

function ZetaTable() {
    if (table_open) return;
    table_open = true;

    var generated = false, selected_text_good = false;

    function close() {
        $('#table_bbcode_generator').fadeOut(function () {
            $(this).remove();
            table_open = false;
            current_textarea = false;
            if (!generated && selected_text && selected_text_good) {
                ZetaInsert(selected_text);
            }
        });
    }

    $('textarea[name=post]').before("<table id='table_bbcode_generator'><thead><tr><th><h2>" +
            "<span class='right' id='table_bbcode_close' style='cursor:pointer'>[x]</span>Table BBCode Generator" +
        "</h2></th></tr></thead>" +
        "<tbody>" +
            "<tr id='row-IGNORE' class='row_adder'><td id='row-IGNORE-col-IGNORE' colspan='1'>" +
                "Title: <input type='text' id='title_table_input' />" +
                "<br />Header row: <input type='checkbox' id='header_row_table' /><br />" +
                "<button type='button' id='add_column'>+</button>&nbsp;" +
                "<button type='button' id='remove_column'>-</button>&nbsp;&nbsp;Columns" +
                "&nbsp;&nbsp;&nbsp;<button type='button' id='add_row'>+</button>&nbsp;" +
                "<button type='button' id='remove_row'>-</button>&nbsp;&nbsp;Rows" +
            "</td></tr>" +
            "<tr id='row-1' class='row_adder'><td id='row-1-col-1'><textarea style='width:100%; height:150px;'></textarea></td></tr>" +
            "<tr id='row-IGNORE-2' class='row_adder'><td id='row-IGNORE-col-IGNORE-2' colspan='1'>" +
                "<button type='button' id='generate_table'>Generate Table</button>" +
        "</tbody>" +
    "</table>");

    var cols = 1, rows = 1,
        selected_text = $('textarea[name=post]').getSelection().text; // uses getSelection plugin

    $('#add_column').click(function () {
        cols += 1;

        $('#table_bbcode_generator thead th').attr('colspan', cols);

        $('tr.row_adder').each(function () {
            var t = this.id.split('-');
            if (t[1] == 'IGNORE') {
                $('td:first', this).attr('colspan', cols);
            } else {
                $(this).append("<td id='row-" + t[1] + "-col-" + cols + "'><textarea style='width: 100%; height:150px;'></textarea></td>");
            }
        });
    });

    $('#remove_column').click(function () {
        if (cols > 1) {
            cols -= 1;
            $('tr.row_adder[id^=row-IGNORE] td:eq(1)').attr('colspan', cols);
            $('tr.row_adder').each(function () {
                if (this.id.split('-')[1] !== 'IGNORE') {
                    $('td:last', this).remove();
                }
            });
        }
    });

    $('#add_row').click(function () {
        rows += 1;

        var builder = [], to_add = cols;
        for (var i = 0; i < to_add; i++) {
            builder[builder.length] = ["<td id='row-", rows, "-col-", i, "'><textarea style='width: 100%; height:150px;'></textarea></td>"].join("");
        }
        builder = builder.join("");

        $('#row-IGNORE-2').before("<tr id='row-" + rows + "' class='row_adder'>" + builder + "</tr>");
    });

    $('#remove_row').click(function () {
        if (rows > 1) {
            rows -= 1;
            $('tr.row_adder:last').prev().remove();
        }
    });

    $('#table_bbcode_generator').delegate('textarea', 'focus', function () {
        current_textarea = $.inArray(this, $('#table_bbcode_generator textarea').toArray());
    });

    $('#generate_table').click(function () {
        var content = [];
        $('tr.row_adder textarea').each(function () {
            content[content.length] = this.value;
        });
        content = content.join("[c]");

        var header_row = $('#header_row_table').attr('checked') ? ', 1' : '';

        current_textarea = false;
        ZetaTag('table', false, cols + ',' + $('#title_table_input').val() + header_row, content);
        generated = true;

        close();
    });

    $('#table_bbcode_close').click(function () {
        close();
    });

    selected_text = selected_text.replace(/^\s|\s$/g, "");

    if (selected_text.indexOf('[table') === 0 && selected_text.indexOf('[/table]') === selected_text.length - 8) {
        if (selected_text.indexOf('[table', 1) === -1 && selected_text.lastIndexOf('[/table]', selected_text.length - 9) === -1) {
            var matches = /\[table=(\d+),(.+?)(?:,(.+?))?\](.+?)\[\/table\]/.exec(selected_text);
            if (matches[1] && matches[2] && matches[4]) {
                selected_text_good = true;
                // Remove the table from the textarea
                var textarea = $('textarea[name=post]')[0];

                if ('selectionStart' in textarea) {
                    textarea.value = textarea.value.substr(0, textarea.selectionStart) + textarea.value.substr(textarea.selectionEnd, textarea.value.length);
                } else if (document.selection) {
                    textarea.focus();
                    document.selection.createRange().text = "";
                }

                var num_of_columns = +matches[1],
                    separate_cells = matches[4].split('[c(=(.+?))?]'), // by Scy
                    num_of_rows = Math.ceil(separate_cells.length / num_of_columns);

                 // subtract 1 because one col/row already is there
                num_of_columns--;
                num_of_rows--;

                while (num_of_columns--) {
                    $('#add_column').click();
                }
                while (num_of_rows--) {
                    $('#add_row').click();
                }

                $('tr.row_adder textarea').each(function (i) {
                    this.value = separate_cells[i];
                });

                $('#title_table_input').val(matches[2]);
                $('#header_row_table').attr('checked', !!matches[3]);
            }
        }
    }
}

/*function ZetaCloseStyles(){
    var $last;
    for ($last = zbTagsOpen.length-1; $last >= 0; $last--) {
        if (zbTagsOpen[$last] == zbTagsOpen[$last].toUpperCase()) {
            ZetaCloseLast();
        } else {
            break;
        }
    }
};

function ZetaCloseAll(){
    while(zbTagsOpen.length > 0) {
        ZetaCloseLast();
    }
};

function ZetaCloseLast(){
    var rTag, dRep=document.posting;
    if( zbTagsOpen.length>0 ){
        rTag=zbTagsOpen.pop();
        ZetaInsert("", "[/"+ rTag.toLowerCase() +"]");
        if( zbValue[rTag] ){ ZetaToggle(rTag); }
        return rTag;
    }else{
        return null;
    }
};*/

/*function ZetaToggle(iTag, opened, tVal){
    var chk=opened||false, dRep=document.posting, vTag=ZetaValue(iTag);

    zbValue[iTag]=!(chk)? false: (tVal)? tVal : true;

    if( typeof(vTag)!="boolean" ){ iTag+=vTag; tVal=vTag; }
    else if( tVal ){ iTag+=tVal; }

//  if(zbTagImage[iTag]){ zbTagImage[iTag].className="tagbutton" + ((chk)? " enabled": "") }

    if( !dRep[iTag] ){ return; }
    if( dRep[iTag].type!="button" && dRep[iTag].type!="image" ){ return; }
//  dRep[iTag].innerHTML=( (tVal)? tVal: iTag ) + ( (chk)? "*": "" )
    dRep[iTag].className=((chk)? "btn_enabled": "");
};*/

function ZetaValue($tag){
    if(typeof(zbValue[$tag]) === undefined) {
        zbValue[$tag] = false;
    }

    return zbValue[$tag];
};

function ZetaCompare($one, $two){
    return (typeof($one) == typeof($two) && $one == $two);
};

/*
 * Shoutbox
 */
var lastMsgID = -1;
var shoutMsgs = [];
var lastGrab = 0;

function shoutGrab() {
    var newdate = new Date;
    if((newdate.getTime() - lastGrab) < 30000) {
        return false;
    }
    lastGrab = newdate.getTime();
    $.getJSON(
        main_url + "tasks/",
        { "task":8, "last":lastMsgID },
        function(json) {
            shoutUpdate(json);
        }
    );
    document.getElementById("shoutbox").scrollTop = 0;
    return false;
};

function shoutUpdate(json) {
    var sbx = $('#shoutbox'), archive = $('#sbx_archive tbody');
    if (json.error) {
        alert(json.error);
        return false;
    }

    shoutMsgs = shoutMsgs.concat(json.messages);

    while ((shoutMsgs.length) > 10) {
        shoutMsgs.splice(0,1);
    }

    if (sbx.length) {
        sbx.empty();

        $.each(shoutMsgs, function(i,v) {
            sbx.prepend("<li id='" + v.i + "'><dl><dt>" + v.t + "</dt><dd>" + v.a + ": " + v.m + "</dd></dl></li>")
        });

        $('li:odd', sbx).addClass('odd');
    } else if (archive.length) {
        archive.empty();

        $.each(shoutMsgs, function (i, v) {
            archive.prepend("<tr><td class='c_desc'>" + v.a + "\n<small>" + v.t + "</small></td><td>" + v.m + "</td></tr>");
        });

        $('tr:odd', archive).addClass('odd');
    }

    lastMsgID = json.last;
};

function shoutPost(msg) {
    var xc = $("#shoutxss").val();
    $.ajax({
        "type":"POST",
        "url":main_url + "tasks/",
        "data":{ "task":9, "msg":msg, "xc":xc, "last":lastMsgID },
        "dataType":"json",
        "success":function(json) { shoutUpdate(json); }
    });
};

function shoutDelete(id) {
    var xc = $("#shoutxss").val();
    $.ajax({
        "type":"POST",
        "url":main_url + "tasks/",
        "data":{ "task":10, "id":id, "xc":xc },
        "dataType":"json",
        "success":function(json) { lastMsgID = -1; shoutMsgs = []; shoutUpdate(json); }
    });
    return false;
};

/*
 * Main Runtime
 */
$(function() {
    $("#emot_list li").click(function() { emot($(this).children().attr("title")); });
    $("#emot_end").click(allEmots);
    $("#addpoll").click(function() {
        $("tr.pollsetup").show();
        return false;
    });
    $("#btn_preview").click(Preview);
    $("#shoutpost").submit(function() {
        var txt = $("#shoutpost :text");
        shoutPost(txt.val());
        txt.val('');
        return false;
    });
    $("#shoutrefresh").click(shoutGrab);
    $(document).ready(function(){
        dt = new Date();
        $("input[name=tm]").val(dt.toLocaleString());
    });
});
