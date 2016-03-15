package mx.com.gunix.ui.springmvc.view.met.administracionExpediente;

import org.codehaus.jackson.annotate.JsonIgnoreProperties

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
