package mx.com.gunix.domain.persistence.relational.model

import groovy.transform.Canonical

@Canonical
class TDDatosGenerales {

    Long id
    Long idTrabajador
    String telefonoCelular
    String correoElectronico
    String calle
    String codigoPostal
    Long colonia
    Long entidadFederativa
    Long municipio
    String localidad
    String observaciones
    String telefonoFijo
    Long idDocumento
    String rfcUsuario
    Date fecha
}
