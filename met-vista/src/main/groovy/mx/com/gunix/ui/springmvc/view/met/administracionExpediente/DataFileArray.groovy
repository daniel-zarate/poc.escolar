package mx.com.gunix.ui.springmvc.view.met.administracionExpediente;

import org.codehaus.jackson.annotate.JsonIgnoreProperties


public class DataFileArray {

	public DataFileArray(){
		file = new FileMeta()
		requestParameterId = [:]
		requestParameterText = [:]
	}
	
	String id;
	FileMeta file
	Map requestParameterId
	Map requestParameterText

   //byte[] bytes;

}
