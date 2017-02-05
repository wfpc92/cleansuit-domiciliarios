var VentaProductoEnviarCtrl = function($scope, 
							$stateParams,
							$log,
							$state,
							$ionicPopup,
							$ionicHistory,
							$ionicListDelegate,
							OrdenesFactory, 
							$timeout) {
	
	$log.debug("VentaProductoEnviarCtrl", $scope.$id);
		
	$scope.enviar = function() {
		console.log("VentaProductoEnviarCtrl.enviar", $scope.carrito.infoOrden);

		OrdenesFactory
		.enviarVentaDirecta()
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
		    	$state.go("app.venta-productos");
		    });
		});
	};

	$scope.regresar = function() {
		console.log("regresar")
		$ionicHistory.goBack();
	};
};

app.controller("VentaProductoEnviarCtrl", VentaProductoEnviarCtrl);
