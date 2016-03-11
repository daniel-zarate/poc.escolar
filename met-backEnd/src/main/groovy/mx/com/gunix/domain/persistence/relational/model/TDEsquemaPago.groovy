package mx.com.gunix.domain.persistence.relational.model

import groovy.transform.Canonical

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
