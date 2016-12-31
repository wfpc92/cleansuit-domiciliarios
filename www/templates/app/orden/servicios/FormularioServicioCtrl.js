var FormularioServicioCtrl = function($scope,
							$stateParams,
							$log,
							$state,
							$ionicPopup,
							$ionicHistory,
							$ionicListDelegate,
							OrdenesFactory,
							ServiciosFactory,
							FotosFactory,
							CarritoFactory,
							$timeout) {

	$log.debug("FormularioServicioCtrl");



	$scope.$on("$ionicView.beforeEnter", function() {
		$scope.indexOrden = $stateParams.indexOrden;
		$scope.infoOrden = OrdenesFactory.ordenesRecoleccion[$scope.indexOrden];
		$scope.infoOrden.prendas = $scope.infoOrden.prendas || [];
		$scope.servicios = ServiciosFactory.servicios;
		$scope.nuevoItem = {};
		$scope.prenda = {
			fotos: []
		};
	});

	$scope.$on('$ionicView.afterEnter', function(event) {

	});

	$scope.$on("$ionicView.beforeLeave", function() {

	});

	//tomar foto de prenda y agregar a lista servicio.fotos
	$scope.tomarFoto = function() {
		FotosFactory
		.tomarFoto()
		.then(function(imgData){
			if(imgData) {
				$scope.servicio.fotos.push({
					src: "data:image/jpeg;base64," + imgData
				});
				$log.debug("FormularioServicioCtrl: termina seleccion de foto.");
			}
		}, function(err) {
			//se cancela la seleccion de fotos.
			$log.debug("FormularioServicioCtrl.tomarFoto(), err", err);
			mostrarErrorCamara(err);
		});
	};

	$scope.escanearCodigo = function() {
		FotosFactory
		.escanearCodigo()
		.then(function(codigo){
			$log.debug("We got a barcode " +
                "Result: " + codigo.text + " " +
                "Format: " + codigo.format + " " +
                "Cancelled: " + codigo.cancelled);
			if(codigo && !codigo.cancelled) {
				$scope.servicio.codigo_prenda = codigo.text;
				$log.debug("FormularioServicioCtrl: termina escaneo de codigo.");
			}
		}, function(err) {
			console.log(err)
			//se cancela la seleccion de fotos.
			$log.debug("FormularioServicioCtrl.escanearCodigo(), err", err);
			mostrarErrorCamara(err);
		});
	};

	$scope.cancelar = function() {
		$ionicPopup
		.confirm({
	    	title: 'Cancelar Orden',
	    	template: '¿Está seguro que desea cancelar esta orden?',
	    	buttons: [
		    	{
		    		text: 'Si',
		    		onTap: function(e) {
		    			$ionicHistory.nextViewOptions({
							disableBack:'true'
						});
						$state.go("app.recoleccion-carrito", {indexOrden: $scope.indexOrden});
		    		}
		    	},
		      	{
			    	text: '<b>No</b>',
			    	type: 'button-positive'
		      	}
		    ]
	    });

	};

	var mostrarErrorCamara = function(err) {
		$ionicPopup
		.alert({
	    	title: 'Camara no disponible',
	    	template: 'El dispositivo no permite acceso a la camara. Reportar este inconveniente con el administrador. '+err
	    });
	};

	$scope.cargarSubservicios = function(index) {
		//console.log($scope.prenda)
	};

	$scope.txt = {
		cancelar: "Cancelar Prenda",
		siguiente: "GUARDAR PRENDA"
	};

	$scope.siguiente = function() {
		console.log("FormularioServicioCtrl.siguiente", $scope.formularioValido)
		if ($scope.formularioValido && (typeof $scope.nuevoItem.subservicio !== 'undefined')) {
			$scope.nuevoItem.subservicio.prenda = $scope.prenda;
			$scope.nuevoItem.subservicio.servicio = $scope.nuevoItem.servicio;

			if (!CarritoFactory.agregar($scope.nuevoItem.subservicio, 'SUBSERVICIO', 1)) {
				mostrarAlertaCodigoDuplicado();
			} else {
				/*ServiciosFactory
				.validarCodigoPrenda()
				.then(function(res) {
					if(res.data.sucess) {*/
						$state.go("app.recoleccion-carrito", {indexOrden: $scope.indexOrden});
					/*} else {
						mostrarAlertaCodigoDuplicado();
					}
				});*/
			}
			
		}
		else {
			$ionicPopup
			.alert({
		    	title: 'Formulario Incompleto',
		    	template: 'Complete los campos para continuar',
		    });
		}
	};

	$scope.formularioValido = true;

	var mostrarAlertaCodigoDuplicado = function() {
		$ionicPopup
		.alert({
	    	title: 'Código Duplicado',
	    	template: 'El codigo que se asignó a esta prenda ya existe.',
	    });
	};

	/*
	$scope.$watch('servicio', function(oldV, newV) {
		console.log(oldV, newV)
	});
	*/

	/*
	//cancelar orden:
	$scope.cancelar = function() {
		$ionicPopup
		.confirm({
	    	title: 'Suspender Pedido',
	    	template: '',
	    	buttons: [
		    	{
		    		text: 'Pedido Pendiente',
			    	type: 'button-positive',
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
			    	type: 'button-positive',
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
			    	type: 'button-positive',
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
	};*/
};


app.controller("FormularioServicioCtrl", FormularioServicioCtrl);
