<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

<%-- <script src="${resource(dir: 'js/administracionExpediente/v1/', file:'PantallaInicialFormacionAcademica.js')}" type="text/javascript"></script> --%>
<script type="text/javascript">
	var curpRequeridadError = '<spring:message code="ER-formacion-curpRequerida" javaScriptEscape="true" />';
	var faltaArchivo = 	'<spring:message code="ER-formacion-archivoNoExiste" javaScriptEscape="true" />';
	var reglaCurp = '<spring:message code="ER-formacion-reglaCurp" javaScriptEscape="true" />';
	var archivoRequerido = '<spring:message code="ER-formacion-archivoRequerido" javaScriptEscape="true" />';
	
	var nivel = '<spring:message code="administracionExpediente.v1.view.formacionAcademica.label.nivel" javaScriptEscape="true" />';
	var nivelError='<spring:message code="ER-044008" arguments="'+nivel+'" javaScriptEscape="true" />';
	
	var estatus = '<spring:message code="administracionExpediente.v1.view.formacionAcademica.label.estatus" javaScriptEscape="true" />';
	var estatusError = '<spring:message code="ER-044008" arguments="'+estatus+'" javaScriptEscape="true" />';
	
	var documento = '<spring:message code="administracionExpediente.v1.view.formacionAcademica.label.documento" javaScriptEscape="true" />';
	var documentoError = '<spring:message code="ER-044008" arguments="'+documento+'" javaScriptEscape="true" />';
	
	var institucionSelect = '<spring:message code="administracionExpedinete.v1.view.formacionAcademica.label.institucionSelect" javaScriptEscape="true" />';
	var errorInstitucionReq = '<spring:message code="ER-044008" arguments="'+institucionSelect+'"  javaScriptEscape="true" />';
	
	var institucion = '<spring:message code="administracionExpedinete.v1.view.formacionAcademica.label.institucion"  javaScriptEscape="true" />';
	var errorNombreInstitucionReq = '<spring:message code="ER-044008" arguments="'+institucion+'"  javaScriptEscape="true" />';
	
	var carrera= '<spring:message code="administracionExpediente.v1.view.formacionAcademica.label.carrera"  javaScriptEscape="true" />';
	var errorCarreraReq = '<spring:message code="ER-044008" arguments="'+carrera+'" javaScriptEscape="true" />';
	
	//var institucion = '<spring:message code="administracionExpedinete.v1.view.formacionAcademica.label.institucion"  javaScriptEscape="true" />';
	var alfanumerico = '<spring:message code="administracionExpediente.v1.view.label.datosGenerales.alfanumerico" javaScriptEscape="true" />';
	var errorNombreInstitucionAlfanum = '<spring:message code="ER-044006" arguments="'+institucion+','+alfanumerico+'"  javaScriptEscape="true" />';
	
	//var carrera = '<spring:message code="administracionExpediente.v1.view.formacionAcademica.label.carrera"  javaScriptEscape="true" />';
	//var alfanumerico = '<spring:message code="administracionExpediente.v1.view.label.datosGenerales.alfanumerico" javaScriptEscape="true" />';
	var errorCarreraAlfanum = '<spring:message code="ER-044006" arguments="'+carrera+','alfanumerico'"  javaScriptEscape="true" />';
	
	var carreraError = '<spring:message code="ER-formacion-carrera" javaScriptEscape="true" />'
	var anos = '<spring:message code="administracionExpedinete.v1.view.formacionAcademica.label.anos"  javaScriptEscape="true" />';
	
	var	anosEstudiosError = '<spring:message code="ER-044008" arguments="'+anos+'"  javaScriptEscape="true" />';
	var	errorNomenclaturaNivel = '<spring:message code="administracionExpediente.v1.groovy.error.formacionAcademica.nomenclatura.nivel"  javaScriptEscape="true" />';
	var errorArchivosZip = '<spring:message code="administracionExpediente.v1.groovy.error.formacionAcademica.error.archivos.zip"  javaScriptEscape="true" />';
	var nivelInferiorError='<spring:message code="ER-nivel-inferior" javaScriptEscape="true" />'
	var formacionAcademicaErrorGeneral='<spring:message code="ER-formacion-genenral" javaScriptEscape="true" />'
	
	var cedulaProfesional = '<spring:message code="administracionExpediente.v1.view.formacionAcademica.label.cedulaProfesional"  javaScriptEscape="true" />';
	var numeroDeCedulaError = '<spring:message code="ER-044008" arguments="'+cedulaProfesional+'"  javaScriptEscape="true" />' ;
	
	var institutoUPN = '<spring:message code="administracionExpedinete.v1.view.formacionAcademica.institucion.upn"  javaScriptEscape="true" />';
	var seleccioneOpcion = '<spring:message code="met.administracionExpediente.v1.view.label.selectDefault" javaScriptEscape="true" />';
