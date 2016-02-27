package mx.com.gunix.domain.persistence.relational.dbmappers

import mx.com.gunix.domain.persistence.relational.model.TDTrabajador
import mx.com.gunix.framework.config.PersistenceConfig
import org.junit.Ignore
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner

import javax.annotation.Resource

/**
 * Created by Daniel on 10/02/2016.
 */
@RunWith(SpringJUnit4ClassRunner)
@ContextConfiguration(classes = [PersistenceConfig])
//@Ignore
class TrabajadorMapperTest {

    @Resource
    TrabajadorMapper trabajadorMapper

    @Test
    @Ignore
    void getTrabajadores(){
        def trabajador = trabajadorMapper.getTrabajador(1L)

        assert trabajador
        assert trabajador.id == 1L
    }

    @Test
    void insertTrabajadorTest(){

        def trabajadorToInsert = new TDTrabajador()
        trabajadorToInsert.with {

             ramo = 'ramoprueba'
             unidadResponsable = 'unidad'
             nombre = 'Daniel'
             apellidoPaterno = 'Zarate'
             apellidoMaterno = 'Altamirano'
             curp = 'zaaa860307'
             rfc = 'zaaa860307'
             numTrabajador = '1234'
             fechaNacimiento = new Date()
             sexo = 1
             pais = 1
             folioActiviti = 'hghghgghhgh'
             numeroSS = new Long('1234566666')
             nacionalidad = 1
             status = 'A'
             rfcUsuario = 'zaaa860307hd'
             fecha = new Date()
        }

        trabajadorMapper.createTrbajador(trabajadorToInsert)

        def trabajador = trabajadorMapper.getTrabajador(1L)

        assert trabajador
    }

}
