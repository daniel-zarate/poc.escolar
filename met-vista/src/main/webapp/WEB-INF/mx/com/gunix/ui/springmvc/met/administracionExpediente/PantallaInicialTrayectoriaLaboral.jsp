<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<title>Trayectoria Laboral</title>
	<script type="text/javascript">
	
	
		var depenEntidad='<spring:message code="administracionExpediente.v1.view.label.trayectoriaLaboral.depenEntidad" javaScriptEscape="true" />';
		var mgeErrorDependencia='<spring:message code= "ER-044008" arguments="'+depenEntidad+'" javaScriptEscape="true" />';
		
		var regimen='<spring:message code= "administracionExpediente.v1.view.label.trayectoriaLaboral.regimen" javaScriptEscape="true" />'
		var mgeErrorRegimen = '<spring:message code= "ER-044008" arguments="'+regimen+'"  javaScriptEscape="true" />';
		
		var ahorroSolidario = '<spring:message code= "administracionExpediente.v1.view.label.trayectoriaLaboral.ahorroSolidario" javaScriptEscape="true" />'
		var mgeErrorAhorro = '<spring:message code= "ER-044008" arguments="'+ahorroSolidario+'" javaScriptEscape="true" />' ;		
		
		var antiguedad = '<spring:message code= "administracionExpediente.v1.view.label.trayectoriaLaboral.antiguedad" javaScriptEscape="true" />'
		var mgeErrorAntiguedad= '<spring:message code= "ER-044008" arguments="'+antiguedad+'" javaScriptEscape="true" />' ;
		
		var rama = '<spring:message code= "administracionExpediente.v1.view.label.trayectoriaLaboral.rama" javaScriptEscape="true" />';
		var mgeErrorRama = '<spring:message code= "ER-044008" arguments="'+rama+'" javaScriptEscape="true" />';
		
		var periodo = '<spring:message code= "administracionExpediente.v1.view.label.trayectoriaLaboral.periodo" javaScriptEscape="true" />'
		var mgeErrorPeriodo = '<spring:message code= "ER-044008" arguments="'+periodo+'" javaScriptEscape="true" />';
		
		
		var mgeErrorFormatoArchivo ='<spring:message code= "administracionExpediente.v1.view.trayectoriaLaboral.error.formato.archivo.subido" javaScriptEscape="true" />';
		var fechaDesdeError ='<spring:message code= "administracionExpediente.v1.view.trayectoriaLaboral.error.fechaMenorHasta" javaScriptEscape="true" />';
		
		var fechasIgualesError = '<spring:message code= "administracionExpediente.v1.view.trayectoriaLaboral.error.fechasIgualesError" javaScriptEscape="true" />';
		var fechaInicioError = '<spring:message code= "ER-044008" arguments="'+fechasIgualesError+'" javaScriptEscape="true" />';
		
		var mgeErrorFechaInicio = '<spring:message code= "administracionExpediente.v1.view.error.trayectoriaLaboral.fechaDesde" javaScriptEscape="true" />';
		var archivoReq ='<spring:message code= "administracionExpediente.v1.view.trayectoriaLaboral.error.archivoReq" javaScriptEscape="true" />';
		var primerReg ='<spring:message code= "administracionExpediente.v1.view.trayectoriaLaboral.error.primerReg" javaScriptEscape="true" />';
		var fechaPorTipoPer ='<spring:message code= "administracionExpediente.v1.view.trayectoriaLaboral.error.fechaPorTipoPer" javaScriptEscape="true" />';
		var errorCalculo ='<spring:message code= "administracionExpediente.v1.view.trayectoriaLaboral.error.errorCalculo" javaScriptEscape="true" />';
		var currentProfile = "${perfilName}"
	</script>
	
<%-- 	<script src="${resource(dir: 'js/administracionExpediente/v1/', file: 'PantallaInicialTrayectoriaLaboral.js')}" type="text/javascript"></script> --%>
	
	<style type="text/css">
	
	img.ui-datepicker-trigger {
	    position: absolute;  
	    top: 45%;  
	    right: -5px;;
	}
	
	</style>	
