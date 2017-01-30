var RecoleccionProductoCtrl = function($scope,
							$stateParams,
							ProductosFactory,
							OrdenesFactory,
							$ionicHistory,
							$state,
							$log) {

	$log.debug("RecoleccionProductoCtrl");

	$scope.indexOrden = $stateParams.indexOrden;
	$scope.infoOrden = OrdenesFactory.ordenesRecoleccion[$scope.indexOrden];

	$scope.indexProducto = $stateParams.indexProducto;
	$scope.producto = ProductosFactory.productos[$scope.indexProducto];
	console.log($scope.indexProducto, $scope.indexOrden);
	
	$scope.regresarCatalogo = function() {
		$ionicHistory.goBack();
	};

};

app.controller('RecoleccionProductoCtrl', RecoleccionProductoCtrl);
