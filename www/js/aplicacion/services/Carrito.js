var CarritoFactory = function(RecursosFactory, 
							PromocionesFactory, 
							$log,
							$state,
							ConfiguracionesFactory){
	/**
	 * [this.items ]
	 * @type [{Object id:String producto o servicio
	 *		tipo:String "PRODUCTO" o "SERVICIO"
	 *		cantidad:Number cantidad agregada}]
	 */
	
	return {
		items: {},

		contProductos: 0,

		contPrendas: 0,

		domicilio: 0,

		totales: {},

		ordenPreparada: false, //bandera que indica si una orden tiene items para poder enviarse
		
		init: function() {
			this.items = {
				productos: {},
				prendas: {}
			};
			this.contPrendas = 0;
			this.contProductos = 0;
		},

		setProductosRecoleccion: function(infoOrden) {
			this.init();

			if (!((typeof infoOrden.recoleccion == 'undefined')
				&& (typeof infoOrden.recoleccion.items == 'undefined')
				&& (typeof infoOrden.recoleccion.items.productos == 'undefined'))) {
				console.log("se agregan por primera vez los productos al carrito.")
				//quitar los items de tipo servicio (puesto que es .items es una cotizacion hecha por cliente)
				for (i in infoOrden.items) {
					if (infoOrden.items[i].tipo == 'PRODUCTO') {
						this.agregar(infoOrden.items[i], 'PRODUCTO', infoOrden.items[i].cantidad);
					}
				}
			}

			this.actualizarContadores();
		},

		/**
		 * agregar un item a la lista de items del carrito
		 * @param  {object} item item de producto o prenda
		 * @param  {string} tipo      'PRODUCTO' o 'PRENDA'
		 * @param  {int} cantidad  cantidad que se adiciona al carrito 
		 * @return {void}
		 */
		agregar : function(item, tipo, cantidad){
			$log.debug("CarritoFactory.agregar()", item, tipo, cantidad);
			
			if(!item){ return; }

			if(tipo == "PRODUCTO") {
				//existe el item en el carrito de compra, aumentar cantidad
				if (typeof this.items.productos[item._id] !== 'undefined'){
					this.items.productos[item._id].cantidad += cantidad;
				} else {
					var index = item._id;
					this.items.productos[index] = item;
					this.items.productos[index].tipo = tipo;
					this.items.productos[index].cantidad = cantidad;	
				}
			} else {
				//no existe hay que agregarlo al carrito de compras
				var index = item.codigo;
				this.items.prendas[index] = item;
			}

			this.actualizarContadores();
			return true;
		},

		disminuir : function(item, tipo, cantidad){
			//$log.debug("CarritoFactory.disminuir()", item, tipo, cantidad);
			//existe el item en el carrito de compra, disminuri cantidad
			if(tipo == "PRODUCTO") {
				if(typeof this.items.productos[item._id] !== 'undefined'){
					this.items.productos[item._id].cantidad -= cantidad;
					if(this.items.productos[item._id].cantidad <= 0){
						this.items.productos[item._id].cantidad = 0;
					}
				}//si no existe no se hace nada
			}

			this.actualizarContadores();
			return true;
		},

		eliminar : function(index, tipo) {
			console.log("CarritoFactory.eliminar", index, tipo, this.items);
			if (tipo == 'PRODUCTO') {
				console.log(this.items.productos[index])
				delete this.items.productos[index];
			} else {
				console.log(this.items.prendas[index])
				delete this.items.prendas[index];
			}
			console.log(this.items)
			this.actualizarContadores();
		},

		cantidad: function(id) {
			return (typeof this.items.productos !== 'undefined' && typeof this.items.productos[id] !== 'undefined') ? this.items.productos[id].cantidad : 0;
		},

		hayProductos: function() {
			var cont = 0; 

			for (var index in this.items.productos) {
				cont += 1;
			}
			return cont > 0;
		},

		calcularPrecioPrenda: function(prenda) {
			return prenda.subservicio.precio;
		},

		actualizarContadores : function(){
			this.contProductos = 0;
			this.contPrendas = 0;

			$log.debug("CarritoFactory.actualizarContadores()", this.items);
			
			for (var i in this.items.productos) {
				this.contProductos += this.items.productos[i].cantidad;
			}

			for (var i in this.items.prendas) {
				this.contPrendas += 1;
			}

			this.ordenPreparada = this.contProductos + this.contPrendas > 0;
			console.log(this.contProductos + this.contPrendas, this.ordenPreparada);
			this.calcularTotales();
		},
		
		calcularTotales : function(){//calcular precios de total y subtotal
			var subtotal = 0, descuento = 0;			
			
			for (var index in this.items.prendas) {
				//precio * cantidad
				
				subtotal += this.calcularPrecioPrenda(this.items.prendas[index])

				//revisar en lista de descuentos del cupon si este item aplica para descuento
				/*if(this.totales.promocion && this.totales.promocion.items[index]){
					//$log.debug("CarritoFactory.calcularTotales: ",	this.totales.promocion, this.totales.promocion.items[index]);
					descuento += item.precio * item.cantidad * (this.totales.promocion.items[index].descuento / 100.0);
				}*/	
			}
			
			for (var index in this.items.productos) {
				//precio * cantidad
				var item = this.items.productos[index];
				subtotal += item.precio * item.cantidad;

				//revisar en lista de descuentos del cupon si este item aplica para descuento
				/*if(this.totales.promocion && this.totales.promocion.items[index]){
					//$log.debug("CarritoFactory.calcularTotales: ",	this.totales.promocion, this.totales.promocion.items[index]);
					descuento += item.precio * item.cantidad * (this.totales.promocion.items[index].descuento / 100.0);
				}*/	
			}
			
			this.totales.descuento = descuento !== 0 ? descuento * -1 : null;
			this.totales.domicilio = ConfiguracionesFactory.getConfiguraciones().domicilio || 0;	
			this.totales.subtotal = subtotal;
			this.totales.total = (subtotal !== 0 ? subtotal + this.domicilio - descuento: 0);

			//$log.debug("CarritoFactory.calcularTotales", this.totales)
			return this.totales;
		},

		/**
		 * [limpiar los items que tienen cantidad 0, deben ser eliminados.]
		 * @return {[type]} [description]
		 */
		limpiar : function(){//limpiar los items que no tienen cantidades.
			//$log.debug("CarritoFactory.limpiar(): antes", this.items);
			for(var i in this.items.productos){
				if(this.items.productos[i].cantidad == 0 ){
					delete this.items.productos[i];
				}
			}
			//$log.debug("CarritoFactory.limpiar(): despues", this.items);
			this.actualizarContadores();
		},


		soloHayProductos : function(items){
			var cont = 0;
			
			if (!items){
				items = this.items;
			}

			for (i in items){
				if (items[i].tipo == 'PRODUCTO'){
					cont++;
				} else {
					return false;
				}
			}

			return !this.servicioDirecto && (cont > 0 ? true : false);
		},

		getProductos: function(items) {
			var productos = [];

			if (!items) {
				items = this.items;
			}

			for (i in items){
				if (items[i].tipo == 'PRODUCTO'){
					productos.push(items[i]);
				}
			}

			return productos;
		},

		/**
		 * [vaciar eliminiar los items del carrito]
		 * @return {[type]} [description]
		 */
		vaciar: function() {
			for (var i in this.items) {
				delete this.items[i];
			}
			this.totales.promocion = null;
			this.actualizarContadores();
		},

		aplicarPromocion: function(promocion) {
			//$log.debug("CarritoFactory.aplicarPromocion", promocion);
			this.totales.promocion = promocion;
			this.actualizarContadores();
		}

	};
};

app.factory('CarritoFactory', CarritoFactory);
