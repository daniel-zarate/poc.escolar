var procedimiento;
var altaEsquema;
var modificarEsquema;
var isBancarizado;

jQuery(document).ready(function() {
  	  //se guarda el tipo de proceso solicitado
	  jQuery("[name=bancarizado]").filter("[value='0']").prop("checked",true);
	  jQuery("#mapDoctosEsquemaPagoMet").removeAttr('required');
	  
	  procedimiento = jQuery("#idOperacion").val();
	    verificaProcedimiento(); 		 
	  //habilitar y deshabilitar el div
      jQuery("input[name='bancarizado']").click(function(){
		 
		  var form = jQuery("#esquemaPagoForm"); 
		  resetFormulario(form);
			  if(this.value != ""){
			      var esBancarizado = this.value;       
			      if(esBancarizado == 1){		    	  
			    	  jQuery("#tipoBancarizado").prop("hidden",false);
			    	  jQuery("#mapDoctosEsquemaPagoMet").prop("required",true);
			    	  isBancarizado = true;			    	  
			      }if(esBancarizado == 0){
			    	  jQuery("#tipoBancarizado").prop("hidden",true);
			    	  jQuery("#mapDoctosEsquemaPagoMet").removeAttr('required');
			    	  jQuery("#documentoEC").attr("src", "images/administracionExpediente/v1/documentoNoCargado.png")
			    	  limpiarFormulario();
			    	  isBancarizado = false;
			      }
		    	
			  } 
			  
	  });
      
      

		// renderizar los documentos que ya hayan sido cargados.
		if(jQuery("#doctosCargadosEsquemaPagoMap").val()){
			
			var valueHidden = jQuery("#doctosCargadosEsquemaPagoMap").val();			 
			var lista = jQuery.parseJSON(valueHidden);
			
			jQuery.each(lista, function(k,v){
				var cveDocumento = v.substring(v.indexOf('_') + 1, v.indexOf('.')).toUpperCase();
				jQuery("#documento" + cveDocumento).attr("src","images/administracionExpediente/v1/documentoCargado.png");
//					jQuery("#" + cveDocumento).attr("alt", '1');
			});
		}	 
      
      
//	var patt = new RegExp(procesoAutorizacion);  
//	
//	if(patt.test(cveEstatusExp) || 
//			cveEstatusExp ==autorizado  ||
//			cveEstatusExp ==rechazado)
//	       {	
//				jQuery("#bancarizadoSi").attr("disabled","disabled")
//				jQuery("#bancarizadoNo").attr("disabled","disabled")
//				jQuery("#cveBanco").attr("disabled","disabled")
//				jQuery("#clabe").attr("disabled","disabled")
//				jQuery("#cargaArchivoEsquemaPago").hide();
//			}
      
});


	function verificaProcedimiento(){
	if (procedimiento == "crear") {
			// Alta
		   
		} else if (procedimiento == 'eliminar' || procedimiento == 'consultar') {
			//Eliminar || Consultar
			   var esBancarizado = jQuery("#isBancarizado").val();
			   
			//       /*------Checked bancarizado ---*/
               jQuery("[name=bancarizado]").filter("[value="+esBancarizado+"]").prop("checked",true);

			   if(esBancarizado == 1){		    	  
		    	  jQuery("#tipoBancarizado").prop("hidden",false);  
		       }if(esBancarizado == 0){
		    	  jQuery("#tipoBancarizado").prop("hidden",true);
		    	  limpiarFormulario();
		       }
		       jQuery("#bancarizado").prop('disabled', true);	
			   jQuery("#clabe").prop('readOnly', true);
			   jQuery("#cveBanco").prop('disabled', true);			   
			   
      	} else if (procedimiento == 'modificar') {
			//Modificar
			   var esBancarizado = jQuery("#isBancarizado").val();
			   
			//       /*------Checked de bancarizado ---*/
               jQuery("[name=bancarizado]").filter("[value="+esBancarizado+"]").prop("checked",true);

			   if(esBancarizado == 1){		    	  
		    	  jQuery("#tipoBancarizado").prop("hidden",false);
		    	  jQuery("#mapDoctosEsquemaPagoMet").attr("required",true);		    	  
		       }if(esBancarizado == 0){
		    	  jQuery("#tipoBancarizado").prop("hidden",true);
		    	  limpiarFormulario();
		       }
		  }else if (procedimiento == 'seguimiento') {

			   var esBancarizado = jQuery("#isBancarizado").val();
			   
			//       /*------Checked de bancarizado ---*/
              jQuery("[name=bancarizado]").filter("[value="+esBancarizado+"]").prop("checked",true);

			   if(esBancarizado == 1){		    	  
		    	  jQuery("#tipoBancarizado").prop("hidden",false);
		       }if(esBancarizado == 0){
		    	  jQuery("#tipoBancarizado").prop("hidden",true);
		    	  limpiarFormulario();
		    	  jQuery("#clabe").prop("required",false);
		    	  jQuery("#cveBanco").prop("required",false);
		       }
		  }
	}
	
	
	function limpiarFormulario(){
		   jQuery("#clabe").val("");
		   jQuery("#cveBanco").prop('selectedIndex', 0);
	}

	
	function resetFormulario(form) {
		form.removeAttr('data-invalid');
		jQuery('[data-invalid]', form).removeAttr('data-invalid');
		jQuery('.error', form).not('small').removeClass('error');
	}
	
    function validaReglasEsquemaPago(){
     	var map = {};
    	// -------------------------------------------------------------------------------------//
    	// valida el que se haya seleccionado un checked en si es bancarizado
    
    	if(isBancarizado == true){
    		
        	var cveBanco = jQuery("#cveBanco").val();
    		var clabe = jQuery("#clabe").val();
    		
    		
          if(cveBanco == 0){
        	  map["sinSeleccionarBanco"] = selBanco;
          }else if (clabe.length < 18) {
				map["incorrectaClabe"] = estrucuturaCLABE;
		  }else if (clabe.length == 18){
				clabe = clabe.substring(0,3);
				
	        	
				if(clabe != cveBanco){
					map["incorrectoClaveBanco"] = longitudCLABE;
				}
		  }
    	}
    	
    	return map;
    }	
   
