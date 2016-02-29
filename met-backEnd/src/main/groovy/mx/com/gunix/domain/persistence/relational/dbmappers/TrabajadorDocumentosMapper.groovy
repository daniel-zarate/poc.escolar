package mx.com.gunix.domain.persistence.relational.dbmappers

import mx.com.gunix.domain.persistence.relational.model.TRTrabajadorDocumentos
import org.apache.ibatis.annotations.*

interface TrabajadorDocumentosMapper {

    @Select("SELECT * FROM met.TR_TRABAJADOR_DOCUMENTOS WHERE ID_TRABAJADOR = #{idTrabajador} AND ID_DOCUMENTO = #{idDocumento}")
    @ResultMap("trabajadorDocumentosResultMap")
    TRTrabajadorDocumentos getTrabajadorDocumentos(@Param("idTrabajador") Long idTrabajador,@Param("idDocumento") Long idDocumento)

    @Insert("INSERT INTO  met.TR_TRABAJADOR_DOCUMENTOS (ID_TRABAJADOR,ID_DOCUMENTO) VALUES(#{idTrabajador},#{idDocumento})")
    void createArchivo(TRTrabajadorDocumentos archivo)

}