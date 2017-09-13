angular.module('portfolioPage', ['ngMaterial', 'ngResource', 'ngAnimate', 'ui.router'])
  .controller('appCtrl', function($scope, $mdDialog) {
    $scope.debugMode = false;

    $scope.showModal = function(ev, showInfo) {
      $scope.showData = showInfo;

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

  .controller('searchCtrl', function($scope, $http, tvMaze, $sce) {
    $scope.$watch('query', function(newValue, oldValue) {
      $scope.topShows = topShowsList;
      $scope.showLoaded = false;
      $scope.castLoaded = false;
      $scope.fabOpen = false;

      $scope.fab = {
        fabOpen: false,
        count: 0,
      }

      if (newValue !== undefined || newValue == '') {
        $scope.castLoaded = false;

        tvMaze.getData('http://api.tvmaze.com/search/shows?q=' + newValue)
        .then(function(res) {
          $scope.shows = res.data;
          $scope.showLoaded = true;

        }).catch(function(res) {
          console.log('catch', res);
        });
      }
    })

    $scope.getCast = function(showName, showlink) {
      $scope.castLoaded = false;

      tvMaze.getData(showlink + '/cast')
      .then(function(res) {
        $scope.title = showName;
        $scope.casts = res.data;
        $scope.castLoaded = true;

      }).catch(function(res) {
        console.log('catch', res);
      });
    }

  })

  .service('tvMaze', function($http) {
    return {
      getData: function(link) {
          return $http.get(link.replace('http', 'https'), {
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
          .position('top right')
          .hideDelay(6000)
        )
      }
    };
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
