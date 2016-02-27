package mx.com.gunix.domain.persistence.relational.model

import groovy.transform.Canonical

import java.sql.Timestamp

/**
 * Created by Daniel on 09/02/2016.
 */
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



}
