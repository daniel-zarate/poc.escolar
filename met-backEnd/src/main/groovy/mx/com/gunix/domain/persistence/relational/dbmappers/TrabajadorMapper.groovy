package mx.com.gunix.domain.persistence.relational.dbmappers

import mx.com.gunix.domain.persistence.relational.model.TDTrabajador
import org.apache.ibatis.annotations.Param
import org.apache.ibatis.annotations.ResultMap
import org.apache.ibatis.annotations.Select

/**
 * Created by Daniel on 09/02/2016.
 */

interface TrabajadorMapper {

    @Select("SELECT * FROM met.TD_Trabajador WHERE ID_TRABAJADOR = #{idTrabajador}")
    @ResultMap("trabajadorResultMap")
    TDTrabajador getTrabajador(@Param("idTrabajador") Long idTrabajador);

}