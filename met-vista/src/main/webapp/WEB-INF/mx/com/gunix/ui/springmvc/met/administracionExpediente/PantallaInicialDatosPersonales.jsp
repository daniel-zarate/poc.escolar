<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
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
				//Foundation.libs.abide.validate($( ":input" ), {type:''})
				console.log("llamando a abide");
				//$(document).trigger('validate.fndtn.abide');
			});
			
		</script>
<%-- <link rel="stylesheet" href="${resource(dir: 'css/noty', file: 'noty.css',plugin:'in-sane-fwk')}" /> --%>
<%-- <script src="${resource(dir: 'js/api', file: 'RestClientURI.js',plugin:'in-sane-fwk')}" type="text/javascript"></script> --%>
<script src="/met-vista/js/administracionExpediente/v1/pantallaInicialDatosPersonales.js" type="text/javascript"></script>
<script src="/met-vista/js/administracionExpediente/v1/cargaArchivosDatosPersonales.js" type="text/javascript"></script>



</head>
<body>

	<div id="showError" class="error"></div>
	<input type="hidden" name="documentacion" id ="documentacion" value="" />
	<input type="hidden" name="operation" id ="operation" value="${resultExpediente.expediente.idOperacion}" />	
	<div class="small-12 columns">
		<div class="row">
			<!-- -------------- Primer Apellido -------------- -->
			<div class="small-4 columns">
						<label><spring:message code="administracionExpediente.v1.view.label.datosPersonales.primerApellido" />
<!-- 						<font color="red">*</font> -->
						</label> 
						<form:input name="apellidoPaterno" id="apellidoPaterno" path="apellidoPaterno" type="text" class="sep-text-medium" placeholder="" value="${resultExpediente.expediente.apellidoPaterno}" maxlength="50" /> 
						<small class="error">
							<spring:message code="administracionExpediente.v1.view.label.datosPersonales.primerApellido.requerido"  />
						</small>
			</div>
			<!-- -------------- Segundo Apellido -------------- -->
			<div class="small-4 columns">
				<label><spring:message code="administracionExpediente.v1.view.label.datosPersonales.segundoApellido"  /></label> 
<%-- 				<input name="apellidoMaterno" id="apellidoMaterno" type="text" class="sep-text-medium" placeholder="" value="${apellidoMaterno}" maxlength="50" />  --%>
				<form:input path="apellidoMaterno" cssClass="sep-text-medium" cssStyle="sep-text-medium" maxlength="50" value="${resultExpediente.expediente.apellidoMaterno}" />
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
				<c:set var="nombreError"><form:errors path="nombre"/></c:set>
				<c:if test="${not empty nombreError}">
					con error u.u
					<form:input path="nombre" cssClass="sep-text-medium" cssStyle="sep-text-medium" maxlength="50" required="required" data-invalid="data-invalid" value="${resultExpediente.expediente.nombre}" />
				</c:if>
				<c:if test="${empty nombreError}">
					sin error
					<form:input path="nombre" cssClass="sep-text-medium" cssStyle="sep-text-medium" maxlength="50" required="required" value="${resultExpediente.expediente.nombre}" />
				</c:if>
				
<%-- 				<input name="nombre" id="nombre" type="text" class="sep-text-medium" placeholder="" required  value="${nombre}" maxlength="50" />  --%>
				<small class="error">
					<spring:message code="administracionExpediente.v1.view.label.datosPersonales.nombre.requerido" />
				</small>
<%-- 				<c:set var="expedienteErrors"><form:errors path="name"/></c:set> --%>
<%-- 				<form:errors path="nombre" element="div" /> --%>
<%-- 					<spring:bind path="nombre"> --%>
<%-- 					  <c:if test="${status.error}"> --%>
<%-- 					    <spring:message code="administracionExpediente.v1.view.label.datosPersonales.nombre.requerido" /> --%>
<%-- 					  </c:if> --%>
<%-- 					</spring:bind> --%>
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
			<input name="numSeguroSocial" id="numeroSeguridadSocialEmpleado" class="sep-text-medium" type="text" placeholder="" value="${resultExpediente.expediente.numSeguroSocial}" maxlength="15"  ${numSeguroSocial== null ? 'disabled':''}  />
		</div>
		<!-- ---------------- CURP ---------------- -->
		<div class="small-4 columns">
			<label>
			<spring:message code="administracionExpediente.v1.view.label.datosPersonales.curp"  />
			<font color="red">*</font></label> 
