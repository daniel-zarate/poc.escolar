/**
 * MÈtodo que se ocupa para generar un mapa con id's de los documentos que est·n dentro del zip que se intenta agregar
 */
function sendDocumento(id,funcion){

	var listFiles = new Array();

	var file = jQuery("#"+id)[0].files[0];

	var fileName = file.name;

	var extension = fileName.substring( fileName.lastIndexOf('.')+1 )

	listFiles.push(file)

	var elForm = jQuery('<form style="display:none;" id="sendDocumentoForm'+id+'" name="sendDocumentoForm'+id+'" action="/rest/saveFiles/saveFileToTemp" method="Post" enctype="multipart/form-data">').appendTo(document.body);

	var myJSONObject = "{data:{fileUploadName:"+id+"}}";

	var urlDocs = ""

		if(extension.toUpperCase() == "jpg".toUpperCase()){
			urlDocs = CONTEXT_APP + "/rest/saveFiles/saveImageToTemp";
		}
		else{
			urlDocs = CONTEXT_APP + "/rest/saveFiles/saveFileToTemp";
		}

	elForm.fileupload({
		dataType: 'json',      
		done: function(e, data) {	
			var result = data._response.result.response.data.mapFiles
			if(data._response.result.response.message == "OK"){
				funcion(data._response.result.response.data.mapFiles)
			}else{
				// se manda el mapa vacio para que no ponga el registro
				funcion(data._response.result.response.data.mapFiles)
				noty({
					text: data._response.result.response.details,
					type    : 'warning',
					dismissQueue: true,
					modal	: true,
					layout	: 'center'
				});
			}

			elForm.remove()
		},
		fail:function(e,data){
			elForm.remove()
			errorViewFunction(data._response.jqXHR)
		},          
		replaceFileInput: false,
		autoUpload : false,
		url:urlDocs,
		paramName:id      // IMPORTANTE: Nombre del parametro de multiparte que llegar√° al servidor
	});

	elForm.fileupload('send', {	      		
		files:listFiles,
		formData: {
			json : myJSONObject
		} 
	});			


}







/* Componentes separados de SendDocumento
 * Metodos para las  formas y tablas existenmtes en las pantallas del MET 
 */


var listaMaestra ={}
var numberRow = 0
var isEliminar = false;
var idAEliminar = null
var isModificar = false
//Funcion para obtener la lista 
function getListaMaestra(nombreKey) {
	var listToReturn = [];

	if(listaMaestra[nombreKey] !== undefined){
		var listaGeneral = listaMaestra[nombreKey];
		listToReturn = getListProcessed(listaGeneral, false);
	}

	return listToReturn;
}

//funcion para obtener la lista en string para enviarla al guardado parcial
function getListaMaestraGuardadoParcial(nombreKey) {
	var listToReturn = [];

	if(listaMaestra[nombreKey] !== undefined){
		var listaGeneral = listaMaestra[nombreKey];
		listToReturn = getListProcessed(listaGeneral, true);
	}

	return listToReturn;
}

//genera la lista de mapas de la tabla ya ordenada
function getListProcessed(listaGeneral, isGuardadoParcial){

	var listToReturn = [];
	jQuery.each(listaGeneral, function(key,value){
		var mapaRegistro = {}
		jQuery.each(value, function(llave, valor){
			jQuery.each(valor, function(k, v){
				if(v instanceof Object && 'idCat' in v){
					if(isGuardadoParcial){
						mapaRegistro[k] = {"id" : v['idCat'], "descripcion" : v['label']};
					}else{
						mapaRegistro[k] = v['idCat'];
					}				

				}else{
					mapaRegistro[k] = v;
				}

			});
		});
		listToReturn.push(mapaRegistro);
	});
	return listToReturn;
}

