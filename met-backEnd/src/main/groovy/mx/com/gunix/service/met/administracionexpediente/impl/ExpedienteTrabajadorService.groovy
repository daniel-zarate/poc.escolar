package mx.com.gunix.service.met.administracionexpediente.impl

import mx.com.gunix.domain.persistence.mongo.model.ExpedienteDB
import mx.com.gunix.domain.persistence.mongo.model.embedded.Beneficiario
import mx.com.gunix.domain.persistence.relational.dbmappers.DatosGeneralesMapper
import mx.com.gunix.domain.persistence.relational.dbmappers.DependientesMapper
import mx.com.gunix.domain.persistence.relational.dbmappers.EsquemaPagoMapper
import mx.com.gunix.domain.persistence.relational.dbmappers.FormacionAcademicaMapper
import mx.com.gunix.domain.persistence.relational.dbmappers.TrabajadorMapper
import mx.com.gunix.domain.persistence.relational.model.TDDatosGenerales
import mx.com.gunix.domain.persistence.relational.model.TDDependientes
import mx.com.gunix.domain.persistence.relational.model.TDEsquemaPago
import mx.com.gunix.domain.persistence.relational.model.TDFormacionAcademica
import mx.com.gunix.domain.persistence.relational.model.TDTrabajador
import mx.com.gunix.service.met.administracionexpediente.IExpedienteTrabajadorService
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

import javax.annotation.Resource

@Service
@Transactional
class ExpedienteTrabajadorService implements IExpedienteTrabajadorService {

    @Resource
    TrabajadorMapper trabajadorMapper

    @Resource
    DatosGeneralesMapper datosGeneralesMapper

    @Resource
    EsquemaPagoMapper esquemaPagoMapper

    @Resource
    FormacionAcademicaMapper formacionAcademicaMapper

    @Resource
    DependientesMapper dependientesMapper

