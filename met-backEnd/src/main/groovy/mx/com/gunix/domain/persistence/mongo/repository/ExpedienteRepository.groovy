package mx.com.gunix.domain.persistence.mongo.repository

import mx.com.gunix.domain.persistence.mongo.model.ExpedienteDB
import org.springframework.data.mongodb.repository.MongoRepository


interface ExpedienteRepository extends MongoRepository<ExpedienteDB,String>{
}
