var EnviarRecoleccionCtrl = function($scope, 
							$stateParams,
							$log,
							$state,
							$ionicPopup,
							$ionicHistory,
							$ionicListDelegate,
							OrdenesFactory, 
							$timeout) {
	
	
	$log.debug("VentaProductosCtrl", $scope.$id);

	$scope.enviar = function() {
		console.log("EnviarRecoleccionCtrl.enviar", $scope.carrito);
		var qEnvio = $scope.carrito.soloHayProductos() ? OrdenesFactory.enviarVentaDirecta() : OrdenesFactory.enviarRecolectada();
		
		qEnvio
		.then(function() {
			$ionicPopup
			.alert({
		    	title: 'Orden enviada',
		    	template: 'Revise en el Menú las ordenes enviadas.',
		    })
		    .then(function(){
		    	$ionicHistory.clearHistory();
				$ionicHistory.nextViewOptions({
					disableBack:'true'
				});
		    	$state.go("app.recoleccion");
		    })
		});
	};

	$scope.regresar = function() {
		$ionicHistory.goBack(-2);
	};
};

app.controller("EnviarRecoleccionCtrl", EnviarRecoleccionCtrl);
