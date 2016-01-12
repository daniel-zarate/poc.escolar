package mx.com.gunix.domain.met.administracionexpediente.embedded

import groovy.transform.Canonical

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
