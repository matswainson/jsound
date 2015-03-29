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
					   '<span class="jsound__artist">{{artist}}</span>' +
					   '<span class="jsound__title">{{title}}</span>' +
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
				current.children[0].innerHTML = sound.user.username;
				current.children[1].innerHTML = sound.title;
				current.children[3].setAttribute('style', 'background-image:url(' + (sound.artwork_url || sound.user.avatar_url) + ')');
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
								 .replace('bg', track.artwork_url || track.user.avatar_url);
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
