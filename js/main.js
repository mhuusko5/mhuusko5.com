var $window = $(window);
var $html = $('html');
var $body = $('body');
var $content = $('#content');
var $headerTitle = $('.header.title')
var $listItems = $('.header.navigation .list .item');
var $appList = $('#app-list');

$window.resize((function setRootUnit() {
    $html.css('font-size', Math.round((window.innerWidth - window.getScrollbarWidth()) / 100));
    return setRootUnit;
})());

$window.load(function() {
    var headerHidden = false;

    function hideHeaderTitle() {
        if (!headerHidden) {
            $content.animate({scrollTop: $headerTitle.height()}, 800);
        }
    }

    $content.scroll(function() {
        if (!headerHidden) {
            var scrolled = $content.scrollTop();
            if (scrolled >= $headerTitle.height()) {
                headerHidden = true;
                $headerTitle.css('display', 'none');
            }
        }
    });

    $('#view-holder .view').css('display', 'none');

    $body.animate({'opacity': 1.0}, 1000);

    $listItems.click(function(e) {
        if (!switchingView) {
            hideHeaderTitle();
            window.location.hash = '#' + e.currentTarget.id.replace('-button', '');
        }
    });

    $appList.mousewheel(function(e) {
        $appList.scrollLeft($appList.scrollLeft() - e.deltaY);
    });

    var switchingView = false;

    function switchView(viewName) {
        switchingView = true;

        var $activeView = $('#view-holder .view.active');
        if ($activeView.attr('id') == viewName) {
            return;
        }

        $listItems.removeClass('active');
        $('#' + viewName + '-button').addClass('active');

        $activeView.removeClass('active').animate({opacity: 0}, 300, null, function() {
            $activeView.css('display', 'none');
        });

        var $newView = $('#' + viewName + '-view');
        $newView.addClass('active').css('display', 'block')

        if (viewName == 'aboutme') {
            var aboutMeImages = [];
            for (var i = 1; i <= 7; i++) {
                aboutMeImages[i - 1] = 'img/aboutMe' + i + '.png';
            }
            blueimp.Gallery(aboutMeImages, {
                container: '#aboutme-images-container',
                carousel: true,
                slideshowInterval: 4000,
                stretchImages: true
            });
        }

        $newView.animate({opacity: 1}, 500, null, function() {
            switchingView = false;
        });
    }

    $window.bind('hashchange', (function handleNavigation() {
        var viewName = window.location.hash.substr(1);

        if (viewName == 'aboutme' || viewName == 'resume' || viewName == 'presence' || viewName == 'gestr' || viewName == 'ione' || viewName == 'tapr' || viewName == 'kemari' || viewName == 'buzzkill') {
            switchView(viewName);
        } else {
            setTimeout(function() {
                window.location.hash = '#' + 'aboutme';
            }, 100);
        }

        return handleNavigation;
    })());

    (function() {
        window.protocol = (document.location.protocol == 'https:' ? 'https:' : 'http:');

        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-43318814-4']);
        _gaq.push(['_trackPageview']);

        var ga = document.createElement('script');
        ga.type = 'text/javascript';
        ga.async = true;
        ga.src = ('https:' == window.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ga, s);
    })();
});