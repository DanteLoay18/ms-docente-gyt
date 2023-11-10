import { Docente } from "../../entity/docente.entity";

export interface DocenteRepository{
    createDocente(docente: Docente): Promise<any>;
    updateDocente(idDocente:string,docente: Docente): Promise<Docente>;
    findAll():Promise<Docente[]>;
    findOneById(id:string):Promise<Docente>;
    actualizarBloqueo(id:string,esBloqueado:boolean):Promise<Docente>;
    findOneByTerm(termino:string, valor:string):Promise<Docente>;
    
}