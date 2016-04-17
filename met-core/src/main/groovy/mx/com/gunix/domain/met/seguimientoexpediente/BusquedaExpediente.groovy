package mx.com.gunix.domain.met.seguimientoexpediente

import groovy.transform.Canonical
import javax.validation.constraints.NotNull
import javax.validation.constraints.Size
import javax.validation.constraints.Pattern

@Canonical
class BusquedaExpediente implements Serializable {

	String apellidoPaterno
	
    String apellidoMaterno
	
    String nombre
	
    String curp
	
	String estatusExpediente
	
	String folio
	
	String idTrabajador

	Integer pageNumber // first page is number 0

	Integer pageSize // total number of elements in each page
		
}
