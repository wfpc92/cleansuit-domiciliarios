var OrdenesEntregadasCtrl =  function ($scope,
									$log,
									$state,
									OrdenesFactory) {
	
	$log.debug("OrdenesEntregadasCtrl")
	$scope.ordenes = OrdenesFactory.ordenesEntregadas;
	
	$scope.hayOrdenes = function() {
		if(!$scope.ordenes) {
			return false;
		}

		if($scope.ordenes.length > 0) {
			return true;
		}
		
		return false;
	};

	$scope.verInformacionOrden = function(index) {
		$scope.carrito.setOrdenEntregada($scope.ordenes[index])
		$state.go("app.entregada");
	}
	
};

app.controller('OrdenesEntregadasCtrl', OrdenesEntregadasCtrl);