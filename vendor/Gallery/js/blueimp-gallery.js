(function(e){"use strict";if(typeof define==="function"&&define.amd){define(["./blueimp-helper"],e)}else{window.blueimp=window.blueimp||{};window.blueimp.Gallery=e(window.blueimp.helper||window.jQuery)}})(function(e){"use strict";function t(e,n){if(!e||!e.length||document.body.style.maxHeight===undefined){return null}if(!this||this.options!==t.prototype.options){return new t(e,n)}this.list=e;this.num=e.length;this.initOptions(n);this.initialize()}e.extend(t.prototype,{options:{container:"#blueimp-gallery",slidesContainer:"div",titleElement:"h3",displayClass:"blueimp-gallery-display",controlsClass:"blueimp-gallery-controls",singleClass:"blueimp-gallery-single",leftEdgeClass:"blueimp-gallery-left",rightEdgeClass:"blueimp-gallery-right",playingClass:"blueimp-gallery-playing",slideClass:"slide",slideLoadingClass:"slide-loading",slideErrorClass:"slide-error",slideContentClass:"slide-content",toggleClass:"toggle",prevClass:"prev",nextClass:"next",closeClass:"close",playPauseClass:"play-pause",typeProperty:"type",titleProperty:"title",urlProperty:"href",displayTransition:true,clearSlides:true,stretchImages:false,toggleControlsOnReturn:true,toggleSlideshowOnSpace:true,enableKeyboardNavigation:true,closeOnEscape:true,closeOnSlideClick:true,closeOnSwipeUpOrDown:true,emulateTouchEvents:true,hidePageScrollbars:true,disableScroll:true,carousel:false,continuous:true,unloadElements:true,startSlideshow:false,slideshowInterval:5e3,index:0,preloadRange:2,transitionSpeed:400,slideshowTransitionSpeed:undefined,event:undefined,onopen:undefined,onopened:undefined,onslide:undefined,onslideend:undefined,onslidecomplete:undefined,onclose:undefined,onclosed:undefined},carouselOptions:{hidePageScrollbars:false,toggleControlsOnReturn:false,toggleSlideshowOnSpace:false,enableKeyboardNavigation:false,closeOnEscape:false,closeOnSlideClick:false,closeOnSwipeUpOrDown:false,disableScroll:false,startSlideshow:true},support:function(t){var n={touch:window.ontouchstart!==undefined||window.DocumentTouch&&document instanceof DocumentTouch},r={webkitTransition:{end:"webkitTransitionEnd",prefix:"-webkit-"},MozTransition:{end:"transitionend",prefix:"-moz-"},OTransition:{end:"otransitionend",prefix:"-o-"},transition:{end:"transitionend",prefix:""}},i=function(){var e=n.transition,r,i;document.body.appendChild(t);if(e){r=e.name.slice(0,-9)+"ransform";if(t.style[r]!==undefined){t.style[r]="translateZ(0)";i=window.getComputedStyle(t).getPropertyValue(e.prefix+"transform");n.transform={prefix:e.prefix,name:r,translate:true,translateZ:!!i&&i!=="none"}}}if(t.style.backgroundSize!==undefined){n.backgroundSize={};t.style.backgroundSize="contain";n.backgroundSize.contain=window.getComputedStyle(t).getPropertyValue("background-size")==="contain";t.style.backgroundSize="cover";n.backgroundSize.cover=window.getComputedStyle(t).getPropertyValue("background-size")==="cover"}document.body.removeChild(t)};(function(e,n){var r;for(r in n){if(n.hasOwnProperty(r)&&t.style[r]!==undefined){e.transition=n[r];e.transition.name=r;break}}})(n,r);if(document.body){i()}else{e(document).on("DOMContentLoaded",i)}return n}(document.createElement("div")),requestAnimationFrame:window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame,initialize:function(){this.initStartIndex();if(this.initWidget()===false){return false}this.initEventListeners();this.onslide(this.index);this.ontransitionend();if(this.options.startSlideshow){this.play()}},slide:function(e,t){window.clearTimeout(this.timeout);var n=this.index,r,i,s;if(n===e||this.num===1){return}if(!t){t=this.options.transitionSpeed}if(this.support.transition){if(!this.options.continuous){e=this.circle(e)}r=Math.abs(n-e)/(n-e);if(this.options.continuous){i=r;r=-this.positions[this.circle(e)]/this.slideWidth;if(r!==i){e=-r*this.num+e}}s=Math.abs(n-e)-1;while(s){s-=1;this.move(this.circle((e>n?e:n)-s-1),this.slideWidth*r,0)}e=this.circle(e);this.move(n,this.slideWidth*r,t);this.move(e,0,t);if(this.options.continuous){this.move(this.circle(e-r),-(this.slideWidth*r),0)}}else{e=this.circle(e);this.animate(n*-this.slideWidth,e*-this.slideWidth,t)}this.onslide(e)},getIndex:function(){return this.index},getNumber:function(){return this.num},prev:function(){if(this.options.continuous||this.index){this.slide(this.index-1)}},next:function(){if(this.options.continuous||this.index<this.num-1){this.slide(this.index+1)}},play:function(e){var t=this;window.clearTimeout(this.timeout);this.interval=e||this.options.slideshowInterval;if(this.elements[this.index]>1){this.timeout=this.setTimeout(!this.requestAnimationFrame&&this.slide||function(e,n){t.animationFrameId=t.requestAnimationFrame.call(window,function(){t.slide(e,n)})},[this.index+1,this.options.slideshowTransitionSpeed],this.interval)}this.container.addClass(this.options.playingClass)},pause:function(){window.clearTimeout(this.timeout);this.interval=null;this.container.removeClass(this.options.playingClass)},add:function(e){var t;if(!e.concat){e=Array.prototype.slice.call(e)}if(!this.list.concat){this.list=Array.prototype.slice.call(this.list)}this.list=this.list.concat(e);this.num=this.list.length;if(this.num>2&&this.options.continuous===null){this.options.continuous=true;this.container.removeClass(this.options.leftEdgeClass)}this.container.removeClass(this.options.rightEdgeClass).removeClass(this.options.singleClass);for(t=this.num-e.length;t<this.num;t+=1){this.addSlide(t);this.positionSlide(t)}this.positions.length=this.num;this.initSlides(true)},resetSlides:function(){this.slidesContainer.empty();this.slides=[]},handleClose:function(){var e=this.options;this.destroyEventListeners();this.pause();this.container[0].style.display="none";this.container.removeClass(e.displayClass).removeClass(e.singleClass).removeClass(e.leftEdgeClass).removeClass(e.rightEdgeClass);if(e.hidePageScrollbars){document.body.style.overflow=this.bodyOverflowStyle}if(this.options.clearSlides){this.resetSlides()}if(this.options.onclosed){this.options.onclosed.call(this)}},close:function(){var e=this,t=function(n){if(n.target===e.container[0]){e.container.off(e.support.transition.end,t);e.handleClose()}};if(this.options.onclose){this.options.onclose.call(this)}if(this.support.transition&&this.options.displayTransition){this.container.on(this.support.transition.end,t);this.container.removeClass(this.options.displayClass)}else{this.handleClose()}},circle:function(e){return(this.num+e%this.num)%this.num},move:function(e,t,n){this.translateX(e,t,n);this.positions[e]=t},translate:function(e,t,n,r){var i=this.slides[e].style,s=this.support.transition,o=this.support.transform;i[s.name+"Duration"]=r+"ms";i[o.name]="translate("+t+"px, "+n+"px)"+(o.translateZ?" translateZ(0)":"")},translateX:function(e,t,n){this.translate(e,t,0,n)},translateY:function(e,t,n){this.translate(e,0,t,n)},animate:function(e,t,n){if(!n){this.slidesContainer[0].style.left=t+"px";return}var r=this,i=(new Date).getTime(),s=window.setInterval(function(){var o=(new Date).getTime()-i;if(o>n){r.slidesContainer[0].style.left=t+"px";r.ontransitionend();window.clearInterval(s);return}r.slidesContainer[0].style.left=(t-e)*(Math.floor(o/n*100)/100)+e+"px"},4)},preventDefault:function(e){if(e.preventDefault){e.preventDefault()}else{e.returnValue=false}},onresize:function(){this.initSlides(true)},onmousedown:function(e){if(e.which&&e.which===1&&e.target.nodeName!=="VIDEO"){(e.originalEvent||e).touches=[{pageX:e.pageX,pageY:e.pageY}];this.ontouchstart(e)}},onmousemove:function(e){if(this.touchStart){(e.originalEvent||e).touches=[{pageX:e.pageX,pageY:e.pageY}];this.ontouchmove(e)}},onmouseup:function(e){if(this.touchStart){this.ontouchend(e);delete this.touchStart}},onmouseout:function(t){if(this.touchStart){var n=t.target,r=t.relatedTarget;if(!r||r!==n&&!e.contains(n,r)){this.onmouseup(t)}}},ontouchstart:function(e){var t=(e.originalEvent||e).touches[0];this.touchStart={x:t.pageX,y:t.pageY,time:Date.now()};this.isScrolling=undefined;this.touchDelta={}},ontouchmove:function(e){var t=(e.originalEvent||e).touches[0],n=(e.originalEvent||e).scale,r=this.index,i,s;if(t.length>1||n&&n!==1){return}if(this.options.disableScroll){e.preventDefault()}this.touchDelta={x:t.pageX-this.touchStart.x,y:t.pageY-this.touchStart.y};i=this.touchDelta.x;if(this.isScrolling===undefined){this.isScrolling=this.isScrolling||Math.abs(i)<Math.abs(this.touchDelta.y)}if(!this.isScrolling){e.preventDefault();window.clearTimeout(this.timeout);if(this.options.continuous){s=[this.circle(r+1),r,this.circle(r-1)]}else{this.touchDelta.x=i=i/(!r&&i>0||r===this.num-1&&i<0?Math.abs(i)/this.slideWidth+1:1);s=[r];if(r){s.push(r-1)}if(r<this.num-1){s.unshift(r+1)}}while(s.length){r=s.pop();this.translateX(r,i+this.positions[r],0)}}else if(this.options.closeOnSwipeUpOrDown){this.translateY(r,this.touchDelta.y+this.positions[r],0)}},ontouchend:function(){var e=this.index,t=this.options.transitionSpeed,n=this.slideWidth,r=Number(Date.now()-this.touchStart.time)<250,i=r&&Math.abs(this.touchDelta.x)>20||Math.abs(this.touchDelta.x)>n/2,s=!e&&this.touchDelta.x>0||e===this.num-1&&this.touchDelta.x<0,o=!i&&this.options.closeOnSwipeUpOrDown&&(r&&Math.abs(this.touchDelta.y)>20||Math.abs(this.touchDelta.y)>this.slideHeight/2),u,a,f,l,c;if(this.options.continuous){s=false}u=this.touchDelta.x<0?-1:1;if(!this.isScrolling){if(i&&!s){a=e+u;f=e-u;l=n*u;c=-n*u;if(this.options.continuous){this.move(this.circle(a),l,0);this.move(this.circle(e-2*u),c,0)}else if(a>=0&&a<this.num){this.move(a,l,0)}this.move(e,this.positions[e]+l,t);this.move(this.circle(f),this.positions[this.circle(f)]+l,t);e=this.circle(f);this.onslide(e)}else{if(this.options.continuous){this.move(this.circle(e-1),-n,t);this.move(e,0,t);this.move(this.circle(e+1),n,t)}else{if(e){this.move(e-1,-n,t)}this.move(e,0,t);if(e<this.num-1){this.move(e+1,n,t)}}}}else{if(o){this.close()}else{this.translateY(e,0,t)}}},ontransitionend:function(e){var t=this.slides[this.index];if(!e||t===e.target){if(this.interval){this.play()}this.setTimeout(this.options.onslideend,[this.index,t])}},oncomplete:function(t){var n=t.target||t.srcElement,r=n&&n.parentNode,i;if(!n||!r){return}i=this.getNodeIndex(r);e(r).removeClass(this.options.slideLoadingClass);if(t.type==="error"){e(r).addClass(this.options.slideErrorClass);this.elements[i]=3}else{this.elements[i]=2}if(n.clientHeight>this.container[0].clientHeight){n.style.maxHeight=this.container[0].clientHeight}if(this.interval&&this.slides[this.index]===r){this.play()}this.setTimeout(this.options.onslidecomplete,[i,r])},onload:function(e){this.oncomplete(e)},onerror:function(e){this.oncomplete(e)},onkeydown:function(e){switch(e.which||e.keyCode){case 13:if(this.options.toggleControlsOnReturn){this.preventDefault(e);this.toggleControls()}break;case 27:if(this.options.closeOnEscape){this.close()}break;case 32:if(this.options.toggleSlideshowOnSpace){this.preventDefault(e);this.toggleSlideshow()}break;case 37:if(this.options.enableKeyboardNavigation){this.preventDefault(e);this.prev()}break;case 39:if(this.options.enableKeyboardNavigation){this.preventDefault(e);this.next()}break}},handleClick:function(t){var n=this.options,r=t.target||t.srcElement,i=r.parentNode,s=function(t){return e(r).hasClass(t)||e(i).hasClass(t)};if(s(n.toggleClass)){this.preventDefault(t);this.toggleControls()}else if(s(n.prevClass)){this.preventDefault(t);this.prev()}else if(s(n.nextClass)){this.preventDefault(t);this.next()}else if(s(n.closeClass)){this.preventDefault(t);this.close()}else if(s(n.playPauseClass)){this.preventDefault(t);this.toggleSlideshow()}else if(i===this.slidesContainer[0]){this.preventDefault(t);if(n.closeOnSlideClick){this.close()}else{this.toggleControls()}}else if(i.parentNode&&i.parentNode===this.slidesContainer[0]){this.preventDefault(t);this.toggleControls()}},onclick:function(e){if(this.options.emulateTouchEvents&&this.touchDelta&&(Math.abs(this.touchDelta.x)>20||Math.abs(this.touchDelta.y)>20)){delete this.touchDelta;return}return this.handleClick(e)},updateEdgeClasses:function(e){if(!e){this.container.addClass(this.options.leftEdgeClass)}else{this.container.removeClass(this.options.leftEdgeClass)}if(e===this.num-1){this.container.addClass(this.options.rightEdgeClass)}else{this.container.removeClass(this.options.rightEdgeClass)}},handleSlide:function(e){if(!this.options.continuous){this.updateEdgeClasses(e)}this.loadElements(e);if(this.options.unloadElements){this.unloadElements(e)}this.setTitle(e)},onslide:function(e){this.index=e;this.handleSlide(e);this.setTimeout(this.options.onslide,[e,this.slides[e]])},setTitle:function(e){var t=this.slides[e].firstChild.title,n=this.titleElement;if(n.length){this.titleElement.empty();if(t){n[0].appendChild(document.createTextNode(t))}}},setTimeout:function(e,t,n){var r=this;return e&&window.setTimeout(function(){e.apply(r,t||[])},n||0)},imageFactory:function(t,n){var r=this,i=this.imagePrototype.cloneNode(false),s=t,o=this.options.stretchImages,u,a,f=function(t){if(!u){t={type:t.type,target:a};if(!a.parentNode){return r.setTimeout(f,[t])}u=true;e(i).off("load error",f);if(o){if(t.type==="load"){a.style.background='url("'+s+'") center no-repeat';a.style.backgroundSize=o}}n(t)}},l;if(typeof s!=="string"){s=this.getItemProperty(t,this.options.urlProperty);l=this.getItemProperty(t,this.options.titleProperty)}if(o===true){o="contain"}o=this.support.backgroundSize&&this.support.backgroundSize[o]&&o;if(o){a=this.elementPrototype.cloneNode(false)}else{a=i;i.draggable=false}if(l){a.title=l}e(i).on("load error",f);i.src=s;return a},createElement:function(t,n){var r=t&&this.getItemProperty(t,this.options.typeProperty),i=r&&this[r.split("/")[0]+"Factory"]||this.imageFactory,s=t&&i.call(this,t,n);if(!s){s=this.elementPrototype.cloneNode(false);this.setTimeout(n,[{type:"error",target:s}])}e(s).addClass(this.options.slideContentClass);return s},loadElement:function(t){if(!this.elements[t]){if(this.slides[t].firstChild){this.elements[t]=e(this.slides[t]).hasClass(this.options.slideErrorClass)?3:2}else{this.elements[t]=1;e(this.slides[t]).addClass(this.options.slideLoadingClass);this.slides[t].appendChild(this.createElement(this.list[t],this.proxyListener))}}},loadElements:function(e){var t=Math.min(this.num,this.options.preloadRange*2+1),n=e,r;for(r=0;r<t;r+=1){n+=r*(r%2===0?-1:1);n=this.circle(n);this.loadElement(n)}},unloadElements:function(e){var t,n,r;for(t in this.elements){if(this.elements.hasOwnProperty(t)){r=Math.abs(e-t);if(r>this.options.preloadRange&&r+this.options.preloadRange<this.num){n=this.slides[t];n.removeChild(n.firstChild);delete this.elements[t]}}}},addSlide:function(e){var t=this.slidePrototype.cloneNode(false);t.setAttribute("data-index",e);this.slidesContainer[0].appendChild(t);this.slides.push(t)},positionSlide:function(e){var t=this.slides[e];t.style.width=this.slideWidth+"px";if(this.support.transition){t.style.left=e*-this.slideWidth+"px";this.move(e,this.index>e?-this.slideWidth:this.index<e?this.slideWidth:0,0)}},initSlides:function(t){var n,r;if(!t){this.positions=[];this.positions.length=this.num;this.elements={};this.imagePrototype=document.createElement("img");this.elementPrototype=document.createElement("div");this.slidePrototype=document.createElement("div");e(this.slidePrototype).addClass(this.options.slideClass);this.slides=this.slidesContainer[0].children;n=this.options.clearSlides||this.slides.length!==this.num}this.slideWidth=this.container[0].offsetWidth;this.slideHeight=this.container[0].offsetHeight;this.slidesContainer[0].style.width=this.num*this.slideWidth+"px";if(n){this.resetSlides()}for(r=0;r<this.num;r+=1){if(n){this.addSlide(r)}this.positionSlide(r)}if(this.options.continuous&&this.support.transition){this.move(this.circle(this.index-1),-this.slideWidth,0);this.move(this.circle(this.index+1),this.slideWidth,0)}if(!this.support.transition){this.slidesContainer[0].style.left=this.index*-this.slideWidth+"px"}},toggleControls:function(){var e=this.options.controlsClass;if(this.container.hasClass(e)){this.container.removeClass(e)}else{this.container.addClass(e)}},toggleSlideshow:function(){if(!this.interval){this.play()}else{this.pause()}},getNodeIndex:function(e){return parseInt(e.getAttribute("data-index"),10)},getNestedProperty:function(e,t){t.replace(/\[(?:'([^']+)'|"([^"]+)"|(\d+))\]|(?:(?:^|\.)([^\.\[]+))/g,function(t,n,r,i,s){var o=s||n||r||i&&parseInt(i,10);if(t&&e){e=e[o]}});return e},getDataProperty:function(t,n){if(t.getAttribute){var r=t.getAttribute("data-"+n.replace(/([A-Z])/g,"-$1").toLowerCase());if(typeof r==="string"){if(/^(true|false|null|-?\d+(\.\d+)?|\{[\s\S]*\}|\[[\s\S]*\])$/.test(r)){try{return e.parseJSON(r)}catch(i){}}return r}}},getItemProperty:function(e,t){var n=e[t];if(n===undefined){n=this.getDataProperty(e,t);if(n===undefined){n=this.getNestedProperty(e,t)}}return n},initStartIndex:function(){var e=this.options.index,t=this.options.urlProperty,n;if(e&&typeof e!=="number"){for(n=0;n<this.num;n+=1){if(this.list[n]===e||this.getItemProperty(this.list[n],t)===this.getItemProperty(e,t)){e=n;break}}}this.index=this.circle(parseInt(e,10)||0)},initEventListeners:function(){var t=this,n=this.slidesContainer,r=function(e){var n=t.support.transition&&t.support.transition.end===e.type?"transitionend":e.type;t["on"+n](e)};e(window).on("resize",r);e(document.body).on("keydown",r);this.container.on("click",r);if(this.support.touch){n.on("touchstart touchmove touchend",r)}else if(this.options.emulateTouchEvents&&this.support.transition){n.on("mousedown mousemove mouseup mouseout",r)}if(this.support.transition){n.on(this.support.transition.end,r)}this.proxyListener=r},destroyEventListeners:function(){var t=this.slidesContainer,n=this.proxyListener;e(window).off("resize",n);e(document.body).off("keydown",n);this.container.off("click",n);if(this.support.touch){t.off("touchstart touchmove touchend",n)}else if(this.options.emulateTouchEvents&&this.support.transition){t.off("mousedown mousemove mouseup mouseout",n)}if(this.support.transition){t.off(this.support.transition.end,n)}},handleOpen:function(){if(this.options.onopened){this.options.onopened.call(this)}},initWidget:function(){var t=this,n=function(e){if(e.target===t.container[0]){t.container.off(t.support.transition.end,n);t.handleOpen()}};this.container=e(this.options.container);if(!this.container.length){return false}this.slidesContainer=this.container.find(this.options.slidesContainer).first();if(!this.slidesContainer.length){return false}this.titleElement=this.container.find(this.options.titleElement).first();if(this.num===1){this.container.addClass(this.options.singleClass)}if(this.options.onopen){this.options.onopen.call(this)}if(this.support.transition&&this.options.displayTransition){this.container.on(this.support.transition.end,n)}else{this.handleOpen()}if(this.options.hidePageScrollbars){this.bodyOverflowStyle=document.body.style.overflow;document.body.style.overflow="hidden"}this.container[0].style.display="block";this.initSlides();this.container.addClass(this.options.displayClass)},initOptions:function(t){this.options=e.extend({},this.options);if(t&&t.carousel||this.options.carousel&&(!t||t.carousel!==false)){e.extend(this.options,this.carouselOptions)}e.extend(this.options,t);if(this.num<3){this.options.continuous=this.options.continuous?null:false}if(!this.support.transition){this.options.emulateTouchEvents=false}if(this.options.event){this.preventDefault(this.options.event)}}});return t})