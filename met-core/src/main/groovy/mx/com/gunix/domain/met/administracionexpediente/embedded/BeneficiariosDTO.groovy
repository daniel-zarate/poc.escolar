package mx.com.gunix.domain.met.administracionexpediente.embedded

import groovy.transform.Canonical


@Canonical
class BeneficiariosDTO implements Serializable{

    List<BeneficiarioDTO> beneficiarios
}
