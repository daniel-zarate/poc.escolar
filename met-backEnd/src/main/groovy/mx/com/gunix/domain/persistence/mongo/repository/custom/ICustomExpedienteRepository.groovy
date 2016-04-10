package mx.com.gunix.domain.persistence.mongo.repository.custom

import mx.com.gunix.domain.met.seguimientoexpediente.BusquedaExpediente
import mx.com.gunix.domain.persistence.mongo.model.ExpedienteDB


interface ICustomExpedienteRepository {

    List<ExpedienteDB> findExpedienteByCriteria(BusquedaExpediente busquedaExpediente)

}