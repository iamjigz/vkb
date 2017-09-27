angular.module('vidyKb', ['ngMaterial', 'ngResource', 'ngAnimate', 'ui.router'])
	.controller('appCtrl', function($scope, $mdDialog, $mdShowToast) {
		$scope.isAuth = false;
		$scope.fabOpen = false;

		$scope.authenticate = function() {
			let auth = $scope.auth;
			if (auth.user != 'iamvidy' && auth.pass != 'iamvidy') {
				$mdShowToast.show('Incorrect username or password');
			} else {
				$mdShowToast.show('You are authenticated');
				$scope.isAuth = true;
				$mdDialog.hide();
			}
		}

		$scope.showModal = function(ev) {
			function DialogController($scope, $mdDialog) {
				$scope.hide = function() {
					$mdDialog.hide();
				};

				$scope.cancel = function() {
					$mdDialog.cancel();
				};
			}

			$mdDialog.show({
				controller: DialogController,
				templateUrl: 'partials/modal.html',
				parent: angular.element(document.body),
				scope: $scope,
				preserveScope: true,
				targetEvent: ev,
				clickOutsideToClose: true,
				fullscreen: $scope.customFullscreen
			})
		};
	})

	.service('httpGet', function($http) {
		return {
			getJson: function(link) {
				return $http.get(link.replace(/\s/ig, "%20"), {
					headers: {
						'Accept': 'application/json'
					}
				});
			}
		};
	})

	.service('$mdShowToast', function($mdToast) {
		return {
			show: function(content) {
				return $mdToast.show(
					$mdToast.simple()
					.content(content)
					.action('OK')
					.highlightAction(true)
					.highlightClass('md-accent')
					.position('top left')
					.hideDelay(6000)
				)
			}
		};
	})

	.filter('trustUrl', ['$sce', function($sce) {
		return function(url) {
			return $sce.trustAsResourceUrl(url);
		};
	}])

	.filter('findValue', function() {
		return function(input, type) {
			if (input != undefined) {
				for (let i = 0; i < input.length; i++) {
					if (input[i].type == type) {
						return input[i];
					}
				}
			}

			return null;
		}
	})

	.filter('findShow', function() {
		return function(input, url) {
			if (input != undefined) {
				for (let i = 0; i < input.length; i++) {
					if (input[i].url == url) {
						return input[i];
					}
				}
			}

			return null;
		}
	})

	.config(function($mdThemingProvider) {
		$mdThemingProvider.theme('default')
			.primaryPalette('green')
			.accentPalette('deep-orange');

		$mdThemingProvider.theme('indigo')
			.primaryPalette('indigo')
			.accentPalette('pink');

		$mdThemingProvider.theme('lime')
			.primaryPalette('lime')
			.accentPalette('deep-orange')

		$mdThemingProvider.theme('orange')
			.primaryPalette('orange')
			.accentPalette('red')

		$mdThemingProvider.theme('cyan')
			.primaryPalette('cyan')
			.accentPalette('indigo')

		$mdThemingProvider.theme('pink')
			.primaryPalette('pink')
			.accentPalette('deep-purple')

		$mdThemingProvider.theme('brown')
			.primaryPalette('brown')
			.accentPalette('grey')

		$mdThemingProvider.alwaysWatchTheme(true);
	})
