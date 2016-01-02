<!DOCTYPE html>
<html>
<head>
<title>Expediente del Trabajador</title>
<link rel="stylesheet" href="/met-vista/static/css/foundation.css" /> 
<link rel="stylesheet" href="/met-vista/static/css/css.css" /> 
<script src="/met-vista/static/js/vendor/modernizr.js"></script> 
    	
<script src="/met-vista/js/prototype/prototype.js" type="text/javascript"></script>		
<link rel="stylesheet" href="/met-vista/css/jquery-ui/smoothness/jquery-ui-1.10.4.custom.css" />
<script src="/met-vista/js/jquery-ui/jquery-ui-1.10.4.custom.js"></script>
<script src="/met-vista/js/jquery-ui/jquery.ui.datepicker-es.js"></script>
<script src="/met-vista/static/js/foundation.min.js"></script>

<script src="/met-vista/js/jlayout/jquery.layout-latest.js" type="text/javascript"></script>
<script src="/met-vista/js/commons.js" type="text/javascript"></script>

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
			
			<div id="showError" class="error"></div>
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
								<label>CURP</label> <input name="curp" id="curpGlobal" class="sep-text-medium" type="text" placeholder="CURP" 	value="" disabled="disabled">
							</div>
							<div class="medium-4 columns ">
								<label>RAMO <font color="red">*</font></label>
									<input name="ramo" id="ramoGlobal" class="sep-text-medium"
										type="text"
										placeholder=""
										value="${ramo}" disabled="disabled">
							
							</div>
							<div class="medium-4 columns ">
								<label>UR <font color="red">*</font></label>
									<input name="ur" id="urGlobal" class="sep-text-medium"
										type="text"
										placeholder="UR"
										value="${urDescripcion}" disabled="disabled">
							</div>
						</div>
						<div class="large-12 columns">
							<div class="medium-4 columns">
								<label>Primer Apellido<font color="red">*</font></label> <input
									name="apellidoPaterno" id="apellidoPaternoGlobal"
									class="sep-text-medium"
									placeholder=""
									required type="text" value="${apellidoPaterno}" maxlength="50"
									disabled="disabled" />
							</div>
							<!-- -------------- Segundo Apellido -------------- -->
							<div class="medium-4 columns">
								<label>Segundo Apellido </label> 
								<input name="apellidoMaterno"
									id="apellidoMaternoGlobal" class="sep-text-medium"
									placeholder=""
									type="text" value="${apellidoMaterno}" maxlength="50"
									disabled="disabled" />
							</div>
							<!-- ---------------- Nombre ---------------- -->
							<div class="medium-4 columns">
								<label>Nombre <font color="red">*</font></label> <input
									name="nombre" id="nombreGlobal" class="sep-text-medium"
									placeholder="Nombre"
									required type="text" value="${nombre}" maxlength="50"
									disabled="disabled" />
							</div>
						</div>
						<div class="large-12 columns">
							<div class="medium-4 columns left">
								<label>Estatus del Expediente<font color="red">*</font></label> 
								<input
									name="estatusTrabajador" id="estatusTrabajador"
									class="sep-text-medium" type="text" value=""
									maxlength="50" disabled="disabled" />
							</div>
							<div class="medium-8 columns right">
								<label>Folio : ${folioSolicitud}
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
								required type="text" value="" maxlength="50"
								disabled="disabled" />
						</div>
						<div class="medium-12 columns left">&nbsp;</div>
						<div class="medium-12 columns left">&nbsp;</div>
						<div class="medium-12 columns left">
							<label>Estatus del Expediente</label> 
							<input name="estatusExpediente" id="estatusExpediente" class="sep-text-medium" required type="text" value="" maxlength="50" disabled="disabled" />
	
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
			
			<div class="ui-layout-center">
				<div id="tabs">
					<ul>
						<li><a id="panelDatosPersonalesTab" href="#panelDatosPersonales">Datos Personales</a></li>
						<li><a id="panelDatosGeneralesTab" 	href="#panelDatosGenerales">Datos Generales</a></li>
						<li><a id="panelEsquemaPagoTab" href="#panelEsquemaPago">Esquema de Pago</a></li>
						<li><a id="panelTrayectoriaLaboralTab" href="#panelTrayectoriaLaboral">Trayectoria Laboral</a></li>
						<li><a id="panelFormacionAcademicaTab" href="#panelFormacionAcademica">Formacion Academica</a></li>
						<li><a id="panelDependientesFamiliaresTab" href="#panelDependientesFamiliares">Dependientes Familiares</a></li>
					</ul>
					<div class="tabs-content">
						<div class="content large-12 columns active" id="panelDatosPersonales">
							PantallaInicialDatosPersonales.gsp

						</div>
						<div class="content large-12 columns" id="panelDatosGenerales">
							<p>
								PantallaInicialDatosGenerales.gsp
							</p>
						</div>
						<div class="content large-12 columns" id="panelEsquemaPago">
							<p>
								PantallaInicialEsquemaPago.gsp
							</p>
						</div>
						<div class="content large-12 columns" id="panelTrayectoriaLaboral">
							<p>
								PantallaInicialTrayectoriaLaboral.gsp
							</p>
						</div>
						<div class="content large-12 columns" id="panelFormacionAcademica">
							<p>
								PantallaInicialFormacionAcademica.gsp
							</p>
						</div>
						<div class="content large-12 columns" id="panelDependientesFamiliares">
							<p>
								PantallaInicialDependientesFamiliares.jsp
							</p>
						</div>
					</div>


				</div>

			</div>

			<div class="ui-layout-south">
<%-- 				<jsp:include page="PantallaInicialSeguimiento.jsp" > --%>
					PantallaInicialSeguimiento.jsp
			</div>
			<div class="ui-layout-east">
				<iframe name="documentosExpedienteIFrame" width="100%" height="100%"></iframe>
			</div>
			
		
		</div>
	
	</body >
</html>

