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
	/*$scope.$on("$ionicView.beforeEnter", function() {

	});	*/

	$scope.aumentarProducto = function(){
		$scope.carrito.agregar($scope.producto, "PRODUCTO", 1);
		$scope.carrito.limpiar();
	};

	$scope.disminuirProducto = function(){
		$scope.carrito.disminuir($scope.producto, "PRODUCTO", 1);
		$scope.carrito.limpiar();
	};

	$scope.regresarCatalogo = function() {
		$state.go("app.recoleccion-productos", {indexOrden: $scope.indexOrden});
		$ionicHistory.clearHistory();
		$ionicHistory.nextViewOptions({
			disableBack:'true'
		})
	};

};

app.controller('RecoleccionProductoCtrl', RecoleccionProductoCtrl);
