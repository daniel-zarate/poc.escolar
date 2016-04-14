package mx.com.gunix.ui.springmvc.view.met.administracionExpediente;

import javax.servlet.http.HttpServletRequest

import mx.com.gunix.service.met.administracionexpediente.IAdministracionExpedienteService

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.ResponseBody


@Controller
@RequestMapping("/expedienteRest")
public class AdministracionExpedienteController {

	@Autowired //@Lazy
	IAdministracionExpedienteService administracionExpedienteService;

	
	@RequestMapping(value="/busquedaCP", method = [RequestMethod.GET,RequestMethod.POST])
	public @ResponseBody LinkedHashMap busquedaCP(@RequestParam(value="codigoPostal") String codigoPostal, HttpServletRequest request) {
		
		println "busquedaCP"
		def map = null;

		map = administracionExpedienteService.busquedaCP(codigoPostal)
		
		return map;
	}
	
}