
jQuery(document).ready(function (){

	jQuery( "#fechaNacimientoDatosPersonales" ).datepicker({
				changeMonth: true,
				changeYear: true,
				minDate: fechainima(new Date(), -100),
				maxDate: new Date(),
				yearRange: "1900:" ,
				onSelect: function (date) {
					calculaEdadDatosPersonales();
				},
				onChangeMonthYear: function (year, month, inst) {
					
					var valDate = jQuery(this).val()
									
					if (valDate == ""){
						return; 
					}
					
					/*
					 Esta validación se planteó dado que en ciertas pruebas, el control demostró ejecutar este evento al cargar la página
					 if(jQuery("#operation").val() == 'consultar' || jQuery("#operation").val() == 'modificar'){
						
						jQuery("#operation").val("loaded")
						return;
					}*/
					
						
					var curDate = jQuery(this).datepicker("getDate");
					
					if (curDate.getYear() != year || curDate.getMonth() != month - 1) {
						curDate.setYear(year);
						curDate.setMonth(month - 1);
						jQuery(this).datepicker("setDate", curDate);
					}
					
					calculaEdadDatosPersonales();
			    }			
	});

	//calcular la edad, si el compo fechaNacimientoDatosPersonales no esta vació
	if(jQuery("#fechaNacimientoDatosPersonales").val() != ""){
		calculaEdadDatosPersonales();
	}
	
	var cvePaisDatosPersonalesReady = jQuery('#cvePais').val();
	if(cvePaisDatosPersonalesReady==1){
		jQuery("#combosEntidadMunicipio").show()
	}

	if(operacion=='consultar'){
		jQuery("#cveEntidadComboDatosPersonales").on('change', function() {		
			jQuery(this).prop( "disabled", true );	
		});

		jQuery("#municipioComboDatosPersonales").on('change', function() {		
			jQuery(this).prop( "disabled", true );	
		});
	}

	// ---------------------------------------
	// renderizar los documentos que ya hayan sido cargados.
	if(jQuery("#documentacion").val()){

		var valueHidden = jQuery("#documentacion").val();			 
		var lista = jQuery.parseJSON(valueHidden);

		jQuery.each(lista, function(k,v){
			var cveDocumento = v.substring(v.indexOf('_') + 1, v.indexOf('.')).toUpperCase();
			jQuery("#img" + cveDocumento).attr("src","images/administracionExpediente/v1/documentoCargado.png");
			jQuery("#" + cveDocumento).attr("alt", '1');
		});
	}

	// --------------------------------------------------
	/*
	 * Evento onChange del control que permite cargar archivos.
	 * */
	jQuery("#datosPersonalesFile").on('change', function() {


		
		if(jQuery("#datosPersonalesFile")[0].value != ""){
			uploadSpecificMetFile('datosPersonalesFile',function(map){
				
				if(!jQuery("#curp").val().empty()){

					var curpUsuario = jQuery("#curp").val().toUpperCase();
					var error		
					var mapValido = {};
					var flagMap = 0;
					jQuery(".ExpedienteDatosPersonales").each(function(){
						jQuery("#img" + this.id).attr("src","images/administracionExpediente/v1/documentoNoCargado.png");
					});
					jQuery.each(map, function(k,v){
						// Nombre de los archivos.
						var cveDocumento = v.substring(v.indexOf('_') + 1, v.indexOf('.')).toUpperCase();
						var curp = v.substring(0, v.indexOf('_')).toUpperCase() ;

						// - Validar CURP
						if(curpUsuario == curp){
							flagMap = 1;
							jQuery("#img" + cveDocumento).attr("src","images/administracionExpediente/v1/documentoCargado.png");
							jQuery("#" + cveDocumento).attr("alt", '1');

							mapValido[k] = v;

						}else{
							flagMap = 0;
							jQuery("#img" + cveDocumento).attr("src","images/administracionExpediente/v1/documentoError.png");
						}					

					}); // end each

					// Verificar que se hayan cargado los archivos requeridos.
					jQuery(".ExpedienteDatosPersonales").each(function(){
						var required = jQuery("#"+this.id).attr("name");
						var load = jQuery("#"+this.id).attr("alt");

						if(required == "T" && load == "0"){
							jQuery("#img" + this.id).attr("src","images/administracionExpediente/v1/documentoError.png");
						}
						// Validar la perra cartilla.
						if(this.id == "CM"){
							
							var sexo = jQuery("#cveSexo").val();
							var edad = jQuery("#edadTrabajador").val();
							var comboNac = jQuery('#cveNacionalidad option:selected').html();
							
							if(load == "0" &&  sexo == 23 && (edad >= 18 && edad <= 40) && comboNac == "MEXICANA" )
								jQuery("#img" + this.id).attr("src","images/administracionExpediente/v1/documentoError.png");
						} // end if
						
						//Validar la Carta de Neuttralización
						if(this.id == "CN"){
							var comboNac = jQuery('#cveNacionalidad option:selected').html();							
							if(load == "0" && comboNac == "EXTRANJERA" )
								jQuery("#img" + this.id).attr("src","images/administracionExpediente/v1/documentoError.png");
						}
						//Validar Forma Migratoria
						if(this.id == "FM"){
							var comboNac = jQuery('#cveNacionalidad option:selected').html();							
							if(load == "0" && comboNac == "EXTRANJERA" )
								jQuery("#img" + this.id).attr("src","images/administracionExpediente/v1/documentoError.png");
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

	// --------------------------------------------------
	/*
	 * Funcion que se utiliza para hacer la carga del archivo del 
	 * componente  UploadFile
	 * */
	jQuery('form[id$="Form"]').fileupload({
		dataType: 'json',

		done: function(e, data) {
			successViewFunction(data._response.result)
		},
		fail:errorViewFunction,
		replaceFileInput: false,
		autoUpload : false,
	});


	jQuery('#cvePais').on('change', function(){
		var cvePais = jQuery('#cvePais').val();
		if(cvePais==1){
			jQuery("#combosEntidadMunicipio").show()
		}
		else{
			jQuery("#combosEntidadMunicipio").hide()
			jQuery("#cveEntidadComboDatosPersonales").val('')
			jQuery("#municipioComboDatosPersonales").val('')			
		}
		//jQuery('#cveNacionalidad').val(cvePais);
	});

	generarCombosAnidados('combosEntidadMunicipio')
	selectDataCombos('combosEntidadMunicipio')
	// -----
	// Validar el CURP
	
//	jQuery("#curp").bind('keyup',function(){
//		calcularCURP(jQuery(this).val())
//	});
//
//	calcularCURP(jQuery("#curp").val())
	
//--------Se modificó esta parte para cuando sea Carga Inicial	
	jQuery("#curp").bind('keyup',function(){
		
		jQuery(".ExpedienteDatosPersonales").each(function(){
			jQuery("#img" + this.id).attr("src","images/administracionExpediente/v1/documentoNoCargado.png");
		});
		
		jQuery("#datosPersonalesFileMet").val("")
		
		jQuery(".ExpedienteDatosPersonales").each(function(){
			jQuery("#"+this.id).attr("alt","0")
		});
		
		//todo
		//
		
		calcularCURP(jQuery(this).val());
	});
	
	if(cveEstatusExp == 'Carga Inicial'){
		calcularCURP(jQuery("#curp").val());
	}else{
		//var date = jQuery.datepicker.parseDate( "ymmdd", valorFechaNacimiento );
		
		//var dateFormat = jQuery.datepicker.formatDate( "dd/mm/yy", date );
		jQuery("#fechaNacimientoDatosPersonales").datepicker( "setDate" , valorFechaNacimiento );

	}	
	
	jQuery("#fechaNacimientoDatosPersonales").attr('readonly','readonly')
	
}); // end onDocumentReady



function validaReglasDatosPersonales(){

	var mapaValidaDatosPersonales = {};
	// Espresión regular para validar el CURP
	var curpRegEx = "[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}" +
	                "(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])" +
	"[HM]{1}" +
	"(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)" +
	"[B-DF-HJ-NP-TV-Z]{3}" +
	"[0-9A-Z]{1}[0-9]{1}$";

	var rfcRegEx = "[a-zA-Z&]{4}[0-9]{6}[a-zA-Z0-9]{3}$";

	var numSeguroSocialRegex = new RegExp(/^\d{1,15}$/)
	var archivosRequeridos = 0
	var curp	= 	jQuery("#curp").val().toUpperCase();
	var rfc 	=  	jQuery("#rfcUsuario").val().toUpperCase();
	var numSeguridadSocial = jQuery("#numeroSeguridadSocialEmpleado").val()
	var comboMunicipio = jQuery("#municipioComboDatosPersonales").val()
	var comboPais = jQuery("#cvePais").val()
	var comboNac = jQuery('#cveNacionalidad option:selected').html()
	
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
	jQuery(".ExpedienteDatosPersonales").each(function(){
		var required = jQuery("#"+this.id).attr("name");
		var load = jQuery("#"+this.id).attr("alt");

		if(required == "T" && load == "0"){
			archivosRequeridos = 1;
		}
		
		if(this.id == "CM"){
			var sexo = jQuery("#cveSexo").val();
			var edad = jQuery("#edadTrabajador").val();
			
			if(load == "0" &&  sexo == 23 && (edad >= 18 && edad <= 40) && comboNac == "MEXICANA")
				archivosRequeridos = 1;
		} // end if
		//Validar la Carta de Neuttralización
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

//			if((jQuery("#fechaNacimientoDatosPersonales").val() == "") && (jQuery("#estatusTrabajador").val() == 'Carga Inicial')){
//				jQuery("#fechaNacimientoDatosPersonales").datepicker( "setDate" , dateFormat );
//			}
			
//			-----Se hace validacion para cuando la fecha viene vacía la calcule
			if((jQuery("#fechaNacimientoDatosPersonales").val() == "")){
				jQuery("#fechaNacimientoDatosPersonales").datepicker( "setDate" , dateFormat );
			}

			if(jQuery("#operation").val() != 'modificar' && jQuery("#operation").val() != 'consultar'){
				jQuery("#fechaNacimientoDatosPersonales").datepicker( "setDate" , dateFormat );
				jQuery("#operation").val("loaded")
			}
			jQuery("#edadTrabajador").val(edad);	

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
			jQuery("#cveSexo").val('23');
		}
		else if(sexo == "M" || sexo == "m"){
			jQuery("#cveSexo").val('24');
		}


	}else{
		jQuery("#fechaNacimientoDatosPersonales").prop("value","");
		jQuery("#cveSexo").prop("value","");
		jQuery("#edadTrabajador").val('');
	}
}

function calculaEdadDatosPersonales(){

	var mdate = jQuery("#fechaNacimientoDatosPersonales").val().toString();
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
	
	jQuery("#edadTrabajador").val(year_age);
}

//function extraData(){
//jQuery("#municipioComboDatosPersonales").attr('required','required'); 
//}


function fechainima(fecha, intervalo){    
	    dia = fecha.getDate();
	    mes = fecha.getMonth();
	    anio = fecha.getFullYear() + intervalo;
	 
	    dia = (dia.toString().length == 1) ? "0" + dia.toString() : dia;
	    mes = (mes.toString().length == 1) ? "0" + mes.toString() : mes;
	 
	    return new Date(anio, mes , dia);
}


jQuery('#cvePais').on('change', function(){
	
	if(this.value != 1){
		
		jQuery("#cveEntidadComboDatosPersonales").removeAttr('required')
		jQuery("#municipioComboDatosPersonales").removeAttr('required')
	}else {
		
		jQuery("#cveEntidadComboDatosPersonales").attr('required',"")
		jQuery("#municipioComboDatosPersonales").attr('required',"")
	}
});


