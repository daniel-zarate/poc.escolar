jQuery(document).ready(function(){
	jQuery("#continuarSubmitButton").hide()
	jQuery("#cancelCargaPreliminarSubmitButton").hide()
	avanceProgressbar("#progressbar",".progress-label","#cancelProgressbarButton",progressbarNonce,continuarCargaPreliminar," Validado")	
}); 	

function continuarCancelar(){
	jQuery("#cancelCargaPreliminarSubmitButton").trigger('click');
	
}

buttonCancelProgressbar("#cancelProgressbarButton","#progressbar",progressbarNonce,continuarCancelar)

function continuarCargaPreliminar(){
	jQuery("#cancelProgressbarButton").hide()
	jQuery("#cancelCargaPreliminarSubmitButton").show()
	jQuery("#continuarSubmitButton").show()
	jQuery("#leyendaProgressbarFieldset").text("100% Validado")
	
}


