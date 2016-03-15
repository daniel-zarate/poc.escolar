package mx.com.gunix.ui.springmvc.view.met.administracionExpediente;

import org.codehaus.jackson.annotate.JsonIgnoreProperties

//@JsonIgnoreProperties(["files.bytes"])
public class DataFileArrayUploadResponse {

	public DataFileArrayUploadResponse(){
		fileData = new DataFileArray();
	}
	
	String responseCode;
	String responseMessage;
	DataFileArray fileData;
	
}
