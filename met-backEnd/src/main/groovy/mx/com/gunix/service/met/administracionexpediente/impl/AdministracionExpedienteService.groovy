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

import javax.annotation.Resource
import java.text.SimpleDateFormat


@Service
class AdministracionExpedienteService implements IAdministracionExpedienteService{


    @Resource
    ExpedienteRepository expedienteRepository

    @Override
    Expediente guardarExpediente(Expediente expediente) {

        if (!expediente)
            throw new IllegalArgumentException('Parametro Expediente es obligatorio')

        def expedienteMongo = ExpedienteMapper.mapExpedienteToExpedienteMongoDB(expediente)

        expedienteMongo = expedienteRepository.save(expedienteMongo)

        if (expedienteMongo)
            expediente.id = expedienteMongo.id

        return expediente
    }


}
