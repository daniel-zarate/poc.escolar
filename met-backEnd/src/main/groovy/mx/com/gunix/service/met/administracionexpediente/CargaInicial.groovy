package mx.com.gunix.service.met.administracionexpediente;

import java.util.HashMap;
import java.util.Map;

import mx.com.gunix.domain.met.administracionexpediente.embedded.CatalogoDTO
import org.springframework.stereotype.Service;

@Service("cargaInicial")
public class CargaInicial {

	public LinkedHashMap execute(){
		
		System.out.println("Haciendo el hola mundo");
		
		Map m = new LinkedHashMap<String,String>();
		
		//TODO: Consulta catalogo genero
		CatalogoDTO genero1 = new CatalogoDTO([id:1,valor:"Masculino"]);
		CatalogoDTO genero2 = new CatalogoDTO([id:2,valor:"Femenino"]);	
		ArrayList generoList = [genero1,genero2]
		
		m["generoList"] = generoList
		
		//TODO: Consulta catalogo estado civil
		CatalogoDTO edoCivil1 = new CatalogoDTO([id:1,valor:"Soltero(a)"]);
		CatalogoDTO edoCivil2 = new CatalogoDTO([id:2,valor:"Casado(a)"]);
		ArrayList edoCivilList = [edoCivil1,edoCivil2]
		
		m["edoCivilList"] = edoCivilList
		
		//TODO: Consulta catalogo nacionalidad
		CatalogoDTO nacionalidad1 = new CatalogoDTO([id:1,valor:"Mexicana"]);
		CatalogoDTO nacionalidad2 = new CatalogoDTO([id:2,valor:"Aleman"]);
		ArrayList nacionalidadList = [nacionalidad1,nacionalidad2]
		
		m["nacionalidadList"] = nacionalidadList
		
		//TODO: Consulta catalogo nacionalidad
		CatalogoDTO paisNacimiento1 = new CatalogoDTO([id:1,valor:"Mexico"]);
		CatalogoDTO paisNacimiento2 = new CatalogoDTO([id:2,valor:"Alemania"]);
		ArrayList paisNacimientoList = [paisNacimiento1,paisNacimiento2]
		
		m["paisNacimientoList"] = paisNacimientoList
		
		//TODO: Consulta catalogo banco
		CatalogoDTO banco1 = new CatalogoDTO([id:1,valor:"Banamex"]);
		CatalogoDTO banco2 = new CatalogoDTO([id:2,valor:"Bancomer"]);
		ArrayList bancoList = [banco1,banco2]
		
		m["bancoList"] = bancoList
		
		
		
		return m;
	} 
	
}