</head>

<body>
		
		<input type="hidden" id="idsCombos" value="">	
		<input type="hidden" id="operacionTrayectoriaLaboral" value="${idOperacion}">		 
		<input type="hidden"  id="mapaClaveCasDocumento" value="">
		<input type="hidden"  id="lstDocumentosTrayectoriaLaboral" value="">
<%-- 		 <met:transformarListaArchivos id="listaTrabajadorTrayectoriaLaboral" lista="${extraData?.listaTrabajadorTrayectoriaLaboral}" ></met:transformarListaArchivos> --%>
		 <input type="hidden" value="" id="codigoArchivosTrabajadorTrayectoriaLaboral" />
 		<input type="hidden" id="idRegimenTrayectoriaLaboral"  value="${regimenTrayectoriaLaboral}"/>
 		<input type="hidden" id="idAhorroSolidario"  value="${ahorroSolidario}"/>
		<div class ="small-12 columns">		
			<div class ="small-12 columns">
				<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<spring:message code="administracionExpediente.v1.view.label.trayectoriaLaboral.regimen" /><font color="red">*</font></b>				
				<fieldset class="sep-fieldset">										
					<div class="row">
<%-- 							<g:if test="${listaRegimenes?.sort()}" class="trayectoriaLaboral sep-text-medium"> --%>
								
<%-- 								<g:each in="${listaRegimenes}" var="regimen"> --%>
					
<!-- 									<div class="small-1 columns">		 -->
											
<%-- 										<g:if test="${regimen.clave == 'DT'}"> --%>
<%-- 											<g:if test="${regimenTrayectoriaLaboral != null}"> --%>
<%-- 												<input type="radio" ${regimenTrayectoriaLaboral == regimen.id  && perfilName != 'Captura_UR'?'checked="checked" disabled':existeBD==true?'disabled':'' }   id="${regimen.id}" name="regimenTrayectoriaLaboral" class="class_${regimen.clave}" value="${regimen.id}"/>															 --%>
<!-- 											</g:if> -->
<!-- 											<g:else> -->
<%-- 												<input type="radio" ${regimenTrayectoriaLaboral && perfilName != 'Captura_UR'?' disabled':	'' }  id="${regimen.id}" name="regimenTrayectoriaLaboral" class="class_${regimen.clave}" value="${regimen.id}"/> --%>
<!-- 											</g:else>	 -->
<!-- 										</g:if> -->
<%-- 										<g:if test="${regimen.clave == 'CI'}"> --%>
<%-- 											<g:if test="${regimenTrayectoriaLaboral != null}"> --%>
<%-- 												<input type="radio" ${regimenTrayectoriaLaboral == regimen.id  && perfilName != 'Captura_UR'?'checked="checked" disabled':existeBD==true?'disabled':'' }    <insane:insaneInput type="radio"  name="regimenTrayectoriaLaboral"/> id="${regimen.id}" name="regimenTrayectoriaLaboral" class="class_${regimen.clave}" value="${regimen.id}"/> --%>

												<script type="text/javascript">
// 												var validaPerfil = "${perfilName != 'Captura_UR'?false:true}"
// 												var condicion = "${regimenTrayectoriaLaboral == regimen.id}"
// 												var existeBD = "${existeBD !=  null ? existeBD :false}"

													
// 												if(condicion && validaPerfil && existeBD !=false ){
// 													jQuery("#ahorroSolidario").attr("disabled",false);
// 												}
												</script>

