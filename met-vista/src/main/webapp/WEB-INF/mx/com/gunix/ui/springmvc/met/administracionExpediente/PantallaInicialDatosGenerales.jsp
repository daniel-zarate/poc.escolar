<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Datos Generales</title>
<script type="text/javascript">
	documentosRequeridosMsg = '<spring:message code="administracionExpediente.v1.view.error.datosGenerales.documentosRequeridos" javaScriptEscape="true" />'
	formatoArchivoIncorrectoMsg = '<spring:message code="administracionExpediente.v1.view.error.datosGenerales.formatoArchivoIncorrecto" javaScriptEscape="true" />'
	zipMasUnArchivoMsg = '<spring:message code="administracionExpediente.v1.view.error.datosGenerales.zipMasUnArchivo" javaScriptEscape="true" />'
	erroresDeValidacionMsg = '<spring:message code="administracionExpediente.v1.view.error.datosGenerales.erroresDeValidacion" javaScriptEscape="true" />'
	idOperacionDatosGenerales = "${idOperacion}"
	coloniaComboValue = "${colonia}"	
	entidadComboValue ="${entidad}"
	municipioComboValue="${municipio}"
</script>
<%-- <script	src="${resource(dir: 'js/foundation', file: 'foundation.abide.js')}" type="text/javascript"></script> --%>
<%-- <script	src="${resource(dir: 'js/api', file: 'RestClientURI.js',plugin:'in-sane-fwk')}"	type="text/javascript"></script> --%>

<script	src="/met-vista/js/administracionExpediente/v1/PantallaInicialDatosGenerales.js" type="text/javascript"></script>
<script	src="/met-vista/js/administracionExpediente/v1/cargaArchivosDatosGenerales.js" type="text/javascript"></script>

</head>

<body>
	
	<div id="showError" class="error"></div>

<%--	<insane:insaneForm id="getPantallaForm" name="getPantallaForm "	processInstance="${processInstance}" enctype="multipart/form-data"	method="post" action="/Sane/rest/processActiviti/process" >--%>
		<input id="idOperacion" type="hidden" value="${resultExpediente.expediente.idOperacion}" />
