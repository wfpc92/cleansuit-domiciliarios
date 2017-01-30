var VentaProductoConfirmarCtrl = function($scope,
							$stateParams,
							ProductosFactory,
							$ionicHistory,
							$state,
							$log) {

	$log.debug("VentaProductoConfirmarCtrl");


	$scope.formulario = {
		formaPago: {
			disabled: true
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
			texto: "Validación del cliente"
		},
		siguiente: {
			texto: "REALIZAR ORDEN"
		}
	};

};

app.controller('VentaProductoConfirmarCtrl', VentaProductoConfirmarCtrl);
