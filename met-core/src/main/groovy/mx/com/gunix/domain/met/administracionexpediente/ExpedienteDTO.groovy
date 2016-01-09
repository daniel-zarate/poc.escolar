package mx.com.gunix.domain.met.administracionexpediente

import groovy.transform.Canonical
import mx.com.gunix.domain.met.administracionexpediente.embedded.BeneficiariosDTO
import mx.com.gunix.domain.met.administracionexpediente.embedded.DatosGeneralesDTO
import mx.com.gunix.domain.met.administracionexpediente.embedded.DatosPersonalesDTO
import mx.com.gunix.domain.met.administracionexpediente.embedded.EsquemaPagoDTO
import mx.com.gunix.domain.met.administracionexpediente.embedded.FormacionAcademicaDTO
import mx.com.gunix.domain.met.administracionexpediente.embedded.TrayectoriaLaboralDTO

/**
 * Created by Daniel on 07/01/2016.
 */
@Canonical
class ExpedienteDTO implements Serializable{


    String id

    DatosPersonalesDTO datosPersonales

    DatosGeneralesDTO datosGenerales

    EsquemaPagoDTO esquemaPago

    TrayectoriaLaboralDTO trayectoriaLaboral

    FormacionAcademicaDTO formacionAcademica

    BeneficiariosDTO beneficiarios
}
