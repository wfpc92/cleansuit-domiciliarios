var RecoleccionProductosCtrl = function($scope,
							$log,
							$stateParams,
							ProductosFactory,
							$timeout,
							$ionicListDelegate,
							ModalCargaFactory) {
	
	console.log("Aqui")
	$log.debug("RecoleccionProductosCtrl");
	
	$scope.productos = ProductosFactory.productos;
	$scope.indexOrden = $stateParams.indexOrden;
	console.log($scope.productos, $scope.indexOrden)


	$scope.aumentarProducto = function(index) {
		$scope.carrito.agregar(index, "PRODUCTO", 1);
		$scope.carrito.limpiar();
	};

	$scope.disminuirProducto = function(index) {
		$scope.carrito.disminuir(index, "PRODUCTO", 1);
		$scope.carrito.limpiar();
	};

	$scope.$on('$ionicView.afterEnter', function(event) {
		if ($scope.productos.length > 0) {
			
		}
	});

	$scope.$on("$ionicView.beforeLeave", function() {
		$timeout.cancel($scope.timeoutTutorial);
	});

	$scope.$on("limpiarLista", function() {
		$ionicListDelegate.closeOptionButtons();
	});

	$scope.cargarProductos = function() {
		$log.debug("RecoleccionProductosCtrl.cargarProductos()");
		ProductosFactory
		.cargar()
		.then( function() {
			//$scope.productos = ProductosFactory.productos;
		});
	};

	$scope.hayProductos = function() {
		if(!$scope.productos) {
			return false;
		}

		if($scope.productos.length > 0) {
			return true;
		}
		
		return false;
	};
};

app.controller('RecoleccionProductosCtrl', RecoleccionProductosCtrl);