</script>
<%-- <link rel="stylesheet" href="${resource(dir: 'css/noty', file: 'noty.css',plugin:'in-sane-fwk')}"></link> --%>
<title>Formacion Academica</title>

</head>
<body>
	<!--  insane:insaneForm processInstance="${processInstance}" id="esquemaPagoForm"-->
	<div class="large-12 columns" align="center">
		<input type="hidden" id="selectCarreraAnios" value="" />
		<input type="hidden" id="inputCarrera" value="" />
		<input type="hidden" id="idsDocumentos" value=""/>
		<input type="hidden" id="idsLicNivel" value=""/>
		<input type="hidden" id="idOperacion" value="${idOperacion}" /> 
		<input type="hidden" id="listaNivelesExistentes" value="" />
		<input type="hidden" id="nivelesPermitidos" value="" />
		<input type="hidden" id="codigosArchivos" value="" />
		<input type="hidden" id="codigosArchivosNivelSuperiorCedulas" value="" />
		<input type="hidden" id="carrerasBaseUPN" value="" />
<!-- TODO: validar uso del mapaDatosFormacion que se modifico en los siguientes tags-->
<%-- 		<met:transformarListaArchivos id="listaFormacionAcademica" lista="${extraData?.listaFormacionAcademica}"></met:transformarListaArchivos> --%>
		<input type="hidden" id="listaFormacionAcademicaJson" value="">
		<input type="hidden" id="anosNivelAcademicaSuperior" value="" />
<!-- Fin -->
		<div style="padding: 0; margin: 0; width: 100%; height: 100%"
			class="large-12 columns">

				<div class="row">
					<small class="error" id="errorArchivo" style="display: none">
						<spring:message code="administracionExpediente.v1.view.error.formacionAcademica.archivo" />
					</small>
				</div>
				<div class="row">
					<small class="error" id="errorArchivoRequerido" style="display: none">
						<spring:message code="administracionExpediente.v1.view.error.formacionAcademica.archivoRequerido" />
					</small>
				</div>
				<div class="small-1"></div>
				<div id="contenidoFormulario" class="large-11">
					<div class="row">
						<div class="medium-4 columns">
							<label align="left">
							<spring:message code="administracionExpediente.v1.view.formacionAcademica.label.nivel" /> <font color="red">*</font></label> 
							<select class="formacionAcademica sep-text-medium left" id="nivelAcademico" tabindex="1">
								<option value="">
									<spring:message code="met.administracionExpediente.v1.view.label.selectDefault" /></option>
<%-- 								<g:each in="${niveles}" var="nivel"> --%>
<%-- 									<option value="${nivel.id}"> --%>
<%-- 										${nivel.claveDescripcion} --%>
<!-- 									</option> -->
<!-- 								</g:each> -->
							</select>
							<small class="error">
								<spring:message code="ER-044008" arguments='<spring:message code="administracionExpediente.v1.view.formacionAcademica.label.nivel" />' />
							</small>
						</div>
						<div class="medium-4 columns">
							<label align="left" id="laberAnos">
								<spring:message code="administracionExpedinete.v1.view.formacionAcademica.label.anos"  /><font color="red">*</font>
							</label>
							<select class="formacionAcademica sep-text-medium left" id="anosEstudios" tabindex="1" name = "anosEstudios" >
								<option value="">
									<spring:message code="met.administracionExpediente.v1.view.label.selectDefault"  />
								</option>
							</select>
						</div>
						<%--
						--%><div class="medium-2 columns"></div>
					</div>
					<div class="row">
						<div class="medium-4 columns">
							
								<label align="left"><spring:message
										code="administracionExpedinete.v1.view.formacionAcademica.label.institucionSelect"
										 /><font color="red">*</font>
								</label>
								<select class="formacionAcademica sep-text-medium left" id="institucion" name = "institucion" tabindex="1" >
									<option value="">
										<spring:message code="met.administracionExpediente.v1.view.label.selectDefault"  />
									</option>
