package mx.com.gunix.domain.persistence.relational.dbmappers

import mx.com.gunix.domain.persistence.relational.model.TDEsquemaPago
import org.apache.ibatis.annotations.*

interface EsquemaPagoMapper {

    @Select("SELECT * FROM met.TD_ESQUEMA_PAGO WHERE ID_ESQUEMA_PAGO = #{id}")
    @ResultMap("esquemaPagoResultMap")
    TDEsquemaPago getEsquemaPago(@Param("id") Long id)

    @Insert("INSERT INTO  met.TD_ESQUEMA_PAGO (ID_TRABAJADOR,BANCARIZADO,CVE_BANCO,CLABE,ID_DOCUMENTO,RFC_USUARIO,FECHA) VALUES(#{idTrabajador},#{bancarizado},#{claveBanco},#{clabe},#{idDocumento},#{rfcUsuario},#{fecha})")
    @Options(useGeneratedKeys = true, keyProperty = "id", flushCache=true)
    void createEsquemaPago(TDEsquemaPago archivo)

}