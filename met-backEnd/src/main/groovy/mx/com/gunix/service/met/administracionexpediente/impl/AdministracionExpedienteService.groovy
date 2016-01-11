package mx.com.gunix.service.met.administracionexpediente.impl

import mx.com.gunix.domain.met.administracionexpediente.Expediente
import mx.com.gunix.domain.persistence.model.ExpedienteDB
import mx.com.gunix.domain.persistence.model.embedded.Catalogo
import mx.com.gunix.domain.persistence.model.embedded.DatosGenerales
import mx.com.gunix.domain.persistence.model.embedded.DatosPersonales
import mx.com.gunix.domain.persistence.model.embedded.Domicilio
import mx.com.gunix.domain.persistence.model.embedded.EsquemaPago
import mx.com.gunix.domain.persistence.repository.ExpedienteRepository
import mx.com.gunix.service.met.administracionexpediente.IAdministracionExpedienteService
import org.springframework.stereotype.Service

import javax.annotation.Resource
import java.text.SimpleDateFormat

/**
 * Created by Daniel on 07/01/2016.
 */
@Service
class AdministracionExpedienteService implements IAdministracionExpedienteService{

    private static final SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");

    @Resource
    ExpedienteRepository expedienteRepository

    @Override
    Expediente guardarExpediente(Expediente expediente) {

        if (!expediente)
            throw new IllegalArgumentException('Parametro Expediente es obligatorio')

        def expedienteMongo = mapExpedienteToExpedienteDB(expediente)

        expedienteMongo = expedienteRepository.save(expedienteMongo)

        if (expedienteMongo)
            expediente.id = expedienteMongo.id

        return expediente
    }

    private static ExpedienteDB mapExpedienteToExpedienteDB(Expediente expediente){


        def expedienteMongo = new ExpedienteDB()

        expedienteMongo.datosPersonales = new DatosPersonales()
        expedienteMongo.datosPersonales.with {
            primerApellido = expediente.apellidoPaterno
            segundoApellido = expediente.apellidoMaterno
            nombres = expediente.nombre
            numeroSeguridadSocial = null
            curp = expediente.curp
            rfc = expediente.rfc
            fechaNacimiento = formatter.parse(expediente.fechaNacimiento)
            edad = expediente.edadTrabajador.toInteger()
            int idGenero = expediente.cveSexo ? expediente.cveSexo.toInteger() : -1
            genero = new Catalogo(id: idGenero)
            int idEstadoCivil = expediente.cveEstadoCivil ? expediente.cveEstadoCivil.toInteger() : -1
            estadoCivil = new Catalogo(id: idEstadoCivil)
            int idNacionalidad = expediente.cveNacionalidad ? expediente.cveNacionalidad.toInteger() : -1
            nacionalidad = new Catalogo(id: idNacionalidad)
            int idPais = expediente.cvePais ? expediente.cvePais.toInteger() : -1
            paisNacimiento = new Catalogo(id: idPais)
            int idEntidadFederativa = expediente.cveEntidadFederativa ? expediente.cveEntidadFederativa.toInteger() : -1
            entidadFederativa = new Catalogo(id: idEntidadFederativa)
            int idMunicipio = expediente.cveMunicipio ? expediente.cveMunicipio.toInteger() : -1
            municipiodelegacion = new Catalogo(id: idMunicipio)
        }

        expedienteMongo.datosGenerales = new DatosGenerales()
        expedienteMongo.datosGenerales.domicilio = new Domicilio()
        expedienteMongo.datosGenerales.with {
            telefonoCelular = expediente.celular
            correoElectronicoPersonal = expediente.email
            domicilio.with {
                calleNumero
                codigoPostal
                colonia = new Catalogo(id: expediente.colonia.toInteger())
                entidad = new Catalogo(id: expediente.entidad.toInteger())
                municipio = new Catalogo(id: expediente.municipio.toInteger())
                localidad = expediente.localidad
                telfonoFijo = expediente.telefono
                observaciones = expediente.observaciones
            }
        }

        expedienteMongo.esquemaPago = new EsquemaPago()
        expedienteMongo.esquemaPago.with {
            bancarizado = (expediente.cveBanco!=null && !expediente.cveBanco.isEmpty())
            cveBanco = expediente.cveBanco
            clabe = expediente.clabe
        }

        return expedienteMongo
    }
}
