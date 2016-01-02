  var idOperacion;
  
  jQuery(document).ready(function() {

	  
	  idOperacion = jQuery("#idOperacionSeguimiento").val();
  });

  function validaReglasSeguimiento(){
	  
	  
      var map = {};
      var patt = new RegExp(procesoAutorizacion);  
  	  
      var seguimientoComentario = jQuery("#seguimientoComentario").val();
      // -------------------------------------------------------------------------------------//
      // valida el que se haya ingresado informacion en el text Area de comentarios
      if(idOperacion == 'seguimiento' && seguimientoComentario.length > 0){
    	
          if (seguimientoComentario.length == 0) {
        	    map["vacioComentario"] =comentarioVacio;
          }else if (seguimientoComentario.length > 900) {
				map["incorrectoComentario"] = longitud;
		  }
    	}
    	return map;
    }	