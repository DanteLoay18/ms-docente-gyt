
export class ModificarEstadoCommand {
    
    constructor(
                public readonly idDocente:string,
                public readonly esInactivo: boolean,
                public readonly usuarioModificacion:string
                ) { }
    
}