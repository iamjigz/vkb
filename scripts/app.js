angular.module('portfolioPage', ['ngMaterial', 'ngResource', 'ngAnimate', 'ui.router'])
  .controller('appCtrl', function($scope, $mdDialog) {
    $scope.debugMode = false;
    $scope.transcriptionSheet = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTx1KoZbuX4SU4iqRv86L7wd56Ns7eBSTUyMFsXm-aicw45ds-sMbtCAJ4kYt5DgecigMpeVFB_haVh";

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

  .controller('tvShowCtrl', function($scope, $http, httpGet, $sce) {
    $scope.$watch('query', function(newValue, oldValue) {
      $scope.topShows = topShowsList;
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

  })

  .controller('movieCtrl', function($scope, $http, httpGet, $sce, $mdShowToast) {
    $scope.option = 'actor';
    $scope.movieLoaded = false;

    // $scope.$watch('query', function(newValue, oldValue) {
    //   $scope.movieLoaded = false;
    //   if (newValue !== undefined) {
    //   httpGet.getJson(`https://netflixroulette.net/api/api.php?${$scope.option}=${newValue}`)
    //     .then(function(res) {
    //       $scope.movies = (res.data.length > 1 ? res.data : [ res.data ]);
    //       $scope.movieLoaded = true;
    //
    //     }).catch(function(res) {
    //       console.log('catch', res);
    //       $mdShowToast.show(res.data.message);
    //     });
    //   }
    // })
    $scope.resetQuery = function() {
      $scope.query = '';
      $scope.movieLoaded = false;
    }

    $scope.getMovie = function(newValue) {
      $scope.movieLoaded = false;
      if (newValue !== undefined) {
      httpGet.getJson(`https://netflixroulette.net/api/api.php?${$scope.option}=${newValue}`)
        .then(function(res) {
          $scope.movies = (res.data.length > 1 ? res.data : [ res.data ]);
          $scope.movieLoaded = true;

        }).catch(function(res) {
          console.log('catch', res);
          $mdShowToast.show(res.data.message);
        });
      }
    }

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

  .filter('trustUrl', ['$sce', function ($sce) {
    return function(url) {
      return $sce.trustAsResourceUrl(url);
    };
  }])

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
