package mx.com.gunix.service.met.administracionexpediente

import mx.com.gunix.domain.met.administracionexpediente.Expediente

interface IAdministracionExpedienteService {

    Expediente guardarExpediente(Expediente expediente)
	
	List busquedaExpediente(Expediente expediente)
	
	Expediente getExpediente(String idExpediente)
	
}