//funcion para eliminar un registro de la tabla
function eliminarFila(id, listaGeneralName, classElement){
	//se saca el registro a eliminar para devolverlo

	isEliminar = true;
	idAEliminar = id
	var Registro = [];
	Registro[0] = listaMaestra[listaGeneralName][id];

	var listaConRegistroEliminado = getListProcessed(Registro, false);

	var funcionPreEliminar = "preEliminar" + classElement.charAt(0).toUpperCase() + classElement.slice(1);
	var continuarProceso = true;
	//se valida si existe la funcion preEliminar y se obtiene un resultado booleano para conocer si se continua con la eliminacion
	if (eval("typeof " +funcionPreEliminar) == 'function') {
		eval("continuarProceso = "+funcionPreEliminar+"(listaConRegistroEliminado)");//se devuelve el valor a eliminar
	}

	if(continuarProceso){
		if (confirm('Esta seguro que desea eliminar ?')){
			clearFormulario(classElement,classElement+"File");
			jQuery("#botonAgregar"+listaGeneralName.substring(12)).val("Agregar")
			jQuery("#botonLimpiar"+listaGeneralName.substring(12)).css("display", "none");
			var funcionPostEliminar = "postEliminar" + classElement.charAt(0).toUpperCase() + classElement.slice(1);

			//se remueve el registro de la tabla y de la lista
			jQuery("#" + id ).remove();
			var listaGeneral  = listaMaestra[listaGeneralName]
			delete listaGeneral[id]
			listaMaestra[listaGeneralName] = listaGeneral

			//se valida si existe la funcion postEliminar y se devuelve el registro eliminado
			if (eval("typeof " +funcionPostEliminar) == 'function') {
				eval(funcionPostEliminar+"(listaConRegistroEliminado)");
			}
		}else {
			return;
		}
	}
}

//funcion para cargar cada componentes de acuerdo al registro seleccionado en la tabla
function selectRow(id, listaGeneralName, idFile){

	if(!isEliminar){
		var funcionPreSelectRow = "preSelectRow" + listaGeneralName.substring(12);

		var listaGeneral = listaMaestra[listaGeneralName]
		var elementoSeleccionado = listaGeneral[id];
		var registro = [];
		registro[0] = elementoSeleccionado;


		var listaConRegistroSeleccionado = getListProcessed(registro, true);

		if (eval("typeof " +funcionPreSelectRow) == 'function') {
			eval(funcionPreSelectRow+"(listaConRegistroSeleccionado)");
		}	

		if(elementoSeleccionado !== undefined){

			jQuery("#botonAgregar"+listaGeneralName.substring(12)).val("Modificar")
			jQuery("#botonAgregar"+listaGeneralName.substring(12)).attr("key", id);

			if(jQuery("#"+idFile).prop('disabled'))
				jQuery("#botonLimpiar"+listaGeneralName.substring(12)).val("Limpiar")
				else
					jQuery("#botonLimpiar"+listaGeneralName.substring(12)).val("Nuevo")

					jQuery("#botonLimpiar"+listaGeneralName.substring(12)).css("display", "block");

			jQuery.each(elementoSeleccionado, function(key,value){ 
				jQuery.each(value, function(llave, valor){

					//se verifica el tipo de componente iterado para cargarlo de acuerdo al mismo
					if(jQuery("#" + llave).is("input, textarea")){
						jQuery("#" + llave).val(valor);
					}
					if (jQuery("#" + llave).is("select")) {
						jQuery('#'+ llave + ' option[value="'+ valor.idCat +'"]').prop('selected', true);
					}
					if (jQuery("#" + llave).is("input[type=radio]")) {

					}

					jQuery("#" + llave)
				});
			});
		}


		var funcionPostSelectRow = "postSelectRow" + listaGeneralName.substring(12);
		if (eval("typeof " +funcionPostSelectRow) == 'function') {
			eval(funcionPostSelectRow+"(listaConRegistroSeleccionado)");
		}	
	}

	isEliminar = false;
}

