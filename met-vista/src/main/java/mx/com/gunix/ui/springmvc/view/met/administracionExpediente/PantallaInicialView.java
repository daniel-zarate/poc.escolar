package mx.com.gunix.ui.springmvc.view.met.administracionExpediente;

import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import mx.com.gunix.domain.met.administracionexpediente.Expediente;
import mx.com.gunix.framework.processes.domain.Variable;
import mx.com.gunix.framework.ui.springmvc.AbstractGunixController;
import mx.com.gunix.framework.ui.springmvc.spring.GunixSpringMVCView;

import org.springframework.ui.Model;

@GunixSpringMVCView("pantallaInicial")
public class PantallaInicialView extends AbstractGunixController<Expediente> {

	 	@Override
	 	protected String doConstruct(Model uiModel) {
	 		return "met.administracionExpediente.PantallaInicial";
	 	}
	 
	 	@Override
	 	protected List<Variable<?>> getVariablesTarea(HttpServletRequest request) {
	 		
	 		Enumeration< String > en =  request.getAttributeNames();
	 		
	 		while(en.hasMoreElements()){
	 			
	 			String name = en.nextElement();
	 			System.out.println("propiedad: " + name);
	 			Object o = request.getAttribute(name);
	 			System.out.println("valor: " + o);
	 			
	 		}
	 		
	 		
	 		
	 		Expediente e = new Expediente();
	 		
	 		List<Variable<?>> vars = new ArrayList<Variable<?>>();
	 		Variable<Expediente> expedienteVar = new Variable<Expediente>();
	 		expedienteVar.setNombre("expediente");
	 		expedienteVar.setValor( e );
	 		vars.add(expedienteVar);
	 		return vars;
	 	}
	 
	 	@Override
	 	protected String getComentarioTarea(HttpServletRequest request) {
	 		return null;
	 	}
	 
	 	@Override
	 	protected String doEnter(HttpServletRequest request) {
	 		return null;
	 	}
	
}