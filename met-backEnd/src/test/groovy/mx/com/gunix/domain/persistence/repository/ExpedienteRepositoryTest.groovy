package mx.com.gunix.domain.persistence.repository

import mx.com.gunix.domain.persistence.mongo.model.ExpedienteDB
import mx.com.gunix.domain.persistence.mongo.repository.ExpedienteRepository
import mx.com.gunix.framework.config.MongoDBConfig
import org.junit.Ignore
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner

import javax.annotation.Resource

@RunWith(SpringJUnit4ClassRunner)
@ContextConfiguration(classes = [MongoDBConfig])
class ExpedienteRepositoryTest {

    @Resource
    ExpedienteRepository expedienteRepository

    @Test
    @Ignore
    void insertExpediente(){
        ExpedienteDB expediente = new ExpedienteDB()
        def expediente1 = expedienteRepository.save(expediente)
        assert expediente1.id != null
    }
}
