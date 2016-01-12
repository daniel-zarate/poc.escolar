<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Datos Personales</title>
<script type="text/javascript">
			var ER044008 = ""
			var ER044012 = ""
			var ER044013 = ""	
			var ER044022 = ""
		    var ER044017 = "" 
			var operacion = ""
			var municipioRequerido = ""
			var valorFechaNacimiento = ""	
			
			$(document).ready(function(){
				console.log("llamando a foundation");
				$(document).foundation();
				
			});
			
		</script>
<%-- <link rel="stylesheet" href="${resource(dir: 'css/noty', file: 'noty.css',plugin:'in-sane-fwk')}" /> --%>
<%-- <script src="${resource(dir: 'js/api', file: 'RestClientURI.js',plugin:'in-sane-fwk')}" type="text/javascript"></script> --%>
<!-- <script src="/met-vista/js/administracionExpediente/v1/pantallaInicialDatosPersonales.js" type="text/javascript"></script> -->

</head>
<body>

	<div id="showError" class="error"></div>
	<input type="hidden" name="documentacion" id ="documentacion" value="" />
	<input type="hidden" name="operation" id ="operation" value="${idOperacion}" />	
	<div class="small-12 columns">
		<div class="row">
			<!-- -------------- Primer Apellido -------------- -->
			<div class="small-4 columns">
						<label><spring:message code="administracionExpediente.v1.view.label.datosPersonales.primerApellido" /><font color="red">*</font></label> 
						<input name="apellidoPaterno" id="apellidoPaterno" type="text" class="sep-text-medium" placeholder="" required value="${apellidoPaterno}" maxlength="50" /> 
						<small class="error">
							<spring:message code="administracionExpediente.v1.view.label.datosPersonales.primerApellido.requerido"  />
						</small>
			</div>
			<!-- -------------- Segundo Apellido -------------- -->
			<div class="small-4 columns">
				<label><spring:message code="administracionExpediente.v1.view.label.datosPersonales.segundoApellido"  /></label> 
				<input name="apellidoMaterno" id="apellidoMaterno" type="text" class="sep-text-medium" placeholder="" value="${apellidoMaterno}" maxlength="50" /> 
				<small class="error">
					<spring:message code="administracionExpediente.v1.view.label.datosPersonales.segundoApellido.requerido" />
				</small>
			</div>
			<!-- ---------------- Nombre ---------------- -->
			<div class="small-4 columns">
				<label>
					<spring:message code="administracionExpediente.v1.view.label.datosPersonales.nombre"  />
					<font color="red">*</font>
				</label> 
				<form:input path="nombre" cssClass="sep-text-medium" cssStyle="sep-text-medium"  />
