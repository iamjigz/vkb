angular.module('vidyKb')
	.controller('imdbCtrl', function($scope) {

		var name = "codemzy";
		var url = "http://anyorigin.com/go?url=" + encodeURIComponent("http://www.imdb.com/title/tt5171438/?ref_=adv_li_tt");
		$.get(url, function(response) {
			console.log(response);
		});
	})
