	var OrdenesEnRecoleccionCtrl =  function ($scope,
										$rootScope,
										$state,
										$log,
										OrdenesFactory) {
	
	$log.debug("OrdenesEnRecoleccionCtrl")
	$scope.ordenes = OrdenesFactory.ordenesRecoleccion;
	
	OrdenesFactory
	.cargarAsignadas() 
	.then(function() {
		$scope.ordenes = OrdenesFactory.ordenesRecoleccion;
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

	$scope.$on('$ionicView.afterEnter', function(event) {
		$scope.banderas = {
			recoleccion: true,
			entrega: false,
			ultimoEstado: $state.current.name
		};
	});

	$scope.verInformacionOrden = function(index) {
		var infoOrden = $scope.ordenes[index];
		//iniciar orden de recoleccion.
		OrdenesFactory.iniciarRecoleccion(infoOrden);
		//asignar los productos solicitados en app cliente al carrito.
		$scope.carrito.setProductosRecoleccion(infoOrden);
		$state.go("app.recoleccion-detalle", {indexOrden: index});
	};	
};

app.controller('OrdenesEnRecoleccionCtrl', OrdenesEnRecoleccionCtrl);