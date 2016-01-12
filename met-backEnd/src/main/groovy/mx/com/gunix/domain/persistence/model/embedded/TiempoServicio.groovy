package mx.com.gunix.domain.persistence.model.embedded

import groovy.transform.Canonical


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
