package mx.com.gunix.service.met.administracionexpediente;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import mx.com.gunix.domain.met.administracionexpediente.Expediente;
import mx.com.gunix.framework.processes.domain.Variable;

@Service("guardaExpediente")
public class GuardaExpediente {

	public String execute(Expediente expediente){
		
		System.out.println("objeto expediente:" + expediente.getNombre());
		
		return "OK";
	} 
	
}
