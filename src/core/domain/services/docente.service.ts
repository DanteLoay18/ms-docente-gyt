
import { Docente } from "../entity/docente.entity";
import { DocenteRepository } from "../ports/outbound/docente.repository";

export class DocenteService{
    constructor(private readonly docenteRepository:DocenteRepository){}


    findOneById(id:string){
        return this.docenteRepository.findOneById(id);
    }

    getDocentesSlice(limit: number, offset: number) {
        return this.docenteRepository.findBySlice(limit, offset)
    }

    getDocentesCount() {
        return this.docenteRepository.count()
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