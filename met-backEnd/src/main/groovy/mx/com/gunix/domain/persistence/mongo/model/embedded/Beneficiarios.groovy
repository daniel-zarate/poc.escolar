package mx.com.gunix.domain.persistence.mongo.model.embedded

import groovy.transform.Canonical

@Canonical
class Beneficiarios implements Serializable{

    List<Beneficiario> beneficiarios
}
