
$(document).ready(function (){

	$( "#fechaNacimientoDatosPersonales" ).datepicker({
				changeMonth: true,
				changeYear: true,
				minDate: fechainima(new Date(), -100),
				maxDate: new Date(),
				yearRange: "1900:" ,
				onSelect: function (date) {
					calculaEdadDatosPersonales();
				},
				onChangeMonthYear: function (year, month, inst) {
					
					var valDate = $(this).val()
									
					if (valDate == ""){
						return; 
					}
					
					/*
					 Esta validaci�n se plante� dado que en ciertas pruebas, el control demostr� ejecutar este evento al cargar la p�gina
					 if($("#operation").val() == 'consultar' || $("#operation").val() == 'modificar'){
						
						$("#operation").val("loaded")
						return;
					}*/
					
						
					var curDate = $(this).datepicker("getDate");
					
					if (curDate.getYear() != year || curDate.getMonth() != month - 1) {
						curDate.setYear(year);
						curDate.setMonth(month - 1);
						$(this).datepicker("setDate", curDate);
					}
					
					calculaEdadDatosPersonales();
			    }			
	});

	//calcular la edad, si el compo fechaNacimientoDatosPersonales no esta vaci�
	if($("#fechaNacimientoDatosPersonales").val() != ""){
		calculaEdadDatosPersonales();
	}
	
	var cvePaisDatosPersonalesReady = $('#cvePais').val();
	if(cvePaisDatosPersonalesReady==1){
		$("#combosEntidadMunicipio").show()
	}

	if(operacion=='consultar'){
		$("#cveEntidadComboDatosPersonales").on('change', function() {		
			$(this).prop( "disabled", true );	
		});

		$("#municipioComboDatosPersonales").on('change', function() {		
			$(this).prop( "disabled", true );	
		});
	}

	// ---------------------------------------
	// renderizar los documentos que ya hayan sido cargados.
	if($("#documentacion").val()){

		var valueHidden = $("#documentacion").val();			 
		var lista = jQuery.parseJSON(valueHidden);

		jQuery.each(lista, function(k,v){
			var cveDocumento = v.substring(v.indexOf('_') + 1, v.indexOf('.')).toUpperCase();
			$("#img" + cveDocumento).attr("src","images/administracionExpediente/v1/documentoCargado.png");
			$("#" + cveDocumento).attr("alt", '1');
		});
	}

	// --------------------------------------------------
	/*
	 * Evento onChange del control que permite cargar archivos.
	 * */
	
	/*
	$("#datosPersonalesFile").on('change', function() {


		
		if($("#datosPersonalesFile")[0].value != ""){
			uploadSpecificMetFile('datosPersonalesFile',function(map){
				
				if(!$("#curp").val().empty()){

					var curpUsuario = $("#curp").val().toUpperCase();
					var error		
					var mapValido = {};
					var flagMap = 0;
					$(".ExpedienteDatosPersonales").each(function(){
						$("#img" + this.id).attr("src","images/administracionExpediente/v1/documentoNoCargado.png");
					});
					jQuery.each(map, function(k,v){
						// Nombre de los archivos.
						var cveDocumento = v.substring(v.indexOf('_') + 1, v.indexOf('.')).toUpperCase();
						var curp = v.substring(0, v.indexOf('_')).toUpperCase() ;

						// - Validar CURP
						if(curpUsuario == curp){
							flagMap = 1;
							$("#img" + cveDocumento).attr("src","images/administracionExpediente/v1/documentoCargado.png");
							$("#" + cveDocumento).attr("alt", '1');

							mapValido[k] = v;

						}else{
							flagMap = 0;
							$("#img" + cveDocumento).attr("src","images/administracionExpediente/v1/documentoError.png");
						}					

					}); // end each

					// Verificar que se hayan cargado los archivos requeridos.
					$(".ExpedienteDatosPersonales").each(function(){
						var required = $("#"+this.id).attr("name");
						var load = $("#"+this.id).attr("alt");

						if(required == "T" && load == "0"){
							$("#img" + this.id).attr("src","images/administracionExpediente/v1/documentoError.png");
						}
						// Validar la perra cartilla.
						if(this.id == "CM"){
							
							var sexo = $("#cveSexo").val();
							var edad = $("#edadTrabajador").val();
							var comboNac = $('#cveNacionalidad option:selected').html();
							
							if(load == "0" &&  sexo == 23 && (edad >= 18 && edad <= 40) && comboNac == "MEXICANA" )
								$("#img" + this.id).attr("src","images/administracionExpediente/v1/documentoError.png");
						} // end if
						
						//Validar la Carta de Neuttralizaci�n
						if(this.id == "CN"){
							var comboNac = $('#cveNacionalidad option:selected').html();							
							if(load == "0" && comboNac == "EXTRANJERA" )
								$("#img" + this.id).attr("src","images/administracionExpediente/v1/documentoError.png");
						}
						//Validar Forma Migratoria
						if(this.id == "FM"){
							var comboNac = $('#cveNacionalidad option:selected').html();							
							if(load == "0" && comboNac == "EXTRANJERA" )
								$("#img" + this.id).attr("src","images/administracionExpediente/v1/documentoError.png");
						}

					});

				}else{

					noty({
						text: ER044008,
						type    : 'warning',
						dismissQueue: true,
						modal	: true,
						layout	: 'center'
					});
				}

				if(flagMap == 1){
					return mapValido;
				}
				
			}
			, 'bla'
//			function(){
//				
//				alert('this an extra param')
//			}
			
			);
		}

	});
	
	*/

	
	// --------------------------------------------------
	/*
	 * Funcion que se utiliza para hacer la carga del archivo del 
	 * componente  UploadFile
	 * */
	/*
	 	$('form[id$="Form"]').fileupload({
			dataType: 'json',
	
			done: function(e, data) {
				successViewFunction(data._response.result)
			},
			fail:errorViewFunction,
			replaceFileInput: false,
			autoUpload : false,
		});
	*/

	$('#cvePais').on('change', function(){
		var cvePais = $('#cvePais').val();
		if(cvePais==1){
			$("#combosEntidadMunicipio").show()
		}
		else{
			$("#combosEntidadMunicipio").hide()
			$("#cveEntidadComboDatosPersonales").val('')
			$("#municipioComboDatosPersonales").val('')			
		}
		//$('#cveNacionalidad').val(cvePais);
	});

	
	//generarCombosAnidados('combosEntidadMunicipio')
	//selectDataCombos('combosEntidadMunicipio')
	
	
	// -----
	// Validar el CURP
	
//	$("#curp").bind('keyup',function(){
//		calcularCURP($(this).val())
//	});
//
//	calcularCURP($("#curp").val())
	
//--------Se modific� esta parte para cuando sea Carga Inicial	
	$("#curp").bind('keyup',function(){
		
		$(".ExpedienteDatosPersonales").each(function(){
			$("#img" + this.id).attr("src","images/administracionExpediente/v1/documentoNoCargado.png");
		});
		
		$("#datosPersonalesFileMet").val("")
		
		$(".ExpedienteDatosPersonales").each(function(){
			$("#"+this.id).attr("alt","0")
		});
		
		//todo
		//
		
		calcularCURP($(this).val());
	});
	
	if(cveEstatusExp == 'Carga Inicial'){
		calcularCURP($("#curp").val());
	}else{
		//var date = jQuery.datepicker.parseDate( "ymmdd", valorFechaNacimiento );
		
		//var dateFormat = jQuery.datepicker.formatDate( "dd/mm/yy", date );
		$("#fechaNacimientoDatosPersonales").datepicker( "setDate" , valorFechaNacimiento );

	}	
	
	$("#fechaNacimientoDatosPersonales").attr('readonly','readonly')
	
}); // end onDocumentReady



function validaReglasDatosPersonales(){

	var mapaValidaDatosPersonales = {};
	// Espresi�n regular para validar el CURP
	var curpRegEx = "[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}" +
	                "(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])" +
	"[HM]{1}" +
	"(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)" +
	"[B-DF-HJ-NP-TV-Z]{3}" +
	"[0-9A-Z]{1}[0-9]{1}$";

	var rfcRegEx = "[a-zA-Z&]{4}[0-9]{6}[a-zA-Z0-9]{3}$";

	var numSeguroSocialRegex = new RegExp(/^\d{1,15}$/)
	var archivosRequeridos = 0
	var curp	= 	$("#curp").val().toUpperCase();
	var rfc 	=  	$("#rfcUsuario").val().toUpperCase();
	var numSeguridadSocial = $("#numeroSeguridadSocialEmpleado").val()
	var comboMunicipio = $("#municipioComboDatosPersonales").val()
	var comboPais = $("#cvePais").val()
	var comboNac = $('#cveNacionalidad option:selected').html()
	
	if(numSeguridadSocial){
		if(!numSeguroSocialRegex.test(numSeguridadSocial)){
			mapaValidaDatosPersonales["errorNumeroSeguroSocial"] = ER044017;
		}
	}

	// - Validar CURP
	//  se comenta la validacion de datos personales
	
	if(operacion == 'crear'){
		if(!curp.match(curpRegEx))
			mapaValidaDatosPersonales["errorCURP"] = ER044012;
	}
	// - Validar rfc
	if(!rfc.match(rfcRegEx))
		mapaValidaDatosPersonales["errorRFC"] = ER044013;

	// - Validar archivos requeridos
	$(".ExpedienteDatosPersonales").each(function(){
		var required = $("#"+this.id).attr("name");
		var load = $("#"+this.id).attr("alt");

		if(required == "T" && load == "0"){
			archivosRequeridos = 1;
		}
		
		if(this.id == "CM"){
			var sexo = $("#cveSexo").val();
			var edad = $("#edadTrabajador").val();
			
			if(load == "0" &&  sexo == 23 && (edad >= 18 && edad <= 40) && comboNac == "MEXICANA")
				archivosRequeridos = 1;
		} // end if
		//Validar la Carta de Neuttralizaci�n
		if(this.id == "CN"){							
			if(load == "0" && comboNac == "EXTRANJERA" )
				archivosRequeridos = 1;
		}
		//Validar Forma Migratoria
		if(this.id == "FM"){						
			if(load == "0" && comboNac == "EXTRANJERA" )
				archivosRequeridos = 1;
		}
	});
	
	if(archivosRequeridos)
		mapaValidaDatosPersonales["errorDocumentacion"] = ER043014
		
	if( comboPais == 1 && comboMunicipio == "")
		mapaValidaDatosPersonales["errorMunicipio"] = municipioRequerido

	
		
	return mapaValidaDatosPersonales
}

function obtenerEdadActual(fechaNacimiento){
	var currentDate= new Date();	

	var edad = currentDate.getFullYear()-fechaNacimiento.getFullYear();


	return edad
}


function calcularCURP(curp){
	
	if(curp.length == 18){
		var date
		var fecha = curp.toString().substring(4, 10)//yymmdd
			
		if(parseInt(fecha.substring(2,4),10) <=12 || parseInt(fecha.substring(4,6),10) <= 31){
			

			date = jQuery.datepicker.parseDate( "ymmdd", fecha );
				
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

//			if(($("#fechaNacimientoDatosPersonales").val() == "") && ($("#estatusTrabajador").val() == 'Carga Inicial')){
//				$("#fechaNacimientoDatosPersonales").datepicker( "setDate" , dateFormat );
//			}
			
//			-----Se hace validacion para cuando la fecha viene vac�a la calcule
			if(($("#fechaNacimientoDatosPersonales").val() == "")){
				$("#fechaNacimientoDatosPersonales").datepicker( "setDate" , dateFormat );
			}

			if($("#operation").val() != 'modificar' && $("#operation").val() != 'consultar'){
				$("#fechaNacimientoDatosPersonales").datepicker( "setDate" , dateFormat );
				$("#operation").val("loaded")
			}
			$("#edadTrabajador").val(edad);	

		}else{
			noty({
				text: ER044022,
				type    : 'warning',
				dismissQueue: true,
				modal	: true,
				layout	: 'center'
			});
		}


		var sexo = curp.toString().substring(10, 11);


		if(sexo == "H" || sexo == "h"){
			$("#cveSexo").val('23');
		}
		else if(sexo == "M" || sexo == "m"){
			$("#cveSexo").val('24');
		}


	}else{
		$("#fechaNacimientoDatosPersonales").prop("value","");
		$("#cveSexo").prop("value","");
		$("#edadTrabajador").val('');
	}
}

function calculaEdadDatosPersonales(){

	var mdate = $("#fechaNacimientoDatosPersonales").val().toString();
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
	
	$("#edadTrabajador").val(year_age);
}

//function extraData(){
//$("#municipioComboDatosPersonales").attr('required','required'); 
//}


function fechainima(fecha, intervalo){    
	    dia = fecha.getDate();
	    mes = fecha.getMonth();
	    anio = fecha.getFullYear() + intervalo;
	 
	    dia = (dia.toString().length == 1) ? "0" + dia.toString() : dia;
	    mes = (mes.toString().length == 1) ? "0" + mes.toString() : mes;
	 
	    return new Date(anio, mes , dia);
}


$('#cvePais').on('change', function(){
	
	if(this.value != 1){
		
		$("#cveEntidadComboDatosPersonales").removeAttr('required')
		$("#municipioComboDatosPersonales").removeAttr('required')
	}else {
		
		$("#cveEntidadComboDatosPersonales").attr('required',"")
		$("#municipioComboDatosPersonales").attr('required',"")
	}
});


