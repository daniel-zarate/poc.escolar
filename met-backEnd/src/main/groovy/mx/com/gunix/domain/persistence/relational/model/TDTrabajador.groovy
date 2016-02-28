package mx.com.gunix.domain.persistence.relational.model

import groovy.transform.Canonical

@Canonical
class TDTrabajador implements Serializable{

    Long id
    String ramo
    String unidadResponsable
    String nombre
    String apellidoPaterno
    String apellidoMaterno
    String curp
    String rfc
    String numTrabajador
    Date fechaNacimiento
    Integer sexo
    Integer pais
    String folioActiviti
    Long numeroSS
    Integer nacionalidad
    String status
    String rfcUsuario
    Date fecha
    Integer claveEntidadFederativa
    Integer claveMunicipio
    Long folioSolicitud
    String numeroTrabajador
    Integer estadoCivil
    String foto

}
