/**
 * 
 */
var idOperacion;
var listaCodigosFormacionAcademica;
var valoresProfecionales = false;
var ListaNivelSuperior = [];
var jsonIdsTrayectoriaLaboral;
var jsonIdsLic;

jQuery(document).ready(	function() {
	idOperacion = jQuery("#idOperacion").val();

	var idsCombos =  jQuery( "#idsDocumentos" ).val()
	jsonIdsFormacionAcademica = jQuery.parseJSON(idsCombos);

	var idsLic =  jQuery( "#idsLicNivel" ).val()
	jsonIdsLic = jQuery.parseJSON(idsLic);

	jQuery("#documentoFormacionAcademica").show();
	jQuery("#carreraFA").hide();

	jQuery("#documento").change(function(){

		var idTipoDocumento = jQuery(this).val();

		if(idTipoDocumento == jsonIdsFormacionAcademica.ninguno){
			jQuery("#documentoFormacionAcademica").hide();
		} else {
			jQuery("#documentoFormacionAcademica").show();
		}

	});

	listaCodigosFormacionAcademica = jQuery("#codigosArchivos").val();
	var mapaColumnas = {
			0 : 'nivelAcademico',
			1 : 'anosEstudios',
			2 : 'nombreInstitucion',
			3 : 'carrera',
			4 : 'documento',
			5 : 'cedulaProfecional',
			6 : 'archivosCargados',
			7 : 'botonEliminarRegistro'
	};

	insaneAdn('formacionAcademica', 'tablaDatos', mapaColumnas,	'listaMaestraFormacionAcademica', 'formacionAcademicaFile');

	// if (idOperacion == 'modificar' || idOperacion ==
	// 'consultar' || idOperacion=='seguimiento') {

	var jsonDatos;
	var listaFormacionAcademica = jQuery("#listaFormacionAcademica").val();

	if (listaFormacionAcademica != "") {
		jsonDatos = jQuery.parseJSON(listaFormacionAcademica);
		cargaTablaConsultaModificacion(jsonDatos, mapaColumnas,	'listaMaestraFormacionAcademica', 'tablaDatos',	'formacionAcademica', 'formacionAcademicaFile');
	}

	// }

	jQuery('#nivelAcademico').change(function() {
		var nombreNivel = jQuery("#nivelAcademico option:selected").text().trim();
		var idNivel = jQuery("#nivelAcademico option:selected").val();
		setInstitucionAndAnios(nombreNivel, idNivel);
	});

	jQuery("#institucion").on('change',	function() {

		var institutoSeleccionado = jQuery('#institucion option:selected').text().trim();
		if (institutoSeleccionado.toUpperCase().indexOf("OTRA") != -1) {
			jQuery("#nombreInstitucion").removeAttr('disabled');
			jQuery("#nombreInstitucion").val("");
			jQuery("#carrera").removeAttr('disabled');
			parsearInputCarreras();
		} else {
			jQuery("#nombreInstitucion").val(institutoUPN);
			jQuery("#nombreInstitucion").attr('disabled', 'disabled');
			jQuery("#carrera").removeAttr('disabled');
			parsearSelectCarreras();

		}
	});

	jQuery("#documento").on('change', function() {

		var documentoSeleccionado = jQuery('#documento option:selected').text().trim()
		if (documentoSeleccionado.indexOf("Profesion") != -1) {
			jQuery("#cedulaProfecional").removeAttr('disabled');

		} else {
			jQuery("#cedulaProfecional").val("");
			jQuery("#cedulaProfecional").attr('disabled', 'disabled');

		}
	});

	var patt = new RegExp(procesoAutorizacion);

	if (patt.test(cveEstatusExp) || cveEstatusExp == autorizado || cveEstatusExp == rechazado) {
		jQuery(".formacionAcademica").attr("disabled","disabled");
		jQuery("#divFormacionAcademicaFile").hide();
		jQuery("#divBotonenFormacion").hide();
		jQuery("#cargaArchivoFormacionAcademica").hide();
		jQuery("#botonesFormacionAcademica").hide();
		jQuery("#botonEliminarRegistro").remove();
		jQuery('#tablaDatos td:nth-child(8)').hide();

	}



});

