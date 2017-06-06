	var ConfirmacionOrdenCtrl = function($scope, 
								$stateParams,
								$log,
								$state,
								$ionicPopup,
								$ionicHistory,
								$ionicListDelegate,
								OrdenesFactory,
								CancelarOrdenFactory, 
								$timeout) {
		
		$log.debug("VentaProductosCtrl", $scope.$id);
		
		$scope.$on('$ionicView.beforeEnter', function(event) {
			$scope.formulario.init();
			$scope.formulario.nombre.disabled = true;
			$scope.formulario.docId.disabled = true;
			$scope.formulario.recoleccion.direccion.disabled = true;
			$scope.formulario.recoleccion.fecha.disabled = true;
			$scope.formulario.recoleccion.hora.disabled = true;
			$scope.formulario.entrega.direccion.disabled = true;
			$scope.formulario.entrega.fecha.disabled = true;
			$scope.formulario.entrega.hora.disabled = true;
			$scope.formulario.telefono.disabled = true;
			$scope.formulario.formaPago.disabled = true;
			$scope.formulario.formaPago.editable = true;
			$scope.formulario.cupon.disabled = true;
			$scope.formulario.prendas.eliminar = true;
			$scope.formulario.productos.eliminar = true;
			$scope.formulario.cancelar.texto = "Validación del cliente";
			$scope.formulario.siguiente.texto = "REALIZAR ORDEN";
			$scope.formulario.valido = false;

			$scope.validoCliente =  false;
			$scope.validoCampos = false;
			$scope.validoAbono = false;

		});
		
		var esNumero = function(n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		};

		$scope.$watchGroup([ 
			'carrito.infoOrden.orden.abono'
			], function(nv, ov) {
				if (nv[0]) {
					$scope.validoAbono = true;
					$scope.carrito.calcularTotales();
				} else {
					$scope.validoAbono = false;
				}
			});

		$scope.validar = function() {
			$scope.validoAbono = esNumero($scope.carrito.infoOrden.orden.abono);
			$scope.carrito.calcularTotales();
			$scope.validoCampos = $scope.carrito.contProductos + $scope.carrito.contPrendas > 0;
			$scope.formulario.valido = $scope.validoCliente && $scope.validoCampos && $scope.validoAbono;
		};

		$scope.siguiente = function() {
			if ($scope.formulario.valido) {
				$state.go("app.recoleccion-envio")
			}
			else {
				console.log("Formulario incompleto.")
			}
		};

		$scope.cancelar = function() {
			CancelarOrdenFactory.$scope = $scope;
			CancelarOrdenFactory.textos.volverInfoOrden = "Volver a información de orden";
			CancelarOrdenFactory.cb = {
				deacuerdo: function() {
					$scope.validoCliente = true;
			    	$scope.validar();
				},
				
				volverInfoOrden: function(e) {
					
				},

				enviar: function(e) {
					$scope.carrito.vaciar();
				},

				cancelar: function(e) {
					$ionicHistory.clearHistory();
					$ionicHistory.nextViewOptions({
						disableBack:'true'
					});
					$state.go("app.recoleccion");
				},
			};

			CancelarOrdenFactory.mostrarValidacionCliente();
		};
	};

	app.controller("ConfirmacionOrdenCtrl", ConfirmacionOrdenCtrl);
