var FotosFactory = function($cordovaCamera,
						$cordovaBarcodeScanner,
						$log) {
	
	var seleccionarFoto = function() {
		var opciones = {
			sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
			quality: 75,
			targetWidth: 310,
			targetHeight: 310,
			allowEdit: true,
			encodingType: Camera.EncodingType.JPEG,
			destinationType: Camera.DestinationType.DATA_URL,
			saveToPhotoAlbum: !0
		};

		return $cordovaCamera
		.getPicture(opciones)
		.then(function(imageData) {
			return imageData;
		}, function(err) {
			// error
			$log.debug("FotosFactory.obtenerFoto(), err", err)
		});
	};

	var tomarFoto = function() {
		var opciones = {
			sourceType: Camera.PictureSourceType.CAMERA,
			quality: 75,
			targetWidth: 310,
			targetHeight: 310,
			allowEdit: true,
			encodingType: Camera.EncodingType.JPEG,
			destinationType: Camera.DestinationType.DATA_URL,
			saveToPhotoAlbum: !0
		};

		return $cordovaCamera
		.getPicture(opciones)
		.then(function(imageData) {
			return imageData;
		}, function(err) {
			// error
			$log.debug("FotosFactory.obtenerFoto(), err", err)
		});
	};

	var escanearCodigo = function() {
		return $cordovaBarcodeScanner
		.scan();
	}

	return {
		seleccionarFoto: seleccionarFoto,
		tomarFoto: tomarFoto,
		escanearCodigo: escanearCodigo
	};
};

app.factory("FotosFactory", FotosFactory);