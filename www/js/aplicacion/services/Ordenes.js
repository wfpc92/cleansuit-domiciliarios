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
		

		$localStorage.ordenesRecogidas = [
			{},{},{}
		];
		$localStorage.ordenesEntregadas = [
			{},{},{}
		];
		//$localStorage.ordenesEnRecoleccion || [];
		//$localStorage.historialOrdenes = $localStorage.historialOrdenes || [];	
	};
	
	var setOrdenesEntrega = function(ordenesEntrega) {
		init();

		for (var i in $localStorage.ordenesEntrega) {
			delete $localStorage.ordenesEntrega[i];
		}
		
		for (var i in ordenesEntrega) {
			$localStorage.ordenesEntrega[i] = ordenesEntrega[i];
		}
	};
	
	var setOrdenesRecoleccion = function(ordenesRecoleccion) {
		init();

		for (var i in $localStorage.ordenesRecoleccion) {
			delete $localStorage.ordenesRecoleccion[i];
		}
		
		for (var i in ordenesRecoleccion) {
			$localStorage.ordenesRecoleccion[i] = ordenesRecoleccion[i];
		}
	};

	/*

	var setHistorialOrdenes = function(historialOrdenes) {
		init();

		for (var i in $localStorage.historialOrdenes) {
			delete $localStorage.historialOrdenes[i];
		}
		
		
		for (var i in historialOrdenes) {
			$localStorage.historialOrdenes[i] = historialOrdenes[i];
		}
	};

	function nuevaOrden() {
		_orden = {
			recoleccion: {
				direccion: '',
				posicion:'',
				fecha: null,
				hora:''
			},
			entrega : {
				direccion: '',
				posicion:'',
				fecha: null,
				hora:''
			},
			formaPago : '',
			telefono: '',
			abono: '',
			cupon: '',
			terminosCondiciones : false
		};
		
		_orden.recoleccion.direccion = UsuarioFactory.getUsuario().direccion;
		_orden.entrega.direccion = UsuarioFactory.getUsuario().direccion;
		_orden.telefono = UsuarioFactory.getUsuario().telefono;
	};*/

	init();

	return {
		ordenesRecoleccion: $localStorage.ordenesRecoleccion,

		ordenesEntrega: $localStorage.ordenesEntrega,

		ordenesRecogidas: $localStorage.ordenesRecogidas,

		ordenesEntregadas: $localStorage.ordenesEntregadas,

		/*getOrden: function() {
			if(!_orden) {
				nuevaOrden();
			}
			return _orden;
		},

		getUltimaOrden: function() {
			return _ultimaOrden;
		},

		enviarOrden : function() { 
			var self = this, orden = {
				orden: _orden,
				items: CarritoFactory.items
			};
			orden.orden.servicioDirecto = CarritoFactory.servicioDirecto;	
			orden.orden.totales = CarritoFactory.totales;		
			
			$log.debug("OrdenFactory.enviarOrden(): ", orden);	
			return RecursosFactory
			.post("/ordenes", orden)
			.then(function(response) {
				$log.debug("OrdenesFactory.realizarOrden(): ", response);
				self.limpiarOrden();
				_ultimaOrden = response.data.orden;
				self.cargarOrdenesEnRecoleccion();
			});
		},
		
		cargarOrdenesEnRecoleccion: function() {
			return RecursosFactory
			.get('/ordenes/en-proceso', {})
			.then(function(respuesta) {
				$log.debug("OrdenesFactory.cargarOrdenesEnRecoleccion()", respuesta)
				if(respuesta.data.success) {
					setOrdenesEnProceso(respuesta.data.ordenes);
				}
			});
		},

		cargarHistorialOrdenes: function() {
			return RecursosFactory
			.get('/ordenes/historial', {})
			.then(function(respuesta) {
				$log.debug("OrdenesFactory.cargarOrdenesEnRecoleccion()", respuesta)
				if(respuesta.data.success) {
					setHistorialOrdenes(respuesta.data.ordenes);
				}
			});
		},
		*/
		
		//cargar ordenes asignadas de recoelccion y entrega.
		cargarAsignadas: function() {
			return RecursosFactory
			.get('/ordenes/asignadas', {})
			.then(function(respuesta) {
				console.log("OrdenesFactory.cargarAsignadas()", respuesta)
				if(respuesta.data.success) {
					setOrdenesRecoleccion(respuesta.data.ordenesRecoleccion);
					setOrdenesEntrega(respuesta.data.ordenesEntrega);
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
		}
	};

};

app.factory('OrdenesFactory', OrdenesFactory);