function obtenerValoresFormulario(claseElemento){

	var valoresFormulario = [];

	jQuery('.'+claseElemento).each(function(){ 
		if(jQuery(this).is("input, textarea"))
		{
			var mapValue = {}
			var id = jQuery(this).attr('id');
			mapValue[id] = jQuery(this).val() 
			valoresFormulario.push(mapValue)
		}
		if (jQuery(this).is("select")) {
			var mapValue = {}
			var idCat = this.value;
			var idElemento =jQuery(this).attr('id');
			var label = jQuery("#"+idElemento+" option:selected").text();
			if (idCat.length == 0){
				label = "";
			}
			mapValue[idElemento] = {"idCat": idCat,"label" : label}
			valoresFormulario.push(mapValue); 
		}
		if (jQuery(this).is("input[type=radio]:checked")) {
			var mapValue = {}
			var id = jQuery(this).attr('tabindex');
			var id2 = jQuery(this).attr('id') 
			mapValue[id2] = jQuery(this).attr('value');
			valoresFormulario.push(mapValue); 
		}
	});//cierra iteracion

	return valoresFormulario;
}

//funcion creada para la actualizacion de los registros y/o archivossi se actualiza algun campo o se carga un nuevo archivo
function actualizarRegistro(key,claseElemento,idTabla,mapaColumnas,listaGeneralName,idFile) {
	isModificar = true

	var funcionPreModificar = "preModificar" + claseElemento.charAt(0).toUpperCase() + claseElemento.slice(1);
	var continuarProceso = true;
	if (eval("typeof " +funcionPreModificar) == 'function') {			
		continuarProceso  = eval("continuarProceso = "+funcionPreModificar+"()");
	}

	if (continuarProceso == true) {

		var listaGeneral = listaMaestra[listaGeneralName];
		var valoresFormulario = [];
		valoresFormulario = obtenerValoresFormulario(claseElemento);
		var rowModify = listaGeneral[key]
		var archivos;
		jQuery.each(rowModify, function(k,v){
			jQuery.each(v, function(key, value){
				if(key == "archivosCargados"){
					archivos = value;
				}
			})
		});
		var mapaArchivos = {}
		var mapArchivosNuevos 
		mapaArchivos['archivosCargados'] = archivos;
		delete  listaGeneral[key];
		if (jQuery("#"+idFile).val() == ""){
			valoresFormulario.push(mapaArchivos)
			listaGeneral[key] = valoresFormulario;
			listaMaestra[listaGeneralName] = listaGeneral
		} 

		jQuery("#" + key ).remove();

		var idTd = insertarFila(claseElemento,idTabla,mapaColumnas,listaGeneralName,key);

		var funcionPostModificar = "postModificar" + claseElemento.charAt(0).toUpperCase() + claseElemento.slice(1);

		if (eval("typeof " +funcionPostModificar) == 'function') {
			if (idFile !== undefined) {				
				eval(funcionPostModificar+"(valoresFormulario,key,listaGeneralName,idTd,idFile)");
			} else {				
				eval(funcionPostModificar+"(valoresFormulario,key,listaGeneralName,idTd)");
			}

		}


		if (jQuery("#"+idFile).val() != ""){
			utilSendFile(valoresFormulario, key,listaGeneralName,idTd,idFile);
		}else{

			var tdArchivos = "<ul>";
			if(jQuery.type(archivos) === "string") {
				var texto = archivos
				var json = jQuery.parseJSON(texto);
				jQuery.each(json, function(id, docName){
					if(id.indexOf("_") > 0){
						tdArchivos += "<li><img src=\"images/administracionExpediente/v1/documentoCargado.png\" height=\"15\" width=\"25\" >" + docName + "</li>";
					}
				});
			} else {
				jQuery.each(archivos, function(id, docName){
					var tamanio = docName.length
					tdArchivos += "<li><img src=\"images/administracionExpediente/v1/documentoCargado.png\" height=\"15\" width=\"25\" >" + docName.substring(19, tamanio-4) + "</li>";
				});
			}

			tdArchivos += "</ul>";

			jQuery("#"+idTd).append(tdArchivos);
		}

		//numberRow++;
		setAddButton(claseElemento,idFile);
		clearFormulario(claseElemento,idFile);
	}
}


