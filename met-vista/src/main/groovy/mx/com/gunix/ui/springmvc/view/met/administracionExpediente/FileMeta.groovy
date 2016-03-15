package mx.com.gunix.ui.springmvc.view.met.administracionExpediente;

import org.codehaus.jackson.annotate.JsonIgnoreProperties

@JsonIgnoreProperties(["filePath"])
public class FileMeta {

   String id;
   String fileId;
   String fileName;
   String fileSize;
   String fileType;
   String filePath;

   //byte[] bytes;

}
