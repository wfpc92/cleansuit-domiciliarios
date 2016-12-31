var OrdenesEnRecoleccionCtrl =  function ($scope,
										$rootScope,
										$state,
										$log,
										OrdenesFactory,
										CarritoFactory) {
	
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

	$scope.$on('$ionicView.beforeEnter', function(event) {
		//almacenar estado para poder recuperar el historial del tab actual 
		//por medio de menu/inicio
		$rootScope.estadoActual = $state.current.name;
	});

	$scope.verInformacionOrden = function(index) {
		CarritoFactory.setItemsRecoleccion($scope.ordenes[index]);
		$state.go("app.recoleccion-detalle", {indexOrden: index});
	};
	
};

app.controller('OrdenesEnRecoleccionCtrl', OrdenesEnRecoleccionCtrl);