function setInstitucionAndAnios(nombreNivel, idNivel) {

//	var nivelesSuperioresSiglas = [ "LIC", "MAE", "DOC", "POS", "PAS", "DIP" ];

	var nivSiglas = nombreNivel.trim().substring(0, 3);
	// el campo carrera se habilita unicamente si el nivel es mayor de licenciatura
//	if (nivelesSuperioresSiglas.indexOf(nivSiglas.toUpperCase()) != -1) {
	jQuery('#institucion option:first-child').attr("selected", "selected");
	jQuery("#nombreInstitucion").val('');
	//if (nivSiglas >= "H" && idNivel.length > 0) {
	//Si el nivel es licenciatura se habilita Institucion
	if (idNivel == jsonIdsLic.pasante || 
			idNivel == jsonIdsLic.licIncompleta ||
			idNivel == jsonIdsLic.licCompleta) {
		jQuery("#nombreInstitucion").attr('disabled', 'disabled');
		var valorRR = jQuery("#selectCarreraAnios").val();
		if (valorRR == ""){
			jQuery("#institucion").removeAttr('disabled');
		}else {

		}
	} else {
		jQuery("#institucion").attr('disabled', 'disabled');
		jQuery("#nombreInstitucion").removeAttr('disabled');
	}

	// Si el nivel academico es incompleto se habilita años de estudio
	if (nombreNivel.indexOf("Incomplet") != -1 || nivSiglas === "999") {
		jQuery("#anosEstudios").removeAttr('disabled');
		setAnosEnCombo(idNivel);
	} else {
		setAnosEnCombo(idNivel);
		jQuery("#anosEstudios").attr('disabled', 'disabled');
	}

	//Si el nivel academico es Carrera Tecnica, Licenciatura, Maestria o Doctordado, se captura el campo Carrera
	if (idNivel == jsonIdsLic.ctIncompleta || idNivel == jsonIdsLic.ctCompleta ||
			idNivel == jsonIdsLic.pasante || idNivel == jsonIdsLic.licIncompleta || idNivel == jsonIdsLic.licCompleta ||
			idNivel == jsonIdsLic.mtIncompleta || idNivel == jsonIdsLic.mtCompleta || 
			idNivel == jsonIdsLic.docIncompleto || idNivel == jsonIdsLic.docCompleto) {
		jQuery("#carreraFA").show();
		parsearInputCarreras();
	} else {
		jQuery("#carreraFA").hide();
		parsearSelectCarreras();
		jQuery("#carrera").attr('disabled', 'disabled');
	}

	//si el nivel maximo es Otros se habilita el campo nombre de institucion
	/*if(nivSiglas === "999"){
		jQuery("#nombreInstitucion").removeAttr('disabled');
		jQuery("#nombreInstitucion").val('');
		jQuery("#documento").val("");
		jQuery("#cedulaProfecional").val("");
		jQuery("#cedulaProfecional").attr('disabled', 'disabled');
		parsearInputCarreras();
	}else{
		jQuery("#nombreInstitucion").attr('disabled', 'disabled');
	}*/
}

function setAnosEnCombo(idNivel) {
	jQuery("#anosEstudios").remove();
	jQuery("#laberAnos").after(aniosSelect);
	var listaAnosNivel = jQuery("#anosNivelAcademicaSuperior").val();
	var jsonAnosNiveles = jQuery.parseJSON(listaAnosNivel);
	var listaDeAnos = [];
	var opcionesSelect = '<option value="">' + seleccioneOpcion + '</option>';

	var existenAnios = false;

	jQuery.each(jsonAnosNiveles, function(k, v) {
		if(idNivel == v.clave){
			existenAnios = true;
			return false;
		}
	});


	if(existenAnios){
		jQuery.each(jsonAnosNiveles, function(k, v) {
			if (v.clave == idNivel){ 
				listaDeAnos.push(v);
			}
		});
	}else{
		opcionesSelect += '<option value="">No Aplica</option>'; 
	}


	jQuery.each(listaDeAnos, function(llave, valor) {
		opcionesSelect += '<option value="' + valor.id + '">'
		+ valor.descripcion + '</option>'
	});
	jQuery("#anosEstudios").append(opcionesSelect);

}

