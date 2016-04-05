package mx.com.gunix.ui.springmvc.view.met.administracionExpediente;

import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import mx.com.gunix.domain.met.administracionexpediente.Expediente;
import mx.com.gunix.framework.processes.domain.Variable;
import mx.com.gunix.framework.ui.springmvc.AbstractGunixController;
import mx.com.gunix.framework.ui.springmvc.spring.GunixSpringMVCView;

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.ui.Model;
import org.springframework.validation.Validator
import org.springframework.validation.Errors

@GunixSpringMVCView("Expediente")
public class PantallaInicialView extends AbstractGunixController<Expediente> {

	@Autowired
	Validator validator;
	
	 	@Override
	 	protected String doConstruct(Model uiModel) {
	 		System.out.println("doConstruct");
	 		return "met.administracionExpediente.PantallaInicial";
	 	}
	 
	 	@Override
	 	protected List<Variable<?>> getVariablesTarea(HttpServletRequest request) {
	 		
	 		System.out.println("getVariablesTarea");
	 		Enumeration< String > en =  request.getAttributeNames();	 		
	 		
//	 		System.out.println("attributes");
//	 		while(en.hasMoreElements()){
//	 			
//	 			String name = en.nextElement();
//	 			System.out.println("propiedad: " + name);
//	 			Object o = request.getAttribute(name);
//	 			System.out.println("valor: " + o);
//	 			
//	 		}
	
	 		System.out.println("parameters");
	 		en = request.getParameterNames();
	 		
	 		Expediente e = new Expediente();
	 		
	 		while(en.hasMoreElements()){
	 			String name = en.nextElement();
				 if(e.hasProperty("${name}".toString()))
	 				e."${name}" = request.getParameter(name);
	 		}
			 
			 e.formacionAcademicaList = []
			 e.dependientesFamiliaresList = [] 
			 
			 if( request.getSession().getAttribute("formacionAcademica") )
			 	e.formacionAcademicaList.addAll( request.getSession().getAttribute("formacionAcademica") )
			
			 if( request.getSession().getAttribute("dependientesFamiliares") )
			 	e.dependientesFamiliaresList.addAll( request.getSession().getAttribute("dependientesFamiliares") ) 
			 
			 System.out.println("Expediente: " + e?.dump());
			 
			 Errors errors = null;
			 println "validador - ${validator?.dump()}"
			 validator.validate(e, errors)
			 
			 println "errors - ${errors?.dump()}" 
			 
			 if(errors?.hasErrors()){
				 println "si hubo errores"
			 }
			 
	 		List<Variable<?>> vars = new ArrayList<Variable<?>>();
	 		Variable<Expediente> expedienteVar = new Variable<Expediente>();
	 		expedienteVar.setNombre("expediente");
	 		expedienteVar.setValor( e );
	 		vars.add(expedienteVar);
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