import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindAllDocentesQuery } from "./find-all-docentes.query";
import { DocenteUseCase } from "src/core/application/services/docente.use-case";

@QueryHandler(FindAllDocentesQuery)
export class FindAllDocentesHandler implements IQueryHandler<FindAllDocentesQuery>{

    constructor(private docenteUseCases: DocenteUseCase) { }

    execute(query: FindAllDocentesQuery) {
        
        return this.docenteUseCases.getAllDocentes(query.page, query.pageSize, query.idFacultad);
    }

}
