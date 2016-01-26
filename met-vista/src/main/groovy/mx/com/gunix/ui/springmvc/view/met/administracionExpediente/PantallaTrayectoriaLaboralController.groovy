package mx.com.gunix.ui.springmvc.view.met.administracionExpediente;

import java.util.concurrent.atomic.AtomicLong

import javax.servlet.http.HttpServletRequest

import mx.com.gunix.domain.met.administracionexpediente.Expediente

import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController


@RestController
public class PantallaTrayectoriaLaboralController {

	private static final String template = "Hello, %s!";
	private final AtomicLong counter = new AtomicLong();


	@RequestMapping("/saludo")
	public Expediente greeting(@RequestParam(value="name", defaultValue="World") String name, HttpServletRequest request) {
		def session = null;
		Expediente e = new Expediente(nombre:"Noe",apellidoPaterno:"Albarran" )
		if(request != null){
			println "aqui va la session"
			session = request.getSession()
			if( session.getAttribute("expedienteSession1") == null ){
				println "creando objeto"
				e = new Expediente(nombre:"Noe Session 1",apellidoPaterno:"Albarran 1", apellidoMaterno:"Session 1" )
				session.setAttribute("expedienteSession1", e)
			}
			else{
				println "obteniendo objeto de la session"
				e = session.getAttribute("expedienteSession1")
			}
			
		}
		else{
			println "No se puede obtener la session"
		}
		
		return e;
	}
	
	
}