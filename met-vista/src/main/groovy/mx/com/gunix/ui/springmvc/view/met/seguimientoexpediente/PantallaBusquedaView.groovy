package mx.com.gunix.ui.springmvc.view.met.seguimientoexpediente;

import javax.servlet.http.HttpServletRequest

import mx.com.gunix.domain.met.administracionexpediente.Expediente
import mx.com.gunix.domain.met.seguimientoexpediente.BusquedaExpediente
import mx.com.gunix.framework.processes.domain.Variable
import mx.com.gunix.framework.ui.springmvc.AbstractGunixController
import mx.com.gunix.framework.ui.springmvc.spring.GunixSpringMVCView

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.ui.Model
import org.springframework.validation.Validator

@GunixSpringMVCView("BusquedaExpediente")
public class PantallaBusquedaView extends AbstractGunixController<BusquedaExpediente> {

	@Autowired
	Validator validator;
	
	 	@Override
	 	protected String doConstruct(Model uiModel) {
	 		System.out.println("doConstruct");
	 		return "met.seguimientoexpediente.PantallaBusqueda";
	 	}
	 
	 	@Override
	 	protected List<Variable<?>> getVariablesTarea(HttpServletRequest request) {
	 		
	 		System.out.println("getVariablesTarea");

			BusquedaExpediente busquedaExpediente = new BusquedaExpediente();
			
			Enumeration< String > en =  request.getAttributeNames();
			en = request.getParameterNames();
			while(en.hasMoreElements()){
				String name = en.nextElement();
				if(busquedaExpediente.hasProperty("${name}".toString()))
					busquedaExpediente."${name}" = request.getParameter(name);
			}
			
			 
	 		List<Variable<?>> vars = new ArrayList<Variable<?>>();
	 		Variable<BusquedaExpediente> busquedaVar = new Variable<BusquedaExpediente>();
	 		busquedaVar.setNombre("busquedaExpediente");
	 		busquedaVar.setValor( busquedaExpediente );
	 		vars.add(busquedaVar);
	 		return vars;
	 	}
	 
	 	@Override
	 	protected String getComentarioTarea(HttpServletRequest request) {
	 		System.out.println("getComentarioTarea");
	 		return null;
	 	}
	 
	 	@Override
	 	protected String doEnter(HttpServletRequest request) {
	 		System.out.println("doEnter");
	 		return null;
	 	}
	
}