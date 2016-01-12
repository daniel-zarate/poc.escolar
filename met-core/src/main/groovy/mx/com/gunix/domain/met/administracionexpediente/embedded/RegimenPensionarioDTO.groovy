package mx.com.gunix.domain.met.administracionexpediente.embedded

import groovy.transform.Canonical


@Canonical
class RegimenPensionarioDTO implements Serializable{

    boolean cuentasIndividuales
    boolean decimoTransitorio
    CatalogoDTO ahorroSolidario

}