<%-- 									<g:each in="${institucionesUPN}" var="institucion"> --%>
<%-- 										<option value="${institucion.id}"> --%>
<%-- 											${institucion.descripcion} --%>
<!-- 										</option> -->
<!-- 									</g:each> -->
								</select> 
						</div>
						<div class="medium-4 columns">
							<label align="left">
							<spring:message code="administracionExpedinete.v1.view.formacionAcademica.label.institucion" />
							<font color="red">*</font></label> 
							<input type="text" id="nombreInstitucion" name = "nombreInstitucion" class="formacionAcademica sep-text-medium left" tabindex="2" maxlength="150" />
							<small class="error">
								<spring:message code="ER-044008" arguments='<spring:message code="administracionExpediente.v1.view.formacionAcademica.label.institucion.args" />' />
							</small>
						</div>
						<div class="medium-2 columns"></div>
					</div>
					<div class="row">
						<div class="medium-4 columns" id="divCarrera">
							<label align="left" id="labelCarrera">
								<spring:message code="administracionExpediente.v1.view.formacionAcademica.label.carrera"  /><font color="red" id="carreraFA">*</font>
							</label> 
							<select class="formacionAcademica sep-text-medium left" id="carrera" tabindex="5" name="labelCarrera" >
								<option value="">
									<spring:message code="met.administracionExpediente.v1.view.label.selectDefault"  />
								</option>
<%-- 								<g:each in="${carrerasUPN}" var="carrera"> --%>
<%-- 									<option value="${carrera.id}"> --%>
<%-- 										${carrera.descripcion} --%>
<!-- 									</option> -->
<!-- 								</g:each>	 -->
							</select> 	
						</div>
						<div class="medium-4 columns">
							<label align="left">
								<spring:message code="administracionExpediente.v1.view.formacionAcademica.label.documento" /> 
							<font color="red">*</font></label> 
							<select
								class="formacionAcademica sep-text-medium left"  id="documento" tabindex="5">
								<option value="">
									<spring:message code="met.administracionExpediente.v1.view.label.selectDefault" />
								</option>
<%-- 								<g:each in="${documentos}" var="documento"> --%>
<%-- 									<option value="${documento.id}"> --%>
<%-- 										${documento.descripcion} --%>
<!-- 									</option> -->
<!-- 								</g:each> -->
							</select> 
							<small class="error">
								<spring:message code="ER-044008" arguments='<spring:message code="administracionExpediente.v1.view.formacionAcademica.label.documento" />' />
							</small>
						</div>
						<div class="medium-2 columns"></div>
					</div>
					<div class="row">
						<div class="medium-4 columns">
							<label align="left">
									<spring:message code="administracionExpediente.v1.view.formacionAcademica.label.cedulaProfesional" /> <font color="red">*</font>
							</label>
									<input id="cedulaProfecional" class="formacionAcademica sep-text-medium left" type="text" name="cedulaProfecional" maxlength="10" type="text" pattern="(^(([0-9]){0,10})$)"/>
							<small class="error">
								<spring:message code="ER-cedula-numerico" arguments="" />
							</small>
						</div>
						<div class="medium-4 columns" id="cargaArchivoFormacionAcademica">
							<div>
								<label align="left">
								<spring:message code="administracionExpediente.v1.view.formacionAcademica.label.documentoAdjunto" />
								<font color="red" id="documentoFormacionAcademica">*</font></label>
							</div>
							<div>
