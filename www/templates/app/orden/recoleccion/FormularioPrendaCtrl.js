var FormularioPrendaCtrl = function($scope,
							$stateParams,
							$log,
							$state,
							$ionicPopup,
							$ionicHistory,
							$ionicListDelegate,
							ServiciosFactory,
							FotosFactory,
							$timeout) {

	$log.debug("FormularioServicioCtrl", $scope.$id);

	$scope.$watchGroup([
			'prenda.codigo',
			'prenda.subservicio'
		], function(newV, oldV) {
		if (newV[0] && newV[1]) {
			$scope.formulario.valido = true;
		} else {
			$scope.formulario.valido = false;
		}
		console.log("Watch$$$$$: ",newV, oldV, $scope.formulario.valido);
	});

	$scope.$on("$ionicView.beforeEnter", function() {
		$scope.servicios = ServiciosFactory.servicios;
		//la informacionde la prenda, en caso de edicion se obtiene la informaion de la
		$scope.indexPrenda = $stateParams.indexPrenda;
		$scope.esNueva = $scope.indexPrenda.length == 0;
		console.log("index prenda :" + $scope.indexPrenda+ ":", $scope.esNueva, $scope.indexPrenda.length)
		
		$scope.prenda = $scope.esNueva ? { fotos: [] } : $scope.carrito.items.prendas[$scope.indexPrenda];

		console.log("agregar/editar prenda: (", $scope.indexPrenda.length, ")", $scope.carrito.items)
		console.log("prenda vacia/editable: ", $scope.prenda);
		$scope.formulario.init();
		$scope.formulario.cancelar.texto = "Cancelar prenda";
		$scope.formulario.siguiente.texto = "GUARDAR PRENDA";
		$scope.formulario.valido = false;
	});

	$scope.eliminarFoto = function(index) {
		$ionicPopup
		.confirm({
	    	title: 'Eliminar Foto',
	    	template: '¿Está seguro que desea eliminar esta foto?',
	    	buttons: [
		    	{
		    		text: 'Si',
		    		onTap: function(e) {
		    			console.log("eliminar fotos...", index)
		    			delete $scope.prenda.fotos.splice(index, 1);
		    		}
		    	},
		      	{
			    	text: '<b>No</b>',
			    	type: 'button-positive'
		      	}
		    ]
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
				$scope.prenda.codigo = codigo.text;
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
		if (!$scope.esNueva) {
			$scope.carrito.eliminarPrenda($scope.prenda.codigo, function() {
				$ionicHistory.goBack();
			});
		} else {
			$ionicPopup
			.confirm({
		    	title: 'Cancelar Servicio',
		    	template: '¿Está seguro que desea cancelar este servicio?',
		    	buttons: [
			    	{
			    		text: 'Si',
			    		onTap: function(e) {
			    			$ionicHistory.goBack();
			    		}
			    	},
			      	{
				    	text: '<b>No</b>',
				    	type: 'button-positive'
			      	}
			    ]
		    });
		}
	};

	var mostrarErrorCamara = function(err) {
		$ionicPopup
		.alert({
	    	title: 'Camara no disponible',
	    	template: 'El dispositivo no permite acceso a la camara. Reportar este inconveniente con el administrador. '+err
	    });
	};

	$scope.siguiente = function() {
		var agregar = false;

		console.log("FormularioServicioCtrl.siguiente", $scope.formulario.valido)
		if ($scope.formulario.valido && (typeof $scope.prenda.subservicio !== 'undefined')) {
			
			// asignar nombre a cada fotografia basado en codigo y fecha actual.
			for (var i in $scope.prenda.fotos) {
				$scope.prenda.fotos[i].nombre = "prenda-" + $scope.prenda.codigo + "-" + (new Date()).getTime() + ".jpg";
			}

			if ($scope.esNueva) {
				agregar = $scope.carrito.agregar($scope.prenda, 'PRENDA', 1);
			}

			$state.go("app.recoleccion-carrito");

			/*if (!agregar) {
				mostrarAlertaCodigoDuplicado();
			} else {
				/*ServiciosFactory
				.validarCodigoPrenda()
				.then(function(res) {
					if(res.data.sucess) {*/

					/*} else {
						mostrarAlertaCodigoDuplicado();
					}
				});
			}*/
			
		} else {
			$ionicPopup
			.alert({
		    	title: 'Formulario Incompleto',
		    	template: 'Complete los campos para continuar',
		    });
		}
	};

	var mostrarAlertaCodigoDuplicado = function() {
		$ionicPopup
		.alert({
	    	title: 'Código Duplicado',
	    	template: 'El codigo que se asignó a esta prenda ya existe.',
	    });
	};

	//tomar foto de prenda y agregar a lista servicio.fotos
	$scope.tomarFoto = function() {
		FotosFactory
		.tomarFoto()
		.then(function(imgData){
			if(imgData) {
				$scope.prenda.fotos.push({
					src: "data:image/jpeg;base64," + imgData
				});
			} else {
				//aqui no se sabe si ocurrio error o si cancelo...
			}
			$log.debug("FormularioServicioCtrl: termina seleccion de foto.");
		}, function(err) {
			//se cancela la seleccion de fotos.
			$log.debug("FormularioServicioCtrl.tomarFoto(), err", err);
			mostrarErrorCamara(err);
		});
	};

	
};


app.controller("FormularioPrendaCtrl", FormularioPrendaCtrl);
