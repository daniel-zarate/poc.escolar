package mx.com.gunix.domain.met.administracionexpediente.embedded

import groovy.transform.Canonical

/**
 * Created by Daniel on 04/01/2016.
 */
@Canonical
class BeneficiariosDTO implements Serializable{

    List<BeneficiarioDTO> beneficiarios
}
