package mx.com.gunix.domain.persistence.relational.dbmappers

import mx.com.gunix.domain.persistence.relational.model.TDDependientes
import org.apache.ibatis.annotations.*

interface DependientesMapper {

    @Select("SELECT * FROM met.TD_DEPENDIENTES WHERE ID_DEPENDIENTE = #{id}")
    @ResultMap("dependientesResultMap")
    TDDependientes getDependiente(@Param("id") Long id)

    @Insert("INSERT INTO  met.TD_DEPENDIENTES (ID_TRABAJADOR,CURP_DEPENDIENTE,NOMBRE,APELLIDO_PATERNO,APELLIDO_MATERNO,FECHA_NACIMIENTO,CVE_SEXO,CVE_PARENTESCO,CVE_NIVEL,CVE_GRADO,RFC_USUARIO,FECHA) VALUES(#{idTrabajador},#{curpDependiente},#{nombre},#{apellidoPaterno},#{apellidoMaterno},#{fechaNacimiento},#{cveSexo},#{cveParentesco},#{cveNivel},#{cveGrado},#{rfcUsuario},#{fecha})")
    @Options(useGeneratedKeys = true, keyProperty = "id", flushCache=true)
    void createDependiente(TDDependientes archivo)

}