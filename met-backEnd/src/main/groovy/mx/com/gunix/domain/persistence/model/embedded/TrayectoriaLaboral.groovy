package mx.com.gunix.domain.persistence.model.embedded

import groovy.transform.Canonical

/**
 * Created by Daniel on 04/01/2016.
 */
@Canonical
class TrayectoriaLaboral implements Serializable{

    RegimenPensionario regimenPensionario
    List<TiempoServicio> aniosServicio

}
