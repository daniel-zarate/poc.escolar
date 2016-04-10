package mx.com.gunix.service.met.seguimientoexpediente.impl

import mx.com.gunix.domain.met.seguimientoexpediente.BusquedaExpediente
import mx.com.gunix.domain.persistence.mongo.model.ExpedienteDB
import mx.com.gunix.domain.persistence.mongo.repository.custom.ICustomExpedienteRepository
import mx.com.gunix.service.met.administracionexpediente.util.ExpedienteMapper

import java.util.List;

import javax.annotation.Resource
import javax.validation.constraints.NotNull;

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

	@Resource
	ICustomExpedienteRepository customExpedienteRepository

	@Override
	public List busquedaExpediente(BusquedaExpediente expediente) {

		List<Expediente> expedienteListResult = []

		//Todo: Descomentar cuando se quiera integrar
		/*List<ExpedienteDB> expedientesMongo = customExpedienteRepository.findExpedienteByCriteria(expediente)
		if (expedientesMongo){
			def exp = null
			expedientesMongo.each {
				exp = ExpedienteMapper.mapExpedienteMongoDBToExpediente(it)
				expedienteListResult << exp
			}
		}*/
		
		//Comentar una vez que se obtengan los datos de Mongo {
		Expediente e = new Expediente();
		e.nombre = "Noe";
		e.apellidoPaterno = "Albarran"
		e.apellidoMaterno= "Ceron"
		e.curp = "AACN850610HDFLRX04"
		e.folioTrabajador = 1L
		e.folioExpediente = 1L
		e.id = "ESTE-ESUN-IDDE-LOSC-HIDO"
		expedienteListResult.add(e)
		//}
		
		return expedienteListResult;
	}
	@Override
	public Expediente getExpediente(String idExpediente) {
		
		//TODO: descomentar cuando se quiera inetagrar buscar en mongo por id
		/*def expedienteMongo = expedienteRepository.findOne(idExpediente)
		return ExpedienteMapper.mapExpedienteMongoDBToExpediente(expedienteMongo);*/
		
		//Comentar una vez que se obtengan los datos de Mongo
		Expediente e = new Expediente();
		e.nombre = "Noe";
		e.apellidoPaterno = "Albarran"
		e.apellidoMaterno= "Ceron"
		e.curp = "AACN850610HDFLRX04"
		e.folioTrabajador = "1"
		e.folioExpediente = 1L
		e.id = "ESTE-ESUN-IDDE-LOSC-HIDO"
		e.estatusTrabajador = "En Proceso"
		
		e.rfc = "AACN850610"
		e.numSeguroSocial = "123456789012345"
		e.fechaNacimiento = "10/06/1985"
		e.edadTrabajador = 30
		e.cveSexo 
		e.cveNacionalidad
		e.cveEstadoCivil
		e.cvePais
		e.cveEntidadFederativa
		e.cveMunicipio
		e.celular = "5512345678"
		e.email = "noealbarran@gmail.com"
		e.calle = "calle"
		e.codPosta = 15100
		e.colonia = "Colonia"
		e.entidad 
		e.municipio
		e.localidad = "localidad"
		e.telefono = "5512345678"
		e.observaciones = "obs"
		
		e.bancarizado = 1
		e.cveBanco = "002"
		e.clabe = "1234567890"
		
		e.formacionAcademicaList
		e.dependientesFamiliaresList
		
		return e;

		
	}


}
