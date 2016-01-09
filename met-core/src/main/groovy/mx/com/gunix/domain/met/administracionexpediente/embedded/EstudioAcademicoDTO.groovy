package mx.com.gunix.domain.met.administracionexpediente.embedded

import groovy.transform.Canonical

/**
 * Created by Daniel on 05/01/2016.
 */
@Canonical
class EstudioAcademicoDTO implements Serializable{

    CatalogoDTO nivelMaximoEstudios
    CatalogoDTO anios
    CatalogoDTO institucion
    String nombreInstitucion
    CatalogoDTO carrera
    CatalogoDTO documento
    String cedula

}
