package mx.com.gunix.domain.met.administracionexpediente.embedded

import groovy.transform.Canonical

/**
 * Created by Daniel on 05/01/2016.
 */
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
