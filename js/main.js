var $window = $(window);
var $html = $('html');
var $splashscreen = $('#splashscreen');
var $splashEnter = $('#splashEnter');
var $content = $('#content');
var $headerTitle = $('.header.title')
var $menuList = $('.header.navigation .list');
var $listItems = $('.header.navigation .list .item');
var $listAnchor = $('#aboutme-button');
var $listArrowLeft = $('#list-arrow-left');
var $listArrowRight = $('#list-arrow-right');
var $gestrDownloadCount = $('#gestr-download-count');
var $taprDownloadCount = $('#tapr-download-count');
var $gestrIosIphone = $('#gestr_ios-iphone');
var $gestrIosViewText = $('#gestr_ios-view-text');
var $spotThatArtistIphone = $('#spot_that_artist-iphone');
var $spotThatArtistViewText = $('#spot_that_artist-view-text');
var $fleetingIphone = $('#fleeting-iphone');
var $fleetingViewText = $('#fleeting-view-text');

if (window.location.hash.substr(1).length > 0) {
    $splashscreen.remove();
    $splashscreen = null;
} else {
    $splashscreen.css('background-image', 'url(img/splashBackground.png)');
    $content.css('display', 'none');
}

$window.resize((function setRootUnit() {
    var size = parseFloat($content.width()) / 100;

    if (Math.floor(size) === 3) {
        size = 3;
    } else {
        size = Math.round(size);
    }
    $html.css('font-size', size);
    return setRootUnit;
})());

$window.on('orientationchange', function() {
    var viewportmeta = document.querySelector('meta[name="viewport"]');
    viewportmeta.content = viewportmeta.content.replace(/width=[^,]+/, 'width=1');
    viewportmeta.content = viewportmeta.content.replace(/width=[^,]+/, 'width=device-width');
    $html.css('font-size', 1);
    $window.trigger('resize');
});

