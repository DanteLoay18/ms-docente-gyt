import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DocenteRepository } from "src/core/domain/ports/outbound/docente.repository";
import { Docente } from "src/infraestructure/persistence/db/entities/docente.entity";


@Injectable()
export class MongoDocenteRepository implements DocenteRepository {
    
    constructor(@InjectModel(Docente.name) private docenteRepository: Model<Docente>) { }
    
    createDocente(docente: Docente){
        return this.docenteRepository.create(docente);
    }

    updateDocente(idDocente:string,docente: Docente){
        return this.docenteRepository.findByIdAndUpdate(idDocente,docente, {new:true})
    }
    
    findOneById(id:string){
        return this.docenteRepository.findById(id);
    }
    findBySlice(limit: number, offset: number){

        return this.docenteRepository.find().limit(limit).skip(offset)
    }
    count(){
        return this.docenteRepository.countDocuments()
    }
    
    actualizarBloqueo(id:string,esBloqueado:boolean){
        return this.docenteRepository.findByIdAndUpdate(id, {
            esBloqueado  
            }, {new:true})
    }
   
    
   
}