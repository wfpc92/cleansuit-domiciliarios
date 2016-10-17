var OrdenParaEntregaCtrl = function($scope, 
							$stateParams,
							$log,
							$ionicListDelegate,
							OrdenesFactory, 
							$timeout) {

	$log.debug("OrdenParaEntregaCtrl");
	
	$scope.$on("$ionicView.beforeEnter", function() {
		$scope.indexOrden = $stateParams.indexOrden;
		$scope.orden = OrdenesFactory.ordenesParaEntrega[$scope.indexOrden];
	});

	$scope.$on('$ionicView.afterEnter', function(event) {
		
	});
	
	$scope.$on("$ionicView.beforeLeave", function() {
		
	});

};


app.controller("OrdenParaEntregaCtrl", OrdenParaEntregaCtrl);
