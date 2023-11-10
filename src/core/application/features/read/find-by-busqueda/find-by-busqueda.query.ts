import { FindByBusquedaDto } from "src/core/shared/dtos/find-by-busqueda.dto";

export class FindByBusquedaQuery {
    
    constructor(
                public readonly findByBusquedaDto:FindByBusquedaDto
                ) { }
    
}