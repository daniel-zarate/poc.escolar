package mx.com.gunix.service.met.seguimientoexpediente;

import java.util.HashMap;
import java.util.Map;

import mx.com.gunix.domain.met.administracionexpediente.embedded.CatalogoDTO
import mx.com.gunix.framework.processes.domain.Variable
import mx.com.gunix.framework.processes.domain.Variable.Scope
import org.springframework.stereotype.Service;

@Service("cargaInicialSeguimientoExpediente")
public class CargaInicialSeguimientoExpediente {

	public LinkedHashMap execute(){

		println "cargaInicialSeguimientoExpediente";
		
		Variable v = new Variable();
		CatalogoDTO valor1 = new CatalogoDTO([id:1,valor:"En Proceso"]);
		CatalogoDTO valor2 = new CatalogoDTO([id:2,valor:"Autorizado"]);
		CatalogoDTO valor3 = new CatalogoDTO([id:3,valor:"Rechazado"]);
		ArrayList valores = [valor1,valor2,valor3]
		
		return ["estatusExpedienteList":valores];
	} 
	
}
