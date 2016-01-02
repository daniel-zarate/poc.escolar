var dateDesde = (new Date).getFullYear()-100;
var operacionDependientes;
var listaCodigosDependientesFamiliares;
var mapaParentescoDocumento;

var numeroRow;
var numeroFilaDependiente;
jQuery(document).ready(function() {
	
	listaCodigosDependientesFamiliares= jQuery("#codigoArchivosDependientesFamiliares").val();
	
	mapaParentescoDocumento = jQuery.parseJSON(jQuery("#mapaParentescoDocumento").val().toString());
	
	generarCombosAnidados("nivelGrado");
	
	jQuery(".soloNumeros").keydown(function (event) {
	    
	    if ((!event.shiftKey && !event.ctrlKey && !event.altKey) && 
	            ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105))) // 0-9 or numpad 0-9, disallow shift, ctrl, and alt
	    {
	    
	    }
	    else if (event.keyCode != 8 && event.keyCode != 46 && event.keyCode != 37 && event.keyCode != 39 && event.keyCode != 9) // not esc, del, left or right
	    {
	    event.preventDefault();
	    }
	    
	    }); 
	
	jQuery("#fechaNacimientoDependientesFamiliares").datepicker({
		changeMonth: true,
		changeYear: true,
		yearRange: dateDesde + ":",
		maxDate: "-0d",
		onSelect: function (date) {
			calculaEdadDependientesFamiliares();
		},
		onChangeMonthYear: function (year, month, inst) {
			var valDate = jQuery(this).val()
			var operation = jQuery("#operacionDependientes").val()
			
			if (valDate == ""){
				return; 
			}			
				
			var curDate = jQuery(this).datepicker("getDate");
			
			if (curDate.getYear() != year || curDate.getMonth() != month - 1) {
				curDate.setYear(year);
				curDate.setMonth(month - 1);
				jQuery(this).datepicker("setDate", curDate);
			}
			
			calculaEdadDependientesFamiliares();
		}

	});
	/*
	 * 02/07/2015
	 * Capturar el evento del 'SELECT' parentezco para sugerir al usuario el 
	 * 'documento adjunto' que deberá cargar.
	 * */
	jQuery("#parentescoDependientesFamiliares").on('change', function() {
		var idParentezco = jQuery("#parentescoDependientesFamiliares").val();
		// Ocultar la descripción actual del documento que se debe adjuntar.
		jQuery(".DocumentItem").each(function(){
			jQuery("#"+this.id).hide();
		});
		// Mostrar la nueva descripción del documento que se debe adjuntar.
		jQuery("#"+idParentezco).show();
	});
	

	
	
	var mapaColumnas = {
			  0:'curpDependientesFamiliares', 
			  1:'primerApellidoDependientesFamiliares', 
			  2:'segundoApellidoDependientesFamiliares', 
			  3:'nombreDependientesFamiliares',
			  4:'parentescoDependientesFamiliares', 		 
			  5:'archivosCargados',
			  6:'botonEliminarRegistro'};

	insaneAdn('dependientesFamiliares','tablaDatosDependientesFamiliares',mapaColumnas, 'listaMaestraDependientesFamiliares',"dependientesFamiliaresFile");
	
	var listaDependientesFamiliares = jQuery("#listaDependientesFamiliares").val();
	
	if(listaDependientesFamiliares != ""){
		jsonDatos = jQuery.parseJSON(listaDependientesFamiliares);
		cargaTablaConsultaModificacion(jsonDatos, mapaColumnas, 'listaMaestraDependientesFamiliares', 'tablaDatosDependientesFamiliares', 'dependientesFamiliares',"dependientesFamiliaresFile");
	}	
	

	operacionDependientes = jQuery("#operacionDependientes").val();
		
