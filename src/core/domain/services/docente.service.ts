
import { Docente } from "../entity/docente.entity";
import { DocenteRepository } from "../ports/outbound/docente.repository";

export class DocenteService{
    constructor(private readonly docenteRepository:DocenteRepository){}

    findAll(){
        return this.docenteRepository.findAll();
    }

    findOneByTerm(termino:string, valor:string){
        return this.docenteRepository.findOneByTerm(termino, valor);
    }

    findOneById(id:string){
        return this.docenteRepository.findOneById(id);
    }
    
    createDocente(docente:Docente){
        return this.docenteRepository.createDocente(docente);
    }

    updateDocente(id:string,docente:Docente){
        return this.docenteRepository.updateDocente(id,docente);
    }

    bloquearDocente(id:string, esBloqueado:boolean){
        return this.docenteRepository.actualizarBloqueo(id, esBloqueado);
    }

    

}