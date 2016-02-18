package mx.com.gunix.domain.persistence.relational.model

import groovy.transform.Canonical

/**
 * Created by Daniel on 09/02/2016.
 */
@Canonical
class TDTrabajador implements Serializable{

    Long id
    String nombre
    String apellidoPaterno
    String apellidoMaterno
}
