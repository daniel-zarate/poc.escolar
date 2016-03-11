package mx.com.gunix.service.met.administracionexpediente.impl

import mx.com.gunix.domain.persistence.mongo.model.ExpedienteDB
import mx.com.gunix.domain.persistence.relational.dbmappers.DatosGeneralesMapper
import mx.com.gunix.domain.persistence.relational.dbmappers.EsquemaPagoMapper
import mx.com.gunix.domain.persistence.relational.dbmappers.TrabajadorMapper
import mx.com.gunix.domain.persistence.relational.model.TDDatosGenerales
import mx.com.gunix.domain.persistence.relational.model.TDEsquemaPago
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

    void guardarExpedienteTrabajador(ExpedienteDB expedienteDB) {

        if (!expedienteDB)
            throw new IllegalArgumentException('Expediente debe ser obligatorio')

        if (!expedienteDB.datosPersonales)
            throw new IllegalArgumentException('Datos personales debe ser obligatorio')

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
            //status
            //rfcUsuario
            fecha = new Date()
            claveEntidadFederativa = expedienteDB.datosPersonales?.entidadFederativa?.id
            claveMunicipio = expedienteDB.datosPersonales?.municipiodelegacion?.id
            //folioSolicitud
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
            //fecha
        }

        datosGeneralesMapper.createDatosGenerales(datosGenerales)

        if (!expedienteDB.esquemaPago)
            throw new IllegalArgumentException('Esquema de pago debe ser obligatorio')

        def esquemaDePago = new TDEsquemaPago()

        esquemaDePago.with {
            idTrabajador = trabajador.id
            bancarizado = expedienteDB?.esquemaPago?.bancarizado ? 1 : 0
            claveBanco = expedienteDB?.esquemaPago?.cveBanco?.toLong()
            clabe = expedienteDB?.esquemaPago?.clabe
            //idDocumento
            //rfcUsuario
            //fecha
        }

        esquemaPagoMapper.createEsquemaPago(esquemaDePago)

    }
}
