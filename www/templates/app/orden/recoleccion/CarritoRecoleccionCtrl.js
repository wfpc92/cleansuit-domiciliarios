var CarritoRecoleccionCtrl = function($scope, 
						$ionicHistory, 
						$state, 
						$stateParams, 
						$ionicPopup,
						OrdenesFactory,
						CarritoFactory,
						$log) {
	
	$log.debug("CarritoRecoleccionCtrl");
	
	//se ejecuta al dejar la vista, limpiar carrito.
	$scope.$on("$ionicView.afterLeave", function(){
		$scope.cancelarOrden();
		$log.debug("CarritoRecoleccionCtrl.leave, limpiar####################################################################################limpiar####################################################################################limpiar####################################################################################limpiar####################################################################################limpiar####################################################################################")
		console.log("CarritoRecoleccionCtrl.leave, limpiar####################################################################################limpiar####################################################################################limpiar####################################################################################limpiar####################################################################################limpiar####################################################################################")
		//$scope.carrito.limpiar();
				
		/*
		$ionicHistory.clearHistory();
		$ionicHistory.nextViewOptions({
			disableBack:'true'
		})
		*/
	});


	$scope.$on("$ionicView.leave", function(){
		$scope.cancelarOrden();
		$log.debug("CarritoRecoleccionCtrl.leave, limpiar####################################################################################limpiar####################################################################################limpiar####################################################################################limpiar####################################################################################limpiar####################################################################################")
		console.log("CarritoRecoleccionCtrl.leave, limpiar####################################################################################limpiar####################################################################################limpiar####################################################################################limpiar####################################################################################limpiar####################################################################################")
		//$scope.carrito.limpiar();
				
		/*
		$ionicHistory.clearHistory();
		$ionicHistory.nextViewOptions({
			disableBack:'true'
		})
		*/
	});


	$scope.$on("$ionicView.beforeLeave", function(){
		$scope.cancelarOrden();
		$log.debug("CarritoRecoleccionCtrl.leave, limpiar####################################################################################limpiar####################################################################################limpiar####################################################################################limpiar####################################################################################limpiar####################################################################################")
		console.log("CarritoRecoleccionCtrl.leave, limpiar####################################################################################limpiar####################################################################################limpiar####################################################################################limpiar####################################################################################limpiar####################################################################################")
		//$scope.carrito.limpiar();
				
		/*
		$ionicHistory.clearHistory();
		$ionicHistory.nextViewOptions({
			disableBack:'true'
		})
		*/
	});

	$scope.$on("$ionicView.beforeEnter", function () {
		$scope.banderas.swp=false;
		$scope.banderas.sws=false;
		$scope.indexOrden = $stateParams.indexOrden;
		$scope.infoOrden = OrdenesFactory.ordenesRecoleccion[$scope.indexOrden];
		$scope.carrito = CarritoFactory;
		console.log("CarritoRecoleccionCtrl", $scope.indexOrden, $scope.carrito.items);
	});

	$scope.aumentar = function(item, tipo){
		$scope.carrito.agregar(item, tipo, 1);
	};

	$scope.disminuir = function(item, tipo){
		$scope.carrito.disminuir(item, tipo, 1);
	};

	//cancelar orden:
	$scope.cancelarOrden = function() {
		$ionicPopup
		.confirm({
	    	title: 'Cancelar Orden',
	    	template: '¿Está seguro que desea cancelar esta orden?',
	    	buttons: [
		    	{
		    		text: 'Si',
		    		onTap: function(e) {
		    			OrdenesFactory.limpiarOrden();
						$ionicHistory.clearHistory();
						$ionicHistory.nextViewOptions({
							disableBack:'true'
						});
						$state.go("app.recoleccion");
		    		}
		    	},
		      	{
			    	text: '<b>No</b>',
			    	type: 'button-positive'
		      	}
		    ]
	    });
	};

	$scope.agregarServicio = function() {
		$state.go("app.recoleccion-servicio", {indexOrden: $scope.indexOrden});
	};

	$scope.agregarProductos = function() {
		$state.go("app.recoleccion-productos", {indexOrden: $scope.indexOrden});		
	};
};


app.controller('CarritoRecoleccionCtrl', CarritoRecoleccionCtrl);
