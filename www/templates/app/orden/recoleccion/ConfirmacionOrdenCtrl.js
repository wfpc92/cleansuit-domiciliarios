var ConfirmacionOrdenCtrl = function($scope, 
							$stateParams,
							$log,
							$state,
							$ionicPopup,
							$ionicHistory,
							$ionicListDelegate,
							OrdenesFactory, 
							$timeout) {
	
	$scope.$on("$ionicView.beforeEnter", function() {		
		$scope.formulario = {
			recoleccion: {
				direccion: {
					hide: true
				},
				fecha: {
					hide: true
				},
				hora: {
					hide: true
				}
			},
			entrega: {
				direccion: {
					disabled: true
				},
				fecha: {
					disabled: true
				},
				hora: {
					disabled: true
				}
			},
			telefono: {
				disabled: true
			},
			formaPago: {
				disabled: true
			},
			cupon: {
				hide: true,
			},
			valido: true,
			productos: {
				eliminar: true
			}
		};

		
	});

	$scope.$on('$ionicView.afterEnter', function(event) {
		
	});
	
	$scope.$on("$ionicView.beforeLeave", function() {
		
	});

	$scope.txt = {
		cancelar: "Suspender pedido",
		siguiente: "TOMAR PEDIDO"
	};

	$scope.eliminarPrenda = function(index) {
		$ionicPopup
		.confirm({
	    	title: 'Eliminar Servicio',
	    	template: '¿Está seguro que desea eliminar este servicio?',
	    	buttons: [
		    	{
		    		text: 'Si',
		    		onTap: function(e) {
		    			$scope.carrito.eliminar(index, 'PRENDA');
		    		}
		    	},
		      	{
			    	text: '<b>No</b>',
			    	type: 'button-positive'
		      	}
		    ]
	    });	    
	};

	$scope.eliminarProducto = function(index) {
		$ionicPopup
		.confirm({
	    	title: 'Eliminar Productos',
	    	template: '¿Está seguro que desea eliminar este pedido?',
	    	buttons: [
		    	{
		    		text: 'Si',
		    		onTap: function(e) {
		    			$scope.carrito.eliminar(index, 'PRODUCTO');
		    		}
		    	},
		      	{
			    	text: '<b>No</b>',
			    	type: 'button-positive'
		      	}
		    ]
	    });	    
	};

	$scope.siguiente = function() {
		if ($scope.formularioValido) {
			$state.go("app.recoleccion-exito")
		}
		else {
			console.log("Formulario incompleto.")
		}
	};

	$scope.formularioValido = true;

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
		    			OrdenesFactory.limpiarOrden();
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
		    			OrdenesFactory.limpiarOrden();
						$ionicHistory.clearHistory();
						$ionicHistory.nextViewOptions({
							disableBack:'true'
						});
						$scope.causaCancelacion();
		    		}
		      	}
		    ]
	    });
	};

	$scope.causaCancelacion = function() {
		$scope.data = "";
		var template = 
			'<ion-list>'+
				'<ion-radio ng-model="data" ng-value="1">Valor elevado</ion-radio>'+
				'<ion-radio ng-model="data" ng-value="2">Manifiesta mala atención</ion-radio>' +
				'<ion-radio ng-model="data" ng-value="3">Prefiere otra empresa</ion-radio>' +
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
		    			OrdenesFactory.limpiarOrden();
						$ionicHistory.clearHistory();
						$ionicHistory.nextViewOptions({
							disableBack:'true'
						});
						$state.go("app.recoleccion-detalle", {indexOrden: $scope.indexOrden});
		    		}
		    	},
		      	{
			    	text: '<b>Enviar</b>',
			    	type: 'button-calm',
		    		onTap: function(e) {
		    			//enviar motivo de suspension de Pedido
		    			OrdenesFactory.limpiarOrden();
						$ionicHistory.clearHistory();
						$ionicHistory.nextViewOptions({
							disableBack:'true'
						});
						$scope.mensajeConfirmacion();
		    		}
		      	}
		    ]
	    });
	};

	$scope.mensajeConfirmacion = function() {
		console.log("Seleccion de motivo: ", $scope.data);

		$ionicPopup
		.confirm({
	    	title: 'La causa por la cual el cliente cancela el pedido fue enviada.',
	    	template: '',
	    	buttons: [
		    	{
		    		text: 'Aceptar',
			    	type: 'button-ligth',
		    		onTap: function(e) {
		    			OrdenesFactory.limpiarOrden();
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

app.controller("ConfirmacionOrdenCtrl", ConfirmacionOrdenCtrl);
