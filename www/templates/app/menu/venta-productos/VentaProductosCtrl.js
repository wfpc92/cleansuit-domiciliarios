var VentaProductosCtrl = function($scope,
							$log,
							ProductosFactory,
							//TutorialFactory,
							$timeout,
							$ionicListDelegate,
							ModalCargaFactory) {

	$log.debug("VentaProductosCtrl");

	$scope.indexOrden = -1;
	$scope.productos = ProductosFactory.productos;

	$scope.uiSref = function($index) {
		return "app.venta-producto({"+
			"\'indexProducto\': "+ $index +" })";
	};
	/*

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
			$scope.timeoutTutorial = $timeout(function(){
				TutorialFactory.mostrarTutorial($scope.tipo);
			}, 800);
		}
	});

	$scope.$on("$ionicView.beforeLeave", function() {
		$timeout.cancel($scope.timeoutTutorial);
	});

	$scope.$on("limpiarLista", function() {
		$ionicListDelegate.closeOptionButtons();
	});

	$scope.cargarProductos = function() {
		$log.debug("ProductosCtrl.cargarProductos()");
		ProductosFactory
		.cargar()
		.then( function() {
			//$scope.productos = ProductosFactory.productos;
		});
	};


	$scope.tutorial = TutorialFactory;
	$scope.tipo = "PRODUCTOS";
	$scope.idLst = "lstProductos";
	TutorialFactory.setIdLst("#" + $scope.idLst);
	*/

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

app.controller('VentaProductosCtrl', VentaProductosCtrl);