(function ($) {
    var amount = '5';
    if (location.href.indexOf('/site') === -1 && location.href.indexOf('/search/?c=5') === -1) {
        $('div.category').last().before('<br/><div id="sidebar"><div id="portal"><div id="latest" class="portal_box"><h2>Últimas Postagens</h2></div><div></div>');
        $.get(main_url + 'search/?c=5&force_ads', function (data) {
			$(data).find('.forums').appendTo('#latest');
			$('#latest').find('.cat-topicpages').remove();
			$('#latest').find('.c_cat-starter').remove();
			$('#latest').find('.c_cat-views').remove();
			$('#latest').find('.c_cat-replies').remove();
			$('#latest').find('.c_cat-mark').remove();
			$('#latest').find('.c_cat-title > img').remove();

            $('#latest a[href*="/topic"]').wrap('<h4 />');
            $('#latest a[rel]').each(function () {
                $(this).next('a[href*="/profile"]').andSelf().wrapAll('<div class="portal_content" />');
                var next = $(this).next('a[href*="/profile"]');
                $(this).insertAfter(next).before('<br />Replies: ');
            });
            $.get(location.href);
        });
    }
})(jQuery);