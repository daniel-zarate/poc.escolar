package mx.com.gunix.service.met.administracionexpediente.util

import mx.com.gunix.domain.met.administracionexpediente.Expediente
import mx.com.gunix.domain.persistence.mongo.model.ExpedienteDB
import mx.com.gunix.domain.persistence.mongo.model.embedded.Catalogo
import mx.com.gunix.domain.persistence.mongo.model.embedded.DatosGenerales
import mx.com.gunix.domain.persistence.mongo.model.embedded.DatosPersonales
import mx.com.gunix.domain.persistence.mongo.model.embedded.Domicilio
import mx.com.gunix.domain.persistence.mongo.model.embedded.EsquemaPago

import java.text.SimpleDateFormat

class ExpedienteMapper {

    private static final SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy")

     static ExpedienteDB mapExpedienteToExpedienteMongoDB(Expediente expediente){


        def expedienteMongo = new ExpedienteDB()

         expedienteMongo.with {

             estatusExpediente = expediente?.estatusExpediente
             folioExpediente = expediente?.folioExpediente
         }

        expedienteMongo.datosPersonales = new DatosPersonales()
        expedienteMongo.datosPersonales.with {
            primerApellido = expediente.apellidoPaterno
            segundoApellido = expediente.apellidoMaterno
            nombres = expediente.nombre
            numeroSeguridadSocial = null
            curp = expediente.curp
            rfc = expediente.rfc
            fechaNacimiento = formatter.parse(expediente.fechaNacimiento)
            edad = expediente?.edadTrabajador?.toInteger()
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
                calleNumero = expediente.calle
                codigoPostal = expediente.codPosta
                colonia = new Catalogo(id: expediente?.colonia?.toInteger())
                entidad = new Catalogo(id: expediente?.entidad?.toInteger())
                municipio = new Catalogo(id: expediente?.municipio?.toInteger())
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

		
		
		
         //Todo terminar
        return expedienteMongo
    }
	 
	 static Expediente mapExpedienteMongoDBToExpediente(ExpedienteDB expedienteMongo){
		 def expediente = new Expediente();
		 
				 expedienteMongo.datosPersonales.with {
					 expediente.apellidoPaterno = primerApellido  
					 expediente.apellidoMaterno = segundoApellido  
					 expediente.nombre = nombres 
					 expediente.numSeguroSocial = numeroSeguridadSocial
					 expediente.curp = curp 
					 expediente.rfc = rfc 
					 expediente.fechaNacimiento  = formatter.format(fechaNacimiento)
					 expediente?.edadTrabajador = edad 
					 expediente.cveSexo = genero.id
					 expediente.cveEstadoCivil = estadoCivil
					 expediente.cveNacionalidad = nacionalidad 
					 expediente.cvePais = paisNacimiento 
					 expediente.cveEntidadFederativa  = entidadFederativa
					 expediente.cveMunicipio = municipiodelegacion
				 }
		 
				 expedienteMongo.datosGenerales.with {
					 expediente.celular = telefonoCelular 
					 expediente.email = correoElectronicoPersonal  
					 domicilio.with {
						 expediente.calle = calleNumero  
						 expediente.codPosta =codigoPostal  
						 expediente?.colonia = colonia 
						 expediente?.entidad = entidad 
						 expediente?.municipio = municipio 
						 expediente.localidad = localidad  
						 expediente.telefono = telfonoFijo  
						 expediente.observaciones = observaciones  
					 }
				 }
		 
				 
				 expedienteMongo.esquemaPago.with {
					 expediente.cveBanco = bancarizado     
					 expediente.cveBanco = cveBanco  
					 expediente.clabe = clabe   
				 }
				 
		 return expediente
	 }

}

