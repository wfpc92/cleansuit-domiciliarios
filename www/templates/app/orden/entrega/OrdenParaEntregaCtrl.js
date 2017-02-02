var OrdenParaEntregaCtrl = function($scope, 
							$stateParams,
							$state,
							$log,
							$ionicListDelegate,
							OrdenesFactory, 
							$timeout) {

	$log.debug("OrdenParaEntregaCtrl");
	
	$scope.formulario = {
		nombre: {
			disabled: true
		},
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
		prendas: {
			eliminar: false,
			entregar: true
		},
		productos: {
			panel: false,
			eliminar: false,
			entregar: true
		},
		siguiente: {
			texto: "ORDEN ENTREGADA"
		}
	};
	
	$scope.$on("$ionicView.beforeEnter", function() {
		console.log($scope.carrito.infoOrden);
		$scope.carrito.infoOrden.orden.recoleccion.fecha = new Date($scope.carrito.infoOrden.orden.recoleccion.fecha);
		$scope.carrito.infoOrden.orden.entrega.fecha = new Date($scope.carrito.infoOrden.orden.entrega.fecha);
	});

	$scope.siguiente = function() {
		if ($scope.formulario.valido) {
			$state.go("app.entrega-envio");
		}
		else {
			console.log("Formulario incompleto.")
		}
	};

	//cancelar orden:
	$scope.cancelar = function() {
		
		$scope.clientSideList = [
    		{ text: "Valor elevado", value: "0" },
    		{ text: "Manifiesta mala atención", value: "1" },
    		{ text: "Prefiere otra empresa", value: "2" }
    	];

    	$scope.data = {
			clientSide: '0'
		};

		$scope.$ionicPopup = $ionicPopup;

		CancelarOrdenFactory.$scope = $scope;
		CancelarOrdenFactory.cb = {
			pendiente: 	function(e) {
				$scope.carrito.vaciar();
				$ionicHistory.clearHistory();
				$ionicHistory.nextViewOptions({
					disableBack:'true'
				});
				$state.go("app.entrega");
			},

			volverInfoOrden: function(e) {

			},

			enviar: function(e) {
				console.log($scope.motivo)
				$scope.carrito.vaciar();
			},

			cancelar: function(e) {
				$ionicHistory.clearHistory();
				$ionicHistory.nextViewOptions({
					disableBack:'true'
				});
				$state.go("app.entrega");
			},
		};

		CancelarOrdenFactory.mostrarOrdenPendiente();
	};

	$scope.verificarEntrega = function() {
		var verificar = function(items) {
			for (var i in items) {
				console.log(items[i], items[i].entregado);
				if (!items[i].entregado) {
					console.log("2, ", items[i].entregado);
					return false;
				}
			}
			return true;
		};

		$scope.formulario.valido = verificar($scope.carrito.items.prendas) && verificar($scope.carrito.items.productos);
	}
};


app.controller("OrdenParaEntregaCtrl", OrdenParaEntregaCtrl);
