package mx.com.gunix.domain.persistence.mongo.model.embedded

import groovy.transform.Canonical

@Canonical
class TrayectoriaLaboral implements Serializable{

    RegimenPensionario regimenPensionario
    List<TiempoServicio> aniosServicio

}