//funcion generica para insertar un la nueva fila modificada
function insertarFila(claseElemento,idTabla,mapaColumnas,listaGeneralName,key){
	var NumeroDefila;
	if (key !== undefined){
		NumeroDefila = key;
	} else {
		NumeroDefila = numberRow;
	}

	//var fila = "<tr id='"+ NumeroDefila +"' onClick='selectRow(this.id, \""+listaGeneralName+"\")'>";
	var fila = "<tr id='"+ numberRow +"' >";

	var tamanioTabla = jQuery("#"+idTabla+" tr:first > th").size();	
	var idTd = "";		

	for(var i=0; i < tamanioTabla; i++){
		var id = mapaColumnas[i];
		var valor = "";
		if(id == 'botonEliminarRegistro'){				
			fila += "<td><input type='button' value='Eliminar' id='"+ NumeroDefila +"' onClick='eliminarFila(this.id, \""+listaGeneralName+"\", \""+claseElemento+"\")'></td>";				
		}else if(id == 'archivosCargados'){			
			idTd = "archivosCargados"+NumeroDefila+""+i;
			fila += "<td id='"+idTd+"'></td>";
		}else{
			if(jQuery("#"+id).is("input, textarea")){				
				valor = jQuery("#"+id).val();
			}else if (jQuery("#"+id).is("select")) {								
				valor = jQuery("#"+id+" option:selected").text();
				var idCat = jQuery("#"+id+" option:selected").val();
				if(idCat.length == 0){
					valor = ""
				}

			}else if (jQuery("#"+id).is("input[type=radio]:checked")) {					
				valor = jQuery("#"+id).attr('value');
			}			

			fila += "<td id='"+idTd+"'>" + valor + "</td>"; 
		}		

	};

	fila += "</tr>"; 

	jQuery(fila).appendTo('#'+idTabla);
	return idTd;
}


function agregarRegistro(claseElemento,idTabla,mapaColumnas,listaGeneralName,idFile){
	//se valida si existe alguna funcion con el prefijo preAgregar, se espera una variable boleana para validar si se continua con el proceso de agregar
	var funcionPreAgregar = "preAgregar" + claseElemento.charAt(0).toUpperCase() + claseElemento.slice(1);
	var continuarProceso = true;
	if (eval("typeof " +funcionPreAgregar) == 'function') {			
		continuarProceso = eval("continuarProceso = "+funcionPreAgregar+"()");
	}

	if(continuarProceso == true){
		var valoresFormulario = [];
		var listaGeneral = listaMaestra[listaGeneralName];

		if (listaGeneral === undefined){
			listaGeneral = {}
		} 

		valoresFormulario = obtenerValoresFormulario(claseElemento);

		listaGeneral[numberRow] = valoresFormulario;		
		listaMaestra[listaGeneralName] = listaGeneral;

		var idTd = insertarFila(claseElemento,idTabla,mapaColumnas,listaGeneralName);

		var funcionPostAgregar = "postAgregar" + claseElemento.charAt(0).toUpperCase() + claseElemento.slice(1);

		if (eval("typeof " +funcionPostAgregar) == 'function') {
			if (idFile !== undefined) {				
				eval(funcionPostAgregar+"(valoresFormulario,numberRow,listaGeneralName,idTd,idFile)");
			} else {				
				eval(funcionPostAgregar+"(valoresFormulario,numberRow,listaGeneralName,idTd)");
			}

		}

		numberRow++;
		setAddButton(claseElemento,idFile);
	}//fin de validacion continuarProceso
}


