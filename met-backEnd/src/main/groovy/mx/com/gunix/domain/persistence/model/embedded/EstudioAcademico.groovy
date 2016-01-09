package mx.com.gunix.domain.persistence.model.embedded

import groovy.transform.Canonical

/**
 * Created by Daniel on 05/01/2016.
 */
@Canonical
class EstudioAcademico implements Serializable{

    Catalogo nivelMaximoEstudios
    Catalogo anios
    Catalogo institucion
    String nombreInstitucion
    Catalogo carrera
    Catalogo documento
    String cedula

}
