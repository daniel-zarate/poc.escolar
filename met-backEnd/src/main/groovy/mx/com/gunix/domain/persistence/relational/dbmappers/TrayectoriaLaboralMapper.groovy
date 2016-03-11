package mx.com.gunix.domain.persistence.relational.dbmappers

import mx.com.gunix.domain.persistence.relational.model.TDTrayectoriaLaboral
import org.apache.ibatis.annotations.*

interface TrayectoriaLaboralMapper {

    @Select("SELECT * FROM met.TD_TRAYECTORIA_LABORAL WHERE ID_TRAYECTORIA_LABORAL = #{idTrayectoriaLaboral}")
    //@ResultMap("trayectoriaLaboralResultMap")
    @Results([
        @Result(id=true, column="NOMBRE", property="nombreCompleto"),
        @Result(column="DIRECCION", property="direccion"),
        @Result(column="TELEFONO", property="telefono"),
        @Result(column="FECHANACIMIENTO", property="fechaNacimiento"),
        @Result(column="SEXO", property="sexo"),
        @Result(column="CORREOELECTRONICO", property="correoElectronico")
    ])
    TDTrayectoriaLaboral getTrayectoriaLaboral(@Param("idTrayectoriaLaboral") Long idTrayectoriaLaboral)

    @Insert("INSERT INTO  met.TD_TRAYECTORIA_LABORAL (ID_TRABAJADOR,CVE_REGIMEN,RFC_USUARIO,FECHA,AHORRO_SOLIDARIO) VALUES(#{idTrabajador},#{regimen},#{rfcUsuario},#{fecha},#{ahorroSolidario})")
    @Options(useGeneratedKeys = true, keyProperty = "idTrayectoriaLaboral", flushCache=true)
    void createTrayectoriaLaboral(TDTrayectoriaLaboral trayectoriaLaboral)

}