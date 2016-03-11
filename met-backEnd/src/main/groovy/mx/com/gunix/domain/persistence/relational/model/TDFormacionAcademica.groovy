package mx.com.gunix.domain.persistence.relational.model

import groovy.transform.Canonical


@Canonical
class TDFormacionAcademica {

    Long id
    Long idTrabajador
    Long nivel
    String institucionEducativa
    String nombreCarrera
    Long documento
    String rfcUsuario
    Date fecha
    String numeroCedula
    Integer anios
    Long idCarrera
}
