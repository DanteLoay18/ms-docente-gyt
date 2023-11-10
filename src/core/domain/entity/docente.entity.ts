import { Base } from "src/core/shared/domain/base";


export class Docente extends Base{
    
    nombreCompleto: string;

    idEscuela : string;

    idFacultad: string;

    email: string;

    static CreateDocente(nombreCompleto:string, idEscuela:string, idFacultad:string, email:string, usuarioCreacion:string){
        const docente = new Docente();

        docente.nombreCompleto= nombreCompleto;
        docente.idEscuela=idEscuela;
        docente.idFacultad=idFacultad;
        docente.email=email;
        docente.usuarioCreacion=usuarioCreacion;
        docente.esBloqueado=false;
        docente.esInactivo=false;
        docente.fechaCreacion = new Date();

        return docente;
    }

    static UpdateDocente(nombreCompleto:string, idEscuela:string, idFacultad:string, email:string, usuarioModificacion:string){
        const docente = new Docente();

        docente.nombreCompleto= nombreCompleto;
        docente.idEscuela=idEscuela;
        docente.idFacultad=idFacultad;
        docente.email=email;
        docente.usuarioModificacion=usuarioModificacion;
        docente.fechaModificacion = new Date();
        return docente;
    }

    static ModificarEstado(esInactivo:boolean, usuarioModificacion:string){
        const docente = new Docente();

        docente.esInactivo=esInactivo;
        docente.usuarioModificacion=usuarioModificacion;
        docente.fechaModificacion = new Date();
        return docente;
    }

  
}