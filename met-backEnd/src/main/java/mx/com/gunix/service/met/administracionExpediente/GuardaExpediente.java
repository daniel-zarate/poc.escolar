package mx.com.gunix.service.met.administracionExpediente;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import mx.com.gunix.domain.met.administracionexpediente.Expediente;
import mx.com.gunix.framework.processes.domain.Variable;

@Service("guardaExpediente")
public class GuardaExpediente {

	public String execute(Variable<Expediente> exp){
		
		System.out.println("objeto expediente:" + exp.getNombre());
		
		return "OK";
	} 
	
}
