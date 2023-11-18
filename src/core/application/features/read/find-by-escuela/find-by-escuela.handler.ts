import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DocenteUseCase } from "src/core/application/services/docente.use-case";
import { FindByEscuelaQuery } from "./find-by-escuela.query";

@QueryHandler(FindByEscuelaQuery)
export class FindByEscuelaHandler implements IQueryHandler<FindByEscuelaQuery>{

    constructor(private docenteUseCases: DocenteUseCase) { }

    execute(query: FindByEscuelaQuery) {
        
        return this.docenteUseCases.GetDocentesByEscuela(query.idEscuela);
    }

}