function parsearSelectCarreras() {
	jQuery("#carrera").remove();
	jQuery("#labelCarrera").after(carreraSelect);
	var opcionesSelect = '<option value="">' + seleccioneOpcion + '</option>'
	var carreraUPNBase = jQuery("#carrerasBaseUPN").val();
	var jsonCarrera = jQuery.parseJSON(carreraUPNBase);
	jQuery.each(jsonCarrera, function(llave, valor) {
		opcionesSelect += '<option value="' + valor.id + '">'
		+ valor.descripcion + '</option>'
	});
	jQuery("#carrera").append(opcionesSelect);

}

function parsearInputCarreras() {
	jQuery("#carrera").remove();
	jQuery("#labelCarrera").after(carreraInput);
}

function validaReglasFormacionAcademica() {
	var listaDatosFormacion = listaMaestra['listaMaestraFormacionAcademica']
	var map = {};

	if (jQuery.isEmptyObject(listaDatosFormacion)) {
		map['ErrorFormacionAcademica'] = formacionAcademicaErrorGeneral
	}
	return map;
}

function deshabilitarInputs() {
	jQuery("#nombreInstitucion").attr('disabled', 'disabled');
	jQuery("#cedulaProfecional").attr('disabled', 'disabled');
	jQuery("#anosEstudios").attr('disabled', 'disabled');
}

function preAgregarFormacionAcademica() {



	var continuarProceso = true;
	var nivelPermitido = false;
	var archivivo
	var curp = jQuery("#curp").val();
	var nivel = jQuery("#nivelAcademico").val();
	var listaNivelesPermitidos = jQuery("#nivelesPermitidos").val();
	var jsonNiveles = jQuery.parseJSON(listaNivelesPermitidos);
	var documentoSeleccionado = jQuery.trim(jQuery('#documento option:selected').text());

	if ((curp == undefined || curp == "") && documentoSeleccionado.toUpperCase().indexOf("NINGUNO") == -1) {
		noty({
			text : curpRequeridadError,
			type : 'error',
			dismissQueue : true,
			modal : true,
			layout : 'center'
		});
		continuarProceso = false;
		return continuarProceso
	}

	jQuery.each(jsonNiveles, function(k, v) {
		if (v['descripcion'] == nivel) {
			nivelPermitido = true;
			valoresProfecionales = true;
		}
	});


	if (nivelPermitido == true || valoresProfecionales == true) {
		ListaNivelSuperior.push(nivel)
	}
	continuarProceso = validarFormulario();
	if (nivelPermitido == false || valoresProfecionales == false) {
		if (continuarProceso == true) {
			//jQuery('#botonAgregarFormacionAcademica').remove()
			//	jQuery("#botonAgregarFormacionAcademica").attr("disabled",	"disabled");
		}
	}

	return continuarProceso;
}

function disableOptionSelect() {
	var listaNivelesPermitidos = jQuery("#nivelesPermitidos").val();
//	var listaNivelesExistentes = jQuery("#listaNivelesExistentes").val();
	var jsonNiveles = jQuery.parseJSON(listaNivelesPermitidos);
	jQuery("#nivelAcademico option").each(function() {
		var thisOption = jQuery(this).val();
		var optionDisable = false;
		jQuery(this).attr("disabled", "disabled");
		jQuery.each(jsonNiveles, function(k, v) {
			if (v['descripcion'] == thisOption) {
				optionDisable = true;
			}
		});
		if (optionDisable == true) {
			jQuery(this).removeAttr("disabled");
		}
	});

}

function postAgregarFormacionAcademica(Registro, numberRow, listaGeneralName,
		idTd, nameFile) {
	var documentoSeleccionado = jQuery.trim(jQuery('#documento option:selected').text());
	if (documentoSeleccionado.toUpperCase().indexOf("NINGUNO") == -1
			|| jQuery("#formacionAcademicaFile").val() != "") {
		utilSendFile(Registro, numberRow, listaGeneralName, idTd, nameFile);
	} else {
		clearFormulario("formacionAcademica", nameFile);

	}
	jQuery("#errorArchivo").css("display", "none");
	if (valoresProfecionales == true) {
		disableOptionSelect()
	}
}

