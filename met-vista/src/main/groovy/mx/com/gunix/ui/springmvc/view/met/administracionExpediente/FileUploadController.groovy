package mx.com.gunix.ui.springmvc.view.met.administracionExpediente;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Iterator;
import java.util.LinkedList
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

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
@RequestMapping("/controller")
public class FileController {
 
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
	public @ResponseBody FileUploadResponse upload(MultipartHttpServletRequest request, HttpServletResponse response) {
 
		String curp = request.getParameter('curp');
		String archivos = request.getParameter('archivos');
		String directorioBase = "/aplic/tmp";
		File archivosExpediente = new File("${directorioBase}/${curp}/${archivos}");
		FileUploadResponse fileUploadResponse = new FileUploadResponse(); 
		
		if(!archivosExpediente.exists()){
			archivosExpediente.mkdirs();
		}
		
		//1. build an iterator
		 Iterator<String> itr =  request.getFileNames();
		 MultipartFile mpf = null;
 
		 //2. get each file
		 while(itr.hasNext()){
 
			 //2.1 get next MultipartFile
			 mpf = request.getFile(itr.next());
			 //System.out.println(mpf.getOriginalFilename() +" uploaded! "+files.size());
			 
			 //2.2 if files > 10 remove the first from the list
			 if(files.size() >= 10)
				 files.pop();
 
			 //2.3 create new fileMeta
//			 fileMeta = new FileMeta();
//			 fileMeta.setId("${archivos}");
//			 fileMeta.setFileName(mpf.getOriginalFilename());
//			 fileMeta.setFileSize(mpf.getSize()/1024+" Kb");
//			 fileMeta.setFileType(mpf.getContentType());
 
			 try {
//				fileMeta.setBytes(mpf.getBytes());
 
				 // copy file to local disk (make sure the path "e.g. D:/temp/files" exists)
				 FileCopyUtils.copy(mpf.getBytes(), new FileOutputStream("/aplic/tmp/"+mpf.getOriginalFilename()));
 
				 fileUploadResponse.files = extractZip(new File("/aplic/tmp/"+mpf.getOriginalFilename()) , archivosExpediente.getAbsolutePath() ,curp)
				 
				 println "empty? ${fileUploadResponse.files?.isEmpty()}"
				 
				 if(fileUploadResponse.files?.isEmpty()){
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
			fileUploadResponse.responseCode = "200"
			fileUploadResponse.responseMessage = "OK"
			
			request.getSession().setAttribute(archivos, fileUploadResponse.files)

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
	 
	 
	 private static LinkedList<FileMeta> extractZip(File downloadedFile, String path, String curp) throws IOException {

		 // get the zip file content
		 LinkedList<FileMeta> fileList = new LinkedList<FileMeta>();
		 ZipInputStream zis = new ZipInputStream(new FileInputStream(downloadedFile));
		 // get the zipped file list entry
		 ZipEntry ze = zis.getNextEntry();
		 byte[] buffer = new byte[4096];
		 while (ze != null) {

			 String fileName = ze.getName();
			 File newFile = new File("${path}/${fileName}");
			 
			 FileMeta fileMeta = new FileMeta();
			 
			 println "[${fileName.split("_")[0]}] == ${curp}"
			 
			 if(fileName.split("_")[0] != curp){  // no cumple con formato CURP_ID.pdf
				 ze = zis.getNextEntry();
				 continue;  
			 }
			 
			  
			 fileMeta.setId( (fileName.split("\\.")[0]).split("_")[1] );
			 fileMeta.setFileName(fileName);
			 
 
			 if (ze.isDirectory()) {
				 // create all non exists folders
				 // else you will hit FileNotFoundException for compressed folder
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
			 fileMeta.setFileSize(newFile.length()/1024+" Kb");
			 //fileMeta.setBytes(newFile.getBytes())
			 fileList.add(fileMeta);
			 
			 ze = zis.getNextEntry();
		 }
 
		 zis.closeEntry();
		 zis.close();

		 return fileList

	 }
	 
	 
}


