package mx.com.gunix.domain.met.administracionexpediente;

import java.io.Serializable;

public class Expediente implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 138720591368736866L;
	
	private String nombre;
	private String tipoAntiguedad;
	private String tipoRama;
	private String tipoPeriodo;
	

	public String getNombre() {
		return nombre;
	}

	@Override
	public String toString() {
		return "Expediente [nombre=" + nombre + ", tipoAntiguedad=" + tipoAntiguedad + ", tipoRama=" + tipoRama
				+ ", tipoPeriodo=" + tipoPeriodo + "]";
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getTipoAntiguedad() {
		return tipoAntiguedad;
	}

	public void setTipoAntiguedad(String tipoAntiguedad) {
		this.tipoAntiguedad = tipoAntiguedad;
	}

	public String getTipoRama() {
		return tipoRama;
	}

	public void setTipoRama(String tipoRama) {
		this.tipoRama = tipoRama;
	}

	public String getTipoPeriodo() {
		return tipoPeriodo;
	}

	public void setTipoPeriodo(String tipoPeriodo) {
		this.tipoPeriodo = tipoPeriodo;
	}
	
	
	
}