function postSelectRowFormacionAcademica(elementoSeleccionado) {

	jQuery.each(elementoSeleccionado, function(key,value){ 
		jQuery.each(value, function(llave, valor){

			if(valor == ""){
				jQuery('#'+llave).attr('disabled', 'disabled')
			}else if(valor instanceof Object){
				if(valor.id == ''){
					jQuery('#'+llave).attr('disabled', 'disabled')
				}
			}
			
		});
	});
}

function preSelectRowFormacionAcademica(elementoSeleccionado) {

	var carrera = elementoSeleccionado[0]['carrera'];
	var documento = elementoSeleccionado[0]['documento']['descripcion'];
	var nivel = elementoSeleccionado[0]['nivelAcademico']['descripcion'];
	var anios = elementoSeleccionado[0]['anosEstudios']['descripcion'];
	var nivelId = elementoSeleccionado[0]['nivelAcademico']['id'];
	setInstitucionAndAnios(nivel, nivelId);

	// Se habilita nombre de la institucion si institucion es Otra de lo
	// contrario se deshabilita

	var nivSiglas = nivel.trim().substring(0, 3);

	//if (carrera instanceof Object && nivSiglas !== "999") {
	if (carrera instanceof Object) {
		// jQuery("#nombreInstitucion").val(institutoUPN);
		//jQuery("#nombreInstitucion").attr('disabled', 'disabled');
		//jQuery("#carrera").removeAttr('disabled');
		parsearSelectCarreras()
	} /*else {
		//jQuery("#nombreInstitucion").removeAttr('disabled');
		//jQuery("#carrera").removeAttr('disabled');
		parsearInputCarreras()
	}*/

	// Se habilita cedula si el registro seleccionado trae como documento cedula
	// profesional de lo contrario se deshabilita
	if (documento.indexOf("Profesion") != -1) {
		jQuery("#cedulaProfecional").removeAttr('disabled');

	} else {
		jQuery("#cedulaProfecional").attr('disabled', 'disabled');

	}
	if (anios != "" || anios != undefined) {
		setAnosEnCombo(nivelId);
	}

}

function preClearFormularioFormacionAcademica() {
	parsearInputCarreras();
	jQuery("#carrera").attr('disabled', 'disabled');
	jQuery("#institucion").attr('disabled', 'disabled');
	jQuery("#nombreInstitucion").attr('disabled', 'disabled');
	jQuery("#cedulaProfecional").attr('disabled', 'disabled');
	jQuery("#anosEstudios").attr('disabled', 'disabled');
}

function postEliminarFormacionAcademica(Registro) {
	nivelPermitido = false;
	valoresProfecionales = false;
	if (ListaNivelSuperior.length > 0) {
		ListaNivelSuperior.shift()
		if (ListaNivelSuperior.length == 0) {
			jQuery("#nivelAcademico option").each(function() {
				jQuery(this).removeAttr("disabled");
			});
		}
	}
	jQuery("#botonAgregarFormacionAcademica").removeAttr("disabled");
}

