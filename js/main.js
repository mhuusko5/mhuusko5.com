var $window = $(window);
var $html = $('html');
var $body = $('body');
var $content = $('#content');
var $headerTitle = $('.header.title')
var $listItems = $('.header.navigation .list .item');
var $appListLabel = $('#app-list-label');
var $appList = $('#app-list');

$window.resize((function setRootUnit() {
    var size = (window.innerWidth - window.getScrollbarWidth()) / 100;
    if (Math.floor(size) === 3) {
        size = 3;
    } else {
        size = Math.round(size);
    }
    $html.css('font-size', size);
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

    function scrollAppList(e) {
        e.preventDefault();
        $appList.scrollLeft($appList.scrollLeft() - e.deltaY);
    }

    $appList.mousewheel(scrollAppList);

    $appListLabel.mousewheel(scrollAppList);

    var switchingView = false;

    var loadedViews = {};

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

        if (viewName == 'aboutme' && !loadedViews['aboutme']) {
            loadedViews['aboutme'] = true;

            var aboutMeImages = [];
            for (var i = 1; i <= 7; i++) {
                aboutMeImages[i - 1] = 'img/aboutMe' + i + '.png';
            }
            blueimp.Gallery(aboutMeImages, {
                container: '#aboutme-images-container',
                carousel: true,
                slideshowInterval: 4000,
                startSlideshow: false,
                stretchImages: true,
                unloadElements: false,
                preloadRange: 1
            });
        } else if (viewName == 'gestr' && !loadedViews['gestr']) {
            loadedViews['gestr'] = true;

            if ('ontouchstart' in document.documentElement) {
                $('#gestr-video-container').append('<a href="//player.vimeo.com/video/85040520" class="mobile-video-mask"><img src="img/playIcon.svg"></a>');
            } else {
                $('#gestr-video-container').append('<iframe src="//player.vimeo.com/video/85040520" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
            }
        } else if (viewName == 'ione' && !loadedViews['ione']) {
            loadedViews['ione'] = true;

            if ('ontouchstart' in document.documentElement) {
                $('#ione-video-container').append('<a href="//player.vimeo.com/video/85051548" class="mobile-video-mask"><img src="img/playIcon.svg"></a>');
            } else {
                $('#ione-video-container').append('<iframe src="//player.vimeo.com/video/85051548" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
            }
        } else if (viewName == 'tapr' && !loadedViews['tapr']) {
            loadedViews['tapr'] = true;

            if ('ontouchstart' in document.documentElement) {
                $('#tapr-video-container').append('<a href="//player.vimeo.com/video/85051549" class="mobile-video-mask"><img src="img/playIcon.svg"></a>');
            } else {
                $('#tapr-video-container').append('<iframe src="//player.vimeo.com/video/85051549" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
            }
        } else if (viewName == 'kemari' && !loadedViews['kemari']) {
            loadedViews['kemari'] = true;

            if ('ontouchstart' in document.documentElement) {
                $('#kemari-video-container').append('<a href="//player.vimeo.com/video/85295911" class="mobile-video-mask"><img src="img/playIcon.svg"></a>');
            } else {
                $('#kemari-video-container').append('<iframe src="//player.vimeo.com/video/85295911" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
            }
        }

        $window.trigger('resize');

        $newView.animate({opacity: 1}, 500, null, function() {
            switchingView = false;
        });
    }

    setTimeout(function() {
        $window.bind('hashchange', (function handleNavigation() {
            var viewName = window.location.hash.substr(1);

            if (viewName == 'aboutme' || viewName == 'resume' || viewName == 'presence' || viewName == 'gestr' || viewName == 'ione' || viewName == 'tapr' || viewName == 'kemari' || viewName == 'buzzkill') {
                switchView(viewName);
            } else {
                switchView('aboutme');
            }

            return handleNavigation;
        })());
    }, 200);

    setTimeout(function() {
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-43318814-4']);
        _gaq.push(['_trackPageview']);

        var ga = document.createElement('script');
        ga.type = 'text/javascript';
        ga.async = true;
        ga.src = ('https:' == window.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ga, s);
    }, 5000);
});