(function(ApplicationConfiguration) {
  'use strict';

  angular
    .module(ApplicationConfiguration.applicationModuleName)
    .run(AngularRun);

  AngularRun.$inject = ['$rootScope', '$state', 'Authentication'];

  function AngularRun($rootScope, $state, Authentication) {


    FastClick.attach(document.body);
    // Check authentication before changing state
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      if (toState.data && toState.data.roles && toState.data.roles.length > 0) {
        var allowed = false;
        toState.data.roles.forEach(function (role) {
          if ((role === 'guest') || (Authentication.user && Authentication.user.roles !== undefined && Authentication.user.roles.indexOf(role) !== -1)) {
            allowed = true;
            return true;
          }
        });

        if (!allowed) {
          event.preventDefault();
          if (Authentication.user !== undefined && typeof Authentication.user === 'object') {
            $state.go('home');//forbiden
          } else {
            $state.go('home');
          }
        }
      }
    });

  }
})(ApplicationConfiguration);