function funcionUtilSenFileFormacionAcademica(map) {
	var archivoRequerido = false;
	var archivosCedula = false;
	var nomenglaturaCurp = true;
	var nomenglaturaNivel = true;
	var curp = jQuery("#curp").val();
	var numeroArchivos = 0;
	jQuery.each(map, function(key, value) {

		numeroArchivos = numeroArchivos + 1
		var tamanioNombreArchivo = value.length
		var curpArchivo
		var codigoNivel
		var codigoArchivo
		if (tamanioNombreArchivo == 31) {
			curpArchivo = value.substring(0, 18);
			codigoNivel = value.substring(19, 22);
			codigoArchivo = value.substring(23, tamanioNombreArchivo - 4);
		} else {
			curpArchivo = value.substring(0, 18);
			codigoArchivo = value.substring(19, tamanioNombreArchivo - 4);
		}


		var listaCodigos = listaCodigosFormacionAcademica;
		var listaCodigosArchivos = jQuery.parseJSON(listaCodigos);
		var codigosCedulas = jQuery('#codigosArchivosNivelSuperiorCedulas')
		.val();
		var listaCedulas = jQuery.parseJSON(codigosCedulas);

		var textoSelectNivel = jQuery("#nivelAcademico option:selected").text()

		var nomNivel = jQuery.trim(textoSelectNivel).substring(6, 9)

		if (curpArchivo.toUpperCase() != curp.toUpperCase()) {
			nomenglaturaCurp = false
		}

		if (tamanioNombreArchivo == 31) {
			if (codigoNivel.toUpperCase() != nomNivel.toUpperCase() && !isModificar) {
				nomenglaturaNivel = false
			}
		} else {
			var bandera = false;

			jQuery.each(listaCedulas, function(key, value) {

				if (nomNivel.toUpperCase() == value.clave) {
					bandera = true
				}
			});

			if (bandera == true) {
				if (codigoArchivo.length == 3) {
					jQuery.each(listaCedulas, function(key, value) {
						// Busqueda de valores para el archivo CPL
						if (nomNivel.toUpperCase() == value.clave
								&& codigoArchivo == value.descripcion) {
							archivosCedula = true;
						}
					});
				}
			}
		}
		jQuery.each(listaCodigosArchivos, function(llave, valor) {
			if (tamanioNombreArchivo == 31
					&& codigoArchivo == valor.cveDocumento) {
				if (codigoArchivo == valor.cveDocumento
						&& valor.requerido == "T") {
					archivoRequerido = true;
				}
			}
		});

	});
	if (nomenglaturaCurp == false) {
		noty({
			text : reglaCurp,
			type : 'warning',
			dismissQueue : true,
			modal : true,
			layout : 'center'
		});
		postEliminarFormacionAcademica("");
		return;
	}
	if (nomenglaturaNivel == false) {
		noty({
			text : errorNomenclaturaNivel,
			type : 'warning',
			dismissQueue : true,
			modal : true,
			layout : 'center'
		});
		postEliminarFormacionAcademica("");
		return;
	}
	if (numeroArchivos > 1 && archivosCedula == false) {
		noty({
			text : errorArchivosZip,
			type : 'warning',
			dismissQueue : true,
			modal : true,
			layout : 'center'
		});
		postEliminarFormacionAcademica("");
		return;
	}

	if (archivoRequerido == true) {
		deshabilitarInputs();
		return map
	} else {
		noty({
			text : archivoRequerido,
			type : 'warning',
			dismissQueue : true,
			modal : true,
			layout : 'center'
		});
		postEliminarFormacionAcademica("");
		return;
	}

	isModificar = false

}