<!-- 											</g:if> -->
<!-- 											<g:else> -->
<%-- 												<input type="radio"  ${regimenTrayectoriaLaboral  && perfilName != 'Captura_UR'?' disabled':'' } <insane:insaneInput type="radio"  name="regimenTrayectoriaLaboral"/> id="${regimen.id}" name="regimenTrayectoriaLaboral" class="class_${regimen.clave}" value="${regimen.id}"/> --%>
<!-- 											</g:else> -->
<!-- 										</g:if>								 -->
<!-- 									</div> -->
<!-- 									<div class="small-3 columns">				 -->
<!-- 										<label> -->
<%-- 												${regimen.descripcion}  --%>
<!-- 										</label> -->
<!-- 									</div>													  -->
<!-- 								</g:each> -->
<!-- 							</g:if>	 -->
							
							<!-- TODO: quitar hardcode inicio -->
							<div class="small-1 columns">
								<input type="radio"  id="0" name="regimenTrayectoriaLaboral" class="class_CI" value="0"/>
							</div>
							<div class="small-3 columns">
									<label>
												Cuentas Individuales 
									</label>
							</div>
							<div class="small-1 columns">
								<input type="radio"  id="1" name="regimenTrayectoriaLaboral" class="class_DT" value="1"/>
							</div>
							<div class="small-3 columns">
									<label>
												D&eacute;cimo Transitorio
									</label>
							</div>
							<!-- TODO: quitar hardcode fin -->
							
							
							<div class="small-4 columns">
								<label><spring:message code="administracionExpediente.v1.view.label.trayectoriaLaboral.ahorroSolidario" /></label>
								<select  id="ahorroSolidario" name="ahorroSolidario" >
									<option value="" selected="selected" disabled="disabled">
										<spring:message code="met.administracionExpediente.v1.view.label.selectDefault" />
									</option>
<%-- 									<g:each in="${listaAhorroSolidario}" var="ahorroSolidario"> --%>
<%-- 										<option value="${ahorroSolidario.id}" >${ahorroSolidario.descripcion}</option> --%>
<!-- 									</g:each> -->
								</select>
								 <small class="error"><spring:message code="administracionExpediente.v1.view.error.trayectoriaLaboral.seleccionar" /></small>
	
							</div>
				</div>
			</fieldset>
		</div>
		<div class ="small-12 columns">
				<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<spring:message code="administracionExpediente.v1.view.label.trayectoriaLaboral.aniosServ" /></b>	
				<fieldset class="sep-fieldset">
						<div class="row">
								<div class="small-4 columns">
									 <label><spring:message code="administracionExpediente.v1.view.label.trayectoriaLaboral.depenEntidad"/><font color="red">*</font></label>
								</div>
								<div class="small-4 columns">
									 <label><spring:message code="administracionExpediente.v1.view.label.trayectoriaLaboral.antiguedad"/><font color="red">*</font></label>
								</div>
								<div class="small-4 columns">
									 <label><spring:message code="administracionExpediente.v1.view.label.trayectoriaLaboral.rama" /></label>
								</div>
						</div>
						<div class="row">
								
								<div class="small-4 columns">
									 <input id="dependencia" name="dependencia" class="trayectoriaLaboral sep-text-medium"  type="text" maxlength="150"/>
									 <small class="error"><spring:message code="administracionExpediente.v1.view.error.trayectoriaLaboral.dependencia" /></small>
								</div>

								<div class="small-4 columns">
<%-- 									 <insane:insaneSelect id="tipoAntiguedad" name="tipoAntiguedad" from="${listaTipoAntiguedad}" noSelection="${['': message(code:'met.administracionExpediente.v1.view.label.selectDefault',locale:'es_MX')]}" class="trayectoriaLaboral sep-text-medium left" value="${antiguedad}" optionKey="id" optionValue="descripcion"/> --%>
									 <form:select id="tipoAntiguedad" path="tipoAntiguedad" items="${listaTipoAntiguedad}" cssClass="trayectoriaLaboral sep-text-medium left" >
									 	<form:option value=""><spring:message code='met.administracionExpediente.v1.view.label.selectDefault' /></form:option>
									 </form:select>
									 <small class="error"><spring:message code="administracionExpediente.v1.view.error.trayectoriaLaboral.seleccionar" /></small>
								</div>

								<div class="small-4 columns">
