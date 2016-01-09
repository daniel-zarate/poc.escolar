package mx.com.gunix.domain.met.administracionexpediente;

import java.io.Serializable;

public class Expediente implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 138720591368736866L;
	
	private String nombre;

	public String getNombre() {
		return nombre;
	}

	@Override
	public String toString() {
		return "Expediente [nombre=" + nombre + "]";
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	
}
