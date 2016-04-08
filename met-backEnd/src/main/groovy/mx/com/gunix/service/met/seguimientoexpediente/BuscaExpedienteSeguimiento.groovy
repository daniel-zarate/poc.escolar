package mx.com.gunix.service.met.seguimientoexpediente;

import java.util.HashMap;
import java.util.Map;

import mx.com.gunix.domain.met.administracionexpediente.Expediente
import mx.com.gunix.domain.met.seguimientoexpediente.BusquedaExpediente
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service;

@Service("buscaExpedienteSeguimiento")
public class BuscaExpedienteSeguimiento {

	@Autowired
	ISeguimientoExpedienteService seguimientoExpedienteService;
	
	public LinkedHashMap execute(BusquedaExpediente busquedaExpediente){

		println "BuscaExpedienteSeguimiento ${busquedaExpediente?.dump()}";
		
		Expediente e = seguimientoExpedienteService.getExpediente(busquedaExpediente.getIdTrabajador())
		
		return ["expediente":e]
		
	} 
	
}
