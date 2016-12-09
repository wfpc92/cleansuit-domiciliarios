var OrdenesEnRecoleccionCtrl =  function ($scope,
										$rootScope,
										$state,
										$log,
										OrdenesFactory) {
	
	$log.debug("OrdenesEnRecoleccionCtrl")
	$scope.ordenes = OrdenesFactory.ordenesEnRecoleccion;
	
	OrdenesFactory
	.cargarAsignadas() 
	.then(function() {
		$scope.ordenes = OrdenesFactory.ordenesRecoleccion;
		console.log($scope.ordenes)
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
	
};

app.controller('OrdenesEnRecoleccionCtrl', OrdenesEnRecoleccionCtrl);