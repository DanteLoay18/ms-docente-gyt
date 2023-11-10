import { UpdateDocenteDto } from "src/core/shared/dtos/update-docente.dto";

export class UpdateDocenteCommand {
    
    constructor(
                public readonly idDocente:string,
                public readonly updateDocenteDto: UpdateDocenteDto,
                public readonly usuarioModificacion:string
                ) { }
    
}