var ProductosFactory = function(RecursosFactory,
							$localStorage,
							$log){
	
	var init = function() {
		$localStorage.productos = $localStorage.productos || [{
			_id: 123, 
			url_image: "https://cdn.shopify.com/s/files/1/0229/0839/files/Untitled_design__1.png?2393",
			nombre: "producto 1",
			desc_corta:"descripcin corta del producto 1",
			precio: 23000
		},{
			_id: 123, 
			url_image: "https://cdn.shopify.com/s/files/1/0229/0839/files/Untitled_design__1.png?2393",
			nombre: "producto 1",
			desc_corta:"descripcin corta del producto 1",
			precio: 23000
		},{
			_id: 123, 
			url_image: "https://cdn.shopify.com/s/files/1/0229/0839/files/Untitled_design__1.png?2393",
			nombre: "producto 1",
			desc_corta:"descripcin corta del producto 1",
			precio: 23000
		},{
			_id: 123, 
			url_image: "https://cdn.shopify.com/s/files/1/0229/0839/files/Untitled_design__1.png?2393",
			nombre: "producto 1",
			desc_corta:"descripcin corta del producto 1",
			precio: 23000
		},{
			_id: 123, 
			url_image: "https://cdn.shopify.com/s/files/1/0229/0839/files/Untitled_design__1.png?2393",
			nombre: "producto 1",
			desc_corta:"descripcin corta del producto 1",
			precio: 23000
		}];
	};

	var setProductos = function(productos) {
		init();

		for (var i in $localStorage.productos) {
			delete $localStorage.productos[i];
		}	

		for (var i in productos) {
			$localStorage.productos[i] = productos[i];
		}
	};

	init();
	
	return {
		productos : $localStorage.productos,

		//carga una lista de productos desde el servidor
		cargar: function() {
			return RecursosFactory
			.get('/productos', {})
			.then(function(respuesta) {
				$log.debug("ProductosFactory.cargar()", respuesta);
				if(respuesta){
					setProductos(respuesta.data.productos);
				} 
			});
		}
	};
};

app.factory('ProductosFactory', ProductosFactory);
