;(function($, SC){

	$.jSound = function(el, options){

		var base = this;

		base.$el = $(el);
		base.defaultOptions = {};

		if (!base.$el.context) {
			base.$el = $('[data-cloud]');
			options = el;
		}

		base.options = $.extend({}, base.defaultOptions, options);

		var template = '<div class="jsound__current">' +
					   '<span class="jsound__artist">{{artist}}</span>' +
					   '<span class="jsound__title">{{title}}</span>' +
					   '<div class="jsound__buttons">' +
					   '<button class="jsound__play" type="button"></button>' +
					   '</div>' +
					   '<div class="jsound__background" style="background-image:bg"></div>' +
					   '<div class="jsound__shade"></div>' +
					   '<div class="jsound__wave" style="background-image:wv"></div>' +
					   '</div>' +
					   '<iframe class="iframe" width="100%" height="100" scrolling="no" frameborder="no" src="' +
					   'https://w.soundcloud.com/player/?url=http://api.soundcloud.com/{{url}}"></iframe>';

		function initPlayer(jsound, audio){
			var soundcloud;

			function replaceHTML(){
				var element = jsound.parentNode,
					html = document.createElement('div');
				html.setAttribute('class', 'jSound jSound_' + audio.id + ' jsound--hidden');
				html.innerHTML = template.replace('{{url}}', audio.url);
				element.replaceChild(html, jsound);
				jsound = document.getElementsByClassName('jSound_' + audio.id)[0];
				soundcloud = SC.Widget(html.getElementsByClassName('iframe')[0]);
			}

			function bindListeners(){
				var percent = 0,
					playButton = jsound.getElementsByClassName('jsound__play')[0];
				playButton.addEventListener('click', function(){
					soundcloud.isPaused(function(paused){
						if (paused) {
							soundcloud.play();
						} else {
							soundcloud.pause();
						}
					});
				});
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
				var wave = jsound.getElementsByClassName('jsound__wave')[0];
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

			function showPlayer(){
				jsound.setAttribute('class', 'jSound jSound_' + audio.id);
			}

			replaceHTML();
			soundcloud.bind(SC.Widget.Events.READY,function(){
				soundcloud.getCurrentSound(function(sound){
					audio.duration = sound.duration;
					audio.waveform_url = sound.waveform_url;
					var current = jsound.getElementsByClassName('jsound__current')[0];
					var innerHTML = current.innerHTML
						.replace('{{artist}}', sound.user.username)
						.replace('bg', 'url(' + (sound.artwork_url || sound.user.avatar_url) + ')')
						.replace('wv', 'url(' + sound.waveform_url + ')')
						.replace('{{title}}', sound.title);
					current.innerHTML = innerHTML;
					bindListeners();
					showPlayer();
				});
			});

		}

		base.init = function(){
			if (base.$el.length) {
				$.each(base.$el, function() {
					if (this.tagName !== 'DIV') return;
					var jsound = this,
						audio = {
							id: this.getAttribute('data-cloud').replace(/\D/g, '') + Math.floor((Math.random() * 10) + 1),
							url: this.getAttribute('data-cloud')
						};
					initPlayer(jsound, audio);
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