<%-- 									 <insane:insaneSelect id="tipoRama" name="tipoRama" from="${listaTipoRama}" noSelection="${['': message(code:'met.administracionExpediente.v1.view.label.selectDefault',locale:'es_MX')]}" class="trayectoriaLaboral sep-text-medium left" value="${tipoRama}" optionKey="id" optionValue="descripcion"/> --%>
									<form:select id="tipoRama" path="tipoRama" items="${listaTipoRama}" cssClass="trayectoriaLaboral sep-text-medium left" >
									 	<form:option value=""><spring:message code='met.administracionExpediente.v1.view.label.selectDefault' /></form:option>
									 </form:select>
									 <small class="error"><spring:message code="administracionExpediente.v1.view.error.trayectoriaLaboral.seleccionar" /></small>
								</div>
			 			</div>
			 			
			 			<div class="row">
								<div class="small-4 columns">
									 <label><spring:message code="administracionExpediente.v1.view.label.trayectoriaLaboral.periodo" /><font color="red">*</font></label>
<%-- 								 <insane:insaneSelect id="tipoPeriodo" name="tipoPeriodo" from="${listaTipoPeriodo}" noSelection="${['': message(code:'met.administracionExpediente.v1.view.label.selectDefault',locale:'es_MX')]}" class="trayectoriaLaboral sep-text-medium left"  optionKey="id" optionValue="descripcion"/> --%>
									  <form:select id="tipoPeriodo" path="tipoPeriodo" items="${listaTipoPeriodo}" cssClass="trayectoriaLaboral sep-text-medium left" >
									 	<form:option value=""><spring:message code='met.administracionExpediente.v1.view.label.selectDefault' /></form:option>
									 </form:select>
									  <small class="error"><spring:message code="administracionExpediente.v1.view.error.trayectoriaLaboral.seleccionar" /></small>
								</div>
								
								<div class="small-4 columns">
									 <label><spring:message code="administracionExpediente.v1.view.label.trayectoriaLaboral.desde" /><font color="red">*</font></label>
										<input type="text" name="fechaInicio" id="fechaInicio" class="trayectoriaLaboral sep-text-medium" maxlength="10" placeholder='<spring:message code="administracionExpediente.v1.view.label.trayectoriaLaboral.desde" />' />
										<small class="error"><spring:message code="administracionExpediente.v1.view.error.trayectoriaLaboral.fechaDesde" /></small>
								</div>
								
								<div class="small-4 columns">
									 <label><spring:message code="administracionExpediente.v1.view.label.trayectoriaLaboral.hasta" /></label>
									 <input type="text" name="fechaFinal" id="fechaFinal" class="trayectoriaLaboral sep-text-medium" maxlength="10" placeholder='<spring:message code="administracionExpediente.v1.view.label.trayectoriaLaboral.hasta"/>' />
									 <small class="error"><spring:message code="administracionExpediente.v1.view.error.trayectoriaLaboral.fechaHasta" /></small>
								</div>
						</div><%--
						<div class="row" id="labelDocumentosAdjuntos">
								<div class="small-4 columns">
									 <label><spring:message code="administracionExpediente.v1.view.label.trayectoriaLaboral.documentosAdjuntos" /><font color="red" id="documentoRequeridoTrayectoria">*</font></label>
								</div>
						</div>--%>
						<div class="row" id="botonesTrayectoriaLaboral">
								<div class="medium-5 columns">
<%-- 									<g:if test="${mapDoctosTrayectoriaLaboralFile ==null|| mapDoctosTrayectoriaLaboralFile == '' || mapDoctosTrayectoriaLaboralFile == [:]}">	 --%>
										<label><spring:message code="administracionExpediente.v1.view.label.trayectoriaLaboral.documentosAdjuntos" /><font color="red" id="documentoRequeridoTrayectoria">*</font></label>
<%-- 										 <insane:uploadMetFile id="mapDoctosTrayectoriaLaboralFile"  value="${mapDoctosTrayectoriaLaboralFile}"/> --%>
										<input type="file" id="mapDoctosTrayectoriaLaboralFile" name="mapDoctosTrayectoriaLaboralFile" />
