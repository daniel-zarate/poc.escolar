package mx.com.gunix.domain.met.administracionexpediente.embedded

import groovy.transform.Canonical

/**
 * Created by Daniel on 05/01/2016.
 */
@Canonical
class DomicilioDTO implements Serializable{

    String calleNumero
    String codigoPostal
    CatalogoDTO colonia
    CatalogoDTO entidad
    CatalogoDTO municipio
    String localidad
    String telfonoFijo
    String observaciones
}
