package mx.com.gunix.domain.met.administracionexpediente.embedded

import groovy.transform.Canonical


@Canonical
class TrayectoriaLaboralDTO implements Serializable{

    RegimenPensionarioDTO regimenPensionario
    List<TiempoServicioDTO> aniosServicio

}
