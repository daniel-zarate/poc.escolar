<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="gunix" uri="/framework/tags" %>
<!DOCTYPE html>
<html>
<head>
<title>Expediente del Trabajador</title>
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

<script type="text/javascript">
			var ramoError = "errorRamo"
			var urError = "Error Ur"

			var idOperacionExpediente = "${idOperacion}"
			var cveEstatusExp = "${cveEstatus}"

			var actualizacion = "Actualizacion"
			var procesoAutorizacion = "Proceso de Autorizacion"				
			var autorizado = "Autorizado"
			var rechazado = "Rechazado"
	
		</script>
<link rel="stylesheet" href="/met-vista/css/met.css" />
</head>
	<body>

		<div id="erroresGlobales" class="large-12 columns">
			<!-- Leer errores -->
<!-- 			<div id="showError" class="error"></div> -->
		</div>
	
		<div id="containerTest">
	
			<div class="ui-layout-north">
				<div class="large-12 columns">
					<div class="small-2 columns">
							<img id="foto" src="/met-vista/images/defaultPhotoMET.png" 	width="100px" />
					</div>
					<%-- nombre --%>
					<div class="small-8 columns">
						<div class="large-12 columns" id="CombosAnidadosRamoUr">
							<div class="medium-4 columns ">
								<label>CURP</label> <input name="curpEncabezado" id="curpGlobal" class="sep-text-medium" type="text" placeholder="CURP" 	value="${resultExpediente.expediente.curp}" disabled="disabled">
							</div>
<!-- 							<div class="medium-4 columns "> -->
<!-- 								<label>RAMO <font color="red">*</font></label> -->
<!-- 									<input name="ramo" id="ramoGlobal" class="sep-text-medium" -->
<!-- 										type="text" -->
<!-- 										placeholder="" -->
<%-- 										value="${resultExpediente.expediente.ramo}" disabled="disabled"> --%>
							
<!-- 							</div> -->
<!-- 							<div class="medium-4 columns "> -->
<!-- 								<label>UR <font color="red">*</font></label> -->
<!-- 									<input name="ur" id="urGlobal" class="sep-text-medium" -->
<!-- 										type="text" -->
<!-- 										placeholder="UR" -->
<%-- 										value="${urDescripcion}" disabled="disabled"> --%>
<!-- 							</div> -->
						</div>
						<div class="large-12 columns">
							<div class="medium-4 columns">
								<label>Primer Apellido<font color="red">*</font></label> <input
									name="apellidoPaterno" id="apellidoPaternoGlobal"
									class="sep-text-medium"
									placeholder=""
									required type="text" value="${resultExpediente.expediente.apellidoPaterno}" maxlength="50"
									disabled="disabled" />
							</div>
							<!-- -------------- Segundo Apellido -------------- -->
							<div class="medium-4 columns">
								<label>Segundo Apellido </label> 
								<input name="apellidoMaterno"
									id="apellidoMaternoGlobal" class="sep-text-medium"
									placeholder=""
									type="text" value="${resultExpediente.expediente.apellidoMaterno}" maxlength="50"
									disabled="disabled" />
							</div>
							<!-- ---------------- Nombre ---------------- -->
							<div class="medium-4 columns">
								<label>Nombre <font color="red">*</font></label> <input
									name="nombre" id="nombreGlobal" class="sep-text-medium"
									placeholder="Nombre"
									required type="text" value="${resultExpediente.expediente.nombre}" maxlength="50"
									disabled="disabled" />
							</div>
						</div>
						<div class="large-12 columns">
							<div class="medium-4 columns left">
								<label>Estatus del Expediente<font color="red">*</font></label> 
								<input
									name="estatusTrabajador" id="estatusTrabajador"
									class="sep-text-medium" type="text" value="${resultExpediente.expediente.estatusTrabajador}"
									maxlength="50" disabled="disabled" />
							</div>
							<div class="medium-8 columns right">
								<label>Folio : ${resultExpediente.expediente.folioExpediente}
								</label>
							</div>
						</div>
					</div>
					<div class="small-2 columns">
						<div class="medium-12 columns left">
							<label>Numero Expediente <font color="red">*</font></label> 
							<input
								name="folioTrabajador" id="folioTrabajador"
								class="sep-text-medium"
								placeholder="Numero Expediente"
								required type="text" value="${resultExpediente.expediente.folioTrabajador}" maxlength="50"
								disabled="disabled" />
						</div>
						<div class="medium-12 columns left">&nbsp;</div>
						<div class="medium-12 columns left">&nbsp;</div>
						<div class="medium-12 columns left">
							<label>Estatus del Expediente</label> 
							<input name="estatusExpediente" id="estatusExpediente" class="sep-text-medium" required type="text" value="${resultExpediente.expediente.estatusExpediente}" maxlength="50" disabled="disabled" />
	
						</div>
						<div class="medium-12 columns left">&nbsp;</div>
						<div class="medium-12 columns left">&nbsp;</div>
						<div class="medium-12 columns left">
							<label>FECHA: </label>
						</div>
					</div>
					<%--			</fieldset>--%>
				</div>
			</div>
			<form:form method="POST" commandName="Expediente" data-abide="ajax" id="foundationForm" > 
			<div class="ui-layout-center">
				<div id="tabs">
					<ul>
						<li><a id="panelDatosPersonalesTab" href="#panelDatosPersonales">Datos Personales</a></li>
						<li><a id="panelDatosGeneralesTab" 	href="#panelDatosGenerales">Datos Generales</a></li>
						<li><a id="panelEsquemaPagoTab" href="#panelEsquemaPago">Esquema de Pago</a></li>
						<!--Se quita la pantalla de trayectoria laboral a solicitud de RAM 15/Marzo/2016 -->
