package mx.com.gunix.domain.persistence.relational.dbmappers

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
@Ignore
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

}
