var OrdenesFactory = function(UsuarioFactory,
							CarritoFactory,
							RecursosFactory,
							$localStorage,
							$log){
	var _orden = null, 
		_ultimaOrden = null;

	var init = function() {
		$localStorage.ordenesRecoleccion = $localStorage.ordenesRecoleccion || [];
		$localStorage.ordenesEntrega = $localStorage.ordenesEntrega || [];
		$localStorage.ordenesRecolectadas = $localStorage.ordenesRecolectadas || [];
		$localStorage.ordenesEntregadas = $localStorage.ordenesEntregadas || [];	
	};
	
	var setOrdenes = function(ordenesLocales, ordenesNuevas) {
		init();

		ordenesLocales.splice(0,ordenesLocales.length);
		//ordenesLocales = [];

		for (var i in ordenesNuevas) {
			ordenesLocales[i] = ordenesNuevas[i];
		}
	};

	init();

	return {
		ordenesRecoleccion: $localStorage.ordenesRecoleccion,

		ordenesEntrega: $localStorage.ordenesEntrega,

		ordenesRecolectadas: $localStorage.ordenesRecolectadas,

		ordenesEntregadas: $localStorage.ordenesEntregadas,

		//cargar ordenes asignadas de recoelccion y entrega.
		cargarAsignadas: function() {
			return RecursosFactory
			.get('/ordenes/asignadas', {})
			.then(function(respuesta) {
				console.log("OrdenesFactory.cargarAsignadas()", respuesta)
				if(respuesta.data.success) {
					setOrdenes($localStorage.ordenesRecoleccion,  respuesta.data.ordenesRecoleccion);
					setOrdenes($localStorage.ordenesRecolectadas, respuesta.data.ordenesRecolectadas);
					setOrdenes($localStorage.ordenesEntrega, respuesta.data.ordenesEntrega);
					setOrdenes($localStorage.ordenesEntregadas, respuesta.data.ordenesEntregadas);
				}
			});
		},

		soloHayProductos : function(infoOrden){
			var cont = 0;
			var items = infoOrden.items;

			for (i in items){
				if (items[i].tipo == 'PRODUCTO'){
					cont++;
				} else {
					return false;
				}
			}
			console.log("Servicio directo?: ", infoOrden.orden.servicioDirecto);
			return !infoOrden.orden.servicioDirecto && (cont > 0 ? true : false);
		},

		limpiarOrden: function() {
			_orden = null;
			CarritoFactory.vaciar();
		},

		iniciarRecoleccion: function(infoOrden) {
			infoOrden.recoleccion = infoOrden.recoleccion || {};
		},

		iniciarEntrega: function(infoOrden) {
			infoOrden.entrega = infoOrden.entrega || {};
		},

		cancelarOrden: function(motivo) {
			var self = this;
			console.log("OrdenesFactory.cancelarOrden() motivo: ", motivo)
			return RecursosFactory
			.post('/ordenes/cancelar', {
				orden_id: CarritoFactory.infoOrden._id, 
				motivo: motivo
			})
			.then(function(respuesta) {
				console.log("OrdenesFactory.cancelarOrden()", respuesta)
				self.cargarAsignadas()
				.then(function() {
					
				});
				return respuesta;	
			});
		},

		enviarRecolectada: function(cbkInicio, cbkExito, cbkFracaso, cbkProgreso) {
			var self = this, 
				imagenes = [];
			
			CarritoFactory.infoOrden.recoleccion = {
				items: JSON.parse(JSON.stringify(CarritoFactory.items)), 
			};

			CarritoFactory.infoOrden.estado = 'recolectada';
			
			for (var index  in CarritoFactory.items.prendas) {
				// por cada prenda se sacan el contenidod e las fotos en formato base/64
				var prenda = CarritoFactory.items.prendas[index];
				imagenes[prenda.codigo] = [];
				
				//por cada una de las imagens se almacena en un vector de caracteres (formato base/64)
				for (var j in prenda.fotos) {
					var fotos = prenda.fotos[j];
					imagenes[prenda.codigo].push(fotos); //{nombre: string, src: string}
					
					//se eliminan las fotos de la informacion de orden, sino se eliminan la peticion web devuelve error
					//por longitud de la peticion.				
					CarritoFactory.infoOrden.recoleccion.items.prendas[index].fotos[j].src = null;
					delete CarritoFactory.infoOrden.recoleccion.items.prendas[index].fotos[j].src;
				}

			}

			return RecursosFactory
			.put('/ordenes/' + CarritoFactory.infoOrden._id, CarritoFactory.infoOrden, {
				imagenes: imagenes,
			})
			.then(function(res) {
				console.log("OrdenesFactory.enviarRecolectada", res)
				return res;
			});
		},

		enviarEntregada: function() {
			var self = this;
			CarritoFactory.infoOrden.entrega = {
				items: CarritoFactory.items, 
			};
			CarritoFactory.infoOrden.estado = 'entregada';

			return RecursosFactory
			.put('/ordenes/'+CarritoFactory.infoOrden._id, CarritoFactory.infoOrden)
			.then(function(respuesta) {
				console.log("OrdenesFactory.enviarEntregada()", respuesta)
				self.cargarAsignadas()
				.then(function() {
					
				});
				return respuesta;	
			});
		},

		enviarVentaDirecta: function() {
			var self = this;
			$log.debug("OrdenFactory.enviarVentaDirecta(): ", CarritoFactory.infoOrden);	
			
			CarritoFactory.infoOrden.entrega = {
				items: CarritoFactory.items, 
			};
			
			return RecursosFactory
			.post("/ordenes/venta-directa", CarritoFactory.infoOrden)
			.then(function(response) {
				console.log("OrdenesFactory.enviarVentaDirecta(): ", response);
				self.limpiarOrden();
				self.cargarAsignadas();
			});
		}
	};

};

app.factory('OrdenesFactory', OrdenesFactory);
