import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindByIdQuery } from "./find-by-id.query";
import { DocenteUseCase } from "src/core/application/services/docente.use-case";

@QueryHandler(FindByIdQuery)
export class FindByIdHandler implements IQueryHandler<FindByIdQuery>{

    constructor(private docenteUseCases: DocenteUseCase) { }

    execute(query: FindByIdQuery) {
        
        return this.docenteUseCases.getDocenteById(query.idDocente);
    }

}
