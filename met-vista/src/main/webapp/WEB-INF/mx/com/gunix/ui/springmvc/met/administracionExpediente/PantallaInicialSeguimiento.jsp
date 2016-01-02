<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

<title>Met</title>
 <script type="text/javascript">
	var longitud = "longitud";
	var comentarioVacio="vacio";
 </script>	

<script src="/met-vista/js/administracionExpediente/v1/PantallaInicialSeguimiento.js" type="text/javascript"></script>
</head>
<body>
<%-- 	<g:if test="${messagesMap?.errors}"> --%>
<%-- 		<g:each in="${messagesMap?.errors}" var="error"> --%>
<%-- 			<small class="error"> ${error} --%>
<!-- 			</small> -->
<!-- 		</g:each> -->
<!-- 	</g:if> -->
	<div id="showError" class="error"></div>
<%--    <insane:insaneForm processInstance="${processInstance}" id="seguimientoForm">--%>
      <input id="idOperacionSeguimiento" type="hidden" value="${idOperacion}" />

<%--       <g:if test="${accionOperacionPerfilEstatus.contains('HISTORIAL_COMENTARIOS')}">	 --%>
<%--       		<g:render template="/templates/v1/historicoComentarios" bean="${listaComentarios}" /> --%>
<!--       </g:if> -->
		Comentarios.jsp
           
      <div class="small-8 columns text-center">&nbsp;</div>
<%--            <g:if test="${accionOperacionPerfilEstatus.contains('AGREGAR_COMENTARIOS')}"> --%>
<!--                 <g:render template="/templates/v1/areaComentarios" /> -->
<!-- 			</g:if>	 -->
<!-- 		    <g:else><div class="small-8 columns text-center">&nbsp;</div></g:else>				 -->
				<div class="small-4 columns text-center" >					
<!-- 				   <g:render template="/templates/v1/botones" /> -->
					Botones.jsp
 				</div>
 				

<%--	</insane:insaneForm>--%>
</body>
</html>
