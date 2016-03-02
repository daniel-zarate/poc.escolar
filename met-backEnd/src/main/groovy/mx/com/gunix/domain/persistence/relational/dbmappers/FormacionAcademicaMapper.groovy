package mx.com.gunix.domain.persistence.relational.dbmappers

import mx.com.gunix.domain.persistence.relational.model.TDFormacionAcademica
import org.apache.ibatis.annotations.*

interface FormacionAcademicaMapper {

    @Select("SELECT * FROM met.TD_FORMACION_ACADEMICA WHERE ID_FORMACION_ACADEMICA = #{id}")
    @ResultMap("formacionAcademicaResultMap")
    TDFormacionAcademica getFormacionAcademica(@Param("id") Long id)

    @Insert("INSERT INTO  met.TD_FORMACION_ACADEMICA (ID_TRABAJADOR,CVE_NIVEL,INSTITUCION_EDUCATIVA,CARRERA,CVE_DOCUMENTO,RFC_USUARIO,FECHA,NUMERO_CEDULA,ANIOS,ID_CARRERA) VALUES(#{idTrabajador},#{nivel},#{institucionEducativa},#{nombreCarrera},#{documento},#{rfcUsuario},#{fecha},#{numeroCedula},#{anios},#{idCarrera})")
    @Options(useGeneratedKeys = true, keyProperty = "id", flushCache=true)
    void createFormacionAcademica(TDFormacionAcademica formacionAcademica)

}