package mx.com.gunix.service.met.administracionexpediente.impl

import mx.com.gunix.domain.persistence.mongo.model.ExpedienteDB
import mx.com.gunix.domain.persistence.relational.dbmappers.TrabajadorMapper
import mx.com.gunix.domain.persistence.relational.model.TDTrabajador
import mx.com.gunix.service.met.administracionexpediente.IExpedienteTrabajadorService
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

import javax.annotation.Resource

@Service
@Transactional
class ExpedienteTrabajadorService implements IExpedienteTrabajadorService{

    @Resource
    TrabajadorMapper trabajadorMapper

    void guardarExpedienteTrabajador(ExpedienteDB expedienteDB){

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


    }
}
