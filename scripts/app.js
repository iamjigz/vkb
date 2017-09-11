angular.module('portfolioPage', ['ngMaterial', 'ngResource', 'ngAnimate', 'ui.router'])
  .controller('appCtrl', function($scope, $mdDialog) {
    $scope.shows = data.shows;


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

  .controller('workCtrl', function($scope) {
    $scope.exps = workExp;
  })

  .controller('languageCtrl', function($scope) {
    $scope.languages = languages;
  })

  .controller('wikiCtrl', function($scope, $resource) {
    $scope.$watch('query', function(newValue, oldValue) {
      if (newValue !== undefined) {
        $scope.wiki = $resource('https://en.wikipedia.org/w/api.php', {
          action: 'opensearch',
          format: 'json',
          search: newValue,
          callback: 'JSON_CALLBACK'
        }, {
          get: {
            method: 'JSONP',
            isArray: true,
            transformResponse: function(data, header) {
              dataSet = [];
              for (var i = 0; i <= data[1].length - 1; i++) {
                var d = {};
                d.name = data[1][i];
                d.snip = data[2][i];
                d.link = data[3][i];
                dataSet.push(d);
              }

              return dataSet;
            }
          }
        });

        $scope.wikiData = $scope.wiki.get()
      }
    })
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
