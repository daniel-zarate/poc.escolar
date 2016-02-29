package mx.com.gunix.domain.persistence.relational.dbmappers

import mx.com.gunix.domain.persistence.relational.model.TDDatosGenerales
import org.apache.ibatis.annotations.Insert
import org.apache.ibatis.annotations.Options
import org.apache.ibatis.annotations.Param
import org.apache.ibatis.annotations.ResultMap
import org.apache.ibatis.annotations.Select


interface DatosGeneralesMapper {

    @Select("SELECT * FROM met.TD_DATOS_GENERALES WHERE ID_DATOS_GENERALES = #{id}")
    @ResultMap("datosGeneralesResultMap")
    TDDatosGenerales getDatosGenerales(@Param("id") Long id)

    @Insert("INSERT INTO  met.TD_DATOS_GENERALES (ID_TRABAJADOR,TELEFONO_CELULAR,CORREO_ELECTRONICO,CALLE,CODIGO_POSTAL,CVE_COLONIA,CVE_ENTIDAD_FEDERATIVA,CVE_MUNICIPIO,LOCALIDAD,OBSERVACIONES,TELEFONO_FIJO,ID_DOCUMENTO,RFC_USUARIO,FECHA) VALUES(#{idTrabajador},#{telefonoCelular},#{correoElectronico},#{calle},#{codigoPostal},#{colonia},#{entidadFederativa},#{municipio},#{localidad},#{observaciones},#{telefonoFijo},#{idDocumento},#{rfcUsuario},#{fecha})")
    @Options(useGeneratedKeys = true, keyProperty = "id", flushCache=true)
    void createDatosGenerales(TDDatosGenerales trabajador)
}
