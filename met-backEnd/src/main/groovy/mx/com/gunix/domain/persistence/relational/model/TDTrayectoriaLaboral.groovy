package mx.com.gunix.domain.persistence.relational.model

import groovy.transform.Canonical

@Canonical
class TDTrayectoriaLaboral {

    Long idTrayectoriaLaboral
    Long idTrabajador
    Long regimen
    String rfcUsuario
    Date fecha
    BigDecimal ahorroSolidario
}