function validarFormulario() {



	var requeridos = true

	var msgError = "";
	var patt = new RegExp(
	"((^([0-9A-Za-z\.\ \u00D1\u00F1\u00C1\u00E1\u00C9\u00E9\u00CD\u00ED\u00D3\u00F3\u00DA\u00FA\u00DC\u00FC])*)((\\s{0,1})([0-9A-Za-z \u00D1\u00F1\u00C1\u00E1\u00C9\u00E9\u00CD\u00ED\u00D3\u00F3\u00DA\u00FA\u00DC\u00FC])+)*$)");

	var carrera = jQuery("#carrera").val();
	var anosEstudios = jQuery("#anosEstudios").val();
	var anosEstudiosText = jQuery.trim(jQuery('#anosEstudios option:selected').text());
	var nivel = jQuery("#nivelAcademico").val();
	var institucion = jQuery("#institucion").val();
	var nombreInstitucion = jQuery("#nombreInstitucion").val();
	var estatus = jQuery("#estatus").val();
	var documento = jQuery("#documento").val();
	var numeroDeCedula = jQuery("#cedulaProfecional").val();
	var nivelSeleccionado = jQuery.trim(jQuery('#nivelAcademico option:selected').text());
	var institutoSeleccionado = jQuery.trim(jQuery('#institucion option:selected').text());
	var documentoSeleccionado = jQuery.trim(jQuery('#documento option:selected').text());

	var nivSiglas = nivelSeleccionado.trim().substring(0, 3);

	// *******se valida el campo nivel********//
	if (nivel == "" || typeof (nivel) == undefined) {
		requeridos = false;
		msgError = msgError + "\n" + nivelError + "<br>";
	}

	// *******se valida el campo años********//

	if(((nivelSeleccionado.toUpperCase().indexOf("INCOMPLET") != -1) && ((anosEstudios == "" || typeof (anosEstudios) == undefined) && anosEstudiosText.toUpperCase().indexOf("NO APLICA") == -1))
			|| (nivSiglas === "999" && anosEstudiosText.toUpperCase().indexOf("NO APLICA") == -1 )){
		requeridos = false;
		msgError = msgError + "\n" + anosEstudiosError + "<br>";
	}

	// *******se valida el campo institucion********//	
	//if (nivSiglas >= "H" && nivel.length > 0) {
	if (nivel == jsonIdsLic.pasante || nivel == jsonIdsLic.licIncompleta || nivel == jsonIdsLic.licCompleta) {
		if (institucion == "" || typeof (institucion) == undefined) {
			requeridos = false;
			msgError = msgError + "\n" + errorInstitucionReq + "<br>";
		}
	}

	// *******se valida el campo nombre de la institucion********//
//	if (((nivSiglas >= "H" && nivel.length > 0) || nivSiglas === "999") 
//	&& (nombreInstitucion == "" || typeof (nombreInstitucion) == undefined)) {
	if (nombreInstitucion == "" || typeof (nombreInstitucion) == undefined) {
		requeridos = false;
		msgError = msgError + "\n" + errorNombreInstitucionReq + "<br>";
	} /*
	 * else if (!patt.test(nombreInstitucion.toString())) { msgError =
	 * msgError + "\n" + errorNombreInstitucionAlfanum + "<br>";
	 * requeridos = false; }
	 */

	// *******se valida el campo carrera********//
	if (nivel == jsonIdsLic.ctIncompleta || nivel == jsonIdsLic.ctCompleta ||
			nivel == jsonIdsLic.pasante || nivel == jsonIdsLic.licIncompleta || nivel == jsonIdsLic.licCompleta ||
			nivel == jsonIdsLic.mtIncompleta || nivel == jsonIdsLic.mtCompleta || 
			nivel == jsonIdsLic.docIncompleto || nivel == jsonIdsLic.docCompleto) {
		if (carrera == "" || typeof (carrera) == undefined) {
			requeridos = false;
			msgError = msgError + "\n" + errorCarreraReq + "<br>";
		}
	}
	/*if (nivSiglas === "999" && (carrera == "" || typeof (carrera) == undefined)){
		requeridos = false;
		msgError = msgError + "\n" + errorCarreraReq + "<br>";
	}else if (nivSiglas !== "999" && carrera.length != 0 && (!patt.test(carrera.toString()))) {
		requeridos = false;
		msgError = msgError + "\n" + errorCarreraAlfanum + "<br>";
	}*/

	// //*******se valida el campo estatus********//
	// if (estatus == "" || typeof(estatus) == undefined) {
	// requeridos = false;
	// msgError = msgError +"\n"+ estatusError +"<br>";
	// }

	// *******se valida el campo documento********//
	if (documento == "" || typeof (documento) == undefined) {
		requeridos = false;
		msgError = msgError + "\n" + documentoError + "<br>";
	}

	// *******se valida el campo Numero de cedula********//
	if ((documentoSeleccionado.toUpperCase().indexOf("PROFESIONAL") != -1)
			&& (numeroDeCedula == "" || typeof (numeroDeCedula) == undefined)) {
		requeridos = false;
		msgError = msgError + "\n" + numeroDeCedulaError + "<br>";
	}

	// *******se valida el que se haya seleccionado un archivo para
	// cargar********//
	if (documentoSeleccionado.toUpperCase().indexOf("NINGUNO") != -1) {

	} else {
		if (jQuery("#formacionAcademicaFile").val() == "") {
			requeridos = false;
			msgError = msgError + "\n" + faltaArchivo + "<br>";
		}
	}


	var fileName = jQuery("#formacionAcademicaFile").val()
	var extension = fileName.substring(fileName.indexOf(".")+1)

	if(currentProfile  == 'Captura_UR'){
		if(extension.toUpperCase() != 'ZIP'){
			requeridos = false;
			msgError = msgError + "\n No es un archivo .zip <br>";
		}
	}

	// si existen errores en el formulario se muestran en noty
	if (msgError.length > 0) {
		noty({
			text : msgError,
			type : 'error',
			dismissQueue : true,
			modal : true,
			layout : 'center'
		});
	}

	return requeridos;
}

function extraDataFormacionAcademica() {

	return {
		'listaFormacionAcademica' : getListaMaestraGuardadoParcial('listaMaestraFormacionAcademica')
	}



}



//function preModificarFormacionAcademica(){
//return preAgregarFormacionAcademica();
//}