//Funcion para agregar o eliminar registros a la tabla
function insaneAdn(claseElemento,idTabla,mapaColumnas,listaGeneralName,idFile) {

	if(jQuery("#"+idFile).prop('disabled')){
		jQuery("#botonAgregar"+listaGeneralName.substring(12)).hide();
		jQuery("#botonLimpiar"+listaGeneralName.substring(12)).val("Limpiar");
	}else{	
		jQuery("#botonAgregar"+listaGeneralName.substring(12)).on('click', function(){

			var continuar = true
			if(listaGeneralName.substring(12) == 'TrayectoriaLaboral' 	|| listaGeneralName.substring(12)  == 'DependientesFamiliares'){
				var htmlFileId = listaGeneralName.substring(12) == 'TrayectoriaLaboral' ? 'mapDoctosTrayectoriaLaboralFile':'dependientesFamiliaresFile'
					var fileName =	jQuery("#"+htmlFileId).val()
					var extension = fileName.substring(fileName.indexOf(".")+1)
					if(extension.toUpperCase() != 'ZIP'){	
						if(listaGeneralName.substring(12) == 'TrayectoriaLaboral'  && !(extension == "")){
							noty({
								text : "\n No es un archivo .zip <br>",
								type : 'error',
								dismissQueue : true,
								modal : true,
								layout : 'center'
							});
							continuar = false
						}
					}
			}			

			if(continuar){
				if(jQuery(this).val() == "Modificar"){

					actualizarRegistro(jQuery(this).attr('key'),claseElemento,idTabla,mapaColumnas,listaGeneralName,idFile)
				}else{
					agregarRegistro(claseElemento,idTabla,mapaColumnas,listaGeneralName,idFile);
				}		
			}
		});	
	}


	jQuery("#botonLimpiar"+listaGeneralName.substring(12)).on('click', function(){
		if(jQuery(this).val() == "Nuevo"){
			setAddButton(claseElemento,idFile);
		}else{
			clearFormulario(claseElemento,idFile);
		}
	});


	jQuery('select[class^="' +claseElemento+ '"]').change(function() {
		showButtonClean(claseElemento, "botonLimpiar"+listaGeneralName.substring(12))
	});

	jQuery('input:text.'+claseElemento).blur(function(){
		showButtonClean(claseElemento, "botonLimpiar"+listaGeneralName.substring(12))
	});

	jQuery('#botonLimpiar'+listaGeneralName.substring(12)).on('click', function(){

		clearFormulario(claseElemento,idFile);
		jQuery("#botonLimpiar"+listaGeneralName.substring(12)).css("display", "none");
	});

	jQuery("input[type=file]").change(function(){
		showButtonClean(claseElemento, "botonLimpiar"+listaGeneralName.substring(12))
	});

}
//Funcion para poder cargar los archivos que vengan en el zip y poder guardarlos en la variable global y visualizarlos en la gsp
function utilSendFile(listaRow, numberRow, listaGeneralName,idTr,file) {

	var funcion = "funcionUtilSenFile"+listaGeneralName.substring(12)
	sendDocumento(file,function(map){
		var archivosValidos = validarEstructuraArchivos(map, listaGeneralName)
		if(!jQuery.isEmptyObject(archivosValidos)) {	
			parseoArchivosValidosVista(listaRow, numberRow, listaGeneralName,idTr,archivosValidos,file,funcion);			
		} else {			
			jQuery("#" + numberRow ).remove();
			var listaGeneral  = listaMaestra[listaGeneralName]
			delete listaGeneral[numberRow]
			listaMaestra[listaGeneralName] = listaGeneral


			if(listaGeneralName == 'listaMaestraTrayectoriaLaboral'){
				calculaLaAntiguedadDelTrabajador()
			}

			noty({
				text: 'El registro no contien el archivo requerido o ninguno de los archivos cumple con las reglas',
				type    : 'warning',
				dismissQueue: true,
				modal	: true,
				layout	: 'center'
			});

		}
	});
}

function validarEstructuraArchivos(map, listaGeneralName) {
	var resultado = {}
	var curpRgx="[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}" +
	"(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])" +
	"[HM]{1}" +
	"(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)" +
	"[B-DF-HJ-NP-TV-Z]{3}" +
	"[0-9A-Z]{1}[0-9]{1}$";

	jQuery.each(map, function(key, value) {
		var tamanioNombreArchivo = value.length
		if (tamanioNombreArchivo >= 25 ) {
			var curp = value.substring(0,18);		
			if(operacion == 'crear'){
				if((curp.toString().toUpperCase()).match(curpRgx)){
					resultado[key] = value;
				}
			}else{
				resultado[key] = value;	
			}
		}
	});




	return resultado

}

