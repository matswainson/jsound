var SC=SC||{};SC.Widget=function(n){function t(r){if(e[r])return e[r].exports;var o=e[r]={exports:{},id:r,loaded:!1};return n[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var e={};return t.m=n,t.c=e,t.p="",t(0)}([function(n,t,e){function r(n){return!!(""===n||n&&n.charCodeAt&&n.substr)}function o(n){return!!(n&&n.constructor&&n.call&&n.apply)}function i(n){return!(!n||1!==n.nodeType||"IFRAME"!==n.nodeName.toUpperCase())}function a(n){var t,e=!1;for(t in b)if(b.hasOwnProperty(t)&&b[t]===n){e=!0;break}return e}function s(n){var t,e,r;for(t=0,e=I.length;t<e&&(r=n(I[t]),r!==!1);t++);}function u(n){var t,e,r,o="";for("//"===n.substr(0,2)&&(n=window.location.protocol+n),r=n.split("/"),t=0,e=r.length;t<e&&t<3;t++)o+=r[t],t<2&&(o+="/");return o}function c(n){return n.contentWindow?n.contentWindow:n.contentDocument&&"parentWindow"in n.contentDocument?n.contentDocument.parentWindow:null}function l(n){var t,e=[];for(t in n)n.hasOwnProperty(t)&&e.push(n[t]);return e}function d(n,t,e){e.callbacks[n]=e.callbacks[n]||[],e.callbacks[n].push(t)}function E(n,t){var e,r=!0;return t.callbacks[n]=[],s(function(t){if(e=t.callbacks[n]||[],e.length)return r=!1,!1}),r}function f(n,t,e){var r,o,i=c(e);return!!i.postMessage&&(r=e.getAttribute("src").split("?")[0],o=JSON.stringify({method:n,value:t}),"//"===r.substr(0,2)&&(r=window.location.protocol+r),r=r.replace(/http:\/\/(w|wt).soundcloud.com/,"https://$1.soundcloud.com"),void i.postMessage(o,r))}function p(n){var t;return s(function(e){if(e.instance===n)return t=e,!1}),t}function h(n){var t;return s(function(e){if(c(e.element)===n)return t=e,!1}),t}function v(n,t){return function(e){var r=o(e),i=p(this),a=!r&&t?e:null,s=r&&!t?e:null;return s&&d(n,s,i),f(n,a,i.element),this}}function S(n,t,e){var r,o,i;for(r=0,o=t.length;r<o;r++)i=t[r],n[i]=v(i,e)}function R(n,t,e){return n+"?url="+t+"&"+g(e)}function g(n){var t,e,r=[];for(t in n)n.hasOwnProperty(t)&&(e=n[t],r.push(t+"="+("start_track"===t?parseInt(e,10):e?"true":"false")));return r.join("&")}function m(n,t,e){var r,o,i=n.callbacks[t]||[];for(r=0,o=i.length;r<o;r++)i[r].apply(n.instance,e);(a(t)||t===L.READY)&&(n.callbacks[t]=[])}function w(n){var t,e,r,o,i;try{e=JSON.parse(n.data)}catch(a){return!1}return t=h(n.source),r=e.method,o=e.value,(!t||A(n.origin)===A(t.domain))&&(t?(r===L.READY&&(t.isReady=!0,m(t,C),E(C,t)),r!==L.PLAY||t.playEventFired||(t.playEventFired=!0),r!==L.PLAY_PROGRESS||t.playEventFired||(t.playEventFired=!0,m(t,L.PLAY,[o])),i=[],void 0!==o&&i.push(o),void m(t,r,i)):(r===L.READY&&T.push(n.source),!1))}function A(n){return n.replace(Y,"")}var _,y,O,D=e(1),b=e(2),P=e(3),L=D.api,N=D.bridge,T=[],I=[],C="__LATE_BINDING__",k="http://wt.soundcloud.dev:9200/",Y=/^http(?:s?)/;window.addEventListener?window.addEventListener("message",w,!1):window.attachEvent("onmessage",w),n.exports=O=function(n,t,e){if(r(n)&&(n=document.getElementById(n)),!i(n))throw new Error("SC.Widget function should be given either iframe element or a string specifying id attribute of iframe element.");t&&(e=e||{},n.src=R(k,t,e));var o,a,s=h(c(n));return s&&s.instance?s.instance:(o=T.indexOf(c(n))>-1,a=new _(n),I.push(new y(a,n,o)),a)},O.Events=L,window.SC=window.SC||{},window.SC.Widget=O,y=function(n,t,e){this.instance=n,this.element=t,this.domain=u(t.getAttribute("src")),this.isReady=!!e,this.callbacks={}},_=function(){},_.prototype={constructor:_,load:function(n,t){if(n){t=t||{};var e=this,r=p(this),o=r.element,i=o.src,a=i.substr(0,i.indexOf("?"));r.isReady=!1,r.playEventFired=!1,o.onload=function(){e.bind(L.READY,function(){var n,e=r.callbacks;for(n in e)e.hasOwnProperty(n)&&n!==L.READY&&f(N.ADD_LISTENER,n,r.element);t.callback&&t.callback()})},o.src=R(a,n,t)}},bind:function(n,t){var e=this,r=p(this);return r&&r.element&&(n===L.READY&&r.isReady?setTimeout(t,1):r.isReady?(d(n,t,r),f(N.ADD_LISTENER,n,r.element)):d(C,function(){e.bind(n,t)},r)),this},unbind:function(n){var t,e=p(this);e&&e.element&&(t=E(n,e),n!==L.READY&&t&&f(N.REMOVE_LISTENER,n,e.element))}},S(_.prototype,l(b)),S(_.prototype,l(P),!0)},function(n,t){t.api={LOAD_PROGRESS:"loadProgress",PLAY_PROGRESS:"playProgress",PLAY:"play",PAUSE:"pause",FINISH:"finish",SEEK:"seek",READY:"ready",OPEN_SHARE_PANEL:"sharePanelOpened",CLICK_DOWNLOAD:"downloadClicked",CLICK_BUY:"buyClicked",ERROR:"error"},t.bridge={REMOVE_LISTENER:"removeEventListener",ADD_LISTENER:"addEventListener"}},function(n,t){n.exports={GET_VOLUME:"getVolume",GET_DURATION:"getDuration",GET_POSITION:"getPosition",GET_SOUNDS:"getSounds",GET_CURRENT_SOUND:"getCurrentSound",GET_CURRENT_SOUND_INDEX:"getCurrentSoundIndex",IS_PAUSED:"isPaused"}},function(n,t){n.exports={PLAY:"play",PAUSE:"pause",TOGGLE:"toggle",SEEK_TO:"seekTo",SET_VOLUME:"setVolume",NEXT:"next",PREV:"prev",SKIP:"skip"}}])
;(function($, SC){

	'use strict';

	$.jSound = function(el, options){

		var base = this;

		base.$el = $(el);
		base.defaultOptions = {
			mini: false,
			theme: 'light'
		};

		if (!base.$el.context) {
			base.$el = $('iframe');
			options = el;
		}

		base.options = $.extend({}, base.defaultOptions, options);

		var template = '<div class="jsound__current' + ((base.options.mini) ? ' jsound--mini' : '') + '">' +
					   '<div class="jsound__artist"><a href="#" target="_blank">{{artist}}</a></div>' +
					   '<div class="jsound__title"><a href="#" target="_blank">{{title}}</a></div>' +
					   '<div class="jsound__buttons">' +
					   '<button class="jsound__prev" type="button"></button>' +
					   '<button class="jsound__play" type="button"></button>' +
					   '<button class="jsound__next" type="button"></button>' +
					   '</div>' +
					   '<div class="jsound__background"></div>' +
					   '<div class="jsound__shade"></div>' +
					   '<div class="jsound__wave"><div></div></div>' +
					   '</div>';

		var templatePlaylist = '<li class="jsound__playlist__item" data-index="{{index}}">' +
							   '<span class="jsound__playlist__thumb" style="background-image:url(bg)"></span>' +
							   '<span class="jsound__playlist__title">{{title}}</span>' +
							   '</li>';

		function initSound(iframe){
			var audio = { id: iframe.getAttribute('src').match(/[0-9]/g).join(''), index: 0 },
				baseClass = 'jSound jSound_' + audio.id,
				jSound,
				soundcloud;

			function replaceHTML(){
				jSound = document.createElement('div');
				jSound.setAttribute('class', baseClass + ' jsound--hidden');
				jSound.innerHTML = template;
				iframe.parentNode.insertBefore(jSound, iframe);
				var current = jSound.getElementsByClassName('jsound__current')[0];
				current.parentNode.insertBefore(iframe, current);
			}

			function bindListeners(){
				var jBtns = jSound.getElementsByClassName('jsound__buttons')[0],
					percent = 0;
				soundcloud.bind(SC.Widget.Events.FINISH, function(){
					jBtns.children[1].setAttribute('class', 'jsound__play');
					percent = 0;
				});
				soundcloud.bind(SC.Widget.Events.PAUSE, function(){
					jBtns.children[1].setAttribute('class', 'jsound__play');
				});
				soundcloud.bind(SC.Widget.Events.PLAY, function(){
					jBtns.children[1].setAttribute('class', 'jsound__play jsound--pause');
				});
				if (audio.sounds.length > 1) {
					soundcloud.bind(SC.Widget.Events.FINISH, function(){
						if (audio.index + 1 !== audio.sounds.length) {
							audio.index = audio.index + 1;
						}
						setCurrentSound(audio.sounds[audio.index]);
					});
				}
				jBtns.children[0].addEventListener('click', function(){
					if (audio.index !== 0) {
						audio.index = audio.index - 1;
					}
					soundcloud.isPaused(function(paused){
						if (paused) {
							soundcloud.prev().pause();
						} else {
							soundcloud.prev();
						}
					});
					setCurrentSound(audio.sounds[audio.index]);
				});
				jBtns.children[2].addEventListener('click', function(){
					if (audio.index + 1 !== audio.sounds.length) {
						audio.index = audio.index + 1;
					}
					soundcloud.isPaused(function(paused){
						if (paused) {
							soundcloud.next().pause();
						} else {
							soundcloud.next();
						}
					});
					setCurrentSound(audio.sounds[audio.index]);
				});
				jBtns.children[1].addEventListener('click', function(){
					soundcloud.isPaused(function(paused){
						if (paused) {
							soundcloud.play();
						} else {
							soundcloud.pause();
						}
					});
				});
				var wave = jSound.getElementsByClassName('jsound__wave')[0];
				soundcloud.bind(SC.Widget.Events.PLAY_PROGRESS, function(progress){
					var position = Number(((progress.currentPosition / audio.duration) * 100).toFixed(1));
					if (position < percent || position > percent) {
						percent = position;
						wave.setAttribute('style', 'width: ' + percent + '%');
					}
				});
			}

			function setCurrentSound(sound, callback) {
				audio.duration = sound.duration;
				audio.waveform_url = sound.waveform_url;
				var current = jSound.getElementsByClassName('jsound__current')[0];
				current.children[0].children[0].setAttribute('href', sound.user.permalink_url);
				current.children[0].children[0].innerHTML = sound.user.username;
				current.children[1].children[0].setAttribute('href', sound.permalink_url);
				current.children[1].children[0].innerHTML = sound.title;
				current.children[3].setAttribute('style', 'background-image:url(' + (sound.artwork_url || sound.user && sound.user.avatar_url || '') + ')');
				current.children[5].children[0].setAttribute('style', 'background-image:url(' + sound.waveform_url + ')');
				if (callback) {
					callback();
				}
			}

			function clickPlaylistItem() {
				var index = parseInt(this.getAttribute('data-index'));
				audio.index = index;
				setCurrentSound(audio.sounds[index]);
				soundcloud.skip(index);
			}

			function bindPlaylistListeners() {
				var items = jSound.getElementsByClassName('jsound__playlist__item');
				for (var i = 0; i < items.length; i++) {
					items[i].addEventListener('click', clickPlaylistItem);
				}
			}

			function setPlaylist() {
				var playlist = document.createElement('ul'),
					innerHTML = '';
				baseClass = baseClass + ' jsound--playlist';
				jSound.setAttribute('class', baseClass);
				playlist.setAttribute('class', (base.options.theme === 'dark') ? 'jsound__playlist jsound--dark' : 'jsound__playlist');
				for (var i = 0; i < audio.sounds.length; i++) {
					var track = audio.sounds[i];
					innerHTML += templatePlaylist.replace('{{index}}', i)
								 .replace('{{title}}', track.title)
								 .replace('bg', track.artwork_url || track.user && track.user.avatar_url || '');
				}
				playlist.innerHTML = innerHTML;
				jSound.appendChild(playlist);
				bindPlaylistListeners();
			}

			function soundcloudReady() {
				soundcloud.bind('ready',function(){
					soundcloud.getSounds(function(sounds){
						audio.sounds = sounds;
						bindListeners();
						setCurrentSound(audio.sounds[0], function(){
							if (sounds.length > 1) {
								setPlaylist();
							} else {
								showPlayer();
							}
						});
					});
				});
			}

			function bindJCloud() {
				soundcloud = SC.Widget(iframe);
				replaceHTML();
				soundcloudReady();
			}

			function showPlayer(){
				jSound.setAttribute('class', baseClass);
			}

			bindJCloud();

		}

		base.init = function(){
			if (base.$el.length) {
				$.each(base.$el, function() {
					if (this.tagName !== 'IFRAME' || this.getAttribute('src').indexOf('soundcloud') === -1) return;
					initSound(this);
				});
			}
		};

		base.init();

	};

	$.fn.jSound = function(options){
		return this.each(function(){
			(new $.jSound(this, options));
		});
	};

})(jQuery, SC);
