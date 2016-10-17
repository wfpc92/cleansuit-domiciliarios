var OrdenesEnRecoleccionCtrl =  function ($scope,
									$log,
									OrdenesFactory) {
	
	$log.debug("OrdenesEnRecoleccionCtrl")
	$scope.ordenes = OrdenesFactory.ordenesEnRecoleccion;
	
	/*OrdenesFactory
	.cargarOrdenesEnProceso() 
	.then(function() {
		//$scope.ordenes = OrdenesFactory.ordenesEnProceso;
	});*/

	$scope.hayOrdenes = function() {
		if(!$scope.ordenes) {
			return false;
		}

		if($scope.ordenes.length > 0) {
			return true;
		}
		
		return false;
	};
	
};

app.controller('OrdenesEnRecoleccionCtrl', OrdenesEnRecoleccionCtrl);