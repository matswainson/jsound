;(function($, SC){

	$.jSound = function(el, options){

		var base = this;

		base.$el = $(el);
		base.defaultOptions = {
			mini: false
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
					   '<button class="jsound__play" type="button"></button>' +
					   '</div>' +
					   '<div class="jsound__background" style="background-image:bg"></div>' +
					   '<div class="jsound__shade"></div>' +
					   '<div class="jsound__wave"><div style="background-image:wv"></div></div>' +
					   '</div>';

		function initSound(iframe){
			var audio = { id: iframe.getAttribute('src').match(/[0-9]/g).join('') },
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
				var percent = 0,
					playButton = jSound.getElementsByClassName('jsound__play')[0];

				soundcloud.bind(SC.Widget.Events.FINISH, function(){
					playButton.setAttribute('class', 'jsound__play');
					percent = 0;
				});
				soundcloud.bind(SC.Widget.Events.PAUSE, function(){
					playButton.setAttribute('class', 'jsound__play');
				});
				soundcloud.bind(SC.Widget.Events.PLAY, function(){
					playButton.setAttribute('class', 'jsound__play jsound--pause');
				});
				playButton.addEventListener('click', function(){
					soundcloud.isPaused(function(paused){
						if (paused) {
							soundcloud.play();
						} else {
							soundcloud.pause();
						}
					});
				});
				var wave = jSound.getElementsByClassName('jsound__wave')[0];
				soundcloud.bind(SC.Widget.Events.PLAY_PROGRESS, function(){
					soundcloud.getPosition(function(position){
						position = Number(((position / audio.duration) * 100).toFixed(1));
						if (position > percent) {
							percent = position;
							wave.setAttribute('style', 'background-image: url(' + audio.waveform_url + '); width: ' + percent + '%');
						}
					});
				});
			}

			function setTrack(sound) {
				audio.duration = sound.duration;
				audio.waveform_url = sound.waveform_url;
				var current = jSound.getElementsByClassName('jsound__current')[0];
				current.children[0].innerHTML = sound.user.username;
				current.children[1].innerHTML = sound.title;
				current.children[3].setAttribute('style', 'background-image:url(' + (sound.artwork_url || sound.user.avatar_url) + ')');
				current.children[5].children[0].setAttribute('style', 'background-image:url(' + sound.waveform_url + ')');
			}

			function soundcloudReady() {
				soundcloud.bind('ready',function(){
					soundcloud.getCurrentSound(function(sound){
						bindListeners();
						setTrack(sound);
						showPlayer();
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
