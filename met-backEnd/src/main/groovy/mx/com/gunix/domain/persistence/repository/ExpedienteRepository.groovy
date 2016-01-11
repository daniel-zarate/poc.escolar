package mx.com.gunix.domain.persistence.repository

import mx.com.gunix.domain.persistence.model.ExpedienteDB
import org.springframework.data.mongodb.repository.MongoRepository

/**
 * Created by Daniel on 04/01/2016.
 */
interface ExpedienteRepository extends MongoRepository<ExpedienteDB,String>{
}
