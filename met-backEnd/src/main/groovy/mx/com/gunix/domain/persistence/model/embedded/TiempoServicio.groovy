package mx.com.gunix.domain.persistence.model.embedded

import groovy.transform.Canonical

/**
 * Created by Daniel on 05/01/2016.
 */
@Canonical
class TiempoServicio implements Serializable{

    Integer posicionEnTiempo

    String dependencia

    Catalogo tipoAntiguedad

    Catalogo tipoRama

    Catalogo tipoPeriodo

    Date desde

    Date hasta

    
}