//	if (operacionDependientes == "crear") {
//		// Alta		
//		
//		jQuery("#primerApellidoDependientesFamiliares").prop("required", false);		                     			
//		jQuery("#segundoApellidoDependientesFamiliares").prop("required", false);
//		jQuery("#nombreDependientesFamiliares").prop("required",false);
//		jQuery("#curpDependientesFamiliares").prop("required",false);
//		jQuery("#fechaNacimientoDependientesFamiliares").prop("required",false);
//		jQuery("#fechaNacimientoDependientesFamiliares").prop("disabled",true);
//		jQuery("#edadDependientesFamiliares").prop("required",false);
//		jQuery("#edadDependientesFamiliares").prop("disabled",true);
//		jQuery("#sexoDependientesFamiliares").prop("required",false);
//		jQuery("#sexoDependientesFamiliares").prop("disabled",true);
//				
//		
//	}
//	
//	else if (operacionDependientes == "consultar") {
//		// Consultar
//		jQuery("#primerApellidoDependientesFamiliares").prop("readOnly",true);		                     			
//		jQuery("#segundoApellidoDependientesFamiliares").prop("readOnly",true);
//		jQuery("#nombreDependientesFamiliares").prop("readOnly",true);
//		jQuery("#curpDependientesFamiliares").prop("readOnly",true);
//		jQuery("#fechaNacimientoDependientesFamiliares").prop("disabled",true);
//		jQuery("#edadDependientesFamiliares").prop("readOnly",true);
//		jQuery("#sexoDependientesFamiliares").prop("readOnly",true);
//		
//		jQuery("#parentescoDependientesFamiliares").val( "25" );
//		jQuery("#nivelDependientesFamiliares").val( "NA2" );
//		jQuery("#gradoDependientesFamiliares").val( "45" );
//		
//		jQuery("#parentescoDependientesFamiliares").prop("disabled",true);
//		jQuery("#nivelDependientesFamiliares").prop("disabled",true);
//		jQuery("#gradoDependientesFamiliares").prop("disabled",true);
//		jQuery("#dependientesFamiliaresFile").prop("disabled",true);
//		
//	}

	jQuery("#curpDependientesFamiliares").bind('keyup',function(){
		
		if(jQuery(this).val().length == 18){				
			
			jQuery("#fechaNacimientoDependientesFamiliares").prop("disabled",false);
			jQuery("#edadDependientesFamiliares").prop("disabled",false);
			jQuery("#sexoDependientesFamiliares").prop("disabled",false);
			//obtener fecha						
			
			var fecha = jQuery(this).val().toString().substring(4, 10)//yymmdd
			
			var date = jQuery.datepicker.parseDate( "ymmdd", fecha );
			
			var dateFormat = jQuery.datepicker.formatDate( "dd/mm/yy", date );
			
			var edad = obtenerEdadActual(date);
			
			
			
			//------------------------------------------------------------------------------------------------------
			var mesDeNacimiento = date.getMonth() + 1;
			var mesActual = new Date().getMonth()+1


			if(mesDeNacimiento < mesActual)
				edad = edad


				if(mesDeNacimiento > mesActual)
					edad = edad-1


					if(mesDeNacimiento == mesActual){
						var diaNacimiento = date.getDate();
						var diaActual = new Date().getDate();


						if(diaNacimiento <= diaActual)
							edad = edad
							else
								edad = edad-1
					}

			//------------------------------------------------------------------------------------------------------
			
			
			
			if (edad < 0){
				date = new Date (date.getFullYear()-100, date.getMonth(), date.getDate());
				dateFormat = jQuery.datepicker.formatDate( "dd/mm/yy", date);
				edad = obtenerEdadActual(date);					
			}
			
				jQuery("#fechaNacimientoDependientesFamiliares").datepicker( "setDate" , dateFormat );
			
				jQuery("#edadDependientesFamiliares").val(edad);
				
			var sexo = jQuery(this).val().toString().substring(10, 11);
			
			if(sexo == "H" || sexo == "h"){				
				jQuery("#sexoDependientesFamiliares").val("23");
			}
			else if(sexo == "M" || sexo == "m"){
				jQuery("#sexoDependientesFamiliares").val("24");
			}				
		}
		else{
			jQuery("#fechaNacimientoDependientesFamiliares").prop("value","");
			jQuery("#edadDependientesFamiliares").attr("value","");
			jQuery("#sexoDependientesFamiliares option:first").attr('selected','selected');
			jQuery("#fechaNacimientoDependientesFamiliares").prop("disabled",true);
			jQuery("#edadDependientesFamiliares").prop("disabled",true);
			jQuery("#sexoDependientesFamiliares").prop("disabled",true);
		}
		
		
		
	});
	
	
    var patt = new RegExp(procesoAutorizacion);  
	
	if(patt.test(cveEstatusExp) || 
			cveEstatusExp ==autorizado  ||
			cveEstatusExp ==rechazado)
	     {				
				jQuery(".dependientesFamiliares").attr("disabled","disabled")
				jQuery("#divFileAndButtons").hide()
				jQuery("#columnaEliminarDependientesFamiliares").remove();
				jQuery("#botonEliminarRegistro").remove();
				jQuery('#tablaDatosDependientesFamiliares td:nth-child(7)').hide(); 
				
		}
	
	jQuery("#tablaDatosDependientesFamiliares tbody tr").click(function() {
		
		numeroFilaDependiente= jQuery(this).attr('id');
		seleccionarGrado();
	});
	
	
});

