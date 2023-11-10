import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateDocenteCommand } from "./update-docente.command";
import { DocenteUseCase } from "src/core/application/services/docente.use-case";

@CommandHandler(UpdateDocenteCommand)
export class UpdateDocenteHandler implements ICommandHandler<UpdateDocenteCommand> {

    constructor(private docenteUseCases: DocenteUseCase) { }

    async execute(command: UpdateDocenteCommand) {
        
        return this.docenteUseCases.updateDocente(command.idDocente,command.updateDocenteDto, command.usuarioModificacion)
    }

}