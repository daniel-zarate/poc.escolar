package mx.com.gunix.domain.persistence.mongo.model

import groovy.transform.Canonical
import mx.com.gunix.domain.persistence.mongo.model.embedded.Catalogo
import mx.com.gunix.domain.persistence.mongo.model.embedded.DatosGenerales
import mx.com.gunix.domain.persistence.mongo.model.embedded.DatosPersonales
import mx.com.gunix.domain.persistence.mongo.model.embedded.EsquemaPago
import mx.com.gunix.domain.persistence.mongo.model.embedded.FormacionAcademica
import mx.com.gunix.domain.persistence.mongo.model.embedded.TrayectoriaLaboral
import mx.com.gunix.domain.persistence.mongo.model.embedded.Beneficiarios
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.Field


@Canonical
@Document(collection = 'expediente')
class ExpedienteDB implements Serializable{

    @Id
    String id

    @Field('estatus_expediente')
    String estatusExpediente

    @Field('folio_expediente')
    String folioExpediente

    @Field('datos_personales')
    DatosPersonales datosPersonales

    @Field('datos_generales')
    DatosGenerales datosGenerales

    @Field('esquema_pago')
    EsquemaPago esquemaPago

//    @Field('trayectoria_laboral')
//    TrayectoriaLaboral trayectoriaLaboral

    @Field('formacion_academica')
    FormacionAcademica formacionAcademica

    @Field('beneficiarios')
    Beneficiarios beneficiarios

}
