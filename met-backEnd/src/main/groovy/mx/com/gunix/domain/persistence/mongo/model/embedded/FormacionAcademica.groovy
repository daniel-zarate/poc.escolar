package mx.com.gunix.domain.persistence.mongo.model.embedded

import groovy.transform.Canonical

@Canonical
class FormacionAcademica implements Serializable{

    List<EstudioAcademico> estudios
}
