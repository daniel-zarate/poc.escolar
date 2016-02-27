package mx.com.gunix.domain.persistence.mongo.model.embedded

import groovy.transform.Canonical

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
