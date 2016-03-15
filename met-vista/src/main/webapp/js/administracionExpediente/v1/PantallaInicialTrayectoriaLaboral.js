var operacionTrayectoriaLaboral;
var dateDesde = (new Date).getFullYear()-65;
var estatusTrayectoriaLaboral = true;
var mensajeTrayectoriaLaboral;
var registrosErroneos = []
var errorDeValidacion = false
var errorServicio = false

var jsonIdsTrayectoriaLaboral;

var arrayIndicesAEliminar=[];

jQuery(document).ready(function() {
	
	var idsCombos =  jQuery( "#idsCombos" ).val()
	
	jsonIdsTrayectoriaLaboral = jQuery.parseJSON(idsCombos);
	var idOperacion = jQuery("#idOperacion").val();
	
	if(!jQuery("#fechaInicio").prop('disabled')){ 
		jQuery( "#fechaInicio" ).datepicker({
			changeMonth: true,
			changeYear: true,
			yearRange: dateDesde + ":",
			maxDate: "-1d",
			showOn: "button",
			buttonImage: "images/calendar.gif",
			buttonImageOnly: true
		});
	}
	
	if(!jQuery("#fechaFinal").prop('disabled')){
		jQuery( "#fechaFinal" ).datepicker({
			changeMonth: true,
			changeYear: true,
			yearRange: dateDesde + ":",
			maxDate: "-1d",
			showOn: "button",
			buttonImage: "images/calendar.gif",
			buttonImageOnly: true
		});
	}


	
	var mapaColumnas = {
			0:'dependencia', 
			1:'tipoAntiguedad', 
			2:'tipoRama', 
			3:'tipoPeriodo',
			4:'fechaInicio', 		 
			5:'fechaFinal',
			6:'archivosCargados',
			7:'botonEliminarRegistro'};

	//insaneAdn('trayectoriaLaboral','tablaTrayectoriaLaboral',mapaColumnas, 'listaMaestraTrayectoriaLaboral',"mapDoctosTrayectoriaLaboralFile");

	var jsonDatos;		
	var listaTrabajadorTrayectoriaLaboral = jQuery("#listaTrabajadorTrayectoriaLaboral").val();

	if(listaTrabajadorTrayectoriaLaboral != ""){
		
		jsonDatos = jQuery.parseJSON(listaTrabajadorTrayectoriaLaboral);
		
//		cargaTablaConsultaModificacion(jsonDatos, mapaColumnas, 'listaMaestraTrayectoriaLaboral', 'tablaTrayectoriaLaboral', 'trayectoriaLaboral',"mapDoctosTrayectoriaLaboralFile");
	}	
	
	//REALIZA EL LLAMADO AL SERVICIO DE CALCULO DE ANTIGUEDAD PARA LA CARGA INICIAL
	var listaMaestraTrayectoria = "" //= getListaMaestraGuardadoParcial('listaMaestraTrayectoriaLaboral')

	if(!(listaMaestraTrayectoria == "" || listaMaestraTrayectoria.length == 0)){

		calculaLaAntiguedadDelTrabajador();

	}

	jQuery("#ahorroSolidario").attr("disabled",true);
	
	var idRegimenTrayectoriaLaboral = jQuery("#idRegimenTrayectoriaLaboral").val();
	
	var idAhorroSolidario = jQuery("#idAhorroSolidario").val();
	
	
	jQuery("#"+idRegimenTrayectoriaLaboral).attr('checked', true);
	
	if(jQuery("[name='regimenTrayectoriaLaboral']:checked").hasClass( "class_DT" )){
		
		jQuery("#ahorroSolidario").attr("disabled",true);
		jQuery('#ahorroSolidario :nth-child(2)').attr('selected', 'selected');
	}else if (jQuery("[name='regimenTrayectoriaLaboral']:checked").hasClass( "class_CI")){
		if(!(jQuery("[name='regimenTrayectoriaLaboral']:checked").prop("disabled"))){
			jQuery("#ahorroSolidario").attr("disabled",false);
		}
		jQuery("#ahorroSolidario").val(""+idAhorroSolidario)
	}
	jQuery("#tipoRama").attr("disabled",true);
	jQuery("input[name='regimenTrayectoriaLaboral']").click(function(){
		if(jQuery(this).hasClass( "class_CI" )){
			
			jQuery("#ahorroSolidario").attr("disabled",false);
			jQuery("#ahorroSolidario option:first").attr('selected','selected');
			
		}else if(jQuery(this).hasClass( "class_DT" )){
			jQuery('#ahorroSolidario :nth-child(2)').attr('selected', 'selected');
			jQuery("#ahorroSolidario").attr("disabled",true);
			
			
		}
		
	});	

	jQuery("#tipoAntiguedad").change(function(){
		
		var idTipoAntiguedad = jQuery(this).val()
		
		
		if(idTipoAntiguedad == jsonIdsTrayectoriaLaboral.antiguedadGobiernoFederal || idTipoAntiguedad == jsonIdsTrayectoriaLaboral.antiguedadSep ){
			jQuery("#tipoRama").attr("disabled",true);
			jQuery('#tipoRama').val(jsonIdsTrayectoriaLaboral.ramaNoAplica);
			
		}else if(idTipoAntiguedad == jsonIdsTrayectoriaLaboral.antiguedadRama){
			
			jQuery("#tipoRama").attr("disabled",false);
			jQuery("#tipoRama option:first").attr('selected','selected');
		}

	});
	
	jQuery("#documentoRequeridoTrayectoria").show();
	
	jQuery("#tipoPeriodo").change(function(){
		
		var idTipoPeriodo = jQuery(this).val();
		
		if(idTipoPeriodo == jsonIdsTrayectoriaLaboral.periodoLaboral){
			jQuery("#documentoRequerido").show();
			jQuery("#documentoRequeridoTrayectoria").show();
			
		}else if (idTipoPeriodo == jsonIdsTrayectoriaLaboral.periodoNoLaboral){
			jQuery("#documentoRequeridoTrayectoria").hide();
		} else {
			jQuery("#documentoRequeridoTrayectoria").show();
		}	  
	});

	var pattTrayectoriaLaboral = new RegExp(procesoAutorizacion);  
	
	if(pattTrayectoriaLaboral.test(cveEstatusExp) || 
			cveEstatusExp ==autorizado  ||
			cveEstatusExp ==rechazado)
	     {				
			jQuery(".trayectoriaLaboral").attr("disabled","disabled");
			jQuery('#tablaTrayectoriaLaboral td:nth-child(8)').hide(); 
			jQuery("#botonesTrayectoriaLaboral").hide()
			jQuery("#labelDocumentosAdjuntos").hide();
			jQuery("#botonLimpiarTrayectoriaLaboral").remove();
			jQuery("#botonAgregarTrayectoriaLaboral").remove();
		}
	
	jQuery("#fechaInicio").attr('readonly','readonly');
	jQuery("#fechaFinal").attr('readonly','readonly');
	

});

	function respondeCorrecto(data){
		
		
		estatusTrayectoriaLaboral = true
	//	if(data.response.message == 'OK'){
		
			jQuery("#anioTotalGfSep").attr("value",data.response.data.TOTAL_GF_SEP.anios)
			jQuery("#mesTotalGfSep").attr("value",data.response.data.TOTAL_GF_SEP.meses)
			jQuery("#diaTotalGfSep").attr("value",data.response.data.TOTAL_GF_SEP.dias)
		
			jQuery("#anioGF").attr("value",data.response.data.GOBIERNO_FEDERAL.anios)
			jQuery("#mesGF").attr("value",data.response.data.GOBIERNO_FEDERAL.meses)
			jQuery("#diaGF").attr("value",data.response.data.GOBIERNO_FEDERAL.dias)
		
			jQuery("#anioSEP").attr("value",data.response.data.SEP.anios)
			jQuery("#mesSEP").attr("value",data.response.data.SEP.meses)
			jQuery("#diaSEP").attr("value",data.response.data.SEP.dias)
		
			jQuery("#anioRama").attr("value",data.response.data.TOTAL_RAMAS.anios)
			jQuery("#mesRama").attr("value",data.response.data.TOTAL_RAMAS.meses)
			jQuery("#diaRama").attr("value",data.response.data.TOTAL_RAMAS.dias)
		
			jQuery("#anioUpn").attr("value",data.response.data.UPN.anios)
			jQuery("#mesUpn").attr("value",data.response.data.UPN.meses)
			jQuery("#diaUpn").attr("value",data.response.data.UPN.dias)
		
			jQuery("#anioNormal").attr("value",data.response.data.NORMAL.anios)
			jQuery("#mesNormal").attr("value",data.response.data.NORMAL.meses)
			jQuery("#diaNormal").attr("value",data.response.data.NORMAL.dias)
		
			jQuery("#anioTec").attr("value",data.response.data.TECNOLOGICO.anios)
			jQuery("#mesTec").attr("value",data.response.data.TECNOLOGICO.meses)
			jQuery("#diaTec").attr("value",data.response.data.TECNOLOGICO.dias)
		
			jQuery("#anioAct").attr("value",data.response.data.MAGISTERIO.anios)
			jQuery("#mesAct").attr("value",data.response.data.MAGISTERIO.meses)
			jQuery("#diaAct").attr("value",data.response.data.MAGISTERIO.dias)
		
	//	}
	
	}


	function respondeError(data){
		errorServicio = true
		estatusTrayectoriaLaboral = false
		mensajeTrayectoriaLaboral = data.responseJSON.response.details
		errorCalculo = data.responseJSON.response.details
		
		
		return ; 
	}

	function preModificarTrayectoriaLaboral(){
		return preAgregarTrayectoriaLaboral();
	}
	
	
	function preAgregarTrayectoriaLaboral(){
		
//		if(errorServicio){
//			
//			var listaGeneral  = listaMaestra['listaMaestraTrayectoriaLaboral'] 
//			var keys = Object.keys(listaGeneral);
//			var invalidKey = keys[keys.length-1];
//			
//			delete window.listaMaestra['listaMaestraTrayectoriaLaboral'][invalidKey]
//			errorServicio = false
//		}
		
		if(listaMaestra['listaMaestraTrayectoriaLaboral'] != undefined){
			eliminaInconsistencias()
			
		}
		
		
		var continuarProceso = true;
		var nivelPermitido = false;
		var curp = jQuery("#curp").val();
		var  fechaDesde = jQuery("#fechaInicio").val();
		var fechaHasta = jQuery("#fechaFinal").val();
		var listaMaestraTrayectoria = getListaMaestraGuardadoParcial('listaMaestraTrayectoriaLaboral')
	
		var idTipoPeriodo = jQuery("#tipoPeriodo").val();
		
		//Se valida que el curp ya este capturado para poder continuar
		if(curp == undefined || curp == "") {
			noty({
				text: curpRequeridadError,
				type    : 'error',
				dismissQueue: true,
				modal	: true,
				layout	: 'center'
			});
			return false;
		}
		if((idTipoPeriodo == jsonIdsTrayectoriaLaboral.periodoNoLaboral) && (listaMaestraTrayectoria == "" || listaMaestraTrayectoria.length == 0)){
			noty({
				text: primerReg,
				type    : 'error',
				dismissQueue: true,
				modal	: true,
				layout	: 'center'
			});
	
			return false;
		}
		if((idTipoPeriodo == jsonIdsTrayectoriaLaboral.periodoNoLaboral) &&  (fechaHasta == "")){
			noty({
				text: fechaPorTipoPer,
				type    : 'error',
				dismissQueue: true,
				modal	: true,
				layout	: 'center'
			});
			return false;
		}
		var a = generateDate(fechaHasta)
		var b = generateDate(fechaDesde)
		if((fechaHasta != "") && (a<b)){
			noty({
				text: fechaDesdeError,
				type    : 'error',
				dismissQueue: true,
				modal	: true,
				layout	: 'center'
			});	 
			return false;
		}	
		if(idTipoPeriodo == jsonIdsTrayectoriaLaboral.periodoLaboral && jQuery("#mapDoctosTrayectoriaLaboralFile").val() == "" ){
			requeridos = true;
			noty({
				text: archivoReq,
				type    : 'error',
				dismissQueue: true,
				modal	: true,
				layout	: 'center'
			});
			return false;
		}
		//Realiza la ejecuci�n de la funci�n para validar el formulario, si todos los datos estan correctos contin�a
		continuarProceso = validarFormularioTrayectoriaLaboral();
		if (continuarProceso == true){
			jQuery("#botonAgregarTrayectoriaLaboral").attr("disabled", false);
		}
		
		return continuarProceso;
	}


	
	function validarFormularioTrayectoriaLaboral(){
		var requeridos = true
	
		var msgError = "";
		var patternCURP = new RegExp("((^([0-9A-Za-z\u00D1\u00F1\u00C1\u00E1\u00C9\u00E9\u00CD\u00ED\u00D3\u00F3\u00DA\u00FA\u00DC\u00FC])*)((\\s{0,1})([0-9A-Za-z\u00D1\u00F1\u00C1\u00E1\u00C9\u00E9\u00CD\u00ED\u00D3\u00F3\u00DA\u00FA\u00DC\u00FC])+)*$)");
	
		//Se generan variables con los campos del formulario para validar la estructura de la informaci�n capturada
	
		var ahorroSolidario = jQuery("#ahorroSolidario").val();		
		var dependencia = jQuery("#dependencia").val();
		var tipoAntiguedad = jQuery("#tipoAntiguedad").val();
		var tipoPeriodo = jQuery("#tipoPeriodo").val();
		var fechaInicio = jQuery("#fechaInicio").val();	
		var fechaFin = jQuery("#fechaFinal").val();
		var tipoRama = jQuery("#tipoRama").val();
		var mapDoctosTrayectoriaLaboral = jQuery("#mapDoctosTrayectoriaLaboralFile").val();
	
		if(jQuery("[name='regimenTrayectoriaLaboral']:checked").length == 0){
			requeridos = false;
			msgError = msgError +"\n"+ mgeErrorRegimen +"<br>";
		} else if(ahorroSolidario == "" || typeof(ahorroSolidario) == undefined || ahorroSolidario == null) {
			requeridos = false;
			msgError = msgError +"\n"+ mgeErrorAhorro +"<br>";
		}
		
		//-----------Validaciones para el campo Dependencia
		if (dependencia == "" || typeof(dependencia) == undefined) {
			requeridos = false;
			msgError = msgError +"\n"+ mgeErrorDependencia +"<br>";
		}
	
		//-----------Validaciones para el tipo de antiguedad
		if (tipoRama == "" || typeof(tipoRama) == undefined) {
			requeridos = false;
			msgError = msgError +"\n"+ mgeErrorRama +"<br>";
		}
	
		//-----------Validaciones para el tipo Rama
		if (tipoAntiguedad == "" || typeof(tipoAntiguedad) == undefined) {
			requeridos = false;
			msgError = msgError +"\n"+ mgeErrorAntiguedad +"<br>";
		}
	
		//-----------Validaciones para el tipo de Periodo
		if (tipoPeriodo == "" || typeof(tipoPeriodo) == undefined) {
			requeridos = false;
			msgError = msgError +"\n"+ mgeErrorPeriodo +"<br>";
		}
	
		//-----------Validaciones para el campo Fecha Inicial
		if (fechaInicio == "" || typeof(fechaInicio) == undefined) {
			requeridos = false;
			msgError = msgError +"\n"+ mgeErrorFechaInicio +"<br>";
		}
		
		if(fechaInicio !="" && fechaFin !=""){
			if(fechaInicio == fechaFin){
				requeridos = false;
				noty({
					text: fechaInicioError,
					type    : 'error',
					dismissQueue: true,
					modal	: true,
					layout	: 'center'
				});
			}
		}
		
		//si existen errores en el formulario se muestran en noty
		if(msgError.length > 0)	{
			noty({
				text: msgError,
				type    : 'error',
				dismissQueue: true,
				modal	: true,
				layout	: 'center'
			});
		}
	
		return requeridos;
	
	}