<%-- 				<input name="nombre" id="nombre" type="text" class="sep-text-medium" placeholder="" required  value="${nombre}" maxlength="50" />  --%>
				<small class="error">
					<spring:message code="administracionExpediente.v1.view.label.datosPersonales.nombre.requerido" />
				</small>
			</div>
			<!-- ------------------------------------------------ -->
		</div>
		<!-- ------------------------------------------------ -->
			<div class="small-12 columns">&nbsp;<!-- space --></div>	
		<!-- -----------------------------------------------       -->
		<div class="row">

		<!-- ---------------- Numero de Seguridad Social ---------------- -->
		<div class="small-4 columns">
			<label><spring:message code="administracionExpediente.v1.view.label.datosPersonales.numeroSeguridadSocial" /></label> 
			<input name="numSeguroSocial" id="numeroSeguridadSocialEmpleado" class="sep-text-medium" type="text" placeholder="" value="${numSeguroSocial}" maxlength="15"  ${numSeguroSocial== null ? 'disabled':''}  />
		</div>
		<!-- ---------------- CURP ---------------- -->
		<div class="small-4 columns">
			<label>
			<spring:message code="administracionExpediente.v1.view.label.datosPersonales.curp"  />
			<font color="red">*</font></label> 
			<input ${curp?'disabled':''} id="curp" name="curp" type="text" class="sep-text-medium" placeholder=<spring:message code="administracionExpediente.v1.view.label.datosPersonales.curp"/> required value="${curp}" maxlength="18"  /> 
			<small class="error"><spring:message code="ER-044012"  /></small>
		</div>
		<!-- ---------------- RFC ---------------- -->
		<div class="small-4 columns">
				<label><spring:message code="administracionExpediente.v1.view.label.datosPersonales.rfc"  /><font color="red">*</font></label> 
				<input name="rfc" id="rfcUsuario" type="text" class="sep-text-medium" placeholder="" required value="${rfc}" maxlength="13"  /> 
				<small class="error">
						<spring:message code="administracionExpediente.v1.view.label.datosPersonales.rfc.requerido"  />
				</small>
			</div>

		</div>
		<!-- ------------------------------------------------ -->
			<div class="small-12 columns">&nbsp;<!-- space --></div>
		<!-- -----------------------------------------------       -->
		<div class="row">
			<!-- -------------- Fecha Nacimiento -------------- -->
			<div class="small-3 columns">
				<label>
					<spring:message
						code="administracionExpediente.v1.view.label.datosPersonales.fechaNacimiento"
						 /><font color="red">*</font>
					</label> 
				<input
					name="fechaNacimiento" id="fechaNacimientoDatosPersonales"
					class="sep-text-medium" type="text"
					placeholder=""
					value="${fechaNacimiento}" maxlength="10" required="required"
					 />
				<small class="error">
						<spring:message code="administracionExpediente.v1.view.dependientesfamiliares.error.fechaNacimiento"  />
				</small>	
			</div>
			<!-- -------------- Edad -------------- -->
			<div class="small-1 columns">
				<label>
					<spring:message code="administracionExpediente.v1.view.label.datosPersonales.edad" />
				</label> 
				<input type="text" name="edadTrabajador"
					id="edadTrabajador" class="sep-text-medium"
					placeholder=""
					value="${edadTrabajador}" pattern="[0-9]{2}" maxlength="2" />
				<small class="error"><spring:message
						code="administracionExpediente.v1.view.label.datosPersonales.edad.requerido" /></small>
			</div>

			<!-- ---------------- Sexo ---------------- -->
			<div class="small-2 columns">
				<label><spring:message code="administracionExpediente.v1.view.label.datosPersonales.sexo" /><font color="red">*</font></label>
				<select name="cveSexo" id="cveSexo" class="sep-text-medium left" >
						<option value="0">Masculino</option>
						<option value="1">Femenino</option>
					</select>
				<small class="error"><spring:message
						code="administracionExpediente.v1.view.label.datosPersonales.sexo.requerido"
						 /></small>
			</div>

			<!-- ---------------- Estado Civil ---------------- -->
			<div class="small-2 columns">
				<label>
						<spring:message
						code="administracionExpediente.v1.view.label.datosPersonales.estadoCivil"
						 />
						<font color="red">*</font>
				</label>
					 <select id="cveEstadoCivil" name="cveEstadoCivil" required="" class="sep-text-medium left">
						<option value="0">Soltero</option>
					  </select>
				<small class="error"><spring:message
						code="administracionExpediente.v1.view.label.datosPersonales.estadoCivil.requerido"/></small>
			</div>


			<!-- -------------- Nacionalidad -------------- -->
			<div class="small-4 columns">
				<label><spring:message
						code="administracionExpediente.v1.view.label.datosPersonales.nacionalidad"
						 /><font color="red">*</font></label>
				<select id="cveNacionalidad" name="cveNacionalidad"
					class="sep-text-medium left" >
					<option value="0">Mexicana</option>
					</select>					
				<small class="error"><spring:message
						code="administracionExpediente.v1.view.label.datosPersonales.nacionalidad.requerido"
						 /></small>
			</div>
		</div>
		<!-- ------------------------------------------------ -->
			<div class="small-12 columns">&nbsp;<!-- space --></div>
		<!-- -----------------------------------------------       -->
		<div class="row">
			<!-- -------------- Pais de Nacimiento -------------- -->
			<div class="small-4 columns">
				<label><spring:message 	code="administracionExpediente.v1.view.label.datosPersonales.paisNacimiento" /><font color="red">*</font></label>
				<select id="cvePais" name="cvePais" required="" class="sep-text-medium left" >
					<option value="0">M&eacute;xico</option>
				</select>
				<small class="error"><spring:message code="administracionExpediente.v1.view.label.datosPersonales.paisNacimiento.requerido" /></small>
			</div>
			<div id="combosEntidadMunicipio" style="display: none;">
				<!-- --------------- Entidad---------------- -->
				<div class="small-4 columns">
					<label><spring:message code="administracionExpediente.v1.view.label.datosPersonales.entidad"/><font color="red">*</font></label>	
					<select 
					 id="cveEntidadComboDatosPersonales" 
					 name="cveEntidadFederativa" 
					 class="sep-text-medium left">
					 <option value="0">DF</option>
					 </select>
					<small class="error"><spring:message	code="administracionExpediente.v1.view.label.datosPersonales.entidad.requerido" /></small>
				</div>
				<!-- --------------- Municipio/Delegacion---------------- -->
				<div class="small-4 columns">
					<label><spring:message code="administracionExpediente.v1.view.label.datosPersonales.municipioDelegacion" /><font color="red">*</font></label> 
					<select	id="municipioComboDatosPersonales" 
							name="cveMunicipio"	
					 		class="sep-text-medium left" >
							<option value="Cuauhtemoc">  </option>
					</select> 
					<small class="error"><spring:message code="administracionExpediente.v1.view.label.datosPersonales.municipioDelegacion.requerido" />
					</small>
				</div>
			</div>
		</div>
	</div>
	<br>

	<!-- --------------------------------------------------- 
						  Grid que permite dibujar din?micamente, los archivos que
						  deber?n ser cargados para este m?dulo.
						-->