<!-- 									</g:if> -->
								</div>		
								<div class="medium-2 columns">
									 <input class="button tiny" type="button" id="botonAgregarTrayectoriaLaboral" name="idAccion" value="Agregar"/>
								</div>	
								<div class="medium-2 columns">
									 <input class="button tiny" type="button" id="botonLimpiarTrayectoriaLaboral" style="display: none;" name="idAccion" value="Limpiar"/>
								</div>		
								<div class="medium-3 columns"></div>					
						</div>
						<br/>
						<br/>
						<div class="row">						
							<dl class="accordion" data-accordion>
					          <dd>
					             <div class="content active" style="padding: 0rem">       
					                <table class="small-12" id="tablaTrayectoriaLaboral" style="border: 1px solid rgb(187, 187, 187);">
					                    <tr>
					                        <th>
						                        <span data-tooltip class="has-tip" title=<spring:message code='administracionExpediente.v1.view.label.trayectoriaLaboral.depenEntidad' />>
						                        <spring:message code="administracionExpediente.v1.view.label.trayectoriaLaboral.depenEntidad"  /></span>
											</th>
					                        
					                        <th>
						                        <span data-tooltip class="has-tip" title='<spring:message code="administracionExpediente.v1.view.label.trayectoriaLaboral.antiguedad" />'>
						                        <spring:message code="administracionExpediente.v1.view.label.trayectoriaLaboral.antiguedad"  /></span>
											</th>
											
											<th>
						                        <span data-tooltip class="has-tip" title='<spring:message code="administracionExpediente.v1.view.label.trayectoriaLaboral.rama" />'>
						                        <spring:message code="administracionExpediente.v1.view.label.trayectoriaLaboral.rama"  /></span>
											</th>
											
											<th>
						                        <span data-tooltip class="has-tip" title="<spring:message code="administracionExpediente.v1.view.label.trayectoriaLaboral.periodo" />">
						                        <spring:message code="administracionExpediente.v1.view.label.trayectoriaLaboral.periodo"  /></span>
											</th>
					                         
					                        <th>
						                        <span data-tooltip class="has-tip" title="<spring:message code="administracionExpediente.v1.view.label.trayectoriaLaboral.desde" />" >
						                        <spring:message code="administracionExpediente.v1.view.label.trayectoriaLaboral.desde"  /></span>
											</th>
											
											<th>
						                        <span data-tooltip class="has-tip" title="<spring:message code="administracionExpediente.v1.view.label.trayectoriaLaboral.hasta" />" >
						                        <spring:message code="administracionExpediente.v1.view.label.trayectoriaLaboral.hasta"  /></span>
											</th> 
											
											<th>
												<span data-tooltip class="has-tip" title="<spring:message code="administracionExpediente.v1.view.label.trayectoriaLaboral.documento" />" >
						                        <spring:message code="administracionExpediente.v1.view.label.trayectoriaLaboral.documento"  /></span>
											</th>
											
<%-- 											<g:if test="${(perfilName == 'Captura_UR' & idOperacion != 'consultar')  }"> --%>
												<th>
													<span data-tooltip class="has-tip" title="<spring:message code="administracionExpediente.v1.view.label.trayectoriaLaboral.borrar" />" >
						                        	<spring:message code="administracionExpediente.v1.view.label.trayectoriaLaboral.borrar"  /></span>
												</th>
