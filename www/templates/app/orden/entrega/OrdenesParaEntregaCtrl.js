var OrdenesParaEntregaCtrl =  function ($scope,
										$rootScope,
										$state, 
										$log,
										OrdenesFactory) {
	
	$log.debug("OrdenesParaEntregaCtrl")
	$scope.ordenes = OrdenesFactory.ordenesEntrega;
	
	OrdenesFactory
	.cargarAsignadas() 
	.then(function() {
		$scope.ordenes = OrdenesFactory.ordenesEntrega;
	});

	$scope.hayOrdenes = function() {
		if(!$scope.ordenes) {
			return false;
		}

		if($scope.ordenes.length > 0) {
			return true;
		}
		
		return false;
	};

	$scope.$on('$ionicView.beforeEnter', function(event) {
		$scope.banderas = {
			recoleccion: false,
			entrega: true,
			ultimoEstado: $state.current.name
		};
	});

	$scope.verInformacionOrden = function(index) {
		var infoOrden = $scope.ordenes[index];
		//iniciar orden de recoleccion.
		OrdenesFactory.iniciarEntrega(infoOrden);
		//asignar los productos solicitados en app cliente al carrito.
		$scope.carrito.setOrdenParaEntrega(infoOrden);
		$state.go("app.entrega-detalle");
	};

	
	
};

app.controller('OrdenesParaEntregaCtrl', OrdenesParaEntregaCtrl);