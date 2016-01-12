package mx.com.gunix.domain.met.administracionexpediente.embedded

import groovy.transform.Canonical


@Canonical
class TiempoServicioDTO implements Serializable{

    Integer posicionEnTiempo

    String dependencia

    CatalogoDTO tipoAntiguedad

    CatalogoDTO tipoRama

    CatalogoDTO tipoPeriodo

    Date desde

    Date hasta

    
}
