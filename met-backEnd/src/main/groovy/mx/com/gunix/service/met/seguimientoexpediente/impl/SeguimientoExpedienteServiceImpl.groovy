package mx.com.gunix.service.met.seguimientoexpediente.impl

import javax.annotation.Resource

import mx.com.gunix.domain.met.administracionexpediente.Expediente
import mx.com.gunix.domain.persistence.mongo.repository.ExpedienteRepository
import mx.com.gunix.service.met.seguimientoexpediente.ISeguimientoExpedienteService

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional(rollbackFor = Exception.class)
class SeguimientoExpedienteServiceImpl implements ISeguimientoExpedienteService{


    @Resource
    ExpedienteRepository expedienteRepository

	@Override
	public List busquedaExpediente(Expediente expediente) {
		List expedienteListResult = []
		
		//TODO: look in mongo for expediente like expediente
		//def expedienteMongo = ExpedienteMapper.mapExpedienteToExpedienteMongoDB(expediente)
		//def expedienteMongoResultList = expedienteRepository.findLike(expedienteMongo)
		//each expedienteMongoResultList -> ExpedienteMapper.mapExpedienteMongoDBToExpediente(it)
		
		Expediente result = new Expediente()
		
		//TODO: Busqueda
		Expediente e = new Expediente();
		e.nombre = "Noe";
		e.apellidoPaterno = "Albarran"
		e.apellidoMaterno= "Ceron"
		e.curp = "AACN850610HDFLRX04"
		
		expedienteListResult.add(e)
		
		return expedienteListResult;
	}
	@Override
	public Expediente getExpediente(String idExpediente) {
		// TODO Auto-generated method stub
		return null;
	}


}
