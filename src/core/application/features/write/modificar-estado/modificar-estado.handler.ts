import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DocenteUseCase } from "src/core/application/services/docente.use-case";
import { ModificarEstadoCommand } from "./modificar-estado.command";

@CommandHandler(ModificarEstadoCommand)
export class ModificarEstadoHandler implements ICommandHandler<ModificarEstadoCommand> {

    constructor(private docenteUseCases: DocenteUseCase) { }

    async execute(command: ModificarEstadoCommand) {
        
        return this.docenteUseCases.modificarEstado(command.idDocente,command.esInactivo, command.usuarioModificacion)
    }

}