package mx.com.gunix.domain.persistence.mongo.repository.custom.impl

import mx.com.gunix.domain.met.seguimientoexpediente.BusquedaExpediente
import mx.com.gunix.domain.persistence.mongo.model.ExpedienteDB
import mx.com.gunix.domain.persistence.mongo.repository.custom.ICustomExpedienteRepository
import org.springframework.data.domain.PageRequest
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.stereotype.Repository

import javax.annotation.Resource

@Repository
class CustomExpedienteRepository implements ICustomExpedienteRepository{

    @Resource
    MongoTemplate mongoTemplate

    @Override
    List<ExpedienteDB> findExpedienteByCriteria(BusquedaExpediente busquedaExpediente) {


        List<Criteria> criteriaList = new ArrayList<>()

        if (!busquedaExpediente){
            throw new RuntimeException('Expediente search criteria is empty')
        }

        def curp = busquedaExpediente?.curp
        def estatusExp = busquedaExpediente?.estatusExpediente
        def nombre = busquedaExpediente?.nombre
        def primerApellido = busquedaExpediente?.apellidoPaterno
        def segundoApedillo = busquedaExpediente?.apellidoMaterno
        def folio = busquedaExpediente?.folio
        //def fecha = busquedaExpediente?.

        Criteria criteria = new Criteria()
        if (curp && !curp.isEmpty()){
            Criteria criteriaCurp = new Criteria().where('datosPersonales.curp').regex(curp,'i')
            criteriaList.add(criteriaCurp)
        }

        if (estatusExp){
            Criteria criteriaExpediente = new Criteria().where('estatusExpediente').is(estatusExp)
            criteriaList.add(criteriaExpediente)
        }

        if (nombre && !nombre.isEmpty()){
            Criteria criteriaNombre = new Criteria().where('datosPersonales.nombre').is(nombre)
            criteriaList.add(criteriaNombre)
        }

        if (primerApellido && !primerApellido.isEmpty()){
            Criteria criteriaPApellido = new Criteria().where('datosPersonales.primerApellido').is(primerApellido)
            criteriaList.add(criteriaPApellido)
        }

        if (segundoApedillo && !segundoApedillo.isEmpty()){
            Criteria criteriaSApellido = new Criteria().where('datosPersonales.segundoApellido').is(segundoApedillo)
            criteriaList.add(criteriaSApellido)
        }

        if (folio && !folio.isEmpty()){
            Criteria criteriaFolio = new Criteria().where('folioExpediente').is(folio)
            criteriaList.add(criteriaFolio)
        }

        Query query = new Query()
        query.addCriteria(new Criteria().andOperator(criteriaList.toArray(new Criteria[criteriaList.size()])))
        query.with(new PageRequest(busquedaExpediente.pageNumber,busquedaExpediente.pageSize))

        def result = mongoTemplate.find(query,ExpedienteDB)

        return result
    }
}