//////----Validaci�n para el nombre del archivo cargado
	function funcionUtilSenFileTrayectoriaLaboral(mapa){
	
		var cveDoc = jQuery.parseJSON(jQuery("#lstDocumentosTrayectoriaLaboral").val().toString())[0].cveDocumento
	
		var codigoArchivo;
		var nombreArchivoSubido;
	
		jQuery.each(mapa, function(key, value) {		
			nombreArchivoSubido = value.toString();
		});
	
		var curp = jQuery("#curp").val();
	
		if(curp == undefined || curp == "") {
			noty({
				text: mgeErrorFormatoArchivo,
				type    : 'error',
				dismissQueue: true,
				modal	: true,
				layout	: 'center'
			});
			return;
		}
		var datos = nombreArchivoSubido.split("_");
	
		if (datos.length != 2){
			noty({				
				text: mgeErrorFormatoArchivo,
				type    : 'error',
				dismissQueue: true,
				modal	: true,
				layout	: 'center'
			});
			return;
		}
	
		var curpTrabajador = datos[0].toString();
	
		if(curpTrabajador == undefined || curpTrabajador == "" || curpTrabajador !=curp) {
			noty({			
				text: mgeErrorFormatoArchivo,
				type    : 'error',
				dismissQueue: true,
				modal	: true,
				layout	: 'center'
			});
			return;
		}
		
		
		
		
		codigoArchivo = (datos[1].toString()).split(".");
	
		if(!(codigoArchivo[0] == cveDoc)){
			noty({
				text: mgeErrorFormatoArchivo,
				type    : 'warning',
				dismissQueue: true,
				modal	: true,
				layout	: 'center'
			});
			return;
		}
	
		return mapa;
}


	function extraDataTrayectoriaLaboral(){
		
		if(jQuery("[name='regimenTrayectoriaLaboral']:checked").hasClass( "class_DT" )){
			
			return {'listaTrabajadorTrayectoriaLaboral':getListaMaestraGuardadoParcial('listaMaestraTrayectoriaLaboral'),
				'idAhorroSolidario':jQuery("#ahorroSolidario").val()
			}
			
		}
		else{
			return {'listaTrabajadorTrayectoriaLaboral':getListaMaestraGuardadoParcial('listaMaestraTrayectoriaLaboral')}
		}
		
	}

	function calculaLaAntiguedadDelTrabajador(){
		
		var ObjJsonPeticion = getListaMaestraGuardadoParcial('listaMaestraTrayectoriaLaboral')

		var json = {
				data:{
					listaAntiguedades:[JSON.stringify(ObjJsonPeticion)]
				}
		};
	
		var rest = new RestClient(context+'/rest/trayectoriaLaboral/calculaAntiguedad', 'POST', JSON.stringify(json), respondeCorrecto, respondeError);
		rest.async = false
		rest.call();
		
	}

	function postModificarTrayectoriaLaboral(listaRow, numberRow, listaGeneralName,idTr,file){
		
		calculaLaAntiguedadDelTrabajador();
		
	}
	
	function postAgregarTrayectoriaLaboral(listaRow, numberRow, listaGeneralName,idTr,file){
		
		
		calculaLaAntiguedadDelTrabajador();
		
		if(!estatusTrayectoriaLaboral){
			noty({
				text: errorCalculo,
				type    : 'warning',
				dismissQueue: true,
				modal	: true,
				layout	: 'center'
			});
			
			eliminarRegistrosNoLaborados([numberRow])
			

		}
		
		var splitTipoPeriodo = jQuery('#tipoPeriodo option:selected').html().split("-")[0];
		
		
		if (jQuery("#mapDoctosTrayectoriaLaboralFile").val() != ""){
			
			utilSendFile(listaRow, numberRow, listaGeneralName,idTr,file);
		}else {
			clearFormulario('trayectoriaLaboral', 'mapDoctosTrayectoriaLaboralFile');
		}
		
		
	}

	function preEliminarTrayectoriaLaboral(listaAeliminar){
		
		var idPeriodoTrayectoriaLaboral = ""+jsonIdsTrayectoriaLaboral.periodoLaboral
		
		
		
		if(""+listaAeliminar[0].tipoPeriodo == idPeriodoTrayectoriaLaboral){
			
			var llaveTuplaAEliminar =	listaAeliminar[0].dependencia+"_"+
										listaAeliminar[0].tipoAntiguedad+"_"+
										listaAeliminar[0].tipoRama+"_";
			var arrayIndicesAEliminar = []
			var mapaTrayectoriaLaboral = listaMaestra['listaMaestraTrayectoriaLaboral'];
			
			var mapaDeDatosPorIndice={};
			
			jQuery.each(mapaTrayectoriaLaboral, function(llave, listaDeMapasDeDatos) {
				
				mapaDeDatosPorIndice = getMapParseado(listaDeMapasDeDatos)
							
				var llaveTuplaEnMapa = 	mapaDeDatosPorIndice.dependencia+"_"+
									mapaDeDatosPorIndice.tipoAntiguedad.idCat+"_"+
									mapaDeDatosPorIndice.tipoRama.idCat+"_";	
				
				if(llaveTuplaAEliminar == llaveTuplaEnMapa  ){					
					arrayIndicesAEliminar.push(llave);
				}				
				
			});
		
			
		}
		else{
			
			return true;
		}
		
		if(arrayIndicesAEliminar.length > 1){
			
			if(confirm('Se eliminar&aacute;n registros no laborados,Esta seguro que desea eliminar ?')){
				eliminarRegistrosNoLaborados(arrayIndicesAEliminar)
				calculaLaAntiguedadDelTrabajador();
			}
			
			return false
					
		}
		else{
			return true
		}
	
		return false;
	}
	
	
	
	function postEliminarTrayectoriaLaboral(){
		eliminaInconsistencias()
		calculaLaAntiguedadDelTrabajador();
		
	}
	
	
	function eliminarRegistrosNoLaborados(arrayIndicesAEliminar){
		//se remueve el registro de la tabla y de la lista
		
		for(var i=0;i<arrayIndicesAEliminar.length;i++){
			jQuery("#" + arrayIndicesAEliminar[i] ).remove();
				var listaGeneral  = listaMaestra['listaMaestraTrayectoriaLaboral']
				listaGeneral[arrayIndicesAEliminar.splice(0,2)]
				listaMaestra['listaMaestraTrayectoriaLaboral'] = listaGeneral
				
		}
		eliminaInconsistencias()
	}


	function getMapParseado(listaGeneral){
		var mapaRegistro = {}
		jQuery.each(listaGeneral, function(key,value){
			
			jQuery.each(value,function(llave,valor){
				mapaRegistro[llave]=valor				
			});
				
		});
		
		
		return mapaRegistro;
	}

	function generateDate(stringDate){
	
		var a =  stringDate
		var splitA = a.split("/")
		var dayStringA = splitA[0]
		var mounthStringA = splitA[1]
		var yearStringA = splitA[2] 
		return new Date(yearStringA ,mounthStringA,dayStringA)
	
	}
	
	function eliminaInconsistencias(){
		
		var rowTableCount = jQuery('#tablaTrayectoriaLaboral tr').length-1
		var listaGeneral  = Object.keys(listaMaestra['listaMaestraTrayectoriaLaboral']).length	
		if(rowTableCount != listaGeneral){
			
			var listaGeneral  = listaMaestra['listaMaestraTrayectoriaLaboral'] 
			var keys = Object.keys(listaGeneral);
			var invalidKey = keys[keys.length-1];					
			delete window.listaMaestra['listaMaestraTrayectoriaLaboral'][invalidKey]
			
			if (rowTableCount == 0 || rowTableCount == -1 ){
				
				eliminaInconsistencias()
				//delete window.listaMaestra['listaMaestraTrayectoriaLaboral']
			}
				
			
			errorRemoverUltimoElemento = false
		}
		
	}
