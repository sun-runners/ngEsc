'use strict';

angular.module('app')
	.controller('DemoCtrl', function ($scope, $rootScope, $timeout) {
		$scope.message_index = 0;

		var granimInstance = new Granim({
		   element: '#granim-canvas',
			 direction: 'radial',
		   name: 'granim',
		   opacity: [1, 1],
		   states : {
					"default-state": {
						gradients: [
							['#D1C4E9', '#B39DDB'],
							['#9575CD', '#7E57C2'],
							['#7E57C2', '#9575CD'],
							['#B39DDB', '#D1C4E9']
						]
					}
		   }
		});
});
