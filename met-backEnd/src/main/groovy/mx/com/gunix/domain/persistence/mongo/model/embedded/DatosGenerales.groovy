package mx.com.gunix.domain.persistence.mongo.model.embedded

import groovy.transform.Canonical

@Canonical
class DatosGenerales implements Serializable{

    String telefonoCelular
    String correoElectronicoPersonal
    Domicilio domicilio


}
