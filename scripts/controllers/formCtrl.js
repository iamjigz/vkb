angular.module('vidyKb')
	.controller('formCtrl', function($scope, $filter, $mdShowToast) {
		new Clipboard('#copyThis');

		$scope.issues = [{}];
		$scope.addPhrase = function(type) {
			let match = $filter('findValue')($scope.issues, type);

			if (match != undefined) {
				match.phrases.push({
					'phrase': $scope.phrase,
					'issue': $scope.issue
				})

				$mdShowToast.show('New phrase added.');

			} else {
				if (!$scope.issues) {
					$scope.issues = [{}];
				}

				$scope.issues.push({
					'type': type,
					'phrases': [{
						'phrase': $scope.phrase,
						'issue': $scope.issue
					}]
				})

				$mdShowToast.show('New issue added.');
			}

			$scope.type = undefined;
			$scope.phrase = undefined;
			$scope.issue = undefined;
		};

		$scope.removeLast = function() {
			var lastItem = $scope.issues.length - 1;

			if (lastItem) {
				$scope.issues.splice(lastItem);
				$mdShowToast.show('Issue removed.');

			} else {
				$mdShowToast.show('No more issues to remove.');
			}

		};

		$scope.clearAll = function() {
			delete $scope.issues;
			$mdShowToast.show('All issues cleared.');
		}

		$scope.showMsg = function() {
			let count = $scope.issues.length - 1;
			if (count == undefined | count == 0) return;

			$mdShowToast.show('Text copied. You can now clear the comments.');
		}
	})
