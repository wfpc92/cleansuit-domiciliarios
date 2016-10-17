var OrdenEnRecoleccionCtrl = function($scope, 
							$stateParams,
							$log,
							$ionicListDelegate,
							OrdenesFactory, 
							$timeout) {

	$log.debug("OrdenEnRecoleccionCtrl");
	
	$scope.$on("$ionicView.beforeEnter", function() {
		$scope.indexOrden = $stateParams.indexOrden;
		$scope.orden = OrdenesFactory.ordenesEnRecoleccion[$scope.indexOrden];
	});

	$scope.$on('$ionicView.afterEnter', function(event) {
		
	});
	
	$scope.$on("$ionicView.beforeLeave", function() {
		
	});

};


app.controller("OrdenEnRecoleccionCtrl", OrdenEnRecoleccionCtrl);
