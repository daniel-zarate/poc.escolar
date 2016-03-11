package mx.com.gunix.domain.persistence.relational.model

import groovy.transform.Canonical

@Canonical
class TDTrayectoriaDetalle {

    Long id
    Long idTrayectoriaLaboral
    String dependencia
    Long idTipoAntiguedad
    Long idRama
    Long idPeriodo
    Date desde
    Date hasta
    String rfcUsuario
    Date fecha
}
