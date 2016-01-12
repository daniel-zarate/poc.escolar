package mx.com.gunix.domain.persistence.model.embedded

import groovy.transform.Canonical

@Canonical
class FormacionAcademica implements Serializable{

    List<EstudioAcademico> estudios
}
