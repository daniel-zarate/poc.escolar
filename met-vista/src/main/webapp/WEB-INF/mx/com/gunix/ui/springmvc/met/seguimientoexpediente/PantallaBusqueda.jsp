<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<title>Pantalla Busqueda</title>
	<script type="text/javascript">
	
		var regex = new RegExp( '<spring:message code="busqueda.v1.view.validacion.regex"  javaScriptEscape="true" />' );
			
		errorEstatusBusqueda = "errorEstatusBusqueda"			
		errorCurp4Busqueda = "errorCurp4Busqueda"
		errorCurp17Busqueda = "errorCurp17Busqueda"			
		errorFechaBusqueda = "errorFechaBusqueda"			
		errorFormatoPA = "errorFormatoPA"			
		errorFormatoSA = "errorFormatoSA"			
		errorFormatoN = "errorFormatoN"
		errorFormatoF = "errorFormatoF"
		idOperacionBusqueda = "idOperacionBusqueda"
	</script>
	
	<link rel="stylesheet" href="/met-vista/static/css/foundation.css" /> 
	<link rel="stylesheet" href="/met-vista/static/css/css.css" /> 
	<script src="/met-vista/static/js/vendor/modernizr.js"></script> 
	    	
	<!-- <script src="/met-vista/static/js/prototype/prototype.js" type="text/javascript"></script>		 -->
	<link rel="stylesheet" href="/met-vista/static/css/jquery-ui/smoothness/jquery-ui-1.10.4.custom.css" />
	<script src="/met-vista/static/js/jquery-ui/jquery-ui-1.10.4.custom.js"></script>
	<script src="/met-vista/static/js/jquery-ui/jquery.ui.datepicker-es.js"></script>
	<script src="/met-vista/static/js/foundation.min.js"></script>
	
	<script src="/met-vista/js/jlayout/jquery.layout-latest.js" type="text/javascript"></script>
	<script src="/met-vista/js/commons.js" type="text/javascript"></script>
	
	<script src="/met-vista/static/js/jquery-ui/jquery.ui.widget.js"></script>
	<script src="/met-vista/static/js/fileupload/jquery.iframe-transport.js"></script>
	<script src="/met-vista/static/js/fileupload/jquery.fileupload.js"></script>
	
	<script src="/met-vista/js/administracionExpediente/v1/jquery.get-input-type.min.js"></script>

	<script	src="/met-vista/static/js/jtable/jquery.jtable.js" type="text/javascript"></script>	
	<%-- script	src="${resource(dir: 'js/jtable/localization/', file:'jquery.jtable.es.js')}" type="text/javascript"></script --%> 

<!-- 	<link rel="stylesheet" href="/met-vista/js/jtable/themes/metro/lightgray/jtable.css" /> -->
	
	<script src="/met-vista/js/seguimientoexpediente/v1/PantallaBusqueda.js" type="text/javascript"></script>
	
	<style type="text/css">
    /* Rounded Corner */
    .tb5 {
	
		-webkit-appearance: none;
		-webkit-border-radius: 0;
		border-radius: 0;
		background-color: white;
		font-family: Arial;
		border: 1px solid #cccccc;
		-webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
		box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
		color: rgba(0, 0, 0, 0.75);
		
		font-size: 0.875rem;
		margin: 0 0 1rem 0;
		padding: 0.5rem;
		height: 1.5rem;
		width: 90%;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		-webkit-transition: -webkit-box-shadow 0.45s, border-color 0.45s ease-in-out;
		-moz-transition: -moz-box-shadow 0.45s, border-color 0.45s ease-in-out;
		transition: box-shadow 0.45s, border-color 0.45s ease-in-out;
    } 
    
   
	img.ui-datepicker-trigger {
	    position: absolute;  
	    top: 40%;  
	    right: -5px;;
	}

  
  </style>
		
	</head>  
<body>
<%-- 	<g:if test="${messagesMap?.errors}"> --%>
<%-- 		<g:each in="${messagesMap?.errors}" var="error"> --%>
<!-- 			<small class="error"> -->
<%-- 				${error} --%>
<!-- 			</small> -->
<!-- 		</g:each> -->
<!-- 	</g:if> -->
	<div id="showError" class="error"></div>
	<form id="getPantallaForm" name="getPantallaForm" enctype="multipart/form-data"	method="post" action="/Sane/rest/processActiviti/process">

        <div class="row" align="left">
           <div class="large-12 columns" align="center">&nbsp; </div>
        </div>
        <div class="row" align="left">
           <div class="large-12 columns" align="center">&nbsp; </div>
        </div>
		<div class="row" align="left">
			<div class="large-12 columns" align="center">
				<div id="combosAnidadosBusqueda">
					<div class="medium-3 columns ">
						<label><spring:message code="busqueda.v1.view.busquedaAvanzada.label.curp"  />
<%-- 							<g:if test="${idOperacion == 'modificar'}"> --%>
<!-- 								<font color="red">* </font></label> -->
<!-- 							</g:if> -->
						</label>
						<input  name="curpBusqueda" id="curpBusqueda" class="sep-text-medium" maxlength="18" type="text" />
					</div>
					<div class="medium-3 columns ">
					<label><spring:message code="busqueda.v1.view.busquedaAvanzada.label.estatusExpediente"  /><font color="red">* </font></label>
						<select id="estatusBusqueda" name="estatusBusqueda" class="sep-text-medium left" >
							<option value="1">En proceso</option>
							<option value="2">Autorizado</option>
							<option value="3">Rechazado</option>
						</select>
					</div>
				</div>
			</div>
			<div class="large-12 columns" align="center">
				<div class="medium-3 columns ">
					<label><spring:message code="busqueda.v1.view.busquedaAvanzada.label.primerApellido"  /></label>
					<input name="primerApellidoBusqueda" id="primerApellidoBusqueda" class="sep-text-medium" type="text" maxlength="50" />
				</div>
				<div class="medium-3 columns ">
					<label><spring:message code="busqueda.v1.view.busquedaAvanzada.label.segundoApellido"  /></label>
					<input name="segundoApellidoBusqueda" id="segundoApellidoBusqueda" class="sep-text-medium" type="text"  maxlength="50" />
				</div>
				<div class="medium-3 columns ">
					<label><spring:message code="busqueda.v1.view.busquedaAvanzada.label.nombre"  /></label>
					<input name="nombreBusqueda" id="nombreBusqueda" class="sep-text-medium" type="text"  maxlength="50"  />
				</div>
				<div class="medium-3 columns ">
					<label><spring:message code="busqueda.v1.view.busquedaAvanzada.label.folio"  /></label>
					<input name="folioBusqueda" id="folioBusqueda" class="sep-text-medium" type="text"  />
				</div>
			</div>
				<div class="large-12 columns" align="center">			
					<div class="large-3 medium-3 columns">
					<label><spring:message code="busqueda.v1.view.busquedaAvanzada.label.fecha"  /></label>
					<input  name="fechaField" id="fechaField" class="sep-text-medium" maxlength="18" type="text"  />
 					</label>
				</div>
				</div>

			<div class="large-12 columns" align="center">

					<input class="button tiny" type="button" id="botonBusqueda" name="idAccion" value="Buscar" alt="consultar" />
			</div>
		</div>
		</form>
		
		<form id="formaFantasmaForm" name="formaFantasma" enctype="multipart/form-data"	method="post" action="/Sane/rest/processActiviti/process">
			<input type="hidden" id="hiddenFantasma" name="idTrabajador" value="" />
			<input type="hidden" id="hiddenFolio" name="folioActiviti" value="" />
			<input type="hidden" id="ramo" name="ramo" value="" />
			<input type="hidden" id="ur" name="ur" value="" />
			<input type="hidden" id="estatusExpedienteTrabajador" name="estatusExpedienteTrabajador" value="" />
			<input style="visibility: hidden;" type="button" id="EnviarFantasmaSubmitButton" name="idAccion" value="Buscar" alt="seleccionar" />
		</form>
		
	<div class="row">
		
		<div class="small-12 small-centered columns"  id="renglon">
			<div id="busquedaExpediente" ></div>
		</div>
	</div>
</body>
</html>