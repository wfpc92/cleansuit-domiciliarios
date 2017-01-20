app.config(function($stateProvider,
					$urlRouterProvider,
					$logProvider,
					$provide,
					$compileProvider,
					$ionicConfigProvider,
					$httpProvider,
					$localStorageProvider,
					USER_ROLES) {


	//forzar a ionic que tenga las tabs arriba para todas las plataformas
	$ionicConfigProvider.tabs.position('top');

	$logProvider.debugEnabled(true);

	var toJSON = function(argumentos) {
		var args = null;
		args = [].slice.call(argumentos);
    	args[0] = ["CleanSuit", ': ', typeof args[0] == 'object' ? JSON.stringify(args[0]) : args[0]].join('');

    	if(typeof args == 'object') {
    		for(var i = 1; i < args.length; i++) {
    			if(typeof args[i] == 'object') {
    				args[i] = JSON.stringify(args[i]);
    			}
    		}
    	} else {
				return argumentos;
			}
		return args;
	};

    $provide.decorator('$log', function ($delegate) {
        //Original methods
        var origLog = $delegate.log,
        	origInfo = $delegate.info,
        	origWarn = $delegate.warn,
        	origError = $delegate.error,
        	origDebug = $delegate.debug;

        if ($logProvider.debugEnabled()) {

        	$delegate.log = function () {
                origLog.apply(null, toJSON(arguments));
	        };

	        $delegate.debug = function () {
	            origDebug.apply(null, toJSON(arguments));
	        };
        }

        return $delegate;
    });


	$compileProvider.debugInfoEnabled(false);
	$ionicConfigProvider.scrolling.jsScrolling(false);

	var isAndroid = ionic.Platform.isAndroid();

	$ionicConfigProvider.backButton.text("");
	$ionicConfigProvider.backButton.previousTitleText("");
	$ionicConfigProvider.views.forwardCache(true);
	$ionicConfigProvider.views.maxCache(5);

	$httpProvider.interceptors.push("Interceptor");

	$localStorageProvider.setKeyPrefix('CleanSuit-D-');




	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider

	/**
	 * Rutas para autenticacion
	 */
	.state('autenticacion', {
		url: "/autenticacion",
    	abstract: true,
      	templateUrl: "templates/autenticacion/plantilla.html",
		data: {
	    	rolesAutorizados: [USER_ROLES.public]
	    }
	})

	.state('autenticacion.ingresar', {
		url: '/inicio',
		views: {
        	'contenedor-app' : {
         		templateUrl: "templates/autenticacion/ingresar.html",
        		controller : "IngresarCtrl"
        	}
      	}
	})



	/**
	 * Rutas del dashboard y la aplicacion
	 */
	.state('app', {
		url: '/app',
		abstract: true,
		templateUrl: 'templates/app/menu.html',//aqui estan las tabs,
		data: {
	    	rolesAutorizados: [USER_ROLES.domiciliario]
	    }
	})

	/*
	.state('app.inicio', {
		url: '/inicio',
		views: {
			'panel-contenido': {
				templateUrl: 'templates/app/principal/inicio.html',
				controller: 'AppInicioCtrl'
			}
		}
	})


	.state('app.promociones-detalle', {
		url: '/promociones/detalle/:indexPromocion',
		views: {
			'panel-contenido': {
				templateUrl: 'templates/app/principal/promocion-detalle.html',
				controller: 'PromocionDetalleCtrl'
			}
		}
	})*/


	// vista principal por defecto mostrar ordenes pendientes de recoleccion.
	.state('app.recoleccion', {
		url: '/recoleccion',
		views: {
			'contenedor-recoleccion': {
				templateUrl: 'templates/app/orden/recoleccion/recoleccion.html',
				controller: 'OrdenesEnRecoleccionCtrl'
			}
		}
	})
	.state('app.recoleccion-detalle', {
		url: '/recoleccion-detalle',
		cache: false,
		views: {
			'contenedor-recoleccion': {
				templateUrl: 'templates/app/orden/informacion-orden/informacion-orden.html',
				controller: 'OrdenEnRecoleccionCtrl'
			}
		}
	})
	// Toma
	.state('app.recoleccion-carrito', {
		url: '/recoleccion-carrito',
		cache: false,
		views: {
			'contenedor-recoleccion': {
				templateUrl: 'templates/app/orden/recoleccion/carrito.html',
				controller: 'CarritoRecoleccionCtrl'
			},
			"lista-carrito@app.recoleccion-carrito" : {
				templateUrl: 'templates/app/orden/lista-carrito.html'
			}
		}
	})
	.state('app.recoleccion-productos', {
		url: '/recoleccion-productos',
		cache: false,
		views: {
			'contenedor-recoleccion': {
				templateUrl: 'templates/app/orden/recoleccion/productos.html',
				controller: 'RecoleccionProductosCtrl'
			},
			"productos@app.recoleccion-productos" : {
				templateUrl: 'templates/app/productos/productos.html'
			}
		}
	})
	.state('app.recoleccion-producto', {
		url: '/recoleccion-producto/:indexProducto',
		cache: false,
		views: {
			'contenedor-recoleccion': {
				templateUrl: 'templates/app/orden/recoleccion/producto.html',
				controller: 'RecoleccionProductoCtrl'
			},
			"producto@app.recoleccion-producto" : {
				templateUrl: 'templates/app/productos/producto.html'
			}
		}
	})
	.state('app.recoleccion-prenda', {
		url: '/recoleccion-prenda/:indexPrenda',
		cache: false,
		views: {
			'contenedor-recoleccion': {
				templateUrl: 'templates/app/orden/recoleccion/formulario-prenda.html',
				controller: 'FormularioPrendaCtrl'
			}
		}
	})

	.state('app.recoleccion-confirmacion', {
		url: '/recoleccion-confirmacion',
		cache: false,
		views: {
			'contenedor-recoleccion': {
				templateUrl: 'templates/app/orden/informacion-orden/informacion-orden.html',
				controller: 'ConfirmacionOrdenCtrl'
			},
			"lista-carrito@app.recoleccion-confirmacion" : {
				templateUrl: 'templates/app/orden/lista-carrito.html'
			}
		}
	})

	.state('app.recoleccion-envio', {
		url: '/recoleccion-envio',
		cache: false,
		views: {
			'contenedor-recoleccion': {
				templateUrl: 'templates/app/orden/envio-orden.html',
				controller: 'EnviarRecoleccionCtrl'
			}
		}
	})







	.state('app.entrega', {
		url: '/entrega/',
		views: {
			'contenedor-entrega': {
				templateUrl: 'templates/app/orden/entrega/entrega.html',
				controller: 'OrdenesParaEntregaCtrl'
			}
		}
	})
	.state('app.entrega-detalle', {
		url: '/entrega-detalle',
		cache: false,
		views: {
			'contenedor-entrega': {
				templateUrl: 'templates/app/orden/informacion-orden/informacion-orden.html',
				controller: 'OrdenParaEntregaCtrl'
			}
		}
	})
	.state('app.entrega-envio', {
		url: '/entrega-envio',
		cache: false,
		views: {
			'contenedor-entrega': {
				templateUrl: 'templates/app/orden/envio-orden.html',
				controller: 'EnviarEntregaCtrl'
			}
		}
	})



	//Rutas de opciones de menu
	.state('app.recolectadas', {
		url: '/menu-recolectadas',
		views: {
			'contenedor-menu': {
				templateUrl: 'templates/app/menu/recolectadas/recolectadas.html',
				controller: 'OrdenesRecolectadasCtrl'
			}
		}
	})
	.state('app.recolectada', {
		url: '/menu-recolectada',
		cache: false,
		views: {
			'contenedor-menu': {
				templateUrl: 'templates/app/orden/informacion-orden/informacion-orden.html',
				controller: 'OrdenRecolectadaCtrl'
			},
			"lista-carrito@app.recolectada" : {
				templateUrl: 'templates/app/orden/lista-carrito.html'
			}
		}
	})


	.state('app.entregadas', {
		url: '/menu-entregadas',
		views: {
			'contenedor-menu': {
				templateUrl: 'templates/app/menu/entregadas/entregadas.html',
				controller: 'OrdenesEntregadasCtrl'
			}
		}
	})
	.state('app.entregada', {
		url: '/menu-entregada',
		cache: false,
		views: {
			'contenedor-menu': {
				templateUrl: 'templates/app/orden/informacion-orden/informacion-orden.html',
				controller: 'OrdenEntregadaCtrl'
			},
			"lista-carrito@app.entregada" : {
				templateUrl: 'templates/app/orden/lista-carrito.html'
			}
		}
	})


	

	/*
	app.
	app.sobre-empresa
	*/

	.state('app.venta-productos', {
		url: '/menu-venta-productos',
		views: {
			'contenedor-menu': {
				templateUrl: 'templates/app/menu/venta-productos/venta-productos.html',
				controller: 'VentaProductosCtrl'
			},
			"productos@app.venta-productos" : {
				templateUrl: 'templates/app/productos/productos.html',
				controller: 'VentaProductosCtrl'
			}
		}
	})

	.state('app.venta-producto', {
		url: '/menu-venta-producto/:indexProducto',
		views: {
			'contenedor-menu': {
				templateUrl: 'templates/app/menu/venta-productos/venta-producto.html',
				controller: 'VentaProductoCtrl'
			},
			"producto@app.venta-producto" : {
				templateUrl: 'templates/app/productos/producto.html',
				controller: 'VentaProductoCtrl'
			}
		}
	})

	.state('app.acerca', {
		url: '/acerca',
		views: {
			'contenedor-menu': {
				templateUrl: 'templates/app/menu/acerca/acerca.html',
				controller: 'AcercaCtrl'
			}
		}
	});



	/**
	estado de cliente, reusar, eliminar.
	.state('app.subservicios', {
		url: '/servicios/:indexServicio/subservicios',
		views: {
			'mis-servicios': {
				templateUrl: 'templates/app/servicios/subservicios.html',
				controller: 'SubserviciosCtrl'
			}
		}
	})
	.state('app.subservicio', {
		url: '/servicios/:indexServicio/subservicios/:indexSubservicio',
		views: {
			'mis-servicios': {
				templateUrl: 'templates/app/servicios/subservicio.html',
				controller: 'SubservicioCtrl'
			}
		}
	})


	.state('app.productos', {
		url: '/productos',
		views: {
			'mis-productos': {
				templateUrl: 'templates/app/productos/productos.html',
				controller: 'ProductosCtrl'
			}
		}
	})

	.state('app.producto', {
		url: '/productos/:indexProducto',
		views: {
			'mis-productos': {
				templateUrl: 'templates/app/productos/producto.html',
				controller: 'ProductoCtrl'
			}
		}
	})


	.state('app.carrito', {
		url: '/carrito',
		cache: false,
		views: {
			'mi-carrito': {
				templateUrl: 'templates/app/orden/carrito.html',
				controller: 'CarritoCtrl'
			}
		}
	})


	.state('app.informacion-orden', {
		url: '/informacion-orden',
		cache: false,
		views: {
			'mi-carrito': {
				templateUrl: 'templates/app/orden/informacion-orden.html',
				controller: 'InformacionOrdenCtrl'
			}
		}
	})



	.state('app.realizar-orden', {
		url: '/realizar-orden',
		cache: false,
		views: {
			'mi-carrito': {
				templateUrl: 'templates/app/orden/estado-orden.html',
				controller: 'RealizarOrdenCtrl'
			}
		}
	})




	//Rutas de los items del menu
	.state('app.ordenes-en-proceso', {
		url: '/ordenes-en-proceso',
		cache:false,
		views: {
			'panel-contenido': {
				templateUrl: 'templates/app/historial/ordenes-en-proceso.html',
				controller: 'OrdenesEnProcesoCtrl'
			}
		}
	})

	.state('app.orden-en-proceso', {
		url: '/ordenes-en-proceso/:indexOrden',
		cache:false,
		views: {
			'panel-contenido': {
				templateUrl: 'templates/app/historial/informacion-orden.html',
				controller: 'OrdenEnProcesoCtrl'
			}
		}
	})

	.state('app.historial-ordenes', {
		url: '/historial-ordenes',
		cache:false,
		views: {
			'panel-contenido': {
				templateUrl: 'templates/app/historial/historial-ordenes.html',
				controller: 'HistorialOrdenesCtrl'
			}
		}
	})

	.state('app.historial-orden', {
		url: '/historial-ordenes/:indexOrden',
		cache:false,
		views: {
			'panel-contenido': {
				templateUrl: 'templates/app/historial/informacion-orden.html',
				controller: 'HistorialOrdenCtrl'
			}
		}
	})

	.state('app.perfil', {
		url: '/perfil',
		views: {
			'panel-contenido': {
				templateUrl: 'templates/app/principal/perfil.html',
				controller: 'PerfilCtrl'
			}
		}
	})

	.state('app.about', {
		url: '/about',
		views: {
			'panel-contenido': {
				templateUrl: 'templates/app/principal/acerca.html',
				controller: 'AcercaCtrl'
			}
		}
	})*/

	//$urlRouterProvider.otherwise('/autenticacion/inicio');
	$urlRouterProvider.otherwise( function($injector, $location) {
    	var $state = $injector.get("$state");
    	$state.go("autenticacion.ingresar");
    });

});
