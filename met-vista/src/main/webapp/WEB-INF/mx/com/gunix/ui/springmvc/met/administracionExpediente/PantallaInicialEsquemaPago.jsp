<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Esquema Pago</title>
<script src="/met-vista/js/administracionExpediente/v1/PantallaInicialEsquemaPago.js" type="text/javascript"></script>

<script type="text/javascript">

var selBanco = '<spring:message code="administracionExpediente.v1.view.error.esquemaPago.seleccionar.banco" javaScriptEscape="true" />';
var estrucuturaCLABE = '<spring:message code="administracionExpediente.v1.view.error.esquemaPago.estructura.clabe" javaScriptEscape="true" />';
var longitudCLABE = '<spring:message code="administracionExpediente.v1.view.error.esquemaPago.longitud.clabe" javaScriptEscape="true" />';
var errorValida = '<spring:message code="administracionExpediente.v1.view.error.esquemaPago.erroresDeValidacion" javaScriptEscape="true" />';
var errorZip ='<spring:message code="administracionExpediente.v1.view.js.trayectoriaLaboral.errorZipContenido" javaScriptEscape="true" />'
var errorArchivo='<spring:message code="administracionExpediente.v1.view.error.esquemaPago.errorArchivo" javaScriptEscape="true" />'
var errorFormatoArchivo='<spring:message code="administracionExpediente.v1.view.error.esquemaPago.errorFormatoArchivo" javaScriptEscape="true" />'
var activitiBancarizado = "${bancarizado != null ? bancarizado : null}"
 

</script>
</head>
<body>
	
	<div id="showError" class="error"></div>

<%-- 		<input type="hidden" name="doctosEsquemaPagoMap" id ="doctosEsquemaPagoMap" value="${ lstDocumentosEsquemaPago ? mx.gob.sep.dgpyrf.insanefwk.codes.ChangeTypeObject.getObjectToString(lstDocumentosEsquemaPago) : '' }" /> --%>
<%-- 		<input type="hidden" id ="doctosCargadosEsquemaPagoMap" value="${ mapDoctosEsquemaPago ? mx.gob.sep.dgpyrf.insanefwk.codes.ChangeTypeObject.getObjectToString(mapDoctosEsquemaPago) : '' }" />																							   --%>
		<div class="row">
			<input id="idOperacion" type="hidden" value="${idOperacion}" />
			<div class="columns medium-text-left">
				<label><spring:message code="administracionExpediente.v1.view.label.esquemaPago.bancarizado"	 /><font color="red">*</font></label>
			</div>
			<div class="columns">			     
				<input id="isBancarizado" type="hidden" value="${bancarizado != null ? bancarizado : null}" /> 
				<label> 
					<input id="bancarizadoSi" type="radio" name="bancarizado" value="1" />
					<spring:message 	code="administracionExpediente.v1.view.label.esquemaPago.si"  /> &nbsp; &nbsp; 
					<input id="bancarizadoNo" type="radio" name="bancarizado" value="0"/>
					<spring:message code="administracionExpediente.v1.view.label.esquemaPago.no"	 />
				</label>
			</div>
		</div>
			<div id="tipoBancarizado" hidden="false" class="row">
				<div class="small-10 columns">
					<div class="small-5 columns">
						<label><spring:message  code="administracionExpediente.v1.view.label.esquemaPago.institucionBancaria"  /><font color="red">*</font></label>
						<select name="cveBanco" id="cveBanco" class="sep-text-medium" >
							<option value="0"><spring:message code="met.administracionExpediente.v1.view.label.selectDefault" /></option>
<%-- 							<g:each in="${bancos}" var="item"> --%>
<%-- 								<g:if test="${(item.cveBanco.equals(EsquemaPagoVO?.cveBanco)) || item.cveBanco.equals(cveBanco)}"> --%>
<%-- 									<option value="${item.cveBanco}" selected> --%>
<%-- 										${item.nombreCorto} --%>
<!-- 									</option> -->
<!-- 								</g:if> -->
<!-- 								<g:else> -->
<%-- 									<option value="${item.cveBanco}"> --%>
<%-- 										${item.nombreCorto} --%>
<!-- 									</option> -->
<!-- 								</g:else> -->
<!-- 							</g:each> -->
								<option value="0">Banamex</option>
						</select> 
						<small class="error"><spring:message code="administracionExpediente.v1.view.error.esquemaPago.institucion" /> </small>
					</div>
					<div class="small-7 columns">
						<label><spring:message  code="administracionExpediente.v1.view.label.esquemaPago.clabe"  /><font color="red">*</font> </label>
						<input type="text" class="sep-text-medium" name="clabe" id="clabe" value="${clabe}" maxlength="18"
							pattern="(^[0-9]{18,18})" placeholder="CLABE Interbancaria"   /> 
							<small	class="error" ><spring:message	code="administracionExpediente.v1.view.error.esquemaPago.clabe"	 /></small>
					</div>
				</div>
				<div class="small-12 columns">
					<label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<spring:message code="administracionExpediente.v1.view.label.esquemaPago.documentacion" /><font color="red">*</font></label>
					<fieldset class="sep-fieldset">					
							
								<div class="small-5 columns">
									<div class="row collapse">	
										<div class="small-3 columns">							
											<img alt="" src="images/administracionExpediente/v1/documentoNoCargado.png" id="imgEC" class="imgDocumento">						
										</div>
															
										<div class="small-9 columns">
												<label>Estado de cuenta</label>
										</div>		
									</div>	
								</div>			
								
				 	</fieldset>	
				</div>		
				<div class="large-12 columns" id="cargaArchivoEsquemaPago">
					<div class="row">
						<div class="small-4 columns">
							<label><spring:message code="administracionExpediente.v1.view.label.trayectoriaLaboral.documentosAdjuntos"/><font color="red" id="documentoRequeridoTrayectoria">*</font></label>
						</div>
					</div>
					<div class="row">	
						<div class="small-8 columns">
							<input type="file"  value="${datosPersonalesFile}" id="datosGeneralesFile" name="datosGeneralesFile" data-url="controller/upload" />
						</div>	
					</div>
				</div>
			</div>
</body>
</html>

