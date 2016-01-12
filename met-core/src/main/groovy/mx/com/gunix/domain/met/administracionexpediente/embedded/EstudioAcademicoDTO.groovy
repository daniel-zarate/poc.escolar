package mx.com.gunix.domain.met.administracionexpediente.embedded

import groovy.transform.Canonical


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
