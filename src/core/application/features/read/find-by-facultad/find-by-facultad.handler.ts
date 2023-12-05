import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DocenteUseCase } from "src/core/application/services/docente.use-case";
import { FindByFacultadQuery } from "./find-by-facultad.query";

@QueryHandler(FindByFacultadQuery)
export class FindByFacultadHandler implements IQueryHandler<FindByFacultadQuery>{

    constructor(private docenteUseCases: DocenteUseCase) { }

    execute(query: FindByFacultadQuery) {
        
        return this.docenteUseCases.GetDocentesByFacultad(query.idFacultad);
    }

}
