var OrdenEnRecoleccionCtrl = function($scope, 
							$stateParams,
							$log,
							$state,
							$ionicPopup,
							$ionicHistory,
							$ionicListDelegate, 
							$timeout,
							OrdenesFactory) {

	$log.debug("OrdenEnRecoleccionCtrl");
	
	$scope.formularioValido = true;

	$scope.formulario = {
		totales: {
			hide: true
		},
		cupon: {
			hide: true
		},
		abono: {
			hide: true
		},
		valido: true
	};
	
	$scope.txt = {
		cancelar: "Suspender pedido",
		siguiente: "TOMAR PEDIDO"
	};

	$scope.$on("$ionicView.beforeEnter", function() {
		$scope.carrito.infoOrden.orden.recoleccion.fecha = new Date($scope.carrito.infoOrden.orden.recoleccion.fecha);
		$scope.carrito.infoOrden.orden.entrega.fecha = new Date($scope.carrito.infoOrden.orden.entrega.fecha);
	});

	$scope.$on('$ionicView.afterEnter', function(event) {
		
	});
	
	$scope.$on("$ionicView.beforeLeave", function() {
		
	});

	$scope.siguiente = function() {
		if ($scope.formularioValido) {
			$state.go("app.recoleccion-carrito")
		}
		else {
			console.log("Formulario incompleto.")
		}
	};

	//cancelar orden:
	$scope.cancelar = function() {
		$ionicPopup
		.confirm({
	    	title: 'Suspender Pedido',
	    	template: '',
	    	buttons: [
		    	{
		    		text: 'Pedido Pendiente',
			    	type: 'button-calm',
		    		onTap: function(e) {
		    			$scope.carrito.vaciar();
						$ionicHistory.clearHistory();
						$ionicHistory.nextViewOptions({
							disableBack:'true'
						});
						$state.go("app.recoleccion");
		    		}
		    	},
		      	{
			    	text: '<b>Cancelar Pedido</b>',
			    	type: 'button-calm',
		    		onTap: function(e) {
						$scope.causaCancelacion();
		    		}
		      	}
		    ]
	    });
	};

	$scope.causaCancelacion = function() {
		$scope.motivos= {
			m1: "1",
			m2: "2",
			m3: "3",
		}
		;
		$scope.motivo = $scope.motivos.m1;
		
		var template =
			'<ion-list >'+
				'<ion-radio ng-model="motivo" ng-value="motivos.m1">Valor elevado</ion-radio>'+
				'<ion-radio ng-model="motivo" value="motivos.m2">Manifiesta mala atención</ion-radio>' +
				'<ion-radio ng-model="motivo" value="motivos.m3">Prefiere otra empresa</ion-radio>' +
			'</ion-list>';

		$ionicPopup
		.confirm({
	    	title: 'Causa por la cual el cliente cancela el pedido',
	    	template: template,
	    	buttons: [
		    	{
		    		text: 'Volver a información de orden',
			    	type: 'button-ligth',
		    		onTap: function(e) {

		    		}
		    	},
		      	{
			    	text: '<b>Enviar</b>',
			    	type: 'button-calm',
		    		onTap: function(e) {
		    			//enviar motivo de suspension de Pedido
						scope.enviarCancelacion();
		    		}
		      	}
		    ]
	    });
	};

	$scope.enviarCancelacion = function() {
		console.log("Seleccion de motivo: ", $scope.motivo);
		//enviar
		$scope.carrito.vaciar();

		$ionicPopup
		.confirm({
	    	title: 'La causa por la cual el cliente cancela el pedido fue enviada.',
	    	template: '',
	    	buttons: [
		    	{
		    		text: 'Aceptar',
			    	type: 'button-ligth',
		    		onTap: function(e) {
						$ionicHistory.clearHistory();
						$ionicHistory.nextViewOptions({
							disableBack:'true'
						});
						$state.go("app.recoleccion");
		    		}
		    	},
		    ]
	    });
	};
};


app.controller("OrdenEnRecoleccionCtrl", OrdenEnRecoleccionCtrl);
