var CarritoRecoleccionCtrl = function($scope, 
						$ionicHistory, 
						$state, 
						$stateParams, 
						$ionicPopup,
						OrdenesFactory,
						$log) {
	
	$log.debug("CarritoRecoleccionCtrl");

	$scope.$on("$ionicView.beforeEnter", function () {
		$scope.indexOrden = $stateParams.indexOrden;
		$scope.infoOrden = OrdenesFactory.ordenesRecoleccion[$scope.indexOrden];
		console.log("CarritoRecoleccionCtrl", $scope.indexOrden, $scope.carrito.items);
	});

	$scope.$on("$ionicView.afterLeave", function () {
		console.log("CarritoRecoleccionCtrl.$ionicView.afterLeave")
		$scope.carrito.limpiar();
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

	$scope.agregarPrenda = function() {
		$state.go("app.recoleccion-prenda", {indexOrden: $scope.indexOrden});
	};

	$scope.editarPrenda = function(index) {
		console.log("Editar Prenda ", $scope.carrito.items, index)
		$state.go("app.recoleccion-prenda", {indexOrden: $scope.indexOrden, indexPrenda: index});	
	};

	$scope.eliminarPrenda = function(index) {
		$ionicPopup
		.confirm({
	    	title: 'Eliminar Servicio',
	    	template: '¿Está seguro que desea eliminar este servicio?',
	    	buttons: [
		    	{
		    		text: 'Si',
		    		onTap: function(e) {
		    			$scope.carrito.eliminar(index, 'PRENDA');
		    		}
		    	},
		      	{
			    	text: '<b>No</b>',
			    	type: 'button-positive'
		      	}
		    ]
	    });	    
	};

	$scope.agregarProductos = function() {
		$state.go("app.recoleccion-productos", {indexOrden: $scope.indexOrden});
	};

	$scope.siguiente = function() {
		$state.go("app.recoleccion-confirmacion", {indexOrden: $scope.indexOrden});
	};
};


app.controller('CarritoRecoleccionCtrl', CarritoRecoleccionCtrl);