$window.load(function() {
    $('#view-holder .view').css('display', 'none');

    var headerHidden = false;

    function hideHeaderTitle() {
        if (!headerHidden) {
            headerHidden = true;

            $content.animate({scrollTop: $headerTitle.height()}, 800, function() {
                $headerTitle.css('display', 'none')
            });
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

    function fullListWidth() {
        var width = 0;
        $listItems.each(function(i, el) {
            width += parseFloat($(el).outerWidth());
        });
        return width;
    }

    function rightListOffset() {
        return -100 * fullListWidth() / $menuList.outerWidth() + 100;
    }

    var listPinned = '';
    var listOffset = 0;

    function renderListOffset() {
        if (listOffset <= rightListOffset()) {
            listPinned = 'right';
            listOffset = rightListOffset();
            $listAnchor.css('margin-left', 'calc(100% - ' + fullListWidth() / parseFloat($html.css('font-size')) + 'rem)');
        } else if (listOffset >= 0) {
            listPinned = 'left';
            listOffset = 0;
            $listAnchor.css('margin-left', 0);
        } else {
            listPinned = '';
            $listAnchor.css('margin-left', 'calc(50% - ' + (fullListWidth() / parseFloat($html.css('font-size'))) * 0.3466 + 'rem + ' + listOffset + '%)');
        }
    }

    function rightArrowAction() {
        if (listPinned == 'right') {
            return;
        }

        listOffset -= 0.5;
        renderListOffset();
    }

    function leftArrowAction() {
        if (listPinned == 'left') {
            return;
        }

        listOffset += 0.5;
        renderListOffset();
    }

    var arrowOn = isMobile() ? 'vmousedown touchstart' : 'mouseover';
    var arrowOff = isMobile() ? 'vmouseup touchend touchcancel' : 'mouseout';

    var rightArrowInterval = false;
    $listArrowRight.on(arrowOn, function() {
        clearInterval(rightArrowInterval);
        rightArrowInterval = setInterval(rightArrowAction, 20);
    });

    $listArrowRight.on(arrowOff, function() {
        clearInterval(rightArrowInterval);
        rightArrowInterval = false;
    });

    var leftArrowInterval = false;
    $listArrowLeft.on(arrowOn, function() {
        clearInterval(leftArrowInterval);
        leftArrowInterval = setInterval(leftArrowAction, 20);
    });

    $listArrowLeft.on(arrowOff, function() {
        clearInterval(leftArrowInterval);
        leftArrowInterval = false;
    });

    var switchingView = false;
    var currentView = null;
    var loadedViews = {};
    var headerMenuSet = false;

    function switchView(viewName) {
        if (viewName == currentView) {
            return;
        }

        switchingView = true;
        currentView = viewName;

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

            $('.gestr-to-show').click(function() {
                $('.gestr-to-show').css('display', 'none');
                $('.gestr-to-hide').css('display', 'block');
            });

            if (window.location.protocol != 'file:') {
                setInterval((function updateGestrDownloadCount() {
                    $.getJSON('https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyAt0NqySdGMJUamatdoAiUg748WGbdj5B4&shortUrl=http://goo.gl/Zc5C7B&projection=FULL', function(data) {
                        try {
                            var clicks = data.analytics.allTime.longUrlClicks;
                            if (clicks > 0) {
                                $gestrDownloadCount.text(clicks);
                            }
                        } catch (e) {
                        }
                    });

                    return updateGestrDownloadCount;
                })(), 30000);
            }

            if (isMobile()) {
                $('#gestr-video-container').append('<a href="//player.vimeo.com/video/85040520" class="mobile-video-mask"><img src="img/playIcon.svg"></a>');
            } else {
                $('#gestr-video-container').append('<iframe src="//player.vimeo.com/video/85040520" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
            }
        } else if (viewName == 'spot_that_artist' && !loadedViews['spot_that_artist']) {
            loadedViews['spot_that_artist'] = true;

            $window.resize((function resizeIphone() {
                $spotThatArtistIphone.width($spotThatArtistIphone.height() * 0.477);
                $spotThatArtistViewText.width(($content.width() - ($spotThatArtistIphone.width() * 1.3)) * 0.8);
                return resizeIphone;
            })());

            if (isMobile()) {
                $('#spot_that_artist-video-container').append('<a href="//player.vimeo.com/video/92540726" class="mobile-video-mask"><img src="img/playIcon.svg"></a>');
            } else {
                $('#spot_that_artist-video-container').append('<iframe src="//player.vimeo.com/video/92540726" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
            }
        } else if (viewName == 'fleeting' && !loadedViews['fleeting']) {
            loadedViews['fleeting'] = true;

            $window.resize((function resizeIphone() {
                $fleetingIphone.width($fleetingIphone.height() * 0.477);
                $fleetingViewText.width(($content.width() - ($fleetingIphone.width() * 1.3)) * 0.8);
                return resizeIphone;
            })());

            if (isMobile()) {
                $('#fleeting-video-container').append('<a href="//player.vimeo.com/video/89854562" class="mobile-video-mask"><img src="img/playIcon.svg"></a>');
            } else {
                $('#fleeting-video-container').append('<iframe src="//player.vimeo.com/video/89854562" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
            }
        } else if (viewName == 'gestr_ios' && !loadedViews['gestr_ios']) {
            loadedViews['gestr_ios'] = true;

            $window.resize((function resizeIphone() {
                $gestrIosIphone.width($gestrIosIphone.height() * 0.477);
                $gestrIosViewText.width(($content.width() - ($gestrIosIphone.width() * 1.3)) * 0.8);
                return resizeIphone;
            })());

            if (isMobile()) {
                $('#gestr_ios-video-container').append('<a href="//player.vimeo.com/video/86953023" class="mobile-video-mask"><img src="img/playIcon.svg"></a>');
            } else {
                $('#gestr_ios-video-container').append('<iframe src="//player.vimeo.com/video/86953023" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
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

            $('.tapr-to-hide').click(function() {
                $('.tapr-to-hide').css('display', 'none');
                $('.tapr-to-show').css('display', 'block');
            });

            $('.tapr-to-show').click(function() {
                $('.tapr-to-show').css('display', 'none');
                $('.tapr-to-hide').css('display', 'block');
            });

            if (window.location.protocol != 'file:') {
                setInterval((function updateTaprDownloadCount() {
                    $.getJSON('https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyAt0NqySdGMJUamatdoAiUg748WGbdj5B4&shortUrl=http://goo.gl/0yd82F&projection=FULL', function(data) {
                        try {
                            var clicks = data.analytics.allTime.longUrlClicks;
                            if (clicks > 0) {
                                $taprDownloadCount.text(clicks);
                            }
                        } catch (e) {
                        }
                    });

                    return updateTaprDownloadCount;
                })(), 30000);
            }

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

        if (!headerMenuSet) {
            headerMenuSet = true;

            if (viewName == 'ione' || viewName == 'tapr' || viewName == 'kemari' || viewName == 'buzzkill') {
                listOffset = rightListOffset();
                renderListOffset();
            }
        }

        $newView.animate({opacity: 1}, 500, null, function() {
            switchingView = false;
        });
    }

    function showContent() {
        setTimeout(function() {
            $window.bind('hashchange', (function handleNavigation() {
                var viewName = window.location.hash.substr(1);
                if (viewName.indexOf('?') > -1) {
                    viewName = viewName.substring(0, viewName.indexOf('?'));
                }

                var validViews = [
                    'aboutme', 'resume', 'presence', 'gestr', 'spot_that_artist', 'fleeting', 'gestr_ios', 'ione', 'tapr', 'kemari', 'buzzkill'
                ];

                if (validViews.indexOf(viewName) != -1) {
                    switchView(viewName);
                } else {
                    window.location.hash = '#' + validViews[0];
                }

                return handleNavigation;
            })());
        }, 200);

        $content.animate({'opacity': 1.0}, 1000, function() {
            if (window.innerWidth < window.innerHeight) {
                var widthInstruction;
                if (isMobile()) {
                    widthInstruction = 'please flip your device horizontally.'
                } else {
                    widthInstruction = 'please widen (or shorten?) your browser window.'
                }
                alert('This site is best viewed in landscape... ' + widthInstruction);
            }

            if (isMobile()) {
                $(window).bind('touchmove', function() {
                    hideHeaderTitle();
                });
            }
        });
    }

    if ($splashscreen) {
        $splashscreen.animate({'opacity': 1.0}, 500, function() {
            $splashEnter.click(function() {
                $splashscreen.animate({'opacity': 0.0}, 500, function() {
                    $splashscreen.remove();
                });

                $content.css('display', 'block');
                showContent();
            });
        });
    } else {
        showContent();
    }

    $window.trigger('resize');
});
