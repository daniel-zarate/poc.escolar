package mx.com.gunix.service.met.administracionExpediente;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service("cargaInicial")
public class CargaInicial {

	public String execute(){
		Map<String,String> m = new HashMap<String,String>();
		m.put("HELLO", "Hola Mundo");
		
		System.out.println("Haciendo el hola mundo");
		
		return "Hola Mundo";
	} 
	
}
