var OrdenEntregadaCtrl = function($scope, 
							$stateParams,
							$log,
							$ionicListDelegate,
							OrdenesFactory, 
							$timeout) {

	$log.debug("OrdenEntregadaCtrl");
	
	$scope.$on("$ionicView.beforeEnter", function() {
		$scope.indexOrden = $stateParams.indexOrden;
		$scope.orden = OrdenesFactory.ordenesEntregadas[$scope.indexOrden];
	});

	$scope.$on('$ionicView.afterEnter', function(event) {
		
	});
	
	$scope.$on("$ionicView.beforeLeave", function() {
		
	});

};


app.controller("OrdenEntregadaCtrl", OrdenEntregadaCtrl);
