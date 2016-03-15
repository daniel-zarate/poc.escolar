$(function () {
    $('#datosPersonalesFile').fileupload({
        dataType: 'json',
// 		formData : {curp : $("#curp").val() } ,
        done: function (e, data) {
            //$("tr:has(td)").remove();

			console.log("respuesta=" )
			console.log(data.result)
			
			if(data.result.responseCode == '200'){
				            $.each(data.result.files, function (index, file) {
					 
									//console.log("file: "+ index)
									//console.log(file)
									
					                $("#img"+file.id).attr("src","images/administracionExpediente/v1/documentoCargado.png");
//											.append(
//					                        $('<tr/>')
//					                        .append($('<td/>').text(file.fileName))
//					                        .append($('<td/>').text(file.fileSize))
//					                        .append($('<td/>').text(file.fileType))
//					                        .append($('<td/>').html("<a href='rest/controller/get/"+index+"'>Click</a>"))
//					                        )//end $("#uploaded-files").append()
							

					            });
			}
			else{
				alert(data.result.responseMessage)
			}
/*
            $.each(data.result, function (index, file) {
 
				console.log("file: "+ index)
				console.log(file)
				
                $("#uploaded-files").append(
                        $('<tr/>')
                        .append($('<td/>').text(file.fileName))
                        .append($('<td/>').text(file.fileSize))
                        .append($('<td/>').text(file.fileType))
                        .append($('<td/>').html("<a href='rest/controller/get/"+index+"'>Click</a>"))
                        )//end $("#uploaded-files").append()
		

            });
			*/
        },
 
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            /*$('#progress .bar').css(
                'width',
                progress + '%'
            );*/
			console.log(progress)
        },
 
        dropZone: $('#dropzone')
    });
});


$('#datosPersonalesFile').bind('fileuploadsubmit', function (e, data) {
    // The example input, doesn't have to be part of the upload form:
    var curp = $('#curp');
    data.formData = {curp: curp.val(),archivos:'datosPersonales'};
    if (!data.formData.curp) {
      //data.context.find('button').prop('disabled', false);
      input.focus();
      return false;
    }
});
	
