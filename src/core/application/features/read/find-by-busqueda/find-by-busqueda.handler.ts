import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DocenteUseCase } from "src/core/application/services/docente.use-case";
import { FindByBusquedaQuery } from "./find-by-busqueda.query";

@QueryHandler(FindByBusquedaQuery)
export class FindByBusquedaHandler implements IQueryHandler<FindByBusquedaQuery>{

    constructor(private docenteUseCases: DocenteUseCase) { }

    execute(query: FindByBusquedaQuery) {
        
        return this.docenteUseCases.getDocentesByBusqueda(query.findByBusquedaDto);
    }

}
