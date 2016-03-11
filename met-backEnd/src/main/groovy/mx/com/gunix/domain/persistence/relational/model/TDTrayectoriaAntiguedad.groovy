package mx.com.gunix.domain.persistence.relational.model

import groovy.transform.Canonical

@Canonical
class TDTrayectoriaAntiguedad {

    Long id
    Integer idTipoAntiguedad
    Long idTrayectoriaLaboral
    Integer anios
    Integer meses
    Integer dias
}
