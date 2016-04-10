package mx.com.gunix.service.met.seguimientoexpediente

import com.hunteron.core.Hessian;

import mx.com.gunix.domain.met.administracionexpediente.Expediente
import mx.com.gunix.domain.met.seguimientoexpediente.BusquedaExpediente


@Hessian("/seguimientoExpedienteService")
interface ISeguimientoExpedienteService {

	List busquedaExpediente(BusquedaExpediente expediente)
	
	Expediente getExpediente(String idExpediente)
	
}
