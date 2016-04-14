package mx.com.gunix.domain.persistence.repository

import mx.com.gunix.domain.met.seguimientoexpediente.BusquedaExpediente
import mx.com.gunix.domain.persistence.mongo.model.ExpedienteDB
import mx.com.gunix.domain.persistence.mongo.model.embedded.DatosPersonales
import mx.com.gunix.domain.persistence.mongo.repository.ExpedienteRepository
import mx.com.gunix.domain.persistence.mongo.repository.custom.ICustomExpedienteRepository
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

    @Resource
    ICustomExpedienteRepository customExpedienteRepository

    @Test
    @Ignore
    void insertExpediente(){

        ExpedienteDB expediente1 = new ExpedienteDB()
        expediente1.datosPersonales = new DatosPersonales()
        expediente1.datosPersonales.with {
            curp = 'ZAAA860307BS1'
            nombres = 'Abraham Daniel'
            primerApellido = 'Zárate'
            segundoApellido = 'Altamirano'
        }

        expediente1 = expedienteRepository.save(expediente1)
        assert expediente1.id != null

        ExpedienteDB expediente2 = new ExpedienteDB()
        expediente2.datosPersonales = new DatosPersonales()
        expediente2.datosPersonales.with {
            curp = 'RAAA860307BS1'
            nombres = 'Abraham David'
            primerApellido = 'Zamora'
            segundoApellido = 'Altamira'
        }

        expediente2 = expedienteRepository.save(expediente2)
        assert expediente2.id != null

        ExpedienteDB expediente3 = new ExpedienteDB()
        expediente3.datosPersonales = new DatosPersonales()
        expediente3.datosPersonales.with {
            curp = 'XCAA860307BS1'
            nombres = 'Roberto Daniel'
            primerApellido = 'Sanchez'
            segundoApellido = 'Altamirano'

        }

        expediente3 = expedienteRepository.save(expediente3)
        assert expediente3.id != null


        ExpedienteDB expediente4 = new ExpedienteDB()
        expediente4.datosPersonales = new DatosPersonales()
        expediente4.datosPersonales.with {
            curp = 'VEAA860307BS2'
            nombres = 'Rodrigo Daniel'
            primerApellido = 'Rancho'
            segundoApellido = 'Robles'

        }

        expediente4 = expedienteRepository.save(expediente4)
        assert expediente4.id != null


        ExpedienteDB expediente5 = new ExpedienteDB()
        expediente5.datosPersonales = new DatosPersonales()
        expediente5.datosPersonales.with {
            curp = 'FGVH860307BS1'
            nombres = 'Abraham Daniel'
            primerApellido = 'Zárate'
            segundoApellido = 'Altamirano'

        }

        expediente5 = expedienteRepository.save(expediente5)
        assert expediente5.id != null
    }

    @Test
    //@Ignore
    void findExpedientes(){
        def busqueda = new BusquedaExpediente(apellidoPaterno: 'Zárate', apellidoMaterno: 'Altamirano', init: 1,offset: 10)
        def result = customExpedienteRepository.findExpedienteByCriteria(busqueda)

        assert result && result.size() == 2
    }
}
