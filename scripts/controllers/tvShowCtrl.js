angular.module('vidyKb')
	.controller('tvShowCtrl', function($scope, $http, httpGet, $sce) {
		$scope.$watch('query', function(newValue, oldValue) {
			$scope.pinnedShows = pinnedShows;
			$scope.showLoaded = false;
			$scope.castLoaded = false;

			if (newValue !== undefined) {
				$scope.castLoaded = false;

				httpGet.getJson(`http://api.tvmaze.com/search/shows?q=${newValue}`)
					.then(function(res) {
						$scope.shows = res.data;
						$scope.showLoaded = true;

					}).catch(function(res) {
						console.log('catch', res);
					});
			} else {
				$scope.showLoaded = false;
			}
		})

		$scope.getCast = function(showName, showlink) {
			$scope.castLoaded = false;

			httpGet.getJson(`${showlink}/cast`)
				.then(function(res) {
					$scope.title = showName;
					$scope.casts = res.data;
					$scope.castLoaded = true;

				}).catch(function(res) {
					console.log('catch', res);
				});
		}

		$scope.pinShow = function(data) {
			$scope.pinnedShows.push({
				'name': data.show.name,
				'image': data.show.image.medium,
				'url': data.show._links.self.href
			})
		}

		$scope.unpinShow = function(url) {
			$scope.pinnedShows = $scope.pinnedShows.filter(show => show.url !== url)
		}

	})
