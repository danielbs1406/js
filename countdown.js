// By Cory
// http://s1.zetaboards.com/Cory/index/
// customized by Scy for Saint Seiya Chaotic Chronicles Forum

$(function () {
    if ($('textarea[name="post"]').length && blogCountdown === 1 && location.href.indexOf('/blog/') !== -1 || signatureCountdown === 1 && location.href.indexOf('/home/') !== -1 || postCountdown === 1 && location.href.indexOf('/post/') !== -1) {
        $('#main').append('<div id="countdown" style="display: none; position: fixed; top: 50%; left: 50%"><form action=""><table><tbody><tr><td class="c_desc">Counting down to<br /><span style="font-weight: 400; font-style:italic; font-size: 11px">Insert a title</span></td><td><input type="text" name="ctitle" /></td></tr><tr><td class="c_desc">Month<br /><span style="font-weight: 400; font-style:italic; font-size: 11px">A number from 1 and 12</span></td><td><input type="text" name="month" /></td></tr><tr><td class="c_desc">Date<br /><span style="font-weight: 400; font-style:italic; font-size: 11px">A number from 1 and 31</span></td><td><input type="text" name="date" /></td></tr><tr><td class="c_desc">Hours<br /><span style="font-weight: 400; font-style:italic; font-size: 11px">A number from 0 and 23</span></td><td><input type="text" name="hours" /></td></tr><tr><td class="c_desc">Minutes<br /><span style="font-weight: 400; font-style:italic; font-size: 11px">A number from 0 and 59</span></td><td><input type="text" name="minutes" /></td></tr><tr><td colspan="2" class="c"><button type="button" id="submitCount">Submit</button><span id="close_countdown" class="right" style="padding-top: 2px; cursor: pointer">Close</span></td></tr></tbody></table></form></div>');

        var width = $('#countdown').width() / 2;
        var height = $('#countdown').height() / 2;

        $('#countdown').css('margin', '-' + height + 'px 0 0 -' + width + 'px');

        $('#c_bbcode button:last').after(' <button type="button" name="countdown">Countdown</button>');

        $('button[name="countdown"]').click(function () {
            $('#countdown').fadeIn('slow');
        });

        $('#submitCount').click(function () {
            var title = $('input[name="ctitle"]').val();
            var month = $('input[name="month"]').val();
            var date = $('input[name="date"]').val();
            var hours = $('input[name="hours"]').val();
            var minutes = $('input[name="minutes"]').val();
            insertTag('countdown', title + ', ' + month + '/' + date + '/' + hours + ':' + minutes);
            $('#countdown').fadeOut('slow');
        });

        $('#close_countdown').click(function () {
            $('#countdown').fadeOut('slow');
        });
    }

/* old code	
	$('td:contains([countdown=):not(:has(textarea)), div.search_results:contains([countdown=), div.countdown_div, #blog blockquote:contains([countdown=)').each(function () {
        this.innerHTML = this.innerHTML.replace(/\[countdown=(.+?), (\d+)\/(\d+)\/(\d+):(\d+)\]/gi, function(total, evento, dia, mes, hora, minuto){
			return '<span class="countdown"><em>Counting down to' + evento + ': <span class="month"><span class="zero">0</span><span class="num">' + mes + '</span></span>/<span class="date"><span class="zero">0</span><span class="num">' + dia + '</span></span> <span class="hours"><span class="zero">0</span><span class="num' + hora + '">' + hora + '</span></span>:<span class="minutes"><span class="zero">0</span><span class="num">' + minuto + '</span></span> <span class="period">AM</span></em><hr style="margin: 3px 0" /><span class="count_body"><span class="c_date"></span> Days <span class="sep">/</span> <span class="c_hours"></span> Hours <span class="sep">/</span> <span class="c_minutes"></span> Minutes <span class="sep">/</span> <span class="c_seconds"></span> Seconds</span></span>';
		});
    });
*/
// code by Scy
	$(".pformstrip:contains('Post Preview')").next().find('.postcolor').each(function(){
		this.innerHTML = this.innerHTML.replace(/\[countdown=(.+?), (\d+)\/(\d+)\/(\d+):(\d+)\]/gi, function(total, evento, dia, mes, hora, minuto){
			return '<span class="countdown"><em>Contagem regressiva para ' + evento + ': <span class="date"><span class="zero">0</span><span class="num">' + dia + '</span></span>/<span class="month"><span class="zero">0</span><span class="num">' + mes + '</span></span> <span class="hours"><span class="zero">0</span><span class="num' + hora + '">' + hora + '</span></span>:<span class="minutes"><span class="zero">0</span><span class="num">' + minuto + '</span></span> <span class="period">AM</span></em><hr style="margin: 3px 0" /><span class="count_body"><span class="c_date"></span> Days <span class="sep">/</span> <span class="c_hours"></span> Hours <span class="sep">/</span> <span class="c_minutes"></span> Minutes <span class="sep">/</span> <span class="c_seconds"></span> Seconds</span></span>';
		});
	});
	
    function repeat() {
        if ($('span.countdown').length) {
            $('span.countdown').each(function () {
                if ($(this).find('span.c_hours span.num').text() === '0' && $(this).find('span.c_date span.num').text() === '0' && $(this).find('span.c_minutes span.num').text() === '0') {
                    $(this).find('span.count_body').html('<em>This countdown has ended</em>');
                } else {
                    var d = new Date();
                    var gm = d.getMonth() + 2;
                    var gd = d.getDate();
                    var gh = d.getHours();
                    var gmin = d.getMinutes();
                    var gs = 60 - d.getSeconds();
                    var emW = $(this).find('em').width();
                    var month = parseInt($(this).find('span.month span.num').text(), 10);
                    var date = parseInt($(this).find('span.date span.num').text() - gd, 10);
                    var pDate = parseInt($(this).find('span.date span.num').text(), 10);
                    var hours = parseInt($(this).find('span.hours span[class*="num"]').attr('class').split('num')[1], 10);
                    var minutes = parseInt($(this).find('span.minutes span.num').text(), 10);
                    var nMinutes = '0';
                    var nHours = '0';
                    var period;

                    $(this).find('span.sep').css({
                        'color': $(this).find('hr').css('color'),
                        'font-weight': '700'
                    });

                    var cHours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
                    var tHours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
					var overday = false;
                    
					for (var x = 0; x < cHours.length; x++) {
                        if (gh === cHours[x]) {
                            nHours = (hours / 2) * 2 - (gh + 1);
                            nMinutes = parseInt((minutes - gmin), 10);

                            if (tHours[x] && gd < pDate || month !== gm - 1) {
                                nHours = (24 - gh) + (hours - 1);
                            }

                            if (gmin > minutes) {
                                nMinutes = (60 - gmin) + minutes;
                            }
							
                            if (tHours[x] >= hours - 1 && hours) {
/*                                nHours = '0';
                                if (gmin > minutes) {
                                    nMinutes = '0';
                                }
*/								overday = true;
								
                            }

                            if (tHours[x] > hours && gd === pDate) {
                                nMinutes = '0';
                            }

                            if (gm - 1 === month && gd > pDate || month < gm - 1) {
                                nHours = '0';
                                nMinutes = '0';
                            }

                            if (nHours >= 24) {
                                nHours = nHours - 24;
                            }
                        }
                    }

                    if (hours >= 12) {
                        period = 'PM';
                    }

                    $(this).find('span.period').text(period);
                    $(this).find('hr').width(emW);
                    $(this).find('span.c_date').html('<span class="zero">0</span>' + '<span class="num">' + date + '</span>');
                    $(this).find('span.c_hours').html('<span class="zero">0</span>' + '<span class="num">' + nHours + '</span>');
                    $(this).find('span.c_minutes').html('<span class="zero">0</span>' + '<span class="num">' + nMinutes + '</span>');
                    $(this).find('span.c_seconds').html('<span class="zero">0</span>' + '<span class="num">' + gs + '</span>');

                    if ($(this).find('span.c_minutes span.num').text() === 0) {
                        var nHour = parseInt($(this).find('span.c_hours span.num').text() + 1, 10);
                        $(this).find('span.c_hours span.num').text(nHour);
                    }

                    if ($(this).find('span.month span.num').text() !== gm - 1) {
                        var mDiff = parseInt($(this).find('span.month span.num').text() - gm, 10);
                        var tDays = parseInt(30.4368 * mDiff, 10);
                        var dDays = parseInt(30.4368 - gd, 10);
                        var cDays = parseInt($(this).find('span.date span.num').text(), 10);
                        var tDate = parseInt(cDays + tDays + dDays, 10);
						if(overday) tDate--;
						
                        $(this).find('span.c_date').html('<span class="zero">0</span>' + '<span class="num">' + tDate + '</span>');
                    }

                    if (hours === 0 || hours === 12 && $(this).find('span.c_date span.num').text() > '0') {
                        var cDate = parseInt($(this).find('span.c_date').text(), 10);
                        var nDate = cDate - 1;
                        $(this).find('span.c_date').text(nDate);
                    }

                    $('span.zero').each(function () {
                        if ($(this).next('span[class*="num"]').text().length > 1) {
                            $(this).hide();
                        }

                        if (parseInt($(this).next('span[class*="num"]').text(), 10) < 0) {
                            $(this).next('span[class*="num"]').text('0');
                        }
                    });
                }
            });
        }
    }

    if (realtime === 1) {
        window.setInterval(repeat, 1000);
    } else {
        repeat();
        window.setTimeout(repeat, 1000);
    }

    function changeText(className, number) {
        $('span.countdown').each(function () {
            if ($(this).find('span.hours span[class*="num"]').attr('class') === className) {
                $(this).find('span.hours span[class*="num"]').text(number);
            }
        });
    }

    changeText('num13', '1');
    changeText('num14', '2');
    changeText('num15', '3');
    changeText('num16', '4');
    changeText('num17', '5');
    changeText('num18', '6');
    changeText('num19', '7');
    changeText('num20', '8');
    changeText('num21', '9');
    changeText('num22', '10');
    changeText('num23', '11');
    changeText('num0', '12');
});