package mx.com.gunix.domain.persistence.relational.model

import groovy.transform.Canonical

/**
 * Created by Daniel on 01/03/2016.
 */
@Canonical
class TDEsquemaPago {

    Long id
    Long idTrabajador
    Integer bancarizado
    Long claveBanco
    String clabe
    Long idDocumento
    String rfcUsuario
    Date fecha
}
