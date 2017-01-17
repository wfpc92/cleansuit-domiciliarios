var CancelarOrdenFactory = function($ionicPopup,
									$ionicHistory,
									$state,
									$rootScope,
									OrdenesFactory) {
	
	return {
		$scope: null, 

		motivos: [
    		{ texto: "Valor elevado", valor: "0" },
    		{ texto: "Manifiesta mala atención", valor: "1" },
    		{ texto: "Prefiere otra empresa", valor: "2" }
    	],

		cb: {
			pendiente: function() {},
			volverInfoOrden: function() {},
			cancelar: function() {}
		},

		setScope: function(s) {
			this.$scope = s;
		},

		mostrarOrdenPendiente: function() {
			var self = this;

			$ionicPopup
			.confirm({
		    	title: 'Suspender pedido',
		    	template: '',
		    	buttons: [
			    	{
			    		text: 'Pedido pendiente',
				    	type: 'button-calm',
			    		onTap: self.cb.pendiente
			    	},
			      	{
				    	text: '<b>Cancelar Pedido</b>',
				    	type: 'button-calm',
			    		onTap: function(e) {
							self.mostrarMotivos();
			    		}
			      	}
			    ]
		    });
		},

		mostrarMotivos: function() {
			var self = this;	    	
			
			var scope = $rootScope.$new();
			scope.motivos = self.motivos;
	    	scope.motivo = {
				valor: scope.motivos[0].valor
			};

			$ionicPopup
			.confirm({
		    	title: 'Causa por la cual el cliente cancela el pedido',
		    	templateUrl: "templates/app/orden/motivos-cancelacion-orden.html",
		    	scope: scope,
		    	buttons: [
			    	{
			    		text: 'Volver a información de orden',
				    	type: 'button-ligth',
			    		onTap: self.cb.volverInfoOrden
			    	},
			      	{
				    	text: '<b>Enviar</b>',
				    	type: 'button-calm',
			    		onTap: function(e) {
			    			//enviar motivo de suspension de Pedido
							self.mostrarEnviarCancelacion(scope.motivo.valor);
			    		}
			      	}
			    ]
		    });
		},

		mostrarEnviarCancelacion: function(indexMotivo) {
			var self = this;

			console.log("CancelarOrdenFactory.mostrarEnviarCancelacion: indexMotivo: ", indexMotivo);
			OrdenesFactory
			.cancelarOrden(indexMotivo)
			.then(function(res) {
				var txt = "fue enviada.";
				console.log(res)
				if (!res.data.success) {
					txt = "no pudo ser procesada."	
				}

				$ionicPopup
				.confirm({
			    	title: 'La causa por la cual el cliente cancela el pedido '+txt,
			    	template: '',
			    	buttons: [
				    	{
				    		text: 'Aceptar',
					    	type: 'button-ligth',
				    		onTap: self.cb.cancelar
				    	},
				    ]
			    });

			    self.cb.enviar();
			});
		},

		mostrarValidacionCliente: function() {
			var self = this;

			$ionicPopup
			.confirm({
		    	title: 'Validación del cliente',
		    	template: '',
		    	buttons: [
			    	{
			    		text: 'El cliente esta deacuerdo con la orden',
				    	type: 'button-calm',
			    		onTap: self.cb.deacuerdo
			    	},
			      	{
				    	text: '<b>El cliente esta deacuerdo con la orden</b>',
				    	type: 'button-calm',
			    		onTap: function(e) {
							self.mostrarMotivos();
			    		}
			      	}
			    ]
		    });
		}
	};
};

app.factory("CancelarOrdenFactory", CancelarOrdenFactory);
