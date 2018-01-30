(function(angular) {
  angular.module('ngEsc', ['ng'])
  .directive("ngEsc", function ($rootScope, $timeout) {
		return {
      link: function (scope, element, attrs) {
        // Listen to keypress event
         var timeout_esc;
         angular.element(element).bind("keydown keypress", function(event) {
           // Set model
           var model
           if(scope.$eval(attrs.ngEscModel)) model = scope.$eval(attrs.ngEscModel);
           else model = scope;

           // When Esc key is pressed
           if (event.which === 13) {
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

// (function(angular) {
//   angular.module('ngEsc', ['ng'])
//   .directive("ngEsc", function ($rootScope, $timeout) {
// 		return {
//       transclude:'element',
//       terminal: true,
//       $$tlb: true,
//       priority: 1000,
//       compile: function(tElement, tAttrs, transclude) {
//         return {
//            pre: function(scope, iElement, iAttrs, controller) {
//              // Create new scope
//              var _scope = scope.$new(false);
//
//              // Link element with new scope
//              element = transclude(_scope, angular.noop);
//
//              // Listen to keypress event
//              var timeout_esc;
//              angular.element(element).bind("keydown keypress", function(event) {
//                // When Esc key is pressed
//                if (event.which === 13) {
//                  // $esc 가 false 나 undefined 일때만 작동
//                  // ( 연속해서 true 로 멈춰있는 경우 방지 )
//                  if(!_scope.$esc){
//                    if(timeout_esc) $timeout.cancel(timeout_esc);
//                    // Set $esc true and execute ng-esc
//                    _scope.$apply(function() {
//                      _scope.$esc = true;
//                      _scope.$esced = true;
//                      _scope.$eval(iAttrs.ngEsc);
//                    });
//
//                    // Set $esc false after duration
//                    var duration = Number(iAttrs.ngEscDuration);
//                    if(!(duration>=0)) duration = 100;
//                    timeout_esc = $timeout(function(){
//                      _scope.$esc = false;
//                    }, duration);
//                  }
//                  event.preventDefault();
//                }
//              });
//
//              var frag = document.createDocumentFragment();
//              frag.appendChild(element[0]);
//              iElement.after(frag);
//            }
//         }
//       },
// 			restrict:"EA"
// 		};
// 	});
// })(angular);
