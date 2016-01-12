package mx.com.gunix.domain.persistence.repository

import mx.com.gunix.domain.persistence.model.ExpedienteDB
import org.springframework.data.mongodb.repository.MongoRepository


interface ExpedienteRepository extends MongoRepository<ExpedienteDB,String>{
}
