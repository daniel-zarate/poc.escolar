package mx.com.gunix.domain.persistence.relational.dbmappers

import mx.com.gunix.domain.persistence.relational.model.TRTrayectoriaDocumentos
import org.apache.ibatis.annotations.Insert
import org.apache.ibatis.annotations.Param
import org.apache.ibatis.annotations.ResultMap
import org.apache.ibatis.annotations.Select

interface TrayectoriaDocumentosMapper {

    @Select("SELECT * FROM met.TR_TRAYECTORIA_DOCUMENTOS WHERE ID_TRAYECTORIA_DETALLE = #{idTrayectoriaDetalle} AND ID_DOCUMENTO = #{idDocumento}")
    @ResultMap("trayectoriaDocumentosResultMap")
    TRTrayectoriaDocumentos getTrayectoriaDocumento(@Param("idTrayectoriaDetalle") Long idTrayectoriaDetalle, @Param("idDocumento") Long idDocumento)

    @Insert("INSERT INTO  met.TR_TRAYECTORIA_DOCUMENTOS (ID_TRAYECTORIA_DETALLE,ID_DOCUMENTO) VALUES(#{idTrayectoriaDetalle},#{idDocumento})")
    //@Options(useGeneratedKeys = true, keyProperty = "id", flushCache=true)
    void createTrayectoriaDocumento(TRTrayectoriaDocumentos trayectoriaDocumentos)

}