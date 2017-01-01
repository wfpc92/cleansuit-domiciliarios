var CarritoRecoleccionCtrl = function($scope, 
						$ionicHistory, 
						$state, 
						$stateParams, 
						$ionicPopup,
						OrdenesFactory,
						CarritoFactory,
						$log) {
	
	$log.debug("CarritoRecoleccionCtrl");
	


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

	$scope.siguiente = function() {
		$state.go("app.recoleccion-confirmacion");
	};
};


app.controller('CarritoRecoleccionCtrl', CarritoRecoleccionCtrl);
