package mx.com.gunix.service.met.administracionexpediente.impl

import mx.com.gunix.domain.met.administracionexpediente.ExpedienteDTO
import mx.com.gunix.domain.persistence.model.Expediente
import mx.com.gunix.domain.persistence.repository.ExpedienteRepository
import mx.com.gunix.service.met.administracionexpediente.IAdministracionExpedienteService
import org.springframework.stereotype.Service

import javax.annotation.Resource

/**
 * Created by Daniel on 07/01/2016.
 */
@Service
class AdministracionExpedienteService implements IAdministracionExpedienteService{

    @Resource
    ExpedienteRepository expedienteRepository

    @Override
    ExpedienteDTO guardarExpediente(ExpedienteDTO expediente) {

        //todo map between DTO to domain
        def expedienteMongo = new Expediente()
        expedienteMongo = expedienteRepository.save(expedienteMongo)

        if (expedienteMongo)
            expediente.id = expedienteMongo.id

        return expediente
    }
}
