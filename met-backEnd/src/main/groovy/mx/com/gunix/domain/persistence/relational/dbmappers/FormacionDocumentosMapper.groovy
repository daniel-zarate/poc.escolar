package mx.com.gunix.domain.persistence.relational.dbmappers

import mx.com.gunix.domain.persistence.relational.model.TRDependientesDocumentos
import mx.com.gunix.domain.persistence.relational.model.TRFormacionDocumentos
import org.apache.ibatis.annotations.Insert
import org.apache.ibatis.annotations.Param
import org.apache.ibatis.annotations.ResultMap
import org.apache.ibatis.annotations.Select

interface FormacionDocumentosMapper {

    @Select("SELECT * FROM met.TR_FORMACION_DOCUMENTOS WHERE ID_FORMACION_ACADEMICA = #{idFormacionAcademica} AND ID_DOCUMENTO = #{idDocumento}")
    @ResultMap("formacionDocumentosResultMap")
    TRFormacionDocumentos getFormacionDocumento(@Param("idFormacionAcademica") Long idFormacionAcademica, @Param("idDocumento") Long idDocumento)

    @Insert("INSERT INTO  met.TR_FORMACION_DOCUMENTOS (ID_FORMACION_ACADEMICA,ID_DOCUMENTO) VALUES(#{idFormacionAcademica},#{idDocumento})")
    //@Options(useGeneratedKeys = true, keyProperty = "id", flushCache=true)
    void createFormacionDocumento(TRFormacionDocumentos dependientesDocumentos)

}