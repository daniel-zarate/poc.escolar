package mx.com.gunix.ui.springmvc.view.met.administracionExpediente;

import mx.com.gunix.met.administracionexpediente.file.DataFileArray

//@JsonIgnoreProperties(["files.bytes"])
public class DataFileArrayUploadResponse {

	public DataFileArrayUploadResponse(){
		fileData = new DataFileArray();
	}
	
	String responseCode;
	String responseMessage;
	DataFileArray fileData;
	
}
