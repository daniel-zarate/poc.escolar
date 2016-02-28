package mx.com.gunix.service.met.administracionexpediente

import mx.com.gunix.domain.persistence.mongo.model.ExpedienteDB

interface IExpedienteTrabajadorService {

    void guardarExpedienteTrabajador(ExpedienteDB expedienteDB)

}