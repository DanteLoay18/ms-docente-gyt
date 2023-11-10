import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateDocenteCommand } from "./create-docente.command";
import { DocenteUseCase } from "src/core/application/services/docente.use-case";

@CommandHandler(CreateDocenteCommand)
export class CreateDocenteHandler implements ICommandHandler<CreateDocenteCommand> {

    constructor(private docenteUseCases: DocenteUseCase) { }

    async execute(command: CreateDocenteCommand) {
        
        return this.docenteUseCases.createDocente(command.createDocenteDto, command.usuarioCreacion);
    }

    
}