package mx.com.gunix.domain.met.administracionexpediente.embedded

import groovy.transform.Canonical

/**
 * Created by Daniel on 04/01/2016.
 */
@Canonical
class DatosPersonalesDTO implements Serializable{
    String primerApellido
    String segundoApellido
    String nombres
    String numeroSeguridadSocial
    String curp
    String rfc
    Date fechaNacimiento
    Integer edad
    CatalogoDTO genero
    CatalogoDTO estadoCivil
    CatalogoDTO nacionalidad
    CatalogoDTO paisNacimiento

}
