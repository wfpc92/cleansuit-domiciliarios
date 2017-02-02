var VentaProductoConfirmarCtrl = function($scope,
							$stateParams,
							OrdenesFactory,
							ProductosFactory,
							CancelarOrdenFactory,
							$ionicHistory,
							$state,
							$ionicPopup,
							$log) {

	$log.debug("VentaProductoConfirmarCtrl");

	$scope.formulario = {
		titulo: {
			texto: "Venta directa de productos"
		},
		cupon: {
			hide: true,
		},
		abono: {
			hide: true
		},
		valido: false,
		validoCliente: false,
		validoCampos: false,
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
		},
		valido: false
	};

	$scope.$on('$ionicView.afterEnter', function(event) {
		$scope.formulario.validoCliente =  false,
		$scope.formulario.validoCampos = false,

		$scope.$watchGroup([
				'carrito.infoOrden.cliente_id.nombre',
			], function(newV, oldV) {
				if (newV[0]) {
					$scope.formulario.validoCampos = true;
				} else {
					$scope.formulario.validoCampos = false;
				}
				$scope.validar();
				console.log("Watch$$$$$: ",newV, oldV, $scope.valido);
		});
	});

	$scope.validar = function() {
		$scope.formulario.valido = $scope.formulario.validoCliente && $scope.formulario.validoCampos;
	}
	//cancelar orden:
	$scope.cancelar = function() {
		$ionicPopup
		.confirm({
	    	title: 'Validación del cliente',
	    	template: '',
	    	buttons: [
		    	{
		    		text: 'El cliente esta de acuerdo con la orden',
			    	type: 'button-calm',
		    		onTap: function() {
		    			$scope.formulario.validoCliente = true;
		    			$scope.validar();
		    		}
		    	},
		      	{
			    	text: 'Cancelar pedido',
			    	type: 'button-calm',
		    		onTap: function(e) {
						$ionicPopup
						.confirm({
					    	title: '¿Desea cancelar venta directa de productos?',
					    	template: '',
					    	buttons: [
						    	{
						    		text: 'Si',
						    		onTap: function(e) {
						    			//aqui se borra (limpiar) el pedido de productos del carrito.
						    			$scope.carrito.vaciar();
						    			$ionicHistory.clearHistory();
										$ionicHistory.nextViewOptions({
											disableBack:'true'
										});
										$state.go("app.venta-productos");
						    		}
						    	},
						      	{
							    	text: '<b>No</b>',
							    	type: 'button-positive'
						      	}
						    ]
					    });
		    		}
		      	}
		    ]
	    });
	};

	$scope.siguiente = function() {
		$state.go("app.venta-envio");
	};
};

app.controller('VentaProductoConfirmarCtrl', VentaProductoConfirmarCtrl);
