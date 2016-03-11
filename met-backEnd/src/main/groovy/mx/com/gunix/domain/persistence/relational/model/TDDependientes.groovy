package mx.com.gunix.domain.persistence.relational.model

import groovy.transform.Canonical

@Canonical
class TDDependientes {
    Long id
    Long idTrabajador
    String curpDependiente
    String nombre
    String apellidoPaterno
    String apellidoMaterno
    Date fechaNacimiento
    Long cveSexo
    Long cveParentesco
    Long cveNivel
    Long cveGrado
    String rfcUsuario
    Date fecha
}
