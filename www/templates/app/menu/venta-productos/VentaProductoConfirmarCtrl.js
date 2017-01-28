var VentaProductoConfirmarCtrl = function($scope,
							$stateParams,
							OrdenesFactory,
							ProductosFactory,
							$ionicHistory,
							$state,
							$log) {

	$log.debug("VentaProductoConfirmarCtrl");

	$scope.formulario = {
		titulo: {
			texto: "VENTA DE PRODUCTOS"
		},
		cupon: {
			hide: true,
		},
		valido: false,
		productos: {
			panel: false,
			eliminar: true,
			entregar: false
		},
		cancelar: {
			hide: true
		},
		siguiente: {
			texto: "REALIZAR ORDEN"
		},
		valido: true
	};

	$scope.siguiente = function() {
		$state.go("app.venta-envio")
	};
	

};

app.controller('VentaProductoConfirmarCtrl', VentaProductoConfirmarCtrl);
