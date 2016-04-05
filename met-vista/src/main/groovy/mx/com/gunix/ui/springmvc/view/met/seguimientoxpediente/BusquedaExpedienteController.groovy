package mx.com.gunix.ui.springmvc.view.met.seguimientoxpediente;

import java.util.zip.ZipEntry
import java.util.zip.ZipInputStream

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

import mx.com.gunix.domain.met.administracionexpediente.Expediente
import mx.com.gunix.met.administracionexpediente.file.DataFileArray
import mx.com.gunix.met.administracionexpediente.file.FileMeta
import mx.com.gunix.service.met.seguimientoexpediente.ISeguimientoExpedienteService


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller
import org.springframework.util.FileCopyUtils
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.multipart.MultipartFile
import org.springframework.web.multipart.MultipartHttpServletRequest
import org.springframework.context.annotation.Lazy;

 
@Controller
@RequestMapping("/busqueda")
public class BusquedaExpedienteController {
 
	@Autowired //@Lazy
	ISeguimientoExpedienteService seguimientoExpedienteService;

	@RequestMapping(value="/expedienteList", method = [RequestMethod.GET,RequestMethod.POST])
	public @ResponseBody Map expedienteList(HttpServletRequest request) {
 
		List expedienteList = []
		
		println "administracionExpedienteService: ${seguimientoExpedienteService.busquedaExpediente(null)}"

		//expedienteList.get
				
		return ["Result":"OK", "Records":expedienteList]
	}
	
	 
}


