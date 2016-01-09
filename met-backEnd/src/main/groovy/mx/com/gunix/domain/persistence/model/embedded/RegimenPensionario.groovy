package mx.com.gunix.domain.persistence.model.embedded

import groovy.transform.Canonical

/**
 * Created by Daniel on 05/01/2016.
 */
@Canonical
class RegimenPensionario implements Serializable{

    boolean cuentasIndividuales
    boolean decimoTransitorio
    Catalogo ahorroSolidario

}
