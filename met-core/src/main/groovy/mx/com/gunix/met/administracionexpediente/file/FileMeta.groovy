package mx.com.gunix.met.administracionexpediente.file;

//import org.codehaus.jackson.annotate.JsonIgnoreProperties

//@JsonIgnoreProperties(["filePath"])
public class FileMeta implements Serializable {

   String id;
   String fileId;
   String fileName;
   String fileSize;
   String fileType;
   String filePath;

   //byte[] bytes;

}
