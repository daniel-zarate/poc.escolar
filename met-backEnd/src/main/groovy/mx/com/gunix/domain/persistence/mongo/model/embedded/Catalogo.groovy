package mx.com.gunix.domain.persistence.mongo.model.embedded

import groovy.transform.Canonical

@Canonical
class Catalogo implements Serializable{
    Integer id
    String valor
}
