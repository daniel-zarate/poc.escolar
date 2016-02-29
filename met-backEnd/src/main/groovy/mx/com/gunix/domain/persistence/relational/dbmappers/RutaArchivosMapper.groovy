package mx.com.gunix.domain.persistence.relational.dbmappers

import mx.com.gunix.domain.persistence.relational.model.TCRutaArchivos
import org.apache.ibatis.annotations.Insert
import org.apache.ibatis.annotations.Options
import org.apache.ibatis.annotations.Param
import org.apache.ibatis.annotations.ResultMap
import org.apache.ibatis.annotations.Select


interface RutaArchivosMapper {

    @Select("SELECT * FROM met.TC_RUTA_ARCHIVOS WHERE ID = #{id}")
    @ResultMap("rutaArchivosResultMap")
    TCRutaArchivos getArchivo(@Param("id") Long id)

    @Insert("INSERT INTO  met.TC_RUTA_ARCHIVOS (RUTA_ABSOLUTA,NOMBRE,FECHA,EXTENSION) VALUES(#{rutaAbsoluta},#{nombre},#{fecha},#{extension})")
    @Options(useGeneratedKeys = true, keyProperty = "id", flushCache=true)
    void createArchivo(TCRutaArchivos archivo)

}