<%-- 			<input ${curp?'disabled':''} id="curp" name="curp" type="text" class="sep-text-medium" placeholder=<spring:message code="administracionExpediente.v1.view.label.datosPersonales.curp"/> required value="${curp}" maxlength="18"  />  --%>
				<form:input id="curp" name="curp" path="curp" type="text" class="sep-text-medium" placeholder="" required="required" maxlength="18" value="${resultExpediente.expediente.curp}"  />
			<small class="error"><spring:message code="ER-044012"  /></small>
		</div>
		<!-- ---------------- RFC ---------------- -->
		<div class="small-4 columns">
				<label><spring:message code="administracionExpediente.v1.view.label.datosPersonales.rfc"  /><font color="red">*</font></label> 
<%-- 				<input name="rfc" id="rfcUsuario" type="text" class="sep-text-medium" placeholder="" required value="${rfc}" maxlength="13"  />  --%>
					<form:input name="rfc" id="rfcUsuario" path="rfc" type="text" class="sep-text-medium" placeholder="" required="required" value="${resultExpediente.expediente.rfc}" maxlength="13"  />
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
						 />
<!-- 						 <font color="red">*</font> -->
					</label> 
				<input
					name="fechaNacimiento" id="fechaNacimientoDatosPersonales"
					class="sep-text-medium" type="text"
					placeholder=""
					value="${fechaNacimiento}" maxlength="10" 
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
				<label><spring:message code="administracionExpediente.v1.view.label.datosPersonales.sexo" />
<!-- 				<font color="red">*</font> -->
				</label>
				<form:select name="cveSexo" id="cveSexo" path="cveSexo" class="sep-text-medium left" >
<!-- 						<option value="0">Masculino</option> -->
<!-- 						<option value="1">Femenino</option> -->
					<form:options items="${resultExpediente.generoList}" itemLabel="valor" itemValue="id"  />
				</form:select>
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
<!-- 						<font color="red">*</font> -->
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
						 />
<!-- 						 <font color="red">*</font> -->
						 </label>
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
				<label><spring:message 	code="administracionExpediente.v1.view.label.datosPersonales.paisNacimiento" />
<!-- 				<font color="red">*</font> -->
				</label>
				<select id="cvePais" name="cvePais" required="" class="sep-text-medium left" >
					<option value="0">M&eacute;xico</option>
				</select>
				<small class="error"><spring:message code="administracionExpediente.v1.view.label.datosPersonales.paisNacimiento.requerido" /></small>
			</div>
			<div id="combosEntidadMunicipio" style="display: none;">
				<!-- --------------- Entidad---------------- -->
				<div class="small-4 columns">
					<label>
					<spring:message code="administracionExpediente.v1.view.label.datosPersonales.entidad"/>
<!-- 					<font color="red">*</font> -->
					</label>	
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
					<label><spring:message code="administracionExpediente.v1.view.label.datosPersonales.municipioDelegacion" />
<!-- 					<font color="red">*</font> -->
					</label> 
					<select	id="municipioComboDatosPersonales" 
							name="cveMunicipio"	
					 		class="sep-text-medium left" >
							<option value="0">Cuauhtemoc</option>
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
	<div class="row">
		<label>&nbsp;&nbsp;&nbsp;Documentación
