package mx.com.gunix.domain.met.administracionexpediente.embedded

import groovy.transform.Canonical

/**
 * Created by Daniel on 05/01/2016.
 */
@Canonical
class RegimenPensionarioDTO implements Serializable{

    boolean cuentasIndividuales
    boolean decimoTransitorio
    CatalogoDTO ahorroSolidario

}
