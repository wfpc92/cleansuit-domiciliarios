var CarritoRecoleccionCtrl = function($scope, 
						$ionicHistory, 
						$state, 
						$stateParams, 
						$ionicPopup,
						OrdenesFactory,
						$log) {
	
	$log.debug("CarritoRecoleccionCtrl");

	$scope.formulario = {
		prendas: {
			eliminar: true
		},
		productos: {
			panel: true
		}
	};

	$scope.$on("$ionicView.beforeEnter", function () {
	});

	$scope.$on("$ionicView.afterLeave", function () {
		console.log("CarritoRecoleccionCtrl.$ionicView.afterLeave")
		$scope.carrito.limpiar();
	});

	$scope.aumentar = function(item, tipo){
		$scope.carrito.agregar(item, tipo, 1);
	};

	$scope.disminuir = function(item, tipo){
		$scope.carrito.disminuir(item, tipo, 1);
	};

	//cancelar orden:
	$scope.cancelarOrden = function() {
		$ionicPopup
		.confirm({
	    	title: 'Cancelar Orden',
	    	template: '¿Está seguro que desea cancelar esta orden?',
	    	buttons: [
		    	{
		    		text: 'Si',
		    		onTap: function(e) {
		    			$scope.causaCancelacion();
		    		}
		    	},
		      	{
			    	text: '<b>No</b>',
			    	type: 'button-positive'
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
		    			$ionicHistory.goBack();
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

	$scope.editarPrenda = function(index) {
		console.log("Editar Prenda ", $scope.carrito.items, index)
		$state.go("app.recoleccion-prenda", {indexPrenda: index});	
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
	
	$scope.siguiente = function() {
		$state.go("app.recoleccion-confirmacion");
	};
};


app.controller('CarritoRecoleccionCtrl', CarritoRecoleccionCtrl);
