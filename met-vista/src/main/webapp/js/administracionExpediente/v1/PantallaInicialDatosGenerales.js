/**
 * 
 */

//jQuery("#codPostal").bind('keyup',function(){
//		var cpExistente = this.value
//		if(cpExistente!=null && cpExistente!=undefined){
//			var json = {data:{uri:"/services/PRX_SD_ColoniaService/getColoniaPorCP",form:{codigoPostal: cpExistente , codigoPostal1: cpExistente}}};		
//			var request = new RestClientURI('POST',JSON.stringify(json), exitoCodigoPostal, function(){}); 
//			request.call();
//
//		}
//});

jQuery(document).ready(function() {
	
	//Para cargar el archivo
//	jQuery("#idComprobanteDom").on("change",function(){
//		uploadSpecificMetFile(this.id,function(map){
//			marcaArchivosCargados(map);
//		});
//	});
	
//	jQuery("#mapDoctosDatosGenerales").on("change",function(){
//		jQuery("#documentoCD" ).attr("src","images/administracionExpediente/v1/documentoNoCargado.png");
//		uploadSpecificMetFile(this.id, renderDatosGenerales, 'bla')
//	});

	//Pantalla seg�n idOperacion
	var operacion = jQuery("#idOperacion").val();
	if(operacion == "crear"){//crear
		jQuery("#calle").prop("required", true);
		jQuery("#numExterior").prop("required", true);
		jQuery("#codPostal").prop("required", true);
		jQuery("#coloniaCombo").prop("required", true);
		jQuery("#entidadCombo").prop("required", true);
		jQuery("#municipioCombo").prop("required", true);
	}
	else if(operacion=="modificar"){//modificar
		jQuery("#calle").prop("required", true);
		jQuery("#numExterior").prop("required", true);
		jQuery("#codPostal").prop("required", true);
		jQuery("#coloniaCombo").prop("required", true);
		jQuery("#entidadCombo").prop("required", true);
		jQuery("#municipioCombo").prop("required", true);
	}	
	else if(operacion=="seguimiento"){//modificar
		jQuery("#calle").prop("required", true);
		jQuery("#numExterior").prop("required", true);
		jQuery("#codPostal").prop("required", true);
		jQuery("#coloniaCombo").prop("required", true);
		jQuery("#entidadCombo").prop("required", true);
		jQuery("#municipioCombo").prop("required", true);
	}	


	
	jQuery("#codPostal").trigger("keyup");

	//renderizac�n de archivos
	var mapaArchivos = jQuery("#mapDoctosDatosPersonales").val();
	
	//Se llenan los combos de colonia, entidad y municipio con la info cargada si la hay

	
	// renderizar los documentos que ya hayan sido cargados.
//	if(jQuery("#doctosCargadosDatosGenerales").val()){
//
//		var valueHidden = jQuery("#doctosCargadosDatosGenerales").val();			 
//		var lista = jQuery.parseJSON(valueHidden);
//
//		jQuery.each(lista, function(k,v){
//			var cveDocumento = v.substring(v.indexOf('_') + 1, v.indexOf('.')).toUpperCase();
//			jQuery("#documento" + cveDocumento).attr("src","images/administracionExpediente/v1/documentoCargado.png");
//		});
//	}
	
	
	
	var patt = new RegExp(procesoAutorizacion);  
	
	if((patt.test(cveEstatusExp) || 
			cveEstatusExp ==autorizado  ||
			cveEstatusExp ==rechazado) ||(cveEstatusExp == actualizacion))
	     {			
		
				jQuery("#calle").prop("disabled",true)
				jQuery("#numExterior").attr("disabled","disabled")
				jQuery("#codPostal").attr("disabled","disabled")
				jQuery("#coloniaCombo").attr("disabled","disabled")
				jQuery("#entidadCombo").attr("disabled","disabled")
				jQuery("#municipioCombo").attr("disabled","disabled")
				jQuery("#celular").attr("disabled","disabled")
				jQuery("#email").attr("disabled","disabled")
				jQuery("#numInterior").attr("disabled","disabled")
				jQuery("#colonia").attr("disabled","disabled")
				jQuery("#entidad").attr("disabled","disabled")
				jQuery("#municipio").attr("disabled","disabled")
				jQuery("#localidad").attr("disabled","disabled")
				jQuery("#telefono").attr("disabled","disabled")
				jQuery("#observaciones").attr("disabled","disabled")
				jQuery("#cargaArchivoDatosGenerales").hide();
			}
	
});

//function codigoPostalChange(){
//	if(jQuery("#codPostal").attr("data-invalid")!= null || jQuery("#codPostal").val().length<5){
//		jQuery("#coloniaCombo option:gt(0)").remove()
//		jQuery("#entidadCombo option:gt(0)").remove()
//		jQuery("#municipioCombo option:gt(0)").remove()
//		return
//	}
//
//	
//	if(jQuery("#codPostal").val().length == 5){
//		var json = {data:{uri:"/services/PRX_SD_ColoniaService/getColoniaPorCP",form:{codigoPostal: this.value , codigoPostal1: this.value}}};
//		var request = new RestClientURI('POST',JSON.stringify(json), exitoCodigoPostal, function(){}); 
//		request.call();
//	}
//}

//function exitoCodigoPostal(data){
//
//	if(data.response.data.codigoPostalService==""){
//		jQuery("#coloniaCombo option:gt(0)").remove()
//		jQuery("#entidadCombo option:gt(0)").remove()
//		jQuery("#municipioCombo option:gt(0)").remove()
//		return
//	}
//
//	var colonias = data.response.data.codigoPostalService.codigoPostalGetPorClave
//
//	var coloniasArray = new Array();
//	if(colonias.cveColonia != undefined || colonias.cveColonia != null){
//		coloniasArray.push(colonias);
//	}else{
//		coloniasArray = colonias;
//	}
//	
//	var codigoPostal = ""
//	for (i=0;i<coloniasArray.length;i++){ 		
//		if(coloniasArray[i].codigoPostal != "00000"){
//			codigoPostal = coloniasArray[i].codigoPostal
//			break;
//		}			
//	}
//
//	//llenamos colonias
//	//var json = {data:{uri:"/services/PRX_SD_ColoniaService/getColoniasDatosGenerales",form:{codigoPostal: coloniasArray[0].codigoPostal, codigoPostal1: coloniasArray[0].codigoPostal}}};
//	var json = {data:{uri:"/services/PRX_SD_ColoniaService/getColoniasDatosGenerales",form:{codigoPostal: codigoPostal, codigoPostal1: codigoPostal}}};
//	var request = new RestClientURI('POST',JSON.stringify(json), llenaComboColonia, function(){jQuery("#coloniaCombo option:gt(0)").remove();jQuery("#entidadCombo option:gt(0)").remove();jQuery("#municipioCombo option:gt(0)").remove()}); 
//	request.call();
//}

//function llenaComboColonia(data){
//	var colonias = data.response.data.coloniaService.getColoniasDatosGenerales;
//	var coloniasArray = new Array();
//	if( colonias.cveColonia != null || colonias.cveColonia != undefined){//si accedemos a un elemento directamente es un objeto
//		coloniasArray.push(colonias);
//	}else{
//		coloniasArray = colonias;
//	}
//	//se llenan las colonias
//	var comboColonias = jQuery("#coloniaCombo");
//	jQuery("#coloniaCombo option:gt(0)").remove();
//	var comboEntidad = jQuery("#entidadCombo");
//	jQuery("#entidadCombo  option:gt(0)").remove();
//	var comboMunicipio = jQuery("#municipioCombo");
//	jQuery("#municipioCombo option:gt(0)").remove();
//
//	
//	
//	jQuery.each(coloniasArray,function(){
//		var cc = coloniaComboValue; //se trae desde el gsp
//		if(cc!=""){
//			if(this.cveColonia.trim()==cc){
//				comboColonias.append(jQuery('<option>', { value: this.cveColonia.trim(), text : this.coloniaDescripcion}).attr("selected","selected"));
//			}else{
//				comboColonias.append(jQuery("<option />").val(this.cveColonia.trim()).text(this.coloniaDescripcion));
//			}
//		}else{
//			comboColonias.append(jQuery("<option />").val(this.cveColonia.trim()).text(this.coloniaDescripcion));
//		}
//	
//	});
//	//se llena la entidad (unica para cada CP)
//
//	comboEntidad.append(jQuery("<option />").val(coloniasArray[0].cveEntidadFederativa.trim()).text(coloniasArray[0].entidadDescripcion).attr("selected","selected"));
//	comboMunicipio.append(jQuery("<option />").val(coloniasArray[0].cveMunicipio.trim()).text(coloniasArray[0].municipioDescripcion).attr("selected","selected"));
//
//}


//function validaReglasDatosGenerales(){
//	//el mapa de errores
//	var map = {};
//	//solo se hace la validacion de archivos
//	var todosRequeridos = jQuery("#requeridosDatosGenerales").val();
//	if(todosRequeridos!="true"){
//		//map["documentosRequeridosMsg"]=documentosRequeridosMsg
//	}
//	return map;
//
//}

//de los archivos cargados cambia el icono de los que vengan en el listado de archivos de la pantalla
//function marcaArchivosCargados(mapa){
//	//sacamos los archivos que son requeridos
//	var d = jQuery("#documentosDatosGenerales").val();
//	var archivosTodos = jQuery.parseJSON(d);
//	var requeridos = new Array();
//	jQuery.each(archivosTodos,function(key,value){
//		if(value.requerido=="T"){
//			requeridos.push(value);
//		}
//	});
//	
//	var mapaLimpio = {};
//	jQuery.each(mapa,function(key,value){//recorremos los archivos cargados y buscamos su imagen
//		var split1 = value.split("_");
//		if(split1.length!=2){
//			jQuery("#CD_img").attr("src","images/administracionExpediente/v1/documentoError.png");
//			return
//		}
//		var rfcTrabajador = jQuery("#rfcDG").val()//verificamos que el rfc del nombre del archivo coincida
//		var idOperacion = jQuery("#idOperacion").val()
//		if(idOperacion=="modificar"){
//			if(split1[0]!=rfcTrabajador){
//				return
//			}
//		}
//		var split2 = split1[1].split(".");
//		if(split2.length!=2){
//			return
//		}
//		var claveArchivo = split2[0];
//		
//		var imagenArchivo = jQuery("#"+claveArchivo+"_img");
//		if(imagenArchivo.attr("src") != undefined){//si esta en la lista de archivos del gsp
//			var nuevoSrc = "";
//			if(imagenArchivo.attr("src").indexOf("documentoCargado")>0){
//				nuevoSrc =imagenArchivo.attr("src"); 
//			}else{
//				var na = imagenArchivo.attr("src").split("No");
//				nuevoSrc = na[0]+na[1];
//			}
//			if(!auxMapaLimpio(mapaLimpio, claveArchivo)){
//				imagenArchivo.attr("src","images/administracionExpediente/v1/documentoCargado.png");
//				mapaLimpio[key] = value; //si lo encontramos es un archivo chido y va al mapa limpio
//				auxiliarRequeridos(requeridos,claveArchivo); //si era requerido lo quita de la lista de requeridos
//			}
//		}
//		
//	});
//	if(requeridos.length == 0){//si ya est�n todos los requeridos fijamos en true el hidden
//		jQuery("#requeridosDatosGenerales").val("true");
//	}
//	return mapaLimpio;
//}