function parseoArchivosValidosVista(listaRow, numberRow, listaGeneralName,idTr,map,idFile, funcion) {
	var claseLowerCase = listaGeneralName.substring(12);
	var td = "<ul>"
		var mapa = {}
	var mapaArchivos = {}
	if ((funcion) == undefined || funcion == null) {
		jQuery.each(map, function(k,v){
			mapa[k] = v
			var tamanio = v.length
			td+= "<li><img src=\"images/administracionExpediente/v1/documentoCargado.png\" height=\"15\" width=\"25\" >"+ obtenerNombreDelDocumento(v,tamanio)+"</li>"
		});
		td+="</ul>"
			jQuery("#"+idTr).append(td);
		mapaArchivos["archivosCargados"] = mapa
		listaRow.push(mapaArchivos);
		listaMaestra[listaGeneralName][numberRow] = listaRow;	
		clearFormulario(claseLowerCase.charAt(0).toLowerCase() + claseLowerCase.substring(1),idFile)

	} else {
		var mapaRegresoFuncion = eval(funcion+"(map)")
		if (mapaRegresoFuncion != undefined) {
			jQuery.each(mapaRegresoFuncion, function(k,v){
				mapa[k] = v
				var tamanio = v.length
				td+= "<li><img src=\"images/administracionExpediente/v1/documentoCargado.png\" height=\"15\" width=\"25\" >"+obtenerNombreDelDocumento(v,tamanio)+"</li>"
			});
			td+="</ul>"
				jQuery("#"+idTr).append(td);
			mapaArchivos["archivosCargados"] = mapa
			listaRow.push(mapaArchivos);
			listaMaestra[listaGeneralName][numberRow] = listaRow;	
			clearFormulario(claseLowerCase.charAt(0).toLowerCase() + claseLowerCase.substring(1),idFile)
		} else {
			jQuery("#" + numberRow ).remove();
			var listaGeneral  = listaMaestra[listaGeneralName]
			delete listaGeneral[numberRow]
			listaMaestra[listaGeneralName] = listaGeneral

			if(listaGeneralName == 'listaMaestraTrayectoriaLaboral'){
				calculaLaAntiguedadDelTrabajador()
			}

			noty({
				text: 'El registro no contien el archivo requerido o ninguno de los archivos cumple con las reglas',
				type    : 'warning',
				dismissQueue: true,
				modal	: true,
				layout	: 'center'
			});
		}
	}
} 

function obtenerNombreDelDocumento(archivo,tamanio){
	var texto
	if(tamanio >= 44){
		texto = archivo.substring(38, tamanio-4)
	} else {
		texto = archivo.substring(19, tamanio-4)
	}
	return texto;
}

//Funcion para agregar nuevo registro, este limpia el formulario y muestra el boton agregar en lugar de modificar
function setAddButton(className,idFile){
	var claseUperCase = className.charAt(0).toUpperCase() + className.slice(1);
	jQuery("#botonAgregar"+claseUperCase).val("Agregar")
	jQuery("#botonLimpiar"+claseUperCase).val("Limpiar")
	jQuery("#botonLimpiar"+claseUperCase).css("display", "none");

}

