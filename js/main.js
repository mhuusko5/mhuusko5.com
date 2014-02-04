var $window = $(window);
var $html = $('html');
var $body = $('body');
var $content = $('#content');
var $headerTitle = $('.header.title')
var $listItems = $('.header.navigation .list .item');
var $infoList = $('#info-list');
var $toggleAppList = $('#toggle-app-list');

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
    function isMobile() {
        return ('ontouchstart' in document.documentElement);
    }

    $('#view-holder .view').css('display', 'none');

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

    $listItems.click(function(e) {
        if (!switchingView) {
            hideHeaderTitle();
            window.location.hash = '#' + e.currentTarget.id.replace('-button', '');
        }
    });

    var showingAppList = false;
    var togglingAppList = false;

    function toggleAppList() {
        if (togglingAppList) {
            return;
        }

        togglingAppList = true;

        if (!showingAppList) {
            var marginLeft = $infoList.parent().width() - parseFloat($html.css('font-size')) * 125.8;
            $infoList.animate({'margin-left': marginLeft + 'px'}, 400, function() {
                $infoList.css('margin-left', 'calc(100% - 125.8rem)');
                $toggleAppList.find('div').text('Hide Apps');
                showingAppList = true;
                togglingAppList = false;
            });
        } else {
            $infoList.animate({'margin-left': 0}, 400, function() {
                $toggleAppList.find('div').text('Show Apps');
                showingAppList = false;
                togglingAppList = false;
            });
        }
    }

    $toggleAppList.find('div').click(toggleAppList);

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

            $('.gestr-to-hide').click(function() {
                $('.gestr-to-hide').css('display', 'none');
                $('.gestr-to-show').css('display', 'block');
            });

            if (isMobile()) {
                $('#gestr-video-container').append('<a href="//player.vimeo.com/video/85040520" class="mobile-video-mask"><img src="img/playIcon.svg"></a>');
            } else {
                $('#gestr-video-container').append('<iframe src="//www.youtube.com/embed/8lCA9RnW7Jw?rel=0" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
                //$('#gestr-video-container').append('<iframe src="//player.vimeo.com/video/85040520" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
            }
        } else if (viewName == 'ione' && !loadedViews['ione']) {
            loadedViews['ione'] = true;

            if (isMobile()) {
                $('#ione-video-container').append('<a href="//player.vimeo.com/video/85051548" class="mobile-video-mask"><img src="img/playIcon.svg"></a>');
            } else {
                $('#ione-video-container').append('<iframe src="//player.vimeo.com/video/85051548" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
            }
        } else if (viewName == 'tapr' && !loadedViews['tapr']) {
            loadedViews['tapr'] = true;

            if (isMobile()) {
                $('#tapr-video-container').append('<a href="//player.vimeo.com/video/85051549" class="mobile-video-mask"><img src="img/playIcon.svg"></a>');
            } else {
                $('#tapr-video-container').append('<iframe src="//player.vimeo.com/video/85051549" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
            }
        } else if (viewName == 'kemari' && !loadedViews['kemari']) {
            loadedViews['kemari'] = true;

            if (isMobile()) {
                $('#kemari-video-container').append('<a href="//player.vimeo.com/video/85295911" class="mobile-video-mask"><img src="img/playIcon.svg"></a>');
            } else {
                $('#kemari-video-container').append('<iframe src="//player.vimeo.com/video/85295911" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
            }
        }

        $window.trigger('resize');

        $newView.animate({opacity: 1}, 500, null, function() {
            switchingView = false;
        });

        if ((showingAppList && (viewName == 'aboutme' || viewName == 'resume' || viewName == 'presence')) || (!showingAppList && (viewName == 'gestr' || viewName == 'ione' || viewName == 'tapr' || viewName == 'kemari' || viewName == 'buzzkill'))) {
            toggleAppList();
        }
    }

    $body.animate({'opacity': 1.0}, 1000);

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

    if (window.location.protocol != 'file:') {
        setTimeout(function() {
            (function(i, s, o, g, r, a, m) {
                i['GoogleAnalyticsObject'] = r;
                i[r] = i[r] || function() {
                    (i[r].q = i[r].q || []).push(arguments)
                }, i[r].l = 1 * new Date();
                a = s.createElement(o), m = s.getElementsByTagName(o)[0];
                a.async = 1;
                a.src = g;
                m.parentNode.insertBefore(a, m)
            })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

            ga('create', 'UA-47723827-1', 'mhuusko5.com');
            ga('send', 'pageview');

            (function trackOutbounds() {
                var hitCallbackHandler = function(url) {
                    window.location.href = url;
                };
                if (document.getElementsByTagName) {
                    var el = document.getElementsByTagName('a');
                    var getDomain = document.domain.split('.').reverse()[1] + '.' + document.domain.split('.').reverse()[0];
                    for (var i = 0; i < el.length; i++) {
                        var href = el[i].getAttribute('href');
                        if (!href) {
                            continue;
                        }
                        var myDomain = href.match(getDomain);
                        if ((href.match(/^https?\:/i) || href.match(/^http?\:/i)) && !myDomain) {
                            el[i].addEventListener('click', function(e) {
                                var url = this.getAttribute('href');
                                ga('send', 'event', 'outbound', 'click', url, {'hitCallback': hitCallbackHandler(url)}, {'nonInteraction': 1});
                                e.preventDefault();
                            });
                        }
                    }
                }
            })();
        }, 500);
    }
});