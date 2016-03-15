package mx.com.gunix.ui.springmvc.view.met.administracionExpediente;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Iterator;
import java.util.LinkedList
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

 
@Controller
@RequestMapping("/arrayData")
public class ArrayDataController {
 
	LinkedList<FileMeta> files = new LinkedList<FileMeta>();
	FileMeta fileMeta = null;
	
	
	/***************************************************
	 * URL: /rest/controller/upload
	 * upload(): receives files
	 * @param request : MultipartHttpServletRequest auto passed
	 * @param response : HttpServletResponse auto passed
	 * @return LinkedList<FileMeta> as json format
	 ****************************************************/
	@RequestMapping(value="/upload", method = RequestMethod.POST)
	public @ResponseBody DataFileArrayUploadResponse upload(MultipartHttpServletRequest request, HttpServletResponse response) {
 
		String curp = request.getParameter('curp');
		String archivos = request.getParameter('archivos');
		String directorioBase = "/aplic/tmp";
		File archivosExpediente = new File("${directorioBase}/${curp}/${archivos}");
		DataFileArrayUploadResponse fileUploadResponse = new DataFileArrayUploadResponse(); 
		
		if(!archivosExpediente.exists()){
			archivosExpediente.mkdirs();
		}
		
		List<DataFileArray> files = request.getSession().getAttribute(archivos)
		if( !files )
			files = []
		
		 Iterator<String> itr =  request.getFileNames();
		 Enumeration en = request.getParameterNames();
		 
		 while(en.hasMoreElements()){
			 String name = en.nextElement();
			 if(!name.endsWith("TextValue"))
			 	fileUploadResponse.fileData.requestParameterId[name] = request.getParameter(name);
			 else
			 	fileUploadResponse.fileData.requestParameterText[name] = request.getParameter(name);
		 }
		 
		 MultipartFile mpf = null;
 
		 while(itr.hasNext()){
 
			 mpf = request.getFile(itr.next());

			 if(files.size() >= 10)
				 files.pop();
 

			 try {
				 FileCopyUtils.copy(mpf.getBytes(), new FileOutputStream("/aplic/tmp/"+mpf.getOriginalFilename()));
 
				 fileUploadResponse.fileData.file = extractZip(new File("/aplic/tmp/"+mpf.getOriginalFilename()) , archivosExpediente.getAbsolutePath() ,curp)
				 
				 println "empty? ${fileUploadResponse.fileData.file == null}"
				 
				 if( !fileUploadResponse.fileData.file ){
					 fileUploadResponse.responseCode = "500"
					 fileUploadResponse.responseMessage = "El archivo zip esta vacio o ninguno de los archivos tiene el formato establecido"
					 
					 return fileUploadResponse
				 }
				 
				 
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				fileUploadResponse.responseCode = "500"
				fileUploadResponse.responseMessage = e.message
			}
			 //2.4 add to files
			
			UUID idOne = UUID.randomUUID();
			
			fileUploadResponse.responseCode = "200"
			fileUploadResponse.responseMessage = "OK"
			fileUploadResponse.fileData.id = idOne.toString()
			
			files.add(fileUploadResponse.fileData)
			
			request.getSession().setAttribute(archivos, files)

		 }
		// result will be like this
		// [{"fileName":"app_engine-85x77.png","fileSize":"8 Kb","fileType":"image/png"},...]
		return fileUploadResponse;
	}
	/***************************************************
	 * URL: /rest/controller/get/{value}
	 * get(): get file as an attachment
	 * @param response : passed by the server
	 * @param value : value from the URL
	 * @return void
	 ****************************************************/
	@RequestMapping(value = "/get/{value}", method = RequestMethod.GET)
	 public void get(HttpServletResponse response,@PathVariable String value){
		 FileMeta getFile = files.get(Integer.parseInt(value));
		 try {
				response.setContentType(getFile.getFileType());
				response.setHeader("Content-disposition", "attachment; filename=\""+getFile.getFileName()+"\"");
				FileCopyUtils.copy(getFile.getBytes(), response.getOutputStream());
		 }catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
		 }
	 }
	 
	 @RequestMapping(value="/remove", method = RequestMethod.POST)
	 public @ResponseBody FileUploadResponse remove(HttpServletRequest request, HttpServletResponse response) {
		 String id = request.getParameter('id');
		 String archivos = request.getParameter('archivos');
		 FileUploadResponse fileUploadResponse = new FileUploadResponse()
		 
		 
		 LinkedList<DataFileArray> filesSession = request.getSession().getAttribute(archivos);
		 if(!filesSession){
			 fileUploadResponse.setResponseCode("404");
			 fileUploadResponse.setResponseMessage("La lista de archivos no existe")
		 }
		 
		 println "filesSession ${filesSession}"
		 if( ! (filesSession?.find{it.id == id}) ){
			 fileUploadResponse.setResponseCode("404");
			 fileUploadResponse.setResponseMessage("Archivo no encontrado")
		 }
		 
		 filesSession?.removeIf{ it.id != id }
		 println "filesSession - deleted ${filesSession}"
		 
		 request.getSession().setAttribute(archivos,filesSession);
		 
		 fileUploadResponse.setResponseCode("200");
		 fileUploadResponse.setResponseMessage("Archivo eliminado correctamente")
		 
		 println "Eliminado OK id: $id"
		 
		 return fileUploadResponse
		 
	 }
	 
	 
	 private static FileMeta extractZip(File downloadedFile, String path, String curp) throws IOException {

		 // get the zip file content
		 FileMeta fileMeta = new FileMeta();
		 ZipInputStream zis = new ZipInputStream(new FileInputStream(downloadedFile));
		 // get the zipped file list entry
		 ZipEntry ze = zis.getNextEntry();
		 byte[] buffer = new byte[4096];
		 if (ze != null) {

			 String fileName = ze.getName();
			 File newFile = new File("${path}/${fileName}");
			 
			 println "[${fileName.split("_")[0]}] == ${curp}"
			 
			 if(fileName.split("_")[0] != curp){  // no cumple con formato CURP_ID.pdf
				 //ze = zis.getNextEntry();
				 return null;  
			 }
			 			 
			 if (ze.isDirectory()) {
				 newFile.mkdirs();
			 } else {
			 	
			 	if(!newFile.exists()){
					 newFile.createNewFile()
				 }
			 
				 FileOutputStream fos = new FileOutputStream(newFile);
 
				 int len;
				 while ((len = zis.read(buffer)) > 0) {
					 fos.write(buffer, 0, len);
				 }
				 fos.close();
			 }
			 
			 
			 
			 //fileMeta.setId(idOne.toString());
			 fileMeta.setFileId( (fileName.split("\\.")[0]).split("_")[1] );
			 fileMeta.setFileName(fileName);
			 fileMeta.setFilePath(newFile.absolutePath);
			 fileMeta.setFileSize(newFile.length()/1024+" Kb");
			 
		 }
 
		 zis.closeEntry();
		 zis.close();

		 return fileMeta

	 }
	 
	 
}


