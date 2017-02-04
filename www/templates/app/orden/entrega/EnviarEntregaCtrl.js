var EnviarEntregaCtrl = function($scope, 
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
		console.log("EnviarEntregaCtrl.enviar", $scope.carrito.infoOrden);

		OrdenesFactory
		.enviarEntregada()
		.then(function() {
			$ionicPopup
			.alert({
		    	title: 'Orden enviada',
		    	template: 'Revise en el Menú las ordenes entregadas.',
		    })
		    .then(function(){
		    	$ionicHistory.clearHistory();
				$ionicHistory.nextViewOptions({
					disableBack:'true'
				});
		    	$state.go("app.entrega");
		    });
		});
	};

	$scope.regresar = function() {
		console.log("regresar")
		$ionicHistory.goBack();
	};
};

app.controller("EnviarEntregaCtrl", EnviarEntregaCtrl);