<!-- 		<font color="red">*</font> -->
		</label>
		<fieldset class="sep-fieldset">
			<div id="gridFiles" class="large-12 columns" style="overflow-y: scroll; max-height: 150px; font-size: 0.4rem;">	
			
					
					<div class="small-12 columns">
					
						<div class="small-4 columns">
							<div class="row collapse">
								<div class="small-3 columns">
									<img alt="" src="/met-vista/images/administracionExpediente/v1/documentoNoCargado.png" id="imgIO" class="imgDocumento">
								</div>
								<div class="small-9 columns">
										<label class="ExpedienteDatosPersonales" id="IO" name="T" alt="0"> Identificación Oficial</label>
								</div>
							</div>
						</div>
				
						<div class="small-4 columns">
							<div class="row collapse">
								<div class="small-3 columns">
									<img alt="" src="/met-vista/images/administracionExpediente/v1/documentoNoCargado.png" id="imgRFC" class="imgDocumento">
								</div>
								<div class="small-9 columns">					
										<label class="ExpedienteDatosPersonales" id="RFC" name="T" alt="0"> RFC</label>
								</div>
							</div>
						</div>
				
						<div class="small-4 columns">
							<div class="row collapse">
								<div class="small-3 columns">
									<img alt="" src="/met-vista/images/administracionExpediente/v1/documentoNoCargado.png" id="imgCURP" class="imgDocumento">
								</div>
								<div class="small-9 columns">
										<label class="ExpedienteDatosPersonales" id="CURP" name="T" alt="0"> CURP</label>
								</div>
							</div>
						</div>
					</div>
					
					<div class="small-12 columns">
						<div class="small-4 columns">
							<div class="row collapse">
								<div class="small-3 columns">
									<img alt="" src="/met-vista/images/administracionExpediente/v1/documentoNoCargado.png" id="imgAN" class="imgDocumento">
								</div>
								<div class="small-9 columns">
										<label class="ExpedienteDatosPersonales" id="AN" name="T" alt="0"> Acta de Nacimiento</label>
								</div>
							</div>
						</div>
					
						<div class="small-4 columns">
							<div class="row collapse">
								<div class="small-3 columns">
									<img alt="" src="/met-vista/images/administracionExpediente/v1/documentoNoCargado.png" id="imgCM" class="imgDocumento">
								</div>
								<div class="small-9 columns">
										<label class="ExpedienteDatosPersonales" id="CM" name="F" alt="0"> Cartilla Militar</label>
								</div>
							</div>
						</div>
				
						<div class="small-4 columns">
							<div class="row collapse">
								<div class="small-3 columns">
									<img alt="" src="/met-vista/images/administracionExpediente/v1/documentoNoCargado.png" id="imgCN" class="imgDocumento">
								</div>
								<div class="small-9 columns">
										<label class="ExpedienteDatosPersonales" id="CN" name="F" alt="0"> Carta de Naturalización</label>
								</div>
							</div>
						</div>
					
					</div>
					
				
					
					<div class="small-12 columns">
						<div class="small-4 columns">
							<div class="row collapse">
								<div class="small-3 columns">
									<img alt="" src="/met-vista/images/administracionExpediente/v1/documentoNoCargado.png" id="imgFM" class="imgDocumento">
								</div>
								<div class="small-9 columns">
										<label class="ExpedienteDatosPersonales" id="FM" name="F" alt="0"> Forma Migratoria</label>
								</div>
							</div>
						</div>
					
				
						<div class="small-4 columns">
							<div class="row collapse">
								<div class="small-3 columns"></div>
								<div class="small-9 columns"></div>
							</div>
						</div>
						<div class="small-4 columns">
							<div class="row collapse">
								<div class="small-3 columns"></div>
								<div class="small-9 columns"></div>
							</div>
						</div>
					</div>
		</div></fieldset>
	</div>

	<div class="row">

<%--	<g:if test="${datosPersonalesFile ==null|| datosPersonalesFile == '' ||datosPersonalesFile== [:] }">	--%>
<%--		<g:if test="${idOperacion == 'modificar' || idOperacion == 'crear'  || idOperacion == 'seguimiento'}">	--%>
			<div class="small-12 columns" id="cargaArchivoDatosPersonales">
				<label><spring:message code="administracionExpediente.v1.view.label.datosPersonales.documentosAdjuntos"	 /></label>
				<input type="file"  value="${datosPersonalesFile}" id="datosPersonalesFile" name="datosPersonalesFile" data-url="controller/upload" />
			</div>
<%--		</g:if> --%>
<%--	</g:if>--%>
	</div>
</body>
</html>
