package mx.com.gunix.domain.persistence.relational.dbmappers

import mx.com.gunix.domain.persistence.relational.model.TDTrabajador
import org.apache.ibatis.annotations.Insert
import org.apache.ibatis.annotations.Options
import org.apache.ibatis.annotations.Param
import org.apache.ibatis.annotations.ResultMap
import org.apache.ibatis.annotations.Select

/**
 * Created by Daniel on 09/02/2016.
 */

interface TrabajadorMapper {

    @Select("SELECT * FROM met.TD_Trabajador WHERE ID_TRABAJADOR = #{idTrabajador}")
    @ResultMap("trabajadorResultMap")
    TDTrabajador getTrabajador(@Param("idTrabajador") Long idTrabajador)

    @Insert("INSERT INTO  met.TD_Trabajador (CVE_RAMO,CVE_UNIDAD_RESPONSABLE,NOMBRE,APELLIDO_PATERNO,APELLIDO_MATERNO,CURP,RFC,NUM_TRABAJADOR,FECHA_NACIMIENTO,CVE_SEXO,CVE_PAIS,FOLIO_ACTIVITI,NUM_SEGURO_SOCIAL,CVE_NACIONALIDAD,CVE_ESTATUS,RFC_USUARIO,FECHA) VALUES(#{ramo},#{unidadResponsable},#{nombre},#{apellidoPaterno},#{apellidoMaterno},#{curp},#{rfc},#{numTrabajador},#{fechaNacimiento},#{sexo},#{pais},#{folioActiviti},#{numeroSS},#{nacionalidad},#{status},#{rfcUsuario},#{fecha})")
    @Options(useGeneratedKeys = true, keyProperty = "id", flushCache=true)
    void createTrbajador(TDTrabajador trabajador)

}