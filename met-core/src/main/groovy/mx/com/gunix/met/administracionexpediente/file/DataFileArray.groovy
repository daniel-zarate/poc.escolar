package mx.com.gunix.met.administracionexpediente.file;

//import org.codehaus.jackson.annotate.JsonIgnoreProperties


public class DataFileArray implements Serializable {
	
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
