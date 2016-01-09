package mx.com.gunix.domain.persistence.model.embedded

import groovy.transform.Canonical

/**
 * Created by Daniel on 04/01/2016.
 */
@Canonical
class FormacionAcademica implements Serializable{

    List<EstudioAcademico> estudios
}
