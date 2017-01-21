var ConfirmacionOrdenCtrl = function($scope, 
							$stateParams,
							$log,
							$state,
							$ionicPopup,
							$ionicHistory,
							$ionicListDelegate,
							OrdenesFactory,
							CancelarOrdenFactory, 
							$timeout) {
	
	$scope.$on("$ionicView.beforeEnter", function() {		
		$scope.formulario = {
			recoleccion: {
				direccion: {
					hide: true
				},
				fecha: {
					hide: true
				},
				hora: {
					hide: true
				}
			},
			entrega: {
				direccion: {
					disabled: true
				},
				fecha: {
					disabled: true
				},
				hora: {
					disabled: true
				}
			},
			telefono: {
				disabled: true
			},
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
	});

	$scope.$on('$ionicView.afterEnter', function(event) {
		
	});
	
	$scope.$on("$ionicView.beforeLeave", function() {
		
	});

	$scope.eliminarPrenda = function(index) {
		$ionicPopup
		.confirm({
	    	title: 'Eliminar Servicio',
	    	template: '¿Está seguro que desea eliminar este servicio?',
	    	buttons: [
		    	{
		    		text: 'Si',
		    		onTap: function(e) {
		    			$scope.carrito.eliminar(index, 'PRENDA');
		    		}
		    	},
		      	{
			    	text: '<b>No</b>',
			    	type: 'button-positive'
		      	}
		    ]
	    });	    
	};

	$scope.eliminarProducto = function(index) {
		$ionicPopup
		.confirm({
	    	title: 'Eliminar Productos',
	    	template: '¿Está seguro que desea eliminar este pedido?',
	    	buttons: [
		    	{
		    		text: 'Si',
		    		onTap: function(e) {
		    			$scope.carrito.eliminar(index, 'PRODUCTO');
		    		}
		    	},
		      	{
			    	text: '<b>No</b>',
			    	type: 'button-positive'
		      	}
		    ]
	    });	    
	};

	$scope.siguiente = function() {
		if ($scope.formulario.valido) {
			$state.go("app.recoleccion-envio")
		}
		else {
			console.log("Formulario incompleto.")
		}
	};

	//cancelar orden:
	$scope.cancelar = function() {
		CancelarOrdenFactory.$scope = $scope;
		CancelarOrdenFactory.cb = {
			deacuerdo: function() {
				$scope.formulario.valido = true;
			},
			
			volverInfoOrden: function(e) {
				
			},

			enviar: function(e) {
				$scope.carrito.vaciar();
			},

			cancelar: function(e) {
				$ionicHistory.clearHistory();
				$ionicHistory.nextViewOptions({
					disableBack:'true'
				});
				$state.go("app.recoleccion");
			},
		};

		CancelarOrdenFactory.mostrarValidacionCliente();
	};
};

app.controller("ConfirmacionOrdenCtrl", ConfirmacionOrdenCtrl);
