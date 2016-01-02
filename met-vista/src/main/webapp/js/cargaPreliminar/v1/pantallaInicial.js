

jQuery(document).ready(function (){
	// Funcion que se utiliza para hacer la carga del archivo del componente  UploadFile
	var v = jQuery("#errores").val()
	
	jQuery('form[id$="Form"]').fileupload({
		dataType: 'json',
		done: function(e, data) {
		successViewFunction(data._response.result)
		},
		fail:errorViewFunction,
		replaceFileInput: false,
		autoUpload : false,
		});
		generarCombosAmbito("combosCargaPreliminar");
    	// Si la llamada es un callback, verificar si se ha llegado a esta pantalla,
    	// con errores menores a 50. 
    	if(v!=""){
    		jQuery("#ramoCombo").val(jQuery("#setRamo").val())
    		jQuery("#ramoCombo").trigger( "change" )
    		jQuery("#unidadCombo").val(jQuery("#setUr").val())
    	}
    	
   jQuery("#unidadCombo").on('change', function(){
	   if (jQuery("#unidadCombo").val() != "" ){
		   jQuery("#unidadCombo").attr('required','required'); 
	   }
   }); 	
   
    });

//llena el combo de ramos
function comboRamos(){
	var ramosList = jQuery("#ramos").val()
	var listaRamos = jQuery.parseJSON(ramosList);
	var combo =  jQuery("#ramoCombo");
	combo.empty();
	combo.append(jQuery("<option />").val("").text(selectPreliminar));
	jQuery.each(listaRamos,function(){
		combo.append(jQuery("<option />").val(this["idRamo"]).text(this["descripcionRamo"]));
	});

	combo.on('change', function() {
		comboUnidades( this.value )
	});
	
	
}

function extraData(idAccion){
	if(idAccion != 'undefined' && idAccion.toString() == "cargar"){
		jQuery("#unidadCombo").attr('required','required'); 
	}
}

//llena el combo de unidades
function comboUnidades(ramoId){
	if(ramoId==0){		
		jQuery("#unidadCombo").empty();
		jQuery("#unidadCombo").attr("disabled",true)
		return
	}
	var unidadesList = jQuery("#unidades").val()
	var listaUnidades = jQuery.parseJSON(unidadesList);
	jQuery("#unidadCombo").attr("disabled",false)
	jQuery.each(listaUnidades,function(){
		if(this["idRamo"]==ramoId){
			var combo =  jQuery("#unidadCombo");
			combo.empty();
			combo.append(jQuery("<option />").val("").text(selectPreliminar));
			jQuery.each(this["ur"],function(){
				combo.append(jQuery("<option />").val(this["idUnidadResponsable"]).text(this["descripcionUnidadResponsable"]));
			});
		}
	});
	jQuery(document).foundation();
}


//valida que se  tengan seleccionados datos en los combos y que el archivo venga con terminacion .zip
		function validaReglas(idAccion){
			if(idAccion != 'undefined' && idAccion.toString() == "cargar"){
				//validaciones para seleccion de datos en los combos
				var map = {};				
				//validacion que se haya seleccionado un archivo y su formato sea .zip
				var nombreArchivo = jQuery("#movimientosPlazas").val();
				if(nombreArchivo==""){
					map["sinArchivo"] = ER044001
				}
				else{
					var extension = nombreArchivo.substring(nombreArchivo.lastIndexOf('.') + 1).toLowerCase()
					if(extension!="zip"){
						map["noZip"] = ER044001
					}
				}
				return map;
			} 
		}



