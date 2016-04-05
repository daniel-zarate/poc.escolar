
package mx.com.gunix.service.met.seguimientoexpediente

import com.hunteron.core.Hessian;
import mx.com.gunix.domain.met.administracionexpediente.Expediente



@Hessian("/seguimientoExpedienteService")
interface ISeguimientoExpedienteService {

	List busquedaExpediente(Expediente expediente)
	
	Expediente getExpediente(String idExpediente)
	
}
