package mx.com.gunix.domain.persistence.model.embedded

import groovy.transform.Canonical

@Canonical
class Catalogo implements Serializable{
    Integer id
    String valor
}