    void guardarExpedienteTrabajador(ExpedienteDB expedienteDB) {

        if (!expedienteDB)
            throw new IllegalArgumentException('Expediente debe ser obligatorio')

        if (!expedienteDB.datosPersonales)
            throw new IllegalArgumentException('Datos personales debe ser obligatorio')

        def fechaSistema = new Date()

        TDTrabajador trabajador = new TDTrabajador()

        trabajador.with {
            //ramo
            //unidadResponsable
            nombre = expedienteDB.datosPersonales?.nombres
            apellidoPaterno = expedienteDB.datosPersonales?.primerApellido
            apellidoMaterno = expedienteDB.datosPersonales?.segundoApellido
            curp = expedienteDB.datosPersonales?.curp
            rfc = expedienteDB.datosPersonales?.rfc
            //numTrabajador
            fechaNacimiento = expedienteDB.datosPersonales?.fechaNacimiento
            sexo = expedienteDB.datosPersonales?.genero?.id
            pais = expedienteDB.datosPersonales?.paisNacimiento?.id
            //folioActiviti
            numeroSS = expedienteDB.datosPersonales?.numeroSeguridadSocial?.toLong()
            nacionalidad = expedienteDB.datosPersonales?.nacionalidad?.id
            status = expedienteDB.estatusExpediente
            //rfcUsuario
            fecha = new Date()
            claveEntidadFederativa = expedienteDB.datosPersonales?.entidadFederativa?.id
            claveMunicipio = expedienteDB.datosPersonales?.municipiodelegacion?.id
            folioSolicitud = expedienteDB.folioExpediente.toLong()
            //numeroTrabajador
            estadoCivil = expedienteDB.datosPersonales?.estadoCivil?.id
            //foto
        }

        // guarda el trabajador en la bd
        trabajadorMapper.createTrbajador(trabajador)

        if (!expedienteDB.datosGenerales)
            throw new IllegalArgumentException('Datos generales debe ser obligatorio')

        def datosGenerales = new TDDatosGenerales()

        datosGenerales.with {
            idTrabajador = trabajador.id
            telefonoCelular = expedienteDB?.datosGenerales?.telefonoCelular
            correoElectronico = expedienteDB?.datosGenerales?.correoElectronicoPersonal
            calle = expedienteDB?.datosGenerales?.domicilio?.calleNumero
            codigoPostal = expedienteDB?.datosGenerales?.domicilio?.codigoPostal
            colonia = expedienteDB?.datosGenerales?.domicilio?.colonia?.id
            entidadFederativa = expedienteDB?.datosGenerales?.domicilio?.entidad?.id
            municipio = expedienteDB?.datosGenerales?.domicilio?.municipio?.id
            localidad = expedienteDB?.datosGenerales?.domicilio?.localidad
            observaciones = expedienteDB?.datosGenerales?.domicilio?.observaciones
            telefonoFijo = expedienteDB?.datosGenerales?.domicilio?.telfonoFijo
            //idDocumento
            //rfcUsuario
            fecha = fechaSistema
        }

        datosGeneralesMapper.createDatosGenerales(datosGenerales)

        if (expedienteDB.esquemaPago) {
            def esquemaDePago = new TDEsquemaPago()

            esquemaDePago.with {
                idTrabajador = trabajador.id
                bancarizado = expedienteDB?.esquemaPago?.bancarizado ? 1 : 0
                claveBanco = expedienteDB?.esquemaPago?.cveBanco?.toLong()
                clabe = expedienteDB?.esquemaPago?.clabe
                //idDocumento
                //rfcUsuario
                fecha = fechaSistema
            }

            esquemaPagoMapper.createEsquemaPago(esquemaDePago)
        }


        if (expedienteDB.formacionAcademica) {

            def formacionAcademica = null

            if (expedienteDB.formacionAcademica.estudios) {
                def estudioAcademico
                expedienteDB.formacionAcademica.estudios.each {
                    estudioAcademico = it
                    formacionAcademica = new TDFormacionAcademica()

                    formacionAcademica.with {
                        idTrabajador = trabajador.id
                        nivel = estudioAcademico?.nivelMaximoEstudios?.id?.toLong()
                        institucionEducativa = estudioAcademico.nombreInstitucion
                        nombreCarrera = estudioAcademico?.carrera?.valor
                        documento = estudioAcademico?.documento?.id?.toLong()
                        //rfcUsuario
                        //fecha =
                        numeroCedula = estudioAcademico.cedula
                        anios = estudioAcademico?.anios?.valor?.toLong()
                        idCarrera = estudioAcademico?.carrera?.id
                    }
                    formacionAcademicaMapper.createFormacionAcademica(formacionAcademica)
                }
            }
        }


        if (expedienteDB.beneficiarios) {

            def dependiente = null
            if (expedienteDB.beneficiarios.beneficiarios){
                Beneficiario beneficiarioMongo
                expedienteDB.beneficiarios.beneficiarios.each {
                    beneficiarioMongo = it
                    dependiente = new TDDependientes()

                    dependiente.with {

                        idTrabajador = trabajador.id
                        curpDependiente = beneficiarioMongo?.curp
                        nombre = beneficiarioMongo?.nombres
                        apellidoPaterno = beneficiarioMongo?.primerApellido
                        apellidoMaterno = beneficiarioMongo?.segundoApellido
                        fechaNacimiento = beneficiarioMongo?.fechaNacimiento
                        cveSexo = beneficiarioMongo?.genero?.id
                        cveParentesco = beneficiarioMongo?.parentesco?.id
                        cveNivel = beneficiarioMongo?.nivelAcademico?.id
                        cveGrado = beneficiarioMongo?.grado?.id
                        //rfcUsuario = beneficiarioMongo.
                        fecha = fechaSistema
                    }

                    dependientesMapper.createDependiente(dependiente)
                }
            }
        }

    }
}