function seleccionarGrado(){
	var lista = getListaMaestraGuardadoParcial('listaMaestraDependientesFamiliares');
	var row = numeroFilaDependiente
	var mapa = lista[row];
	
	var listaGeneral = listaMaestra['listaMaestraDependientesFamiliares']
	var registro = []
	registro[0] = listaGeneral[numeroFilaDependiente];
	
	var listaConRegistroSeleccionado = getListProcessed(registro, true);
	var mapa = listaConRegistroSeleccionado[0]
	
	var values = mapa['gradoDependientesFamiliares']
	var valor = values['id'];
	jQuery("#gradoDependientesFamiliares").attr("data-selected",valor);
	generarCombosAnidados("nivelGrado");
	selectDataCombos("nivelGrado");

}




function obtenerEdadActual(fechaNacimiento){
	
	var currentDate= new Date();
	return currentDate.getFullYear()-fechaNacimiento.getFullYear();
	
}


function extraDataDependientesFamiliares(){	
	return {'listaDependientesFamiliares':getListaMaestraGuardadoParcial('listaMaestraDependientesFamiliares')}
}

function postAgregarDependientesFamiliares(listaRow, numberRow, listaGeneralName,idTr,file){
	numeroRow = numberRow;
	utilSendFile(listaRow, numberRow, listaGeneralName,idTr,file);
}



function funcionUtilSenFileDependientesFamiliares(mapa){
	
	
	var codigoArchivo;
	var nombreArchivoSubido;
	
	jQuery.each(mapa, function(key, value) {
		
		nombreArchivoSubido = value.toString();
		//var tamanioNombreArchivo = value.toString().length		
		//codigoArchivo = value.substring(19,tamanioNombreArchivo-4)
	});
	
	var curp = jQuery("#curp").val();
	
	
	if(curp == undefined || curp == "") {
	
		noty({
			text: eFormatoArchivo,
			type    : 'error',
			dismissQueue: true,
			modal	: true,
			layout	: 'center'
		});
		return;
	}
	
	
	
	var datos = nombreArchivoSubido.split("_");
	
	if (datos.length != 3){
		
			noty({				
				text: eFormatoArchivo,
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
			text: eFormatoArchivo,
			type    : 'error',
			dismissQueue: true,
			modal	: true,
			layout	: 'center'
		});
		return;
	}
	

	
	
	var curpDependienteFamiliar = datos[1].toString();
	
	var curpRgx="[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}" +
	"(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])" +
	"[HM]{1}" +
	"(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)" +
	"[B-DF-HJ-NP-TV-Z]{3}" +
	"[0-9A-Z]{1}[0-9]{1}$";
	
	var pattCurp = new RegExp(curpRgx);
	
	if(operacionDependientes == 'crear'){
		if((!pattCurp.test(curpDependienteFamiliar))){
			
			noty({
				text: eFormatoArchivo,
				type    : 'warning',
				dismissQueue: true,
				modal	: true,
				layout	: 'center'
			});
			return ;
			
		}		
	}
	
	var curpEnPantallaDependiente  = jQuery ('#curpDependientesFamiliares').val()
	
	if(curpDependienteFamiliar != curpEnPantallaDependiente  && !isModificar)
	{
		
		noty({
			text: 'El Curp del dependiente, no coincide con el archivo seleccionado',
			type    : 'warning',
			dismissQueue: true,
			modal	: true,
			layout	: 'center'
		});
		return ;
		
	}
	
	
	codigoArchivo = datos[2].toString();
	//eliminamos la extencion y obtenemos solo el codigo
	codigoArchivo = codigoArchivo.substring(0,(codigoArchivo.length)-4);
	
	var listaGeneral  = listaMaestra["listaMaestraDependientesFamiliares"];
	var claveParentesco;

	claveParentesco = jQuery("#parentescoDependientesFamiliares option:selected").val()		

	
	var nomenglaturaParentesco = mapaParentescoDocumento[claveParentesco]
	
	
	if(!(codigoArchivo == nomenglaturaParentesco ) && !isModificar ){
		
		noty({
			text: eFormatoArchivo,
			type    : 'warning',
			dismissQueue: true,
			modal	: true,
			layout	: 'center'
		});
		return ;
	}else{
		return mapa;
	}

	isModificar = false
	
}

function preModificarDependientesFamiliares(){
	
	return preAgregarDependientesFamiliares(true);
}

function preAgregarDependientesFamiliares(isModificar){
	
	if(isModificar == undefined)
		isModificar = false;
		
	var continuarProceso = true;
	var msgError = "";
	var patt = new RegExp("((^([A-Za-z\u00D1\u00F1\u00C1\u00E1\u00C9\u00E9\u00CD\u00ED\u00D3\u00F3\u00DA\u00FA\u00DC\u00FC])*)((\\s{0,1})([A-Za-z\u00D1\u00F1\u00C1\u00E1\u00C9\u00E9\u00CD\u00ED\u00D3\u00F3\u00DA\u00FA\u00DC\u00FC])+)*$)");
	
	   
	var primerApellido = jQuery("#primerApellido").val();
	if(jQuery("#primerApellidoDependientesFamiliares").val().length == 0 || (!patt.test(jQuery("#primerApellidoDependientesFamiliares").val().toString()))){
		msgError = msgError +"\n"+ eappPat +"<br>";
		continuarProceso = continuarProceso && false;
	}

	if(jQuery("#nombreDependientesFamiliares").val().toString().length == 0 || (!patt.test(jQuery("#nombreDependientesFamiliares").val().toString()))){
		msgError = msgError +"\n"+enombre+"<br>";
		continuarProceso = continuarProceso && false;
	}
	
	var curpRgx="[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}" +
	"(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])" +
	"[HM]{1}" +
	"(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)" +
	"[B-DF-HJ-NP-TV-Z]{3}" +
	"[0-9A-Z]{1}[0-9]{1}$";
	
	var pattCurp = new RegExp(curpRgx);

	if(operacionDependientes == 'crear'){	
		if(jQuery("#curpDependientesFamiliares").val().toString().length != 18 || (!pattCurp.test(jQuery("#curpDependientesFamiliares").val().toString()))){
			msgError = msgError +"\n"+ ecurp +"<br>";
			continuarProceso = continuarProceso && false;
		}	
	}else{
		if(jQuery("#curpDependientesFamiliares").val().toString().length != 18 ){
			msgError = msgError +"\n"+ ecurp +"<br>";
			continuarProceso = continuarProceso && false;
		}			
	}
	
	
	if(jQuery("#fechaNacimientoDependientesFamiliares").val().toString().length == 0){
		msgError = msgError +"\n"+ efechaNacimiento +"<br>";
		continuarProceso = continuarProceso && false;
	}
	
	var sexo = jQuery("#sexoDependientesFamiliares").val().toString();
	
	if(!(sexo == "23" || sexo == "24")){
		msgError = msgError +"\n"+ esexo +"<br>";
		continuarProceso = continuarProceso && false;
	}		
	
	if(jQuery("#parentescoDependientesFamiliares").val().toString().length == 0){
		msgError = msgError +"\n"+ eparentesco +"<br>";
		continuarProceso = continuarProceso && false;
	}
	

	if ((!isModificar && jQuery("#dependientesFamiliaresFile").val().toString().length != 0) || (isModificar && jQuery("#dependientesFamiliaresFile").val().toString().length != 0)){
		var cadena = jQuery("#dependientesFamiliaresFile").val();
		
		var origen = cadena.toString().length -3;
		var destino = cadena.toString().length;
		var extension = jQuery("#dependientesFamiliaresFile").val().toString().substring(origen -1,destino);
		
		if(!(extension.toUpperCase() === ".zip".toUpperCase())){
			msgError = msgError +"\n"+ eextension +"<br>";
			continuarProceso = continuarProceso && false;
		}	
	}else if(!isModificar){
		msgError = msgError +"\n"+ earchivo +"<br>";
		continuarProceso = continuarProceso && false;
	}
	
	
	if(jQuery("#curp").val() == jQuery("#curpDependientesFamiliares").val().toString()){
		continuarProceso = continuarProceso && false;
		msgError = msgError +"\n"+ ecurpIgualTrabajador +"<br>";
	}else{
	
		var lista = getListaMaestraGuardadoParcial('listaMaestraDependientesFamiliares');
			
		for(var i=0; i< lista.length;i++){
	
			var map = lista[i];
			
			if(!isModificar){
				if(map.curpDependientesFamiliares == jQuery("#curpDependientesFamiliares").val().toString()){
					continuarProceso = continuarProceso && false;
					msgError = msgError +"\n"+ ecurpRep +"<br>";
					break;
				}
			}
		}
	}
	
	if(msgError.length > 0)	{
		noty({
			text: msgError,
			type    : 'error',
			dismissQueue: true,
			modal	: true,
			layout	: 'center'
		});
	}
	return continuarProceso;
}

function calculaEdadDependientesFamiliares(){
	
	var mdate = jQuery("#fechaNacimientoDependientesFamiliares").val().toString();
	var yearThen = parseInt(mdate.substring(6,10),10);
	var monthThen = parseInt(mdate.substring(3,5),10);
	var dayThen = parseInt(mdate.substring(0,2),10);

	var today = new Date();
	
	var year_act =  (new Date).getFullYear();

	var month_act = (new Date).getMonth()+ 1;
	
	var day_act = new Date().getDate();

	var year_age = today.getFullYear() - yearThen;
    var m = month_act - monthThen;
    if (m < 0 || (m === 0 && today.getDate() < dayThen)) {
    	 year_age--;
    }
	
	jQuery("#edadDependientesFamiliares").val(year_age);
	
}


