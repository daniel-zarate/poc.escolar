package mx.com.gunix.service.met.administracionexpediente

import mx.com.gunix.domain.met.administracionexpediente.Expediente

import com.hunteron.core.Hessian

@Hessian("/administracionExpedienteService")
interface IAdministracionExpedienteService {

    Expediente guardarExpediente(Expediente expediente)
	
	List busquedaExpediente(Expediente expediente)
	
	Expediente getExpediente(String idExpediente)
	
	Map busquedaCP(String codigoPostal)
	
}
