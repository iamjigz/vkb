angular.module('vidyKb')
	.controller('themeCtrl', function($scope) {
		$scope.theme = 'default';
		$scope.changeTheme = function() {
			var themes = ['default', 'indigo', 'lime', 'orange', 'cyan', 'pink', 'brown'];
			var randomize = function(arr) {
				return arr[Math.floor(Math.random() * arr.length)];
			}

			$scope.theme = randomize(themes);
		};
	})
