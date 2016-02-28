package mx.com.gunix.domain.persistence.relational.dbmappers

import mx.com.gunix.domain.persistence.relational.model.TDTrabajador
import org.apache.ibatis.annotations.Insert
import org.apache.ibatis.annotations.Options
import org.apache.ibatis.annotations.Param
import org.apache.ibatis.annotations.ResultMap
import org.apache.ibatis.annotations.Select


interface TrabajadorMapper {

    @Select("SELECT * FROM met.TD_Trabajador WHERE ID_TRABAJADOR = #{idTrabajador}")
    @ResultMap("trabajadorResultMap")
    TDTrabajador getTrabajador(@Param("idTrabajador") Long idTrabajador)

    @Insert("INSERT INTO  met.TD_Trabajador (CVE_RAMO,CVE_UNIDAD_RESPONSABLE,NOMBRE,APELLIDO_PATERNO,APELLIDO_MATERNO,CURP,RFC,NUM_TRABAJADOR,FECHA_NACIMIENTO,CVE_SEXO,CVE_PAIS,FOLIO_ACTIVITI,NUM_SEGURO_SOCIAL,CVE_NACIONALIDAD,CVE_ESTATUS,RFC_USUARIO,FECHA,CVE_ENTIDAD_FEDERATIVA,CVE_MUNICIPIO,FOLIO_SOLICITUD,NUMERO_TRABAJADOR,CVE_ESTADO_CIVIL,ID_FOTO) VALUES(#{ramo},#{unidadResponsable},#{nombre},#{apellidoPaterno},#{apellidoMaterno},#{curp},#{rfc},#{numTrabajador},#{fechaNacimiento},#{sexo},#{pais},#{folioActiviti},#{numeroSS},#{nacionalidad},#{status},#{rfcUsuario},#{fecha},#{claveEntidadFederativa},#{claveMunicipio},#{folioSolicitud},#{numeroTrabajador},#{estadoCivil},#{foto})")
    @Options(useGeneratedKeys = true, keyProperty = "id", flushCache=true)
    void createTrbajador(TDTrabajador trabajador)

}