package mx.com.gunix.service.met.administracionexpediente.impl

import mx.com.gunix.domain.met.administracionexpediente.Expediente
import mx.com.gunix.domain.persistence.mongo.model.ExpedienteDB
import mx.com.gunix.domain.persistence.mongo.model.embedded.Catalogo
import mx.com.gunix.domain.persistence.mongo.model.embedded.DatosGenerales
import mx.com.gunix.domain.persistence.mongo.model.embedded.DatosPersonales
import mx.com.gunix.domain.persistence.mongo.model.embedded.Domicilio
import mx.com.gunix.domain.persistence.mongo.model.embedded.EsquemaPago
import mx.com.gunix.domain.persistence.mongo.repository.ExpedienteRepository
import mx.com.gunix.domain.persistence.relational.dbmappers.TrabajadorMapper
import mx.com.gunix.service.met.administracionexpediente.IAdministracionExpedienteService
import mx.com.gunix.service.met.administracionexpediente.util.ExpedienteMapper
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

import javax.annotation.Resource
import java.text.SimpleDateFormat
import java.util.List
import java.util.Map;;


@Service
@Transactional(rollbackFor = Exception.class)
class AdministracionExpedienteService implements IAdministracionExpedienteService{


    @Resource
    ExpedienteRepository expedienteRepository

    @Override
    Expediente guardarExpediente(Expediente expediente) {

		println "Parametro Expediente es obligatorio ${expediente?.dump()}"
		
        if (!expediente)
            throw new IllegalArgumentException('Parametro Expediente es obligatorio')

        def expedienteMongo = ExpedienteMapper.mapExpedienteToExpedienteMongoDB(expediente)

		println "expediente to save: ${expedienteMongo?.dump()}"
		
        expedienteMongo = expedienteRepository.save(expedienteMongo)

        if (expedienteMongo)
            expediente.id = expedienteMongo.id

        return expediente
    }
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
		
		expedienteListResult.add(expediente)
		
		return expedienteListResult;
	}
	@Override
	public Expediente getExpediente(String idExpediente) {

		def expedienteMongo = expedienteRepository.findOne(idExpediente)

		return ExpedienteMapper.mapExpedienteMongoDBToExpediente(expedienteMongo)
	}
	
	@Override
	public Map busquedaCP(String codigoPostal){
		
		//TODO: look in bd for catalogos
		// getColonias(codigoPostal)
		// getMunicipio( from colonias)
		// getEntidad( from municipio )
		
		
		def map = [
			"entidad":["id":9,"descripcion":"Distrito Federal"],
			"municipio":["id":2,"descripcion":"Venustiano Carranza"],
			"coloniaList":[
				["id":1,"descripcion":"Centro"],
				["id":2,"descripcion":"Morelos"]
			]
		]
		
		return map
		
	}


}
