<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%> 
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">	
<title>Dependientes Familiares</title>
<script type="text/javascript">
			var eFormatoArchivo = "<spring:message code='administracionExpediente.v1.view.dependientesfamiliares.error.formato.archivo.subido' javaScriptEscape='true'/>";
	        var enomenclatura = "<spring:message code='administracionExpediente.v1.view.dependientesfamiliares.error.nomenclatura' javaScriptEscape='true' />";
	        var eappPat = "<spring:message code='administracionExpediente.v1.view.dependientesfamiliares.error.app.pat' javaScriptEscape='true'/>";
	        var eappMat = "<spring:message code='administracionExpediente.v1.view.dependientesfamiliares.error.app.mat' javaScriptEscape='true'/>";
	        var enombre = "<spring:message code='administracionExpediente.v1.view.dependientesfamiliares.error.nombre' javaScriptEscape='true'/>";	        
	        var ecurp = "<spring:message code='administracionExpediente.v1.view.dependientesfamiliares.error.curp' javaScriptEscape='true'/>";
	        var efechaNacimiento = "<spring:message code='administracionExpediente.v1.view.dependientesfamiliares.error.fechaNacimiento' javaScriptEscape='true'/>";
	        var esexo = "<spring:message code='administracionExpediente.v1.view.dependientesfamiliares.error.sexo' javaScriptEscape='true'/>";	        
	        var eparentesco = "<spring:message code='administracionExpediente.v1.view.dependientesfamiliares.error.seleccionar.parentesco' javaScriptEscape='true'/>";
	        var earchivo = "<spring:message code='administracionExpediente.v1.view.dependientesfamiliares.error.carga.archivo' javaScriptEscape='true'/>";
	        var eextension = "<spring:message code='administracionExpediente.v1.view.dependientesfamiliares.error.extension.archivo' javaScriptEscape='true'/>";
	        var ecurpRep = "<spring:message code='administracionExpediente.v1.view.dependientesfamiliares.error.curp.repetida' javaScriptEscape='true'/>";
	        var ecurpIgualTrabajador = "<spring:message code='administracionExpediente.v1.view.dependientesfamiliares.error.curp.igualATrabajador' javaScriptEscape='true'/>";
        </script>
<%--<script src="${resource(dir: 'js/', file: 'commons.js')}"></script>--%>
<%-- <script src="${resource(dir: 'js/administracionExpediente/v1/', file: 'PantallaInicialDependientesFamiliares.js')}" type="text/javascript"></script> --%>
</head>
<body>
	<div class="row"> 
 <div class="large-12 columns" id="divConteFormDependientes">
 
 <input type="hidden" value="${idOperacion}" id="operacionDependientes">
<%--  <input type="hidden"  id="mapaParentescoDocumento" value="${mx.gob.sep.dgpyrf.insanefwk.codes.ChangeTypeObject.getObjectToString( datosExtraData?.mapaParentescoDocumento) }"> --%>
<%--  <met:transformarListaArchivos id="listaDependientesFamiliares" lista="${extraData?.listaDependientesFamiliares}" ></met:transformarListaArchivos> --%>
<%--  <input type="hidden" value="${codigos ? net.sf.json.JSONSerializer.toJSON(codigos).toString() : ''}" id="codigoArchivosDependientesFamiliares" />  --%>

 <div id="contenidoFormulario" class="row">
             <div class="row">           
	             	<div class="medium-4 columns">
	             	<label>
	             		<spring:message code="administracionExpediente.v1.view.dependientesfamiliares.label.primerapellido"  /><font color="red">*</font></label>
	                    <input type="text" id="primerApellidoDependientesFamiliares" name="primerApellidoDependientesFamiliares" class="dependientesFamiliares sep-text-medium left"  maxlength="50"  />
	             	</div>
	             	<div class="medium-4 columns">
<%--	             	<label><spring:message--%>
<%--						code="administracionExpediente.v1.view.dependientesfamiliares.label.segundoapellido"  /><font color="red">*</font></label>--%>
					<label>
						<spring:message code="administracionExpediente.v1.view.dependientesfamiliares.label.segundoapellido"  /></label>
	                    <input type="text" id="segundoApellidoDependientesFamiliares" name="segundoApellidoDependientesFamiliares" class="dependientesFamiliares sep-text-medium left" maxlength="50" />
	             	</div>
             
	             	<div class="medium-4 columns">
	             	<label>
	             		<spring:message code="administracionExpediente.v1.view.dependientesfamiliares.label.nombre"  /><font color="red">*</font></label>
	                    <input type="text" id="nombreDependientesFamiliares" name="nombreDependientesFamiliares" class="dependientesFamiliares sep-text-medium left" maxlength="50" />
	             	</div>
             </div>
             
             <div class="row">
             		<div class="medium-4 columns">
	             	<label>
	             		<spring:message	code="administracionExpediente.v1.view.dependientesfamiliares.label.curp"  /><font color="red">*</font></label>
	                     <input type="text" id="curpDependientesFamiliares" name="curpDependientesFamiliares" class="dependientesFamiliares sep-text-medium left" maxlength="18" tabindex="1" />
	             	</div>
             		
             		<div class="medium-4 columns">
	             	<label>
	             		<spring:message code="administracionExpediente.v1.view.dependientesfamiliares.label.fechanacimiento"  /><font color="red">*</font></label>
	                    <input type="text" name="fechaNacimientoDependientesFamiliares" id="fechaNacimientoDependientesFamiliares" class="dependientesFamiliares sep-text-medium left" tabindex="1" />
	             	</div>
	             	<div class="medium-2 columns">
	             	<label><spring:message
						code="administracionExpediente.v1.view.dependientesfamiliares.label.edad"  /><font color="red"></font></label>
	                      <input type="text" value="" id="edadDependientesFamiliares" name="edadDependientesFamiliares" class="dependientesFamiliares soloNumeros sep-text-medium left" maxlength="3" tabindex="1"
	                       <insane:insaneInput type="text" name="edadDependientesFamiliares"/>/>
	             	</div>
	             	<div class="medium-2 columns">
	             	<label><spring:message code="administracionExpediente.v1.view.dependientesfamiliares.label.sexo"  /><font color="red">*</font></label>
<!-- 						 <insane:insaneSelect name="sexoDep" id="sexoDependientesFamiliares" class="dependientesFamiliares sep-text-medium left"  -->
<%-- 						  noSelection="${['':message(code:"met.administracionExpediente.v1.view.label.selectDefault",locale:"es_MX")]}" from='${sexo}'  --%>
<!--                        	  optionKey="id" optionValue="descripcion" /> -->
							 <select class="dependientesFamiliares sep-text-medium left" id="sexoDependientesFamiliares" name="sexoDep" tabindex="0" >
	                      		<option value="">	<spring:message code="met.administracionExpediente.v1.view.label.selectDefault"  /></option>
							</select>
	             	</div>
	         </div>	
				<!--  Select parentesco -->
                 <div class="medium-4 columns">
                     <label><spring:message code="administracionExpediente.v1.view.dependientesfamiliares.label.parentesco"  /><font color="red">*</font></label>
                      <select class="dependientesFamiliares sep-text-medium left" id="parentescoDependientesFamiliares" name="parentescoDependientesFamiliares" tabindex="0" >
	                      <option value="">	<spring:message code="met.administracionExpediente.v1.view.label.selectDefault"  /></option>
<%-- 						<g:each in="${parentesco}" var="item"> --%>
<%-- 							<option value="${item.id}"> --%>
<%-- 								${item.descripcion} --%>
<!-- 							</option> -->
<!-- 						</g:each> -->
					</select>
				</div>
	         <div id="nivelGrado">
                 <div class="medium-4 columns">
                     <label><spring:message code="administracionExpediente.v1.view.dependientesfamiliares.label.nivel"  /><font color="red"></font></label>

<!-- 				 <insane:insaneSelect name="nivelDependientesFamiliares" id="nivelDependientesFamiliares" class="dependientesFamiliares sep-text-medium left"  -->
<%-- 				 	noSelection="${['':message(code:"met.administracionExpediente.v1.view.label.selectDefault",locale:"es_MX")]}" from='${nivelList}'  --%>
<!--                        optionKey="id" optionValue="descripcion"/> -->
						<select class="dependientesFamiliares sep-text-medium left" id="nivelDependientesFamiliares" name="nivelDependientesFamiliares" tabindex="0" >
	                    	<option value=""><spring:message code="met.administracionExpediente.v1.view.label.selectDefault"  /></option>
						</select>

                 </div>
                 <div class="medium-4 columns">
                     <label><spring:message code="administracionExpediente.v1.view.dependientesfamiliares.label.grado"  /><font color="red"></font></label>
<!--                       <select  -->
<!--                       class="dependientesFamiliares sep-text-medium left"  -->
<!--                       id="gradoDependientesFamiliares" -->
<!--                       name="gradoDependientesFamiliares" -->
<!--                       data-service="/services/PRX_SD_DependientesFamiliares/getNivelGrado" -->
<!--                       data-parent="nivelDependientesFamiliares" -->
<!--                       data-params="cveNivel" -->
<!--                       data-resultado="cveGrado" -->
<!--                       data-label="grado" -->
<!--                       data-selected="" -->
<!--                       > -->
<!-- 	                     <option value=""> -->
<%-- 	                     	<spring:message code="met.administracionExpediente.v1.view.label.selectDefault"  /> --%>
<!-- 	                     </option> -->
<!-- 					</select> -->

						<select class="dependientesFamiliares sep-text-medium left" id="gradoDependientesFamiliares" name="gradoDependientesFamiliares" >
	                    	<option value=""><spring:message code="met.administracionExpediente.v1.view.label.selectDefault"  /></option>
						</select>

                 </div>
              </div>
              
                 <div class="row" id="divFileAndButtons">
                 
                	<div class="medium-5 columns">
<%--                 	<g:if test="${dependientesFamiliaresFile ==null|| dependientesFamiliaresFile == '' || dependientesFamiliaresFile == [:]}">	 --%>
<%--                 		<label><spring:message code="administracionExpediente.v1.view.dependientesfamiliares.label.documentos.adjuntos"  /></label> --%>
<!--                  	   <insane:uploadMetFileRow id="dependientesFamiliaresFile" /> -->
<!--                  	</g:if> -->
						<input type="file" id="dependientesFamiliaresFile" name="dependientesFamiliaresFile" >
                	</div>
                	
                	<div class="medium-4 columns" >
                		<input class="left button tiny" id="botonAgregarDependientesFamiliares" type="button" value="Agregar"/>
              		</div>
              		
              		<div class="medium-3 columns" >
                		<input class="left button tiny" id="botonLimpiarDependientesFamiliares" type="button" value="Limpiar" style="display:none;"/>
              		</div>
               
              	</div>     
      			<!--  
      				02/07/2015 
      			-->
      			<div class="row" id="desDocument">
<%--       				<g:each in="${parentesco}" var="item"> --%>
<!-- 							<div class="DocumentItem" id=${item.id} hidden="true" style="color:red;"> -->
<%-- 								* Adjuntar ${item.documento} en la secci&oacute;n: Documentos adjuntos. --%>
<!-- 							</div> -->
<!-- 					</g:each> -->
					<div class="DocumentItem" id=${item.id} hidden="true" style="color:red;"> 
								* Adjuntar ${item.documento} en la secci&oacute;n: Documentos adjuntos
					</div>
      			</div>
      			
      			
      	<div class="row">
             
       <dl class="accordion" data-accordion>
          <dd>
            <a style="cursor: default; background: #e3e3e3" align="left"><spring:message
						code="administracionExpediente.v1.view.dependientesfamiliares.label.dependientesfamiliaresTable"  /></a>
             <div class="content active" style="padding: 0rem">       
                <table class="large-12 columns" id="tablaDatosDependientesFamiliares" style="border: 1px solid rgb(187, 187, 187);">
                    <tr>
                        <th>
                        <span data-tooltip class="has-tip" title=<spring:message code='administracionExpediente.v1.view.dependientesfamiliares.label.curp' />>
                        <spring:message code="administracionExpediente.v1.view.dependientesfamiliares.label.curp"  /></span>
						</th>
                        
                        <th>
                        <span data-tooltip class="has-tip" title='<spring:message code="administracionExpediente.v1.view.dependientesfamiliares.label.primerapellido" />'>
                        <spring:message code="administracionExpediente.v1.view.dependientesfamiliares.label.primerapellido"  /></span>
						</th>
						
						<th>
                        <span data-tooltip class="has-tip" title='<spring:message code="administracionExpediente.v1.view.dependientesfamiliares.label.segundoapellido" />'>
                        <spring:message code="administracionExpediente.v1.view.dependientesfamiliares.label.segundoapellido"  /></span>
						</th>
						
						<th>
                        <span data-tooltip class="has-tip" title=<spring:message code="administracionExpediente.v1.view.dependientesfamiliares.label.nombre" />>
                        <spring:message code="administracionExpediente.v1.view.dependientesfamiliares.label.nombre"  /></span>
						</th>
                         
                        <th>
                        <span data-tooltip class="has-tip" title=<spring:message code="administracionExpediente.v1.view.dependientesfamiliares.label.parentesco" />>
                        <spring:message code="administracionExpediente.v1.view.dependientesfamiliares.label.parentesco"  /></span>
						</th>
						
						<th>
                        <span data-tooltip class="has-tip" title=<spring:message code="administracionExpediente.v1.view.dependientesfamiliares.label.documentos" />>
                        <spring:message code="administracionExpediente.v1.view.dependientesfamiliares.label.documentos"  /></span>
						</th> 
<%-- 					  		<g:if test="${(perfilName == 'Captura_UR' & idOperacion != 'consultar')  }"> --%>
						<th id="columnaEliminarDependientesFamiliares">Eliminar</th>
<!-- 					 	 	</g:if>	 -->
                     </tr>
                     
                 </table>
            	</div>
         	</dd>
     	   </dl>
   		 </div>
     
  </div>
  
  </div>
  </div> 
</body>

</html>