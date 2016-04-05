package mx.com.gunix.ui.springmvc.view.met.administracionExpediente;

import mx.com.gunix.met.administracionexpediente.file.FileMeta

//@JsonIgnoreProperties(["files.bytes"])
public class FileUploadResponse {

	public FileUploadResponse(){
		files = new LinkedList<FileMeta>();
		requestParameters = [:]
	}
	
	String responseCode;
	String responseMessage;
	LinkedList<FileMeta> files;
	Map requestParameters;

}
