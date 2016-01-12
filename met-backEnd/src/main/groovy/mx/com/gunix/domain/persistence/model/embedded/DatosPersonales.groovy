package mx.com.gunix.domain.persistence.model.embedded

import groovy.transform.Canonical


@Canonical
class DatosPersonales implements Serializable{
    String primerApellido
    String segundoApellido
    String nombres
    String numeroSeguridadSocial
    String curp
    String rfc
    Date fechaNacimiento
    Integer edad
    Catalogo genero
    Catalogo estadoCivil
    Catalogo nacionalidad
    Catalogo paisNacimiento
    Catalogo entidadFederativa
    Catalogo municipiodelegacion

}
