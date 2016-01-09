package mx.com.gunix.domain.persistence.repository

import mx.com.gunix.domain.persistence.model.Expediente
import mx.com.gunix.framework.config.MongoDBConfig
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.test.annotation.Rollback
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner

import javax.annotation.Resource

/**
 * Created by Daniel on 06/01/2016.
 */
@RunWith(SpringJUnit4ClassRunner)
@ContextConfiguration(classes = [MongoDBConfig])
class ExpedienteRepositoryTest {

    @Resource
    ExpedienteRepository expedienteRepository

    @Test
    void insertExpediente(){
        Expediente expediente = new Expediente()
        def expediente1 = expedienteRepository.save(expediente)
        assert expediente1.id != null
    }
}
