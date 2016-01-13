package mx.com.gunix.domain.met.administracionexpediente

import groovy.transform.Canonical

@Canonical
class Expediente implements Serializable {


    String id

    String fragments
    String idAplicacion
    String isCompleteTask
    String documentacion
    String operation
    String requeridosDatosGenerales

    /*Datos Personales*/
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

    /*Datos Generales*/
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

    /*Esquema de pago*/
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
	String tipoAntiguedad
	String tipoRama
	String tipoPeriodo
	
	
}