<!-- 											</g:if>	 -->
											
											
										
										</tr>
									
									</table>
					            </div>
					         </dd>
					     </dl>						
					</div>	
					<br/>
					<br/>	
					
					<!-- FIELDSET DE TOTAL GOBIERNO FEDERAL + SEP -->
					<div class ="small-12 columns">
					<div class="small-2 columns">
      &nbsp;
  </div> 
      <div class="small-10 columns">
				<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<spring:message code="administracionExpediente.v1.view.label.trayectoriaLaboral.totalGobiernoMasSep" /></b>	
				<fieldset class="sep-fieldset">
				
				<div class="row">
							<div class="small-9 columns">&nbsp;</div>							

							<div class="small-1 columns">
								 <label><spring:message code="administracionExpediente.v1.js.label.trayectoriaLaboral.anios" /></label>
							</div>
										
							<div class="small-1 columns">
								 <label><spring:message code="administracionExpediente.v1.js.label.trayectoriaLaboral.meses" /></label>
							</div>
										
							<div class="small-1 columns">
								 <label><spring:message code="administracionExpediente.v1.js.label.trayectoriaLaboral.dias" /></label>
							</div>																								
					</div>
					
					<!-- GF -->	
					<div class="row">
							<div class="small-5 columns">&nbsp;</div>
					
							<div class="small-4 columns">
								<label class="right sep-text-medium"><spring:message code="administracionExpediente.v1.view.label.trayectoriaLaboral.gf" /></label>
							</div>

							<div class="small-1 columns">
								<input  name="anioGF" id="anioGF" class="sep-text-medium" maxlength="2" type="text"  value="0"/> 
							</div>
										
							<div class="small-1 columns">
								 <input  name="mesGF" id="mesGF" class="sep-text-medium" maxlength="2" type="text"  value="0"/>
							</div>
										
							<div class="small-1 columns">
								 <input  name="diaGF" id="diaGF" class="sep-text-medium" maxlength="2"  value="0"/>
							</div>																				
					</div>	
				<!-- SEP -->	
					<div class="row">
							<div class="small-7 columns">&nbsp;</div>
					
							<div class="small-2 columns">
								<label class="right sep-text-medium"><spring:message code="administracionExpediente.v1.view.label.trayectoriaLaboral.sep" /></label>
							</div>

							<div class="small-1 columns">
								<input  name="anioSEP" id="anioSEP" class="sep-text-medium" maxlength="2"  value="0"/> 
							</div>
										
							<div class="small-1 columns">
								 <input  name="mesSEP" id="mesSEP" class="sep-text-medium" maxlength="2" type="text"  value="0"/>
							</div>
										
							<div class="small-1 columns">
								 <input  name="diaSEP" id="diaSEP" class="sep-text-medium" maxlength="2" type="text" value="0"/>
							</div>																				
					</div>	
					
					<!-- TOTAL GOBIERNO FEDERAL + SEP -->	
					<div class="row">
							<div class="small-9 columns">&nbsp;</div>	

							<div class="small-1 columns">
								<b> <input  name="anioTotalGfSep" id="anioTotalGfSep" class="sep-text-medium" maxlength="2" type="text"  value="0"/></b>
							</div>
										
							<div class="small-1 columns">
								<b> <input  name="mesTotalGfSep" id="mesTotalGfSep" class="sep-text-medium" maxlength="2" type="text"  value="0"/></b>
							</div>
										
							<div class="small-1 columns">
								 <b> <input  name="diaTotalGfSep" id="diaTotalGfSep" class="sep-text-medium" maxlength="2" type="text"  value="0"/></b>
							</div>																				
					</div>	
				
				</fieldset>
				</div>
				</div>
				
				<!-- FIELDSET DE TOTAL RAMA -->
				<div class ="small-12 columns">
				<div class="small-2 columns">
			      &nbsp;
			  </div> 
			      <div class="small-10 columns">
					<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<spring:message code="administracionExpediente.v1.view.label.trayectoriaLaboral.totalRama" /></b>	
				<fieldset class="sep-fieldset">
				
				<div class="row">
							<div class="small-9 columns">&nbsp;</div>							

							<div class="small-1 columns">
								 <label><spring:message code="administracionExpediente.v1.js.label.trayectoriaLaboral.anios" /></label>
							</div>
										
							<div class="small-1 columns">
								 <label><spring:message code="administracionExpediente.v1.js.label.trayectoriaLaboral.meses" /></label>
							</div>
										
							<div class="small-1 columns">
								 <label><spring:message code="administracionExpediente.v1.js.label.trayectoriaLaboral.dias" /></label>
							</div>																							
					</div>
	
				<!-- UPN -->	
					<div class="row">
							<div class="small-7 columns">&nbsp;</div>
					
							<div class="small-2 columns">
								<label class="right sep-text-medium"><spring:message code="administracionExpediente.v1.view.label.trayectoriaLaboral.upn" /></label>
							</div>

							<div class="small-1 columns">
								<input  name="anioUpn" id="anioUpn" class="sep-text-medium" maxlength="2" type="text"  value="0"/> 
							</div>
										
							<div class="small-1 columns">
								 <input  name="mesUpn" id="mesUpn" class="sep-text-medium" maxlength="2" type="text"  value="0"/>
							</div>
										
							<div class="small-1 columns">
								 <input  name="diaUpn" id="diaUpn" class="sep-text-medium" maxlength="2" type="text" value="0"/>
							</div>																				
					</div>	
					<!-- Normal -->	
					<div class="row">
							<div class="small-7 columns">&nbsp;</div>
					
							<div class="small-2 columns">
								<label class="right sep-text-medium"><spring:message code="administracionExpediente.v1.view.label.trayectoriaLaboral.normal" /></label>
							</div>

							<div class="small-1 columns">
								<input  name="anioNormal" id="anioNormal" class="sep-text-medium" maxlength="2" type="text"  value="0"/> 
							</div>
										
							<div class="small-1 columns">
								 <input  name="mesNormal" id="mesNormal" class="sep-text-medium" maxlength="2" type="text"  value="0"/>
							</div>
										
							<div class="small-1 columns">
								 <input  name="diaNormal" id="diaNormal" class="sep-text-medium" maxlength="2" type="text"  value="0"/>
							</div>																				
					</div>	
					<!-- Tecnologicos -->	
					<div class="row">
							<div class="small-7 columns">&nbsp;</div>
					
							<div class="small-2 columns">
								<label class="right sep-text-medium"><spring:message code="administracionExpediente.v1.view.label.trayectoriaLaboral.tec" /></label>
							</div>

							<div class="small-1 columns">
								<input  name="anioTec" id="anioTec" class="sep-text-medium" maxlength="2" type="text"  value="0"/> 
							</div>
										
							<div class="small-1 columns">
								 <input  name="mesTec" id="mesTec" class="sep-text-medium" maxlength="2" type="text"  value="0"/>
							</div>
										
							<div class="small-1 columns">
								 <input  name="diaTec" id="diaTec" class="sep-text-medium" maxlength="2" type="text"  value="0"/>
							</div>																				
					</div>
				<!-- Actualizaci�n del Magisterio -->
				<div class="row">
					<div class="small-5 columns">&nbsp;</div>

					<div class="small-4 columns">
						<label class="right sep-text-medium"><spring:message code="administracionExpediente.v1.view.label.trayectoriaLaboral.act"  /></label>
					</div>

					<div class="small-1 columns">
						<input name="anioAct" id="anioAct" class="sep-text-medium" maxlength="2" type="text"  value="0"/>
					</div>

					<div class="small-1 columns">
						<input name="mesAct" id="mesAct" class="sep-text-medium" maxlength="2" type="text"  value="0"/>
					</div>

					<div class="small-1 columns">
						<input name="diaAct" id="diaAct" class="sep-text-medium" maxlength="2" type="text" value="0"/>
					</div>
				</div>
				
					<!-- TOTAL RAMA -->		
					<div class="row">
							<div class="small-9 columns">&nbsp;</div>

							<div class="small-1 columns">
								<b> <input  name="anioRama" id="anioRama" class="sep-text-medium" maxlength="2" type="text"  value="0"/></b>
							</div>
										
							<div class="small-1 columns">
								<b> <input  name="mesRama" id="mesRama" class="sep-text-medium" maxlength="2" type="text"  value="0"/></b>
							</div>
										
							<div class="small-1 columns">
								<b> <input  name="diaRama" id="diaRama" class="sep-text-medium" maxlength="2" type="text"  value="0"/></b>
							</div>																				
					</div>						
			
				</fieldset>
				</div>
				</div>
								
			</fieldset>
			</div>
		</div>	
				
</body>
</html>