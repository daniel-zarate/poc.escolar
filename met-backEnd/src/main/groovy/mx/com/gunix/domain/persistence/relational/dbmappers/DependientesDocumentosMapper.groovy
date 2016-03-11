package mx.com.gunix.domain.persistence.relational.dbmappers

import mx.com.gunix.domain.persistence.relational.model.TRDependientesDocumentos
import org.apache.ibatis.annotations.Insert
import org.apache.ibatis.annotations.Param
import org.apache.ibatis.annotations.ResultMap
import org.apache.ibatis.annotations.Select

interface DependientesDocumentosMapper {

    @Select("SELECT * FROM met.TR_DEPENDIENTE_DOCUMENTOS WHERE ID_DEPENDIENTE = #{idDependiente} AND ID_DOCUMENTO = #{idDocumento}")
    @ResultMap("dependientesDocumentosResultMap")
    TRDependientesDocumentos getDependienteDocumento(@Param("idDependiente") Long idDependiente, @Param("idDocumento") Long idDocumento)

    @Insert("INSERT INTO  met.TR_DEPENDIENTE_DOCUMENTOS (ID_DEPENDIENTE,ID_DOCUMENTO) VALUES(#{idDependiente},#{idDocumento})")
    //@Options(useGeneratedKeys = true, keyProperty = "id", flushCache=true)
    void createDependienteDocumento(TRDependientesDocumentos dependientesDocumentos)

}