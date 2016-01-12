package mx.com.gunix.domain.persistence.model.embedded

import groovy.transform.Canonical

@Canonical
class TrayectoriaLaboral implements Serializable{

    RegimenPensionario regimenPensionario
    List<TiempoServicio> aniosServicio

}
