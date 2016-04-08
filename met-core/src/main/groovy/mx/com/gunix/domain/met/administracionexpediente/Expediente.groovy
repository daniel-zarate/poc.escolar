package mx.com.gunix.domain.met.administracionexpediente

import groovy.transform.Canonical
import javax.validation.constraints.NotNull
import javax.validation.constraints.Size
import javax.validation.constraints.Pattern

@Canonical
class Expediente implements Serializable {

	public Expediente (){
		formacionAcademicaList = []
		dependientesFamiliaresList = []
	}

    String id
	String estatusExpediente
	String estatusTrabajador
	String folioTrabajador 
	String folioExpediente

    String fragments
    String idAplicacion
    String isCompleteTask
    String documentacion
    String operation
	String idOperacion
    String requeridosDatosGenerales

    /*Datos Personales*/
	@Pattern(regexp="[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]{1,50}")
	String apellidoPaterno
	
	@Pattern(regexp="[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]{1,50}")
    String apellidoMaterno
	
	//@NotNull
	//@Size(min=1)
	@Pattern(regexp="[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]{1,50}")
    String nombre
	
	@Pattern(regexp="""[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}\$""")
    String curp
	
	@Pattern (regexp = "[a-zA-Z&]{4}[0-9]{6}[a-zA-Z0-9]{3}\$")
    String rfc
	
	@Pattern (regexp = "[0-9]{15}\$")
	String numSeguroSocial
	
	@NotNull
	@Size(min=1)
    String fechaNacimiento
	
    String edadTrabajador
	
	@NotNull
	@Size(min=1)
    String cveSexo

	@NotNull
	@Size(min=1)
    String cveNacionalidad
	
	@NotNull
	@Size(min=1)
    String cveEstadoCivil
	
	@NotNull
	@Size(min=1)
    String cvePais
	
	@NotNull
	@Size(min=1)
    String cveEntidadFederativa
	
	@NotNull
	@Size(min=1)
    String cveMunicipio

    /*Datos Generales*/
	@Pattern (regexp = /[0-9]{10}/)
    String celular
	
	@Pattern (regexp = /[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})/)
    String email
	
	@Pattern (regexp = /^[0-9a-zA-ZáéíóúÁÉÍÓÚüÜñÑ \.;,\\/&#"'-+]+$/)
    String calle
	
	@Pattern (regexp = /[0-9]{5}/)
    String codPosta
	
	@NotNull
	@Size(min=1)
    String colonia
	
	@NotNull
	@Size(min=1)
    String entidad
	
	@NotNull
	@Size(min=1)
    String municipio
	
	@Pattern(regexp = /^[0-9a-zA-ZáéíóúÁÉÍÓÚüÜñÑ \.;,\\/&#"'-+]+$/ )
    String localidad
	
	@Pattern (regexp = /[0-9]{10}/)
    String telefono
	
	@Pattern(regexp = /[0-9a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]{1,500}/)
    String observaciones

    /*Esquema de pago*/
	Integer bancarizado
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
    String cedulaProfesional
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
	
	List formacionAcademicaList
	List dependientesFamiliaresList
	
	
	
}
