package mx.com.gunix.domain.persistence.model.embedded

import groovy.transform.Canonical

/**
 * Created by Daniel on 04/01/2016.
 */
@Canonical
class EsquemaPago implements Serializable{

    boolean bancarizado
    String cveBanco
    String clabe
}
