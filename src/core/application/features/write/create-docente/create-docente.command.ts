import { CreateDocenteDto } from "src/core/shared/dtos/create-docente.dto";

export class CreateDocenteCommand {
    
    constructor(
                public readonly createDocenteDto: CreateDocenteDto,
                public readonly usuarioCreacion:string
                ) { }
    
}