var CancelarOrdenFactory = function($ionicPopup,
									$ionicHistory,
									$state,
									OrdenesFactory) {
	
	return {
		$scope: null, 

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

			self.$scope.motivos = {
				m1: "0",
				m2: "1",
				m3: "2",
			};

			self.$scope.motivo = self.$scope.motivos.m1;
			
			var template =
				'<ion-list >'+
					'<ion-radio ng-model="motivo" ng-value="motivos.m1">Valor elevado</ion-radio>'+
					'<ion-radio ng-model="motivo" ng-value="motivos.m2">Manifiesta mala atención</ion-radio>' +
					'<ion-radio ng-model="motivo" ng-value="motivos.m3">Prefiere otra empresa</ion-radio>' +
				'</ion-list>';

			$ionicPopup
			.confirm({
		    	title: 'Causa por la cual el cliente cancela el pedido',
		    	template: template,
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
							self.mostrarEnviarCancelacion();
			    		}
			      	}
			    ]
		    });
		},

		mostrarEnviarCancelacion: function() {
			var self = this;


			OrdenesFactory
			.cancelarOrden(self.$scope.motivo)
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
