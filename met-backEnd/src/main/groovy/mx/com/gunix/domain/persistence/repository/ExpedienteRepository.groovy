package mx.com.gunix.domain.persistence.repository

import mx.com.gunix.domain.persistence.model.Expediente
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.repository.Repository

/**
 * Created by Daniel on 04/01/2016.
 */
interface ExpedienteRepository extends MongoRepository<Expediente,String>{
}
