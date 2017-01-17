var OrdenEnRecoleccionCtrl = function($scope, 
							$stateParams,
							$log,
							$state,
							$ionicPopup,
							$ionicHistory,
							$ionicListDelegate, 
							$timeout,
							OrdenesFactory,
							CancelarOrdenFactory) {

	$log.debug("OrdenEnRecoleccionCtrl");
	
	$scope.formulario = {
		totales: {
			hide: true
		},
		cupon: {
			hide: true
		},
		abono: {
			hide: true
		},
		valido: true,
		cancelar: {
			texto: "Suspender pedido", 
		},
		siguiente: {
			texto: "TOMAR PEDIDO",
		}
	};

	$scope.$on("$ionicView.beforeEnter", function() {
		$scope.carrito.infoOrden.orden.recoleccion.fecha = new Date($scope.carrito.infoOrden.orden.recoleccion.fecha);
		$scope.carrito.infoOrden.orden.entrega.fecha = new Date($scope.carrito.infoOrden.orden.entrega.fecha);
	});

	$scope.$on('$ionicView.afterEnter', function(event) {
		
	});
	
	$scope.$on("$ionicView.beforeLeave", function() {
		
	});

	$scope.siguiente = function() {
		if ($scope.formulario.valido) {
			$state.go("app.recoleccion-carrito")
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
				$state.go("app.recoleccion");
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
				$state.go("app.recoleccion");
			},
		};

		CancelarOrdenFactory.mostrarOrdenPendiente();
	};
};


app.controller("OrdenEnRecoleccionCtrl", OrdenEnRecoleccionCtrl);
