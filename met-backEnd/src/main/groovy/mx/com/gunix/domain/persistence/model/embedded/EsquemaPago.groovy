package mx.com.gunix.domain.persistence.model.embedded

import groovy.transform.Canonical

@Canonical
class EsquemaPago implements Serializable{

    boolean bancarizado
    String cveBanco
    String clabe
}
