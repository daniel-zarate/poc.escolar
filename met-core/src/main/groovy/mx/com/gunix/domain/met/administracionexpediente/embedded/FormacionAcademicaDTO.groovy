package mx.com.gunix.domain.met.administracionexpediente.embedded

import groovy.transform.Canonical

/**
 * Created by Daniel on 04/01/2016.
 */
@Canonical
class FormacionAcademicaDTO implements Serializable{

    List<EstudioAcademicoDTO> estudios
}
