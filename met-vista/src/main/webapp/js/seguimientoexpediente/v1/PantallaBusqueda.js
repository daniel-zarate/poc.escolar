
function isEmptyJSON(obj) {
  	  for(var i in obj) { return false; }
  	  return true;
  	}

jQuery(document).ready(function() {
	
	
	jQuery('#busquedaExpediente').jtable({
        title: 'Expedientes',
        actions: {
            listAction: '/met-vista/busqueda/expedienteList' //,
            //createAction: '/GettingStarted/CreatePerson',
            //updateAction: '/GettingStarted/UpdatePerson',
            //deleteAction: '/GettingStarted/DeletePerson'
        },
        fields: {
            id: {
                key: true,
                list: false
            },
            curp: {
                title: 'CURP',
                width: '20%',
                display: function (data) {
                	        return '<a href="#" class="folioBusqueda" onclick="javascript:buscarExpediente(\''+data.record.id+'\')" id="'+data.record.id+'">'+data.record.curp+'</a>';
                }
            },
            nombre: {
                title: 'Nombre',
                width: '20%'
            },
            apellidoPaterno: {
                title: 'Apellido Paterno',
                width: '20%'
            },
            apellidoMaterno: {
                title: 'Apellido Materno',
                width: '20%'
            },
            folio: {
                title: 'Folio',
                width: '20%'
            },
            
        }
    });
	
	
		
	
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
		
		
		var columnaVisible = ""
		if  (idOperacionBusqueda == "seguimiento")
			columnaVisible = "visible";
		else
			columnaVisible = "hidden";	
		

		
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
		
		console.log("load jtable again")
		jQuery('#busquedaExpediente').jtable('load',{});
		
		
	});
	
});

function buscarExpediente(id){
	console.log("idTrabajador: " + id)
	jQuery("#idTrabajador").val(id)
	jQuery("#busquedaButton").trigger( "click")
}


function clickTabla (event){
	var hermanos = jQuery("#"+event.target.id).siblings()
	jQuery("#hiddenFantasma").val(hermanos[1].value)
	jQuery("#hiddenFolio").val(hermanos[0].value)
	jQuery("#estatusExpedienteTrabajador").val(jQuery("#estatusBusqueda").val())
	jQuery("#EnviarFantasmaSubmitButton").trigger( "click")
}

function validaReglas(){
	jQuery("#showError").html("");	
	 var errores = {}
	 
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





