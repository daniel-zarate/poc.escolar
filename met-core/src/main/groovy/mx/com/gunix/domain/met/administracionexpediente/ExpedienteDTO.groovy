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

    /**
     * String fragments
     String idAplicacion
     String isCompleteTask
     String documentacion
     String operation
     String apellidoPaterno
     String apellidoMaterno
     String nombre
     String curp
     String rfc
     String fechaNacimiento
     String edadTrabajador
     String cveSexo
     String cveEstadoCivil
     String cveNacionalidad
     String cvePais
     String cveEntidadFederativa
     String cveMunicipio
     String requeridosDatosGenerales
     String celular
     String email
     String calle
     String codPosta
     String colonia
     String entidad
     String municipio
     String localidad
     String telefono
     String observaciones
     String cveBanco
     String clabe
     String dependencia
     String fechaInicio
     String fechaFinal
     String anioGF
     String mesGF
     String diaGF
     String anioSEP
     String mesSEP
     String diaSEP
     String anioTotalGfSep
     String mesTotalGfSep
     String diaTotalGfSep
     String anioUpn
     String mesUpn
     String diaUpn
     String anioNormal
     String mesNormal
     String diaNormal
     String anioTec
     String mesTec
     String diaTec
     String anioAct
     String mesAct
     String diaAct
     String anioRama
     String mesRama
     String diaRama
     String anosEstudios
     String institucion
     String nombreInstitucion
     String labelCarrera
     String cedulaProfecional
     String primerApellidoDependientesFamiliares
     String segundoApellidoDependientesFamiliares
     String nombreDependientesFamiliares
     String curpDependientesFamiliares
     String fechaNacimientoDependientesFamiliares
     String edadDependientesFamiliares
     String sexoDep
     String parentescoDependientesFamiliares
     String nivelDependientesFamiliares
     String gradoDependientesFamiliares
     */
}
