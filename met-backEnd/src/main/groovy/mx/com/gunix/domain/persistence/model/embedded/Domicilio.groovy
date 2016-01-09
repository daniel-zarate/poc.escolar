package mx.com.gunix.domain.persistence.model.embedded

import groovy.transform.Canonical

/**
 * Created by Daniel on 05/01/2016.
 */
@Canonical
class Domicilio implements Serializable{

    String calleNumero
    String codigoPostal
    Catalogo colonia
    Catalogo entidad
    Catalogo municipio
    String localidad
    String telfonoFijo
    String observaciones
}