<%-- 							<g:if test="${formacionAcademicaFile ==null|| formacionAcademicaFile == '' || formacionAcademicaFile == [:]}">	 --%>
<!-- 								<insane:uploadMetFileRow id="formacionAcademicaFile" tabindex="6"></insane:uploadMetFileRow> -->
<!-- 							</g:if> -->
							</div>
						</div>
						<div class="medium-2 columns" style="width: 30%" id="botonesFormacionAcademica">
							<input class="left button tiny" id="botonAgregarFormacionAcademica" type="button" value="Agregar" tabindex="7" />
							<input class="right button tiny" type="button" id="botonLimpiarFormacionAcademica" value="Limpiar" style="display: none;" tabindex="8" />
						</div>
					</div>
				</div>

			<dl class="accordion" data-accordion>
				<dd>
					<a class="large-12 columns" style="cursor: default; background: #e3e3e3" align="left"> 
						<spring:message code="administracionExpediente.v1.view.formacionAcademica.label.nivel" />
					</a>
					<div style="padding: 0rem">
						<table class="large-12 columns" id="tablaDatos" style="border: 1px solid rgb(187, 187, 187);">
							<tr>
								<th>
									<span data-tooltip class="has-tip" title="<spring:message code='administracionExpediente.v1.view.formacionAcademica.label.nivelTable' />" >
										<spring:message code="administracionExpediente.v1.view.formacionAcademica.label.nivelTable" 	 />
									</span>
								</th>
								<th>
									<span data-tooltip class="has-tip" title="<spring:message code='administracionExpedinete.v1.view.formacionAcademica.label.anos' />">
										<spring:message code="administracionExpedinete.v1.view.formacionAcademica.label.anos"  />
									</span>
								</th>
								<th>
									<span data-tooltip class="has-tip" title="<spring:message code='administracionExpedinete.v1.view.formacionAcademica.label.institucionTable' />" >
										<spring:message code="administracionExpedinete.v1.view.formacionAcademica.label.institucionTable" />
									</span>
								</th>
								<th>
									<span data-tooltip class="has-tip" title="<spring:message code='administracionExpediente.v1.view.formacionAcademica.label.carrera' />" >
										<spring:message code="administracionExpediente.v1.view.formacionAcademica.label.carrera" />
									</span>
								</th>
								<th>
									<span data-tooltip class="has-tip" title="<spring:message code='administracionExpediente.v1.view.formacionAcademica.label.documento' />" >
										<spring:message code="administracionExpediente.v1.view.formacionAcademica.label.documento" />
									</span>
								</th>
								<th>
									<span data-tooltip class="has-tip" title="<spring:message code='administracionExpediente.v1.view.formacionAcademica.label.cedula' />" >
										<spring:message code="administracionExpediente.v1.view.formacionAcademica.label.cedula" />
									</span>
								</th>
								<th>
									<span data-tooltip class="has-tip" 	title="<spring:message code='administracionExpedinete.v1.view.formacionAcademica.label.documentacion' />" >
										<spring:message code="administracionExpedinete.v1.view.formacionAcademica.label.documentacion"  />
									</span>
								</th>
<%-- 							<g:if test="${(perfilName == 'Captura_UR' & idOperacion != 'consultar')  }"> --%>
									<th id="columnaEliminarFormacionAcademica">Borrar</th>
<!-- 							</g:if>								 -->
							</tr>
						</table>
					</div>
				</dd>
			</dl>
		</div>
	</div>
	<!-- /insane:insaneForm -->
	<script>
// 		var aniosSelect = "<select class=\"formacionAcademica sep-text-medium left\" id=\"anosEstudios\" tabindex=\"1\" "+jQuery("#selectCarreraAnios").val()+"></select>"
// 		var carreraInput = " <input id=\"carrera\" class=\"formacionAcademica sep-text-medium left\" tabindex=\"3\" "+jQuery("#inputCarrera").val()+" maxlength=\"50\" type=\"text\" pattern=\"((^([A-Za-z\u00D1\u00F1\u00C1\u00E1\u00C9\u00E9\u00CD\u00ED\u00D3\u00F3\u00DA\u00FA\u00DC\u00FC])*)((\\s{0,1})([A-Za-z\u00D1\u00F1\u00C1\u00E1\u00C9\u00E9\u00CD\u00ED\u00D3\u00F3\u00DA\u00FA\u00DC\u00FC])+)*$)\" /><small class=\"error\"></small>"
// 		var carreraSelect = "<select class=\"formacionAcademica sep-text-medium left\" id=\"carrera\" tabindex=\"5\"  "+jQuery("#selectCarreraAnios").val()+" ></select>";
	</script>
</body>
</html>