//Funcion para limpiar el formulario
function clearFormulario(className,idFile){

	var funcionPreClearFormulario = "preClearFormulario" + className.charAt(0).toUpperCase() + className.slice(1);

	if (eval("typeof " +funcionPreClearFormulario) == 'function') {
		eval(funcionPreClearFormulario+"()");
	}	

	jQuery('.'+className).each(function(){ 
		if(jQuery(this).is("input[type=text]")){
			jQuery(this).val("");
		}
		if (jQuery(this).is("select")) {
			jQuery(this).val("");
		}
		if (jQuery(this).is("input[type=radio]:checked")) {
//			jQuery(this).attr('checked', false);
			jQuery(this).val("");
		}
		if(idFile !== undefined){
			jQuery("#"+idFile+"").val("");
		}
	});
}
//Funcion para mostrar u ocultar un boton
function showButtonClean(classSelects, botonMostrarOcultar){
	var isEmpty = true;
	var count = 0;
	var claseUperCase = classSelects.charAt(0).toUpperCase() + classSelects.slice(1);
	jQuery('input:text.'+classSelects).each(function(){
		if(jQuery(this).val() != ""){
			count++;
		}
	});

	jQuery('select[class^="'+ classSelects +'"]').each(function(){			
		if(this.value != ""){
			count++;
		}			
	});

	if(jQuery("input[type=file]").val() != ""){
		isEmpty = false;
	}

	if(count != 0 ){
		isEmpty = false;
	}

	if(isEmpty == true){
		jQuery("#"+botonMostrarOcultar).css("display", "none");
	}else{
		jQuery("#"+botonMostrarOcultar).css("display", "block");
	}
}

/* funcion especifica para carga de archivos desacoplada de la seccion agregar, se actualiza la lista si el archivo tiene el mismo nombre
 * y actualiza el id temporal que asigan el metodo senddocumento
 */
function uploadSpecificMetFile(id,funcion, arg3) {
	var mapa = {}
	var nuevoMap = {}
	var flag = true
	var cadena = '['			
		var mapValue =jQuery("#"+id+"Met").attr('value');
	sendDocumento(id,function(map){;
	jQuery.each(map, function(k,v){
		mapa[k] = v;
	});


	if (arg3 != undefined){


		if(id.toUpperCase().indexOf('DATOSPERSONALES') != -1 || id.toUpperCase().indexOf('GENERALES') != -1 || id.toUpperCase().indexOf('ESQUEMA') != -1){
			for (x in mapa){
				if(mapValue.indexOf(mapa[x]) != -1){
					 flag = confirm('Se reemplazara el documento con el siguiente: '+mapa[x])


				}
			}

		}
	}


	var valida = false
	if(id.toUpperCase().indexOf('DATOSPERSONALES') != -1){
		valida = true
	}else if ( id.toUpperCase().indexOf('DATOSGENERALES') !=-1){
		valida = true
	}else if (id.toUpperCase().indexOf('ESQUEMA') != -1){
		valida = true
	}

	if(flag == true){
	
		if( mapValue != ""  ){
			var obj = JSON.parse(mapValue);
			jQuery.each(obj, function(k,v){
				jQuery.each(mapa, function(key,value){
					if(v == value){
						delete obj[k]
					}
					nuevoMap[key] = value
				});
			});

			jQuery.each(obj, function(llave,v){
				nuevoMap[llave] = v
			});

			var mapaArchivosValidados = funcion(nuevoMap)
			jQuery("#"+id+"Met").attr('value',"")
			jQuery("#"+id+"Met").attr('value',JSON.stringify(mapaArchivosValidados))
		} else {
			var mapaArchivosValidado = funcion(mapa)

			if(mapaArchivosValidado != undefined && (Object.keys(mapaArchivosValidado).length) > 0){
				jQuery("#"+id+"Met").attr('value',JSON.stringify(mapaArchivosValidado))
			}
		}
	}
	//}
	});
	document.getElementById(id).value = "";

}


