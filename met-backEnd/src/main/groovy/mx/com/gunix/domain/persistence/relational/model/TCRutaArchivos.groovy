package mx.com.gunix.domain.persistence.relational.model

import groovy.transform.Canonical

@Canonical
class TCRutaArchivos {

    Long id
    String rutaAbsoluta
    String nombre
    Date fecha
    String extension
}
