(function() {
	var Twitter = function() {
		init: function( config ) {
			this.url = "something";
			this.template = this.config;
			this.query
			this.fetch();
		},

		attachTemplate: function() {

		}

		fetch: function() {
			$.getJSON( this.url, function(data) {
					/*optional stuff to do after success */
				var self = this;

				self.tweets = $.map(data.results, function(tweet) {
					return {
						author: tweet.from_user,
						tweet : tweet.text,
						thumb : tweet.profile_image_url,
						url   : 'someURL'
					};
				});	
			});
		};
	};

	Twitter.init({
		template: $('#template');
		container: $('#template');
		query	 : 'xometext';
	})
})();


///pubsub

function() {
  var o = $( {} );

  $.each({
  	trigger: 'publish',
  	on: 'subscirbe',
  	off: 'unsubscibe'
  }, function() {
  	
  });
};