<%-- 		<input type="hidden" name="documentosDatosGenerales" id ="documentosDatosGenerales" value="${ lstDocumentosDatosGenerales ? mx.gob.sep.dgpyrf.insanefwk.codes.ChangeTypeObject.getObjectToString(lstDocumentosDatosGenerales) : '' }" /> --%>
<%-- 		<input type="hidden" id ="doctosCargadosDatosGenerales" value="${ mapDoctosDatosGenerales == null ? mx.gob.sep.dgpyrf.insanefwk.codes.ChangeTypeObject.getObjectToString(mapDoctosDatosGenerales) : '' }" /> --%>
<!-- 		<input name="requeridosDatosGenerales" id="requeridosDatosGenerales" type="hidden" value="false"/> -->
		<input  id="rfcDG" type="hidden" value="${resultExpediente.expediente.rfc}"/>
		
		<div class="small-12 columns" align="left">
			<div class="small-8 columns">
				<div class="small-6 columns ">
					<label><spring:message code="administracionExpediente.v1.view.label.datosGenerales.celular"></spring:message></label>
					<input name="celular" id="celular" class="sep-text-medium" type="text" placeholder="<spring:message code="administracionExpediente.v1.view.label.datosGenerales.celular"  />" pattern="[0-9]{10}" maxLength="10" value="${resultExpediente.expediente.celular}" />a 
					<small class="error" id="errorCelular">
						<spring:message code="ER-044016"   arguments='<spring:message code="administracionExpediente.v1.view.label.datosGenerales.celular" />,10' />
						<br><spring:message code="ER-044006"   arguments='<spring:message code="administracionExpediente.v1.view.label.datosGenerales.celular" />,<spring:message code="administracionExpediente.v1.view.label.datosGenerales.numerico" /> '/>
					</small>
				</div>

				<div class="small-6 columns ">
				<label><spring:message code="administracionExpediente.v1.view.label.datosGenerales.email"  /></label>
					<input name="email" id="email" class="sep-text-medium" type="text" placeholder="<spring:message code="administracionExpediente.v1.view.label.datosGenerales.email"  />" pattern="email" value="${resultExpediente.expediente.email}"  maxlength="50" />
					<small class="error" id="seleccioneModulo">
						<spring:message code="ER-044011"   arguments='<spring:message code="administracionExpediente.v1.view.label.datosGenerales.email" />' />
					</small>
				</div>
			</div>	
		</div>

		<div>
			<label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<spring:message code="administracionExpediente.v1.view.label.datosGenerales.dom"  /></label>
			<fieldset class="sep-fieldset">
				<div class="large-12 columns " aling="left">
					<div class=center>
						<div class="medium-12 columns">
							<label><spring:message code="administracionExpediente.v1.view.label.datosGenerales.calle"  /><font color="red">* </font></label>
						</div>

						
					</div>
				</div>
				
				
				<div class="large-12 columns" align="left">
					<div class="medium-12 columns">
						<input name="calle" id="calle" class="sep-text-medium" type="text" placeholder="<spring:message code="administracionExpediente.v1.view.label.datosGenerales.calle" />" 
						 maxLength="120" value="${resultExpediente.expediente.calle}"  />
						<small class="error">
							<spring:message code="ER-044006"   arguments='<spring:message code="administracionExpediente.v1.view.label.datosGenerales.calle" />,<spring:message code="administracionExpediente.v1.view.label.datosGenerales.alfanumerico" />' />
							<br><spring:message code="ER-044008"   arguments='<spring:message code="administracionExpediente.v1.view.label.datosGenerales.calle" />' />
						</small>
					</div>

					
				</div>
				<div class="large-12 columns " aling="left">
					<div class=center>
					
					<div class="medium-4 columns">
							<label> <spring:message code="administracionExpediente.v1.view.label.datosGenerales.codPosta"  /><font color="red">* </font></label>
						</div>
					
						<div class="medium-4 columns">
							<label><spring:message code="administracionExpediente.v1.view.label.datosGenerales.colonia"  /><font color="red">* </font></label>
						</div>
						<div class="medium-4 columns">
							<label> <spring:message code="administracionExpediente.v1.view.label.datosGenerales.entidad"  /><font color="red">* </font></label>
						</div>
						
					</div>
				</div>
				<div class="large-12 columns" align="left">
				
				<div class="medium-4 columns">
						<input name="codPosta" id="codPostal" class="sep-text-medium" type="text" placeholder="<spring:message code="administracionExpediente.v1.view.label.datosGenerales.codPosta"  />" pattern="^0*?[1-9]\d*$" maxLength="5" value="${resultExpediente.expediente.codPosta}"   />
						<small class="error">
							<spring:message code="ER-044006"   arguments='<spring:message code="administracionExpediente.v1.view.label.datosGenerales.codPosta" /> ,<spring:message code="administracionExpediente.v1.view.label.datosGenerales.alfanumerico" />' />
							<br><spring:message code="ER-044008"   arguments='<spring:message code="administracionExpediente.v1.view.label.datosGenerales.codPosta" />' />
						</small>
					</div>
					<div class="medium-4 columns">
						<select id="coloniaCombo" name="colonia" class="sep-text-medium left" value="${colonia}"  >
<!-- 							<option value="0">Centro</option> -->
						</select>
						<small class="error">
							<spring:message code="ER-044008"   arguments='<spring:message code="administracionExpediente.v1.view.label.datosGenerales.colonia" />' />
						</small>
					</div>
					<div class="medium-4 columns">
						<select id="entidadCombo" name="entidad" class="sep-text-medium left" value="${entidad}" >
<%-- 							<option value=""><spring:message code="met.administracionExpediente.v1.view.label.selectDefault" /></option> --%>
<!-- 							<option value="0">DF</option> -->
						</select>
						<small class="error">
							<spring:message code="ER-044008" arguments='<spring:message code="administracionExpediente.v1.view.label.datosGenerales.entidad" />' />
						</small>
					</div>
					
				</div>
				<div class="large-12 columns " aling="left">
					<div class=center>
					
					<div class="medium-4 columns">
							<label><spring:message code="administracionExpediente.v1.view.label.datosGenerales.municipio"  /><font color="red">* </font></label>
						</div>
						<div class="medium-4 columns">
							<label> <spring:message code="administracionExpediente.v1.view.label.datosGenerales.localidad"  /></label>
						</div>
						<div class="medium-4 columns">
							<label><spring:message code="administracionExpediente.v1.view.label.datosGenerales.telefono"  /></label>
						</div>
						
						
						
					</div>
				</div>
				
				<div class="large-12 columns " aling="left">
					<div class=center>
				<div class="medium-4 columns">
						<select id="municipioCombo" name="municipio" class="sep-text-medium left" value="${municipio}" >
<%-- 							<option value=""><spring:message code="met.administracionExpediente.v1.view.label.selectDefault" /></option> --%>
<!-- 							<option value="0">Cuauhtemoc</option> -->
						</select>
						<small class="error">
							<spring:message code="ER-044008"   arguments='<spring:message code="administracionExpediente.v1.view.label.datosGenerales.municipio" />' />
						</small>
					</div>
					<div class="medium-4 columns">
						<input name="localidad" id="localidad" class="sep-text-medium" type="text" placeholder="<spring:message code="administracionExpediente.v1.view.label.datosGenerales.localidad" />" maxLength="100" 
						  value="${resultExpediente.expediente.localidad}" />
						<small class="error">
							<spring:message code="ER-044006"   arguments='<spring:message code="administracionExpediente.v1.view.label.datosGenerales.localidad" />,<spring:message code="administracionExpediente.v1.view.label.datosGenerales.alfanumerico" />' />
						</small>
					</div>
					
					<div class="medium-4 columns">
						<input name="telefono" id="telefono" class="sep-text-medium" maxLength="10" type="text" placeholder="<spring:message code="administracionExpediente.v1.view.label.datosGenerales.telefono"  />" maxLength="10" pattern="^[0-9]*$" value="${resultExpediente.expediente.telefono}"  />
						<small class="error">
							<spring:message code="ER-044016"   arguments='<spring:message code="administracionExpediente.v1.view.label.datosGenerales.telefono" />,10' />
							<br><spring:message code="ER-044006"   arguments='<spring:message code="administracionExpediente.v1.view.label.datosGenerales.telefono" />,<spring:message code="administracionExpediente.v1.view.label.datosGenerales.numerico" />' />
						</small>
					</div>
				
				
				</div>
				</div>
				
				<div class="large-12 columns " aling="left">
					<div class=center>
				
				
				<div class="medium-12 columns">
							<label><spring:message code="administracionExpediente.v1.view.label.datosGenerales.observaciones"  /></label>
						</div>
				</div>
				</div>
				
				<div class="large-12 columns" align="left">
					<div class="medium-9 columns">
						<input name="observaciones" id="observaciones" class="sep-text-medium" type="text" placeholder="<spring:message code="administracionExpediente.v1.view.label.datosGenerales.observaciones"  />" maxLength="500" value="${resultExpediente.expediente.observaciones}" />
					</div>
					
				</div>
			</fieldset>
		</div>

		<label>&nbsp;&nbsp;&nbsp;<spring:message code="administracionExpediente.v1.view.label.datosGenerales.doc"  /><font color="red">* </font></label>
		<fieldset class="sep-fieldset">
				<div class="large-5 columns">
					<div class="row collapse" id="divDocumentos">
						<div class="large-3 columns">
							<img alt="" src="images/administracionExpediente/v1/documentoNoCargado.png" id="imgCD" class="imgDocumento">	
						</div>
						<div class="large-9 columns">
								<!-- label id="CD_label" obligatorio="T">Comprobante de Domicilio</label-->
								<label>Comprobante de Domicilio</label>
						</div>
					</div>			
				</div>
		</fieldset>
		
		

		      <div class="small-5 columns"  id="cargaArchivoDatosGenerales">
		      	<input type="file"  value="${datosPersonalesFile}" id="datosGeneralesFile" name="datosGeneralesFile" data-url="controller/upload" />
		      </div> 

</body>
</html>