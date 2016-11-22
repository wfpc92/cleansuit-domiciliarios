var RecoleccionProductosCtrl = function($scope,
							$log,
							$stateParams,
							$state,
							$ionicPopup,
							$ionicHistory,
							ProductosFactory,
							$timeout,
							$ionicListDelegate,
							ModalCargaFactory) {

	$log.debug("RecoleccionProductosCtrl");

	$scope.productos = ProductosFactory.productos;
	$scope.indexOrden = $stateParams.indexOrden;
	console.log($scope.productos, $scope.indexOrden);

	$scope.uiSref = function($index) {
		return "app.recoleccion-producto({"+
			"\'indexOrden\': " + $scope.indexOrden + ","+
			"\'indexProducto\': "+ $index +" })";
	};

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

	$scope.cancelarPedidoProductos = function() {
		$ionicPopup
		.confirm({
	    	title: '¿Desea cancelar el pedido?',
	    	template: '',
	    	buttons: [
		    	{
		    		text: 'Si',
		    		onTap: function(e) {
		    			//aqui se borra (limpiar) el pedido de productos del carrito.
		    			$ionicHistory.nextViewOptions({
							disableBack:'true'
						});
						$state.go("app.recoleccion-carrito", { indexOrden: $scope.indexOrden} );
		    		}
		    	},
		      	{
			    	text: '<b>No</b>',
			    	type: 'button-positive'
		      	}
		    ]
	    });
	};

	$scope.guardarPedidoProductos = function() {
		//aqui se guarda el pedido de productos en el carrito de la orden en recoleccion.
		$state.go("app.recoleccion-carrito", { indexOrden: $scope.indexOrden} );
	};
};

app.controller('RecoleccionProductosCtrl', RecoleccionProductosCtrl);
