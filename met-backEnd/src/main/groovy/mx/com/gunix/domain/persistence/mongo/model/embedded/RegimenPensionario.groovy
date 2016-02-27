package mx.com.gunix.domain.persistence.mongo.model.embedded

import groovy.transform.Canonical


@Canonical
class RegimenPensionario implements Serializable{

    boolean cuentasIndividuales
    boolean decimoTransitorio
    Catalogo ahorroSolidario

}