function cargaTablaConsultaModificacion(listaDatos, mapaColumnas, listaGeneralName, idTabla, claseElemento, idFile){

	var listaGeneral = {}
	jQuery.each(listaDatos, function(k,v){
		var valoresFormulario = [];
		jQuery.each(v, function(key, value){
			if(key == 'archivosCargados'){
				var mapValue = {};
				mapValue[key] = value;
				valoresFormulario.push(mapValue);
			}else if (value instanceof Object) {
				var mapValue = {}
				var idCat = value.id;
				var idElemento = key;
				var label = value.descripcion;
				mapValue[idElemento] = {"idCat": idCat,"label" : label}
				valoresFormulario.push(mapValue);				
			}else{
				var mapValue = {}
				var id = key;
				mapValue[id] = value;
				valoresFormulario.push(mapValue)
			}
		});
		listaGeneral[numberRow] = valoresFormulario;
		listaMaestra[listaGeneralName] = listaGeneral;


		//var fila = "<tr id='"+ numberRow +"' onClick='selectRow(this.id, \""+listaGeneralName+"\", \""+ idFile +"\")'>";
		var fila = "<tr id='"+ numberRow +"' >";


		var tamanioTabla = jQuery("#"+idTabla+" tr:first > th").size();
		var idTd = "";

		for(var i=0; i < tamanioTabla; i++){
			var id = mapaColumnas[i];
			var valor = "";
			if(id == 'botonEliminarRegistro'){				
				fila += "<td><input type='button' value='Eliminar' id='"+ numberRow +"' onClick='eliminarFila(this.id, \""+listaGeneralName+"\", \""+claseElemento+"\")'></td>";				
			}else if(id == 'archivosCargados'){	
				var tdArchivos = "<ul>";

				if(jQuery.type(v.archivosCargados) === "string") {
					var texto = v.archivosCargados
					var json = jQuery.parseJSON(texto);
					jQuery.each(json, function(id, docName){
						if(id.indexOf("_") > 0){
							tdArchivos += "<li><img src=\"images/administracionExpediente/v1/documentoCargado.png\" height=\"15\" width=\"25\" >" + docName + "</li>";
						}
					});
				} else {
					if(v.archivosCargados != null || v.archivosCargados != undefined){
						jQuery.each(v.archivosCargados, function(id, docName){
							if(docName != null || docName != undefined){
								var tamanio = docName.length
								tdArchivos += "<li><img src=\"images/administracionExpediente/v1/documentoCargado.png\" height=\"15\" width=\"25\" >" + docName.substring(19, tamanio-4) + "</li>";
							}
						});
					}
				}
				tdArchivos += "</ul>";
				fila += "<td>" + tdArchivos + "</td>";
			}else{
				if (jQuery.type(v[id]) === "string"){
					fila += "<td>" + v[id]+ "</td>";	
				} else {
					fila += "<td>" + v[id].descripcion+ "</td>";
				}
			}				
		}

		fila += "</tr>";
		jQuery(fila).appendTo('#'+idTabla);

		var funcionPostAgregar = "postAgregar" + claseElemento.charAt(0).toUpperCase() + claseElemento.slice(1);
		numberRow++;

	});


}


function eliminarFilaInvalida(id, listaGeneralName, classElement){
	//se saca el registro a eliminar para devolverlo
	isEliminar = true;

	var Registro = [];
	Registro[0] = listaMaestra[listaGeneralName][id];

	var listaConRegistroEliminado = getListProcessed(Registro, false);

	var funcionPreEliminar = "preEliminar" + classElement.charAt(0).toUpperCase() + classElement.slice(1);
	var continuarProceso = true;
	//se valida si existe la funcion preEliminar y se obtiene un resultado booleano para conocer si se continua con la eliminacion
	if (eval("typeof " +funcionPreEliminar) == 'function') {
		continuarProceso = eval("continuarProceso = "+funcionPreEliminar+"(listaConRegistroEliminado)");//se devuelve el valor a eliminar
	}

	if(continuarProceso){

		clearFormulario(classElement,classElement+"File");
		jQuery("#botonAgregar"+listaGeneralName.substring(12)).val("Agregar")
		jQuery("#botonLimpiar"+listaGeneralName.substring(12)).css("display", "none");
		var funcionPostEliminar = "postEliminar" + classElement.charAt(0).toUpperCase() + classElement.slice(1);

		//se remueve el registro de la tabla y de la lista
		jQuery("#" + id ).remove();
		var listaGeneral  = listaMaestra[listaGeneralName]
		delete listaGeneral[id]
		listaMaestra[listaGeneralName] = listaGeneral

		//se valida si existe la funcion postEliminar y se devuelve el registro eliminado
		if (eval("typeof " +funcionPostEliminar) == 'function') {
			eval(funcionPostEliminar+"(listaConRegistroEliminado)");
		}

	}
}