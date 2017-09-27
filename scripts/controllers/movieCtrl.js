angular.module('vidyKb')
	.controller('movieCtrl', function($scope, $http, httpGet, $sce, $mdShowToast) {
		$scope.option = 'actor';
		$scope.movieLoaded = false;

		$scope.resetQuery = function() {
			$scope.query = '';
			$scope.movieLoaded = false;
		}

		$scope.getMovie = function(newValue) {
			$scope.movieLoaded = false;
			if (newValue !== undefined) {
				httpGet.getJson(`https://netflixroulette.net/api/api.php?${$scope.option}=${newValue}`)
					.then(function(res) {
						$scope.movies = (res.data.length > 1 ? res.data : [res.data]);
						$scope.movieLoaded = true;

					}).catch(function(res) {
						console.log('catch', res);
						$mdShowToast.show(res.data.message);
					});
			}
		}

	})
