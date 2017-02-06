	var OrdenesEnRecoleccionCtrl =  function ($scope,
										$rootScope,
										$state,
										$log,
										OrdenesFactory) {
	
	$log.debug("OrdenesEnRecoleccionCtrl", $scope.$id);
	$scope.ordenes = OrdenesFactory.ordenesRecoleccion;
	$scope.pendientes = OrdenesFactory.ordenesPendientes;

	$scope.refrescar = function() {
		OrdenesFactory
		.cargarAsignadas() 
		.then(function() {
			$scope.ordenes = OrdenesFactory.ordenesRecoleccion;
		})
		.finally(function() {
			$scope.$broadcast('scroll.refreshComplete');
		});	
	};

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
		$scope.historial.recoleccion = true; 
		$scope.historial.entrega = false; 
		$scope.historial.ultimoEstado = $state.current.name; 
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