<!-- 						<li><a id="panelTrayectoriaLaboralTab" href="#panelTrayectoriaLaboral">Trayectoria Laboral</a></li> -->
						<li><a id="panelFormacionAcademicaTab" href="#panelFormacionAcademica">Formacion Academica</a></li>
						<li><a id="panelDependientesFamiliaresTab" href="#panelDependientesFamiliares">Dependientes Familiares</a></li>
					</ul>
					<div class="tabs-content">
						<div class="content large-12 columns active" id="panelDatosPersonales">
<%-- 							PantallaInicialDatosPersonales.gsp - 2 ${spring.message("propiedad.valor")} - <spring:message code="propiedad.valor" /> --%>
								<jsp:include page="PantallaInicialDatosPersonales.jsp" ></jsp:include>
						</div>
						<div class="content large-12 columns" id="panelDatosGenerales">
							<p>
								<jsp:include page="PantallaInicialDatosGenerales.jsp" ></jsp:include>
							</p>
						</div>
						<div class="content large-12 columns" id="panelEsquemaPago">
							<p>
								<jsp:include page="PantallaInicialEsquemaPago.jsp" ></jsp:include>
							</p>
						</div>
<!-- 						Se quita la pantalla de trayectoria laboral a solicitud de RAM 15/Marzo/2016 -->
<!-- 						<div class="content large-12 columns" id="panelTrayectoriaLaboral"> -->
<!-- 							<p> -->
<%-- 								<jsp:include page="PantallaInicialTrayectoriaLaboral.jsp" ></jsp:include> --%>
<!-- 							</p> -->
<!-- 						</div> -->
						<div class="content large-12 columns" id="panelFormacionAcademica">
							<p>
								<jsp:include page="PantallaInicialFormacionAcademica.jsp" ></jsp:include>
							</p>
						</div>
						<div class="content large-12 columns" id="panelDependientesFamiliares">
							<p>
								<jsp:include page="PantallaInicialDependientesFamiliares.jsp" ></jsp:include>
							</p>
						</div>
					</div>
				</div>

			</div>

			<div class="ui-layout-south">
					<jsp:include page="PantallaInicialSeguimiento.jsp" ></jsp:include>
					<gunix:completeTask label="Guardar" ></gunix:completeTask>		
			</div>
			<div class="ui-layout-east">
				<iframe name="documentosExpedienteIFrame" width="100%" height="100%"></iframe>
			</div>
			
			</form:form>
		
		</div>
	
		<script type="text/javascript">
		
		$(document).ready(function(){

			$('#containerTest').attr("style", " width: 1663px; height: 800px; " + $('#containerTest').attr("style"));
			var layout = $('#containerTest').layout({ applyDefaultStyles: true,
				onopen: function () {							
					if(!layout.state.east.isClosed)
			        	$(layout.east.toggler).css('background-position', '100% 0%');
		            if(!layout.state.south.isClosed)
			            $(layout.south.toggler).css('background-position', '0% 100%');
		            if(!layout.state.north.isClosed)
			            $(layout.north.toggler).css('background-position', '100% 0%');
		        },
		        onclose: function () {
    	           	if(layout.state.east.isClosed)
	                    $(layout.east.toggler).css('background-position', '0% 100%');
    	           	if(layout.state.south.isClosed)
		        	    $(layout.south.toggler).css('background-position', '100% 0%');
    	           	if(layout.state.north.isClosed)
		            	$(layout.north.toggler).css('background-position', '0% 100%');
		        }

			});

			layout.sizePane("east", '35%');
	        $(layout.east.toggler).css('background-image', 'url( /met-vista/images/leftright.png )');
	        $(layout.east.toggler).css('background-position', '100% 0%');              
	        $(layout.north.toggler).css('background-image', 'url( /met-vista/images/topbottom.png )');
	        $(layout.south.toggler).css('background-position', '100% 0%');
	        $(layout.south.toggler).css('background-image', 'url( /met-vista/images/topbottom.png )');        
	        $(layout.south.toggler).css('background-position', '0% 100%');
			
			$("#tabs").tabs(); 

			$(window).resize(function(){
				$('#containerTest').width($(window).width());
				$('#containerTest').height($(window).height()-195);
			});
			
			$(window).trigger("resize");
			//se forza el z-index a -1 para mandarlo al fondo
			$(".ui-layout-east").css("z-index",-1);
			
			console.log("ejecutando foundation al final")
			$(document).foundation();
			
			Foundation.libs.abide.validate($( ":input" ), {type:''})
		})
		
		
		</script>
		
	</body >
</html>

