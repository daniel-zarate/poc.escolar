package mx.com.gunix.domain.persistence.relational.dbmappers

import mx.com.gunix.domain.persistence.relational.model.TDTrayectoriaDetalle
import org.apache.ibatis.annotations.*

interface TrayectoriaDetalleMapper {

    @Select("SELECT * FROM met.TD_TRAYECTORIA_DETALLE WHERE ID_TRAYECTORIA_DETALLE = #{id}")
    @ResultMap("trayectoriaDetalleResultMap")
    TDTrayectoriaDetalle getTrayectoriaDetalle(@Param("id") Long id)

    @Insert("INSERT INTO  met.TD_TRAYECTORIA_DETALLE (ID_TRAYECTORIA_LABORAL,DEPENDENCIA,ID_TIPO_ANTIGUEDAD,ID_RAMA,ID_PERIODO,DESDE,HASTA,RFC_USUARIO,FECHA) VALUES(#{idTrayectoriaLaboral},#{dependencia},#{idTipoAntiguedad},#{idRama},#{idPeriodo},#{desde},#{hasta},#{rfcUsuario},#{fecha})")
    @Options(useGeneratedKeys = true, keyProperty = "id", flushCache=true)
    void createTrayectoriaDetalle(TDTrayectoriaDetalle trayectoriaDetalle)

}