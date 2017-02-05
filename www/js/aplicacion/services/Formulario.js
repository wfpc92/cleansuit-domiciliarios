
var FormularioFactory = function(){
	var verificar = function(items) {
		for (var i in items) {
			if (!items[i].entregado) {
				return false;
			}
		}
		return true;
	};

	return {
		init: function() {
			this.titulo= {
				texto: false
			};
			this.orden = {
				titulo: "",
				descripcion: "",
				noHayOrdenes: ""
			};
			this.nombre= {
				disabled: false
			};
			this.recoleccion= {
				direccion: {
					hide: false
				},
				fecha: {
					hide: false
				},
				hora: {
					hide: false
				}
			};
			this.entrega= {
				direccion: {
					disabled: false
				},
				fecha: {
					disabled: false
				},
				hora: {
					disabled: false
				}
			};
			this.telefono = {
				disabled: false
			};
			this.formaPago = {
				hide: false,
				disabled: false
			};
			this.cupon = {
				disabled: false,
				hide: false
			};	
			this.abono = {
				disabled: false,
				hide: false
			};						
			this.prendas = {
				eliminar: false,
				entregar: false,
				cbEliminar: function(){}
			};
			this.productos = {
				panel: false,
				eliminar: false,
				entregar: false,
				cbEliminar: function(){}
			};
			this.totales = {
				hide: false,
			}
			this.cancelar = {
				hide: false,
				texto: ""
			};
			this.siguiente = {
				texto: ""
			};
			this.valido = false;
		},

		verificarEntrega: function(items) {
			this.valido = verificar(items.prendas) && verificar(items.productos);
		}
	};
};

app.factory('FormularioFactory', FormularioFactory);
