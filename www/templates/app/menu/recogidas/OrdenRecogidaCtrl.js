var OrdenRecogidaCtrl = function($scope, 
							$stateParams,
							$log,
							$ionicListDelegate,
							OrdenesFactory, 
							$timeout) {

	$log.debug("OrdenRecogidaCtrl");
	
	$scope.$on("$ionicView.beforeEnter", function() {
		$scope.indexOrden = $stateParams.indexOrden;
		$scope.orden = OrdenesFactory.ordenesRecogidas[$scope.indexOrden];
	});

	$scope.$on('$ionicView.afterEnter', function(event) {
		
	});
	
	$scope.$on("$ionicView.beforeLeave", function() {
		
	});

};


app.controller("OrdenRecogidaCtrl", OrdenRecogidaCtrl);