//para que no se repitan archivos con la misma clave
function auxMapaLimpio (mapaLimpio, clave){
	var existe = false;
	jQuery.each(mapaLimpio,function(key,value){
		var split1 = value.split("_");
		if(split1.length!=2){
			return
		}
		var split2 = split1[1].split(".");
		if(split2.length!=2){
			return
		}
		var claveArchivo = split2[0];
		if(claveArchivo==clave){
			existe = true;
			return existe;
		}
	});
	return existe;
}

//para borrar de la lista de requeridos un elemento
function auxiliarRequeridos(requeridos,cveDocumento){
	var i;
	var encontrado = false;
	for(i=0; i<requeridos.length;i++){
		if(requeridos[i].cveDocumento == cveDocumento ){
			encontrado = true;
			break;
		}
	}
	if(encontrado){
		requeridos.splice(i,1);
	}
}

function renderDatosGenerales(map){

	var valueHidden = jQuery("#documentosDatosGenerales").val()			 
	var lista = jQuery.parseJSON(valueHidden)
	var errores = ""
	var bnd

	var lstFilesOK = {}
	var filesRequired={}

	jQuery.each(lista, function(index,item){
		if(jQuery.trim(item.requerido) == 'T'){
			filesRequired[item.cveDocumento]="required"
		}
	});
	
	 
	if ((Object.keys(map).length) > 0){				

		jQuery.each(map, function(k,v){						
			
			 bnd = false
			 

				
			var nameFile = obtieneNombre(obtieneNombre(v, "_")[1], ".")[0]
			var curp = obtieneNombre(v, "_")[0]
			var ext = obtieneNombre(v, ".")[1]
			var curpGlobal = jQuery("#curp").val();
			jQuery.each(lista, function(index,item){
 
				if((jQuery.trim(nameFile) == jQuery.trim(item.cveDocumento)) && (curpGlobal == curp) && (ext == "pdf") && obtieneNombre(v, "_").length == 2){	
					jQuery("#documento"+item.cveDocumento).attr("src", "images/administracionExpediente/v1/documentoCargado.png")
					lstFilesOK[k]=v
					delete filesRequired[item.cveDocumento]
					bnd = true												
				}

			});	
			
			
//			var condicion = obtieneNombre(v, "_").length 
//			if (!(condicion.length == 2))
//				bnd = false
//			

			if(!bnd){
				jQuery("#documentoCD" ).attr("src","images/administracionExpediente/v1/documentoError.png");
				errores += formatoArchivoIncorrectoMsg +v;
			}		
		})
		
	}else{		
		noty({
			text: zipMasUnArchivoMsg ,
			type    : 'warning',
			dismissQueue: true,
			modal	: true,
			layout	: 'center'
		});
	}



	if ((Object.keys(filesRequired).length) > 0){
		/*A�n existen documentos requeridos que no se han cargado y se detiene la carga*/
		jQuery("#doctoRequired").attr("value","")
		jQuery("#doctoRequired").attr("value",false)
	}
	
	
	if(errores){		
		noty({
			text:  erroresDeValidacionMsg + errores,
			type    : 'warning',
			dismissQueue: true,
			modal	: true,
			layout	: 'center'
		});
	}

	return lstFilesOK
	
}

function obtieneNombre(nombreArchivo, separador){
	var nombreSplit
	nombreSplit = nombreArchivo.split(separador)
	return nombreSplit
}



//jQuery("#codPostal").bind('keyup',function(){
//	var cpExistente = this.value
//	if(cpExistente!=null && cpExistente!=undefined){
//		var json = {data:{uri:"/services/PRX_SD_ColoniaService/getColoniaPorCP",form:{codigoPostal: cpExistente , codigoPostal1: cpExistente}}};		
//		var request = new RestClientURI('POST',JSON.stringify(json), exitoCodigoPostal, function(){}); 
//		request.call();
//
//	}
//});