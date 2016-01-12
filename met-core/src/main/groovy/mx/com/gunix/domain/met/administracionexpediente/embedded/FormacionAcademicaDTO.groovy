package mx.com.gunix.domain.met.administracionexpediente.embedded

import groovy.transform.Canonical


@Canonical
class FormacionAcademicaDTO implements Serializable{

    List<EstudioAcademicoDTO> estudios
}
