package mx.com.gunix.domain.persistence.model.embedded

import groovy.transform.Canonical

/**
 * Created by Daniel on 04/01/2016.
 */
@Canonical
class Beneficiarios implements Serializable{

    List<Beneficiario> beneficiarios
}
