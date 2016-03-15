$(function () {
	
			
		    $('#dependientesFamiliaresFile').fileupload({
			        dataType: 'json',
			        done: function (e, data) {
						console.log("respuesta=" )
						console.log(data.result)
						
						if(data.result.responseCode == '200'){
							
							var newTableRow = '<tr id="'+data.result.fileData.id+'">';
							$("#tableData-dependientesFamiliares tr:first th").each(function(index, value){
								var name = $(value).attr("id").split('-')[1];
								if(name == 'borrarDependientesFamiliares')
									newTableRow = newTableRow + '<td><a href="#" onclick="eliminarFiles(\'dependientesFamiliares\',\''+data.result.fileData.id+'\')" >Borrar</a></td>' 
								else
									newTableRow = newTableRow + '<td>' + data.result.fileData.requestParameterText[name+"TextValue"] + '</td>' 
							});

							newTableRow = newTableRow + '</tr>';
							$('#tableData-dependientesFamiliares > tbody:last-child').append( newTableRow );
							
							
						}
						else{
							alert(data.result.responseMessage)
						}
						
			        },
			        progressall: function (e, data) {
			            var progress = parseInt(data.loaded / data.total * 100, 10);
						console.log(progress)
			        },
					add: function (e, data) {
						console.log("add function")
						console.log(data)
						$("#dependientesFamiliaresFile").hide()
		                $("#dependientesFamiliaresFileNameText").text(data.originalFiles[0].name)
		                $("#dependientesFamiliaresDocumentacion").val(data.originalFiles[0].name)
		                
		                $("#botonAgregarDependientesFamiliares").click(function () {	
		                    data.submit();
		                });
					}
			        //dropZone: $('#dropzone')
			    });
	

});

$('#dependientesFamiliaresFile').bind('fileuploadsubmit', function (e, data) {
    // The example input, doesn't have to be part of the upload form:
    var curp = $('#curp');
    data.formData = {curp: curp.val(),archivos:'dependientesFamiliares'};
       
    var formdataSerialize = $(":input.dependientesFamiliares").serializeArray();
    $(formdataSerialize ).each(function(index, obj){
    	data.formData[obj.name] = obj.value;
 
    	var idInput = $(":input[name='"+obj.name+"'].dependientesFamiliares" ).attr("id")
    	
    	if ( 'select' === $("#"+idInput).getInputType() ) {
    		data.formData[obj.name+"TextValue"] = $( "#" + idInput + " option:selected" ).text() ;
    	}
    	else if( 'file' === $("#"+idInput).getInputType() ){
    		data.formData[obj.name+"TextValue"] = $("#"+idInput+"NameText").text()
    	}
    	else {
    		data.formData[obj.name+"TextValue"] = $( "#" + idInput ).val() ;
    	}
    	
    });
     
    console.log("Data dependientesFamiliaresFile");
    console.log(data.formData);
    
    if (!data.formData.curp) {
      //data.context.find('button').prop('disabled', false);
      input.focus();
      return false;
    }
});
	



function eliminarFiles(files, id){

	console.log("borrar - info");
	//TODO: cambiar url por dinamica
	$.ajax({
	    url: '/met-vista/arrayData/remove', // php script to retern json encoded string
	    data: {"id":id,"archivos":files},  // serialized data to send on server
	    //dataType:'json', // set recieving type - JSON in case of a question
	    type:'POST', // set sending HTTP Request type
	    //async:false, 
	    success: function(data) { // callback method for further manipulations
	    	console.log("respuesta de eliminar")
	    	console.log(data)
	    	
	    	if(data.responseCode == '200'){
	    		$("#"+id).remove();
			}
			else{
				alert(data.result.responseMessage)
			}
	    },
	    error: function(data) { // if error occured

	    }
	  });
	
}




