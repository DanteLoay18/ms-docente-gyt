import { Docente } from "../../entity/docente.entity";

export interface DocenteRepository{
    createDocente(docente: Docente): Promise<any>;
    updateDocente(idDocente:string,docente: Docente): Promise<Docente>;
    findOneById(id:string):Promise<Docente>;
    findBySlice(limit: number, offset: number): Promise<Docente[]>
    count(): Promise<number>
    actualizarBloqueo(id:string,esBloqueado:boolean):Promise<Docente>;
   
    
}