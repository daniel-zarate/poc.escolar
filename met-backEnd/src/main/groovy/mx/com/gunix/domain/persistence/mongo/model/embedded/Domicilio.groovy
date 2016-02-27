package mx.com.gunix.domain.persistence.mongo.model.embedded

import groovy.transform.Canonical

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
