(function(angular) {
  angular.module('ngEsc', ['ng'])
  .directive("ngEsc", function ($rootScope, $timeout) {
		return {
      link: function (scope, element, attrs) {

        var getModel = function(){
          // Set model
          var model;
          if(scope.$eval(attrs.ngEscModel)){
            model = scope.$eval(attrs.ngEscModel);
          }
          else{
            if(attrs.ngEscModel){
              scope[attrs.ngEscModel] = {};
              model = scope[attrs.ngEscModel];
            }
            else{
              model = scope;
            }
          }
          return model;
        };

        // Listen to keypress event
         var timeout_esc;
         angular.element(element).bind("keydown keypress", function(event) {
           // Set model
           var model = getModel();

           // When Esc key is pressed
           if (event.which === 27) {
             // $esc 가 false 나 undefined 일때만 작동
             // ( 연속해서 true 로 멈춰있는 경우 방지 )
             if(!model.$esc){
               if(timeout_esc) $timeout.cancel(timeout_esc);
               // Set $esc true and execute ng-esc
               scope.$apply(function() {
                 model.$esc = true;
                 model.$esced = true;
                 scope.$eval(attrs.ngEsc);
               });

               // Set $esc false after duration
               var duration = Number(attrs.ngEscDuration);
               if(!(duration>=0)) duration = 100;
               timeout_esc = $timeout(function(){
                 model.$esc = false;
               }, duration);
             }
             event.preventDefault();
           }
         });
      },
			scope:false,
			restrict:"EA"
		};
	});
})(angular);
