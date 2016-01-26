package mx.com.gunix.service.met.administracionexpediente;

import mx.com.gunix.domain.met.administracionexpediente.Expediente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("guardaExpediente")
class GuardaExpediente {

    @Autowired
    IAdministracionExpedienteService administracionExpedienteService;

    public String execute(Expediente expediente){

        System.out.println("objeto expediente:" + expediente.getNombre());

        administracionExpedienteService.guardarExpediente(expediente);

        return "OK";
    }

}