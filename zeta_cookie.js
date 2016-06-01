if (typeof zeta_cookie === 'undefined') {
    var zeta_cookie = {
        path: function () {
            if (/(?:s|z)\d{1,2}\.zetaboards\.com/.test(main_url)) {
                return '/' + main_url.split(".com/")[1].split("/")[0];
            } else {
                return '/';
            }
        },

        set: function (name, value, expire, path) {
            var d;

            if (expire.constructor === String) {
                expire = parseInt(expire, 10);
            } 
            
            if (expire instanceof Date) {
                expire = expire.toGMTString();
            } else if (expire.constructor === Number) {
                d = new Date();
                d.setDate(d.getDate() + expire);
                expire = d.toGMTString();
            }

            path = this.path() + (path || '');

            document.cookie = name + '=' + escape(value) + '; ' +
                              'expires=' + expire + '; ' +
                              'path=' + path;
            
            return this.get(name) === value.toString();
        },

        get: function (name) {
            var d = document.cookie, i = d.indexOf(name + '='), j;
            if (i !== -1) {
                i += name.length + 1;

                j = d.indexOf(';', i);
                j = j === -1 ? d.length : j;

                return unescape(d.substring(i, j));
            }
            return '';
        },

        del: function (name) {
            this.set(name, -1, -1);
            return !this.get(name);
        }
    };
}


(function ($) {
    $(document).ready(function () {
        if (location.href.indexOf('/topic')) {
            var font_size = zeta_cookie.get('font_size');
            if (font_size) 
				$('td.c_post').css({ 'font-size': font_size + "px" });
            $('#topic_viewer > thead th, #topic_viewer > thead div.h2center').prepend('<div id="c_post-resize" style="padding: 0 10px; float: left;"><span class="increase" style="padding: 0 5px 0; font-size: 18px" title="Increase Post Font">+</span><span class="decrease" style="padding: 0 5px 0; font-size: 18px" title="Decrease Post Font">−</span></div>');

            $('span.increase').click(function () {
                var c_font_i = parseInt($('td.c_post').css('font-size').split('px')[0]) + 1;
                $('td.c_post').css('font-size', c_font_i);
                zeta_cookie.set('font_size', c_font_i, 365);
            });

            $('span.decrease').click(function () {
                var c_font_d = parseInt($('td.c_post').css('font-size').split('px')[0]) - 1;
                $('td.c_post').css('font-size', c_font_d);
                zeta_cookie.set('font_size', c_font_d, 365);
            });
        }
    });
})(jQuery);