
function isEmptyJSON(obj) {
  	  for(var i in obj) { return false; }
  	  return true;
  	}

jQuery(document).ready(function() {
	
		
	jQuery( "#fechaField" ).datepicker({
		 showOn: "button",
		 buttonImage: "images/calendar.gif",
		 buttonImageOnly: true
	});
	
	jQuery("#botonBusqueda").click(function(event) {
		
		var map = validaReglas();
		
		if(!isEmptyJSON(map)){
			var htmlError='';
			 for(var i in map) { 
				 htmlError= htmlError+"<span class='error'>"+map[i]+"</span><br/>" ;
			 }
			 jQuery("#showError").html(htmlError);
			 return;
		}
		
		
		//sacamos los datos para la busqueda
		var parametros = {}
		var cveRamo = jQuery("#ramoBusqueda").val()
		var cveUnidadResponsable = jQuery("#urBusqueda").val()
		var cveEstatus = jQuery("#estatusBusqueda").val()
		var curp = jQuery("#curpBusqueda").val()
		if(curp == null){
			curp = ""
		}
		var apellidoPaterno = jQuery("#primerApellidoBusqueda").val()
		var apellidoMaterno = jQuery("#segundoApellidoBusqueda").val()
		var nombre = jQuery("#nombreBusqueda").val()
		var fechaInicial = jQuery("#fechaField").val()
		if(fechaInicial == null){
			fechaInicial = ""
		}
		var folioBusqueda = jQuery("#folioBusqueda").val()
		var idJtable =  jQuery('#paginationTestId').attr("id");
		var servicioApuntado = null
		var servicioCount = null
		if(cveEstatus=="Carga Inicial" || cveEstatus=="Autorizado" || cveEstatus=="Rechazado"){//cuando se actualiza, que solo puede tener este estatus
			servicioApuntado = "/services/PRX_SD_TrabajadorService/getBusquedaBetween"
			servicioCount = "/services/PRX_SD_TrabajadorService/getCountBusqueda"
		}
		
		var columnaVisible = ""
		if  (idOperacionBusqueda == "seguimiento")
			columnaVisible = "visible";
		else
			columnaVisible = "hidden";	
		
		var test = new Paginador(idJtable,
								servicioCount,
								servicioApuntado,
//								{"cveRamo":cveRamo,"cveUnidadResponsable":cveUnidadResponsable,"cveEstatus":cveEstatus,"curp":curp,"apellidoPaterno":apellidoPaterno,"apellidoMaterno":apellidoMaterno,"nombre":nombre,"fechaInicial":fechaInicial,"idOperacion":idOperacionBusqueda,"queryID":"SD_TrabajadorService.select_busqueda_avanzada"},
//								["folioActiviti","idTrabajador"],
								{"cveRamo":cveRamo,"cveUnidadResponsable":cveUnidadResponsable,"cveEstatus":cveEstatus,"curp":curp,"apellidoPaterno":apellidoPaterno,"apellidoMaterno":apellidoMaterno,"nombre":nombre,"fechaInicial":fechaInicial,"idOperacion":idOperacionBusqueda,"folioSolicitud":parseInt(folioBusqueda),"queryID":"SD_TrabajadorService.select_busqueda_avanzada"},
								//["folioActiviti","idTrabajador","folioSolicitud"],
								["folioActiviti","idTrabajador"],
								{"CURP":{"title":"CURP", "width":'10%',"campoBaseDatos":"curp", "display": function (data) {
									var folioActiviti
									var curpBd
									if(data.record.processInstanceId!=null && data.record.processInstanceId!=undefined){//Rolando define el folioActiviti como processInstanceId 
										folioActiviti = data.record.processInstanceId
										curpBd = data.record.curp
									}else{//así viene de la BD
										folioActiviti = data.record.folioActiviti
										curpBd = data.record.CURP
									}
									return '<input type=hidden value='+folioActiviti+' />' + '<input type=hidden value='+data.record.idTrabajador+' />' + '<a name=_extra onclick=clickTabla(event) id='+data.record.idTrabajador+' >'+  curpBd +'</a>'},
								},							
								 "rfc":{"title":"RFC","width":'10%',"campoBaseDatos":"rfc"},
								 "apellidoPaterno":{"title":"Apellido Paterno","width":'10%',"campoBaseDatos":"apellidoPaterno"},
								 "apellidoMaterno":{"title":"Apellido Materno","width":'10%',"campoBaseDatos":"apellidoMaterno"},
								 "nombre":{"title":"Nombre (s)","width":'15%',"campoBaseDatos":"nombre"},
								 "fechaInicioProceso":{"title":"Fecha Registro","width":"8%","campoBaseDatos":"fechaInicio", "visibility": columnaVisible, "display":function(data){
									 if (data.record.fechaInicioProceso != null){	 
										 var fechaProceso = new Date(data.record.fechaInicioProceso.time);
										 var horas = getCadena(fechaProceso.getHours());
										 var minutos = getCadena(fechaProceso.getMinutes());
										 var segundos = getCadena(fechaProceso.getSeconds());
										 
										 return (jQuery.datepicker.formatDate( 'dd/mm/yy', new Date(data.record.fechaInicioProceso.time)) +" "+ horas +":"+ minutos +":"+ segundos )
									 }	 
								 }},
								 "dias":{"title":"Dias","width":"10%","campoBaseDatos":"dias", "visibility": columnaVisible},
								  "fechaInicioTarea":{"title":"Fecha Recibido","width":'10%',"campoBaseDatos":"fechaInicioTarea", "visibility": columnaVisible, "display": function(data){
								     if (data.record.fechaInicioTarea != null) {	 
										 var fechaTarea = new Date(data.record.fechaInicioTarea.time);
										 var horas = getCadena(fechaTarea.getHours());
										 var minutos = getCadena(fechaTarea.getMinutes());
										 var segundos = getCadena(fechaTarea.getSeconds());
										 
										 return (jQuery.datepicker.formatDate( 'dd/mm/yy', new Date(data.record.fechaInicioTarea.time)) +" "+ horas +":"+ minutos +":"+ segundos)
										 
								     	}
								  	}  
								  },
									 "estatusTarea":{"title":"Estatus","width":'10%',"campoBaseDatos":"cveEstatus", "visibility": columnaVisible}
								 },
								 ["curp","cveRamo","cveUnidadResponsable","apellidoPaterno","apellidoMaterno","nombre","folioSolicitud"],
								 "autorizacionExpedienteTrabajador"
								);
		test.crearTabla();
		
		jQuery("th").removeClass("jtable-column-header")
		jQuery("div").removeClass("jtable-column-header-container")
		jQuery(".jtable-column-header-text").attr("class","has-tips")
		jQuery("span").removeClass("jtable-column-header-text")

			//para ajustar la vista de la tabla:
		jQuery("table").each(function(i){
			var titulo = jQuery(this).css("text-align","CENTER")    
			jQuery("th").each(function(i){
		    	 var titulo2 = jQuery(this).css("text-align","CENTER")
		     });
		  });
		
		//Agrega tooltips a la clase has-tips
		jQuery(".has-tips").each(function(){			
			//var inner = this.innerHTML 			
			jQuery(this).attr({				
				"data-tooltip":"",
				"aria-haspopup":true,
				title: this.innerHTML 	
			});
		});
		
	});
	
	generarCombosAmbito("combosAnidadosBusqueda");
	
});


function clickTabla (event){
	var hermanos = jQuery("#"+event.target.id).siblings()
	jQuery("#hiddenFantasma").val(hermanos[1].value)
	jQuery("#hiddenFolio").val(hermanos[0].value)
	jQuery("#ramo").val(jQuery("#ramoBusqueda").val())
	jQuery("#ur").val(jQuery("#urBusqueda").val())
	jQuery("#estatusExpedienteTrabajador").val(jQuery("#estatusBusqueda").val())
	jQuery("#EnviarFantasmaSubmitButton").trigger( "click")
}

function validaReglas(){
	jQuery("#showError").html("");
	 var errores = {}
	 	
	 if(jQuery("#ramoBusqueda").val() == null || jQuery("#ramoBusqueda").val() == undefined || jQuery("#ramoBusqueda").val() == "")
		 errores['ramoBusqueda']= errorRamoBusqueda
	 
	 if(jQuery("#urBusqueda").val() == null || jQuery("#urBusqueda").val() == undefined || jQuery("#urBusqueda").val() == "")
		 errores['urBusqueda']= errorUrBusqueda
	 
	 if(jQuery("#estatusBusqueda").val() == null || jQuery("#estatusBusqueda").val() == undefined || jQuery("#estatusBusqueda").val() == "")
		 errores['estatusBusqueda']= errorEstatusBusqueda
	 
	if(jQuery("#estatusBusqueda").val() == 'Carga Inicial' && jQuery("#curpBusqueda").val().trim().length < 4){		 
			errores['curpBusqueda']= errorCurp4Busqueda
			}
			 
	if(idOperacionBusqueda == 'seguimiento' && jQuery("#curpBusqueda").val().trim().length<18 ){
				if (!(jQuery("#curpBusqueda").val() == "" || jQuery("#curpBusqueda").val() == null)){
				 	errores['curpBusqueda'] = errorCurp17Busqueda
				}
			}
	 
	if(!(regex.test(jQuery("#primerApellidoBusqueda").val().replace(/\s/g,''))) && !(jQuery("#primerApellidoBusqueda").val() == null || jQuery("#primerApellidoBusqueda").val() == undefined || jQuery("#primerApellidoBusqueda").val() == "" ) ){
		errores['primerApellidoBusqueda'] = errorFormatoPA

	} 
	
	if(!(regex.test(jQuery("#segundoApellidoBusqueda").val().replace(/\s/g,''))) && !(jQuery("#segundoApellidoBusqueda").val() == null || jQuery("#segundoApellidoBusqueda").val() == undefined || jQuery("#segundoApellidoBusqueda").val() == "" )  ){
		errores['segundoApellidoBusqueda'] = errorFormatoSA

	} 

	if(!(regex.test(jQuery("#nombreBusqueda").val().replace(/\s/g,''))) && !(jQuery("#nombreBusqueda").val() == null || jQuery("#nombreBusqueda").val() == undefined || jQuery("#nombreBusqueda").val() == "" )){
		errores['nombreBusqueda'] = errorFormatoN
		
	} 
	
	if(isNaN(jQuery("#folioBusqueda").val()) && !(jQuery("#folioBusqueda").val() == null || jQuery("#folioBusqueda").val() == undefined || jQuery("#folioBusqueda").val() == "" )){
		errores['folioBusqueda'] = errorFormatoF

	} 
	
	 return errores
}

function getCadena(valor){	 
	 var dato = ""+valor
	if(dato.length == 1){
		dato = "0"+dato;
	}
	return dato;
}


jQuery(document).keypress(function (e) {
    if (e.which == 13) {
    		jQuery('#botonBusqueda').trigger('click')
        
    }
});
