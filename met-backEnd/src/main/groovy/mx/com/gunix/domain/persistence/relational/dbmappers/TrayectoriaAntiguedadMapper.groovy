package mx.com.gunix.domain.persistence.relational.dbmappers

import mx.com.gunix.domain.persistence.relational.model.TDTrayectoriaAntiguedad
import org.apache.ibatis.annotations.*

interface TrayectoriaAntiguedadMapper {

    @Select("SELECT * FROM met.TD_TRAYECTORIA_ANTIGUEDAD WHERE ID = #{id}")
    @ResultMap("trayectoriaAntiguedadResultMap")
    TDTrayectoriaAntiguedad getTrayectoriaAntiguedad(@Param("id") Long id)

    @Insert("INSERT INTO  met.TD_TRAYECTORIA_ANTIGUEDAD (ID_TIPO_ANTIGUEDAD,ID_TRAYECTORIA_LABORAL,ANIOS,MESES,DIAS) VALUES(#{idTipoAntiguedad},#{idTrayectoriaLaboral},#{anios},#{meses},#{dias})")
    @Options(useGeneratedKeys = true, keyProperty = "id", flushCache=true)
    void createTrayectoriaAntiguedad(TDTrayectoriaAntiguedad trayectoriaAntiguedad)

}