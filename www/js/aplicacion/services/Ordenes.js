var OrdenesFactory = function(UsuarioFactory,
							CarritoFactory,
							RecursosFactory,
							$localStorage,
							$log){
	var _orden = null, 
		_ultimaOrden = null;

	var init = function() {
		$localStorage.ordenesEnRecoleccion = [
			{},{},{}
		];
		$localStorage.ordenesParaEntrega = [
			{},{},{}
		];
		$localStorage.ordenesRecogidas = [
			{},{},{}
		];
		$localStorage.ordenesEntregadas = [
			{},{},{}
		];
		//$localStorage.ordenesEnRecoleccion || [];
		//$localStorage.historialOrdenes = $localStorage.historialOrdenes || [];	
	};

	/*var setOrdenesEnProceso = function(ordenesEnRecoleccion) {
		init();

		for (var i in $localStorage.ordenesEnRecoleccion) {
			delete $localStorage.ordenesEnRecoleccion[i];
		}
		
		for (var i in ordenesEnRecoleccion) {
			$localStorage.ordenesEnRecoleccion[i] = ordenesEnRecoleccion[i];
		}
	};

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
		ordenesEnRecoleccion: $localStorage.ordenesEnRecoleccion,

		ordenesParaEntrega: $localStorage.ordenesParaEntrega,

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
		
		limpiarOrden: function() {
			_orden = null;
			CarritoFactory.vaciar();
		}*/
	};

};

app.factory('OrdenesFactory', OrdenesFactory);
