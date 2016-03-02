package mx.com.gunix.domain.persistence.relational.model

import groovy.transform.Canonical

/**
 * Created by Daniel on 01/03/2016.
 */
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