<!-- 	<div class="row"> -->
<%-- 		<label>&nbsp;&nbsp;&nbsp;<spring:message code="administracionExpediente.v1.view.label.datosPersonales.documentacion"  /><font color="red">*</font></label> --%>
<!-- 		<fieldset class="sep-fieldset"> -->
<!-- 			<div id="gridFiles" class="large-12 columns" style="overflow-y: scroll; max-height: 150px">	 -->
<%-- 			<g:each in="${lstDocumentosDatosPersonales}" var="item" status="i"> --%>
<%-- 					<g:if test="${i%3 == 0}"> --%>
<!-- 					<div class="small-12 columns"> -->
<!-- 					</g:if> -->
<!-- 						<div class="small-4 columns"> -->
<!-- 							<div class="row collapse"> -->
<!-- 								<div class="small-3 columns"> -->
<%-- 									<img alt=""	src="images/administracionExpediente/v1/documentoNoCargado.png"	id="img${item.cveDocumento.trim()}" class="imgDocumento"> --%>
<!-- 								</div> -->
<!-- 								<div class="small-9 columns"> -->
<%-- 									<g:if test="${!datosPersonalesFile}"> --%>
<%-- 										<label class="ExpedienteDatosPersonales" id="${item.cveDocumento.trim()}" name="${item.requerido}" alt="0"> ${item.documento.trim()}</label> --%>
<!-- 									</g:if> -->
<%-- 									<g:if test="${datosPersonalesFile}"> --%>
<%-- 										<g:set var="flag" value="${0}" /> --%>
<%-- 										<g:each in="${datosPersonalesFile}" var="filePreview"> --%>
<%-- 											<g:if test="${filePreview.value.trim().split('_')[1].split('\\.')[0] == item.cveDocumento.trim()}"> --%>
<%-- 												<insane:insanePreviewMetFile idFile="${filePreview.key}" name="${item.documento}" />  --%>
<%-- 												<g:set var="flag" value="${1}" /> --%>
<%-- 												<label class="ExpedienteDatosPersonales" style="display: none" id="${item.cveDocumento.trim()}"	name="${item.requerido}" alt="0">${item.documento.trim()}</label> --%>
<!-- 											</g:if> -->
<!-- 										</g:each> -->
<%-- 										<g:if test="${flag == 0}"> --%>
<%-- 											<label class="ExpedienteDatosPersonales" id="${item.cveDocumento.trim()}" name="${item.requerido}" alt="0"> ${item.documento.trim()}</label> --%>
<!-- 										</g:if> -->
<!-- 									</g:if> -->
<!-- 								</div> -->
<!-- 							</div> -->
<!-- 						</div> -->
<%-- 					<g:if test="${i%3 == 2}" > --%>
<!-- 					</div> -->
<!-- 					</g:if> -->
<!-- 				</g:each> -->
<!-- 				<div class="small-4 columns"> -->
<!-- 					<div class="row collapse"> -->
<!-- 						<div class="small-3 columns"></div> -->
<!-- 						<div class="small-9 columns"></div> -->
<!-- 					</div> -->
<!-- 				</div> -->
<!-- 				<div class="small-4 columns"> -->
<!-- 					<div class="row collapse"> -->
<!-- 						<div class="small-3 columns"></div> -->
<!-- 						<div class="small-9 columns"></div> -->
<!-- 					</div> -->
<!-- 				</div> -->
<!-- 			</div> -->
<!-- 		</fieldset> -->
<!-- 	</div> -->

	<div class="row">

<%--	<g:if test="${datosPersonalesFile ==null|| datosPersonalesFile == '' ||datosPersonalesFile== [:] }">	--%>
<%--		<g:if test="${idOperacion == 'modificar' || idOperacion == 'crear'  || idOperacion == 'seguimiento'}">	--%>
			<div class="small-12 columns" id="cargaArchivoDatosPersonales">
				<label><spring:message code="administracionExpediente.v1.view.label.datosPersonales.documentosAdjuntos"	 /></label>
				<input type="file"  value="${datosPersonalesFile}" id="datosPersonalesFile" name="datosPersonalesFile" />
			</div>
<%--		</g:if> --%>
<%--	</g:if>--%>
	</div>
</body>
</html>
