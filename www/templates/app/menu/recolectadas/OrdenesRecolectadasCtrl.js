var OrdenesRecolectadasCtrl =  function ($scope,
									$log,
									$state,
									OrdenesFactory) {
	
	$log.debug("OrdenesRecolectadasCtrl", $scope.$id);
	$scope.ordenes = OrdenesFactory.ordenesRecolectadas;
	
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
		$scope.carrito.setOrdenRecolectada($scope.ordenes[index])
		$state.go("app.recolectada")
	}	
};

app.controller('OrdenesRecolectadasCtrl', OrdenesRecolectadasCtrl);