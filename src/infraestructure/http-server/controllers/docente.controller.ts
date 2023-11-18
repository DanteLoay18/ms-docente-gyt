import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { MessagePattern } from '@nestjs/microservices';
import { FindAllDocentesRequest } from '../model/find-all-docentes.request';
import { FindAllDocentesQuery, FindByBusquedaQuery,  FindByEscuelaQuery, FindByIdQuery } from 'src/core/application/features/read';
import { CreateDocenteCommand, ModificarEstadoCommand, UpdateDocenteCommand } from 'src/core/application/features/write';
import { CreateDocenteRequest } from '../model/create-docente.request';
import { UpdateDocenteRequest } from '../model/update-docente.request';
import { FindByBusquedaRequest } from '../model/find-by-busqueda.request';
import { ModifciarEstadoRequest } from '../model/modificar-estado.request';
import { FindByFacultadRequest } from '../model/find-by-facultad.request';



@Controller()
export class DocenteController{

    constructor(
        private command: CommandBus,
        private query: QueryBus
    ) {}
    


    @MessagePattern({cmd: 'findAll_docentes'})
    async findAllDocentes({page, pageSize, idFacultad}:FindAllDocentesRequest) {

        return await this.query.execute(new FindAllDocentesQuery(page,pageSize, idFacultad));
        
    }
    
    @MessagePattern({cmd: 'findByBusqueda_docente'})
    async findByBusqueda(findByBusquedaRequest:FindByBusquedaRequest) {

        return await this.query.execute(new FindByBusquedaQuery(findByBusquedaRequest));
        
    }

    @MessagePattern({cmd: 'findByFacultad_docente'})
    async findByFacultad({idEscuela}:FindByFacultadRequest) {

        return await this.query.execute(new FindByEscuelaQuery(idEscuela));
        
    }

    @MessagePattern({cmd: 'findOne_docente'})
    async findById(idDocente:string) {

        return await this.query.execute(new FindByIdQuery(idDocente));
        
    }
    

    @MessagePattern({cmd: 'create_docente'})
    async createDocente({idUsuario, ...createDocenteDto}:CreateDocenteRequest) {

        return await this.command.execute(new CreateDocenteCommand(createDocenteDto, idUsuario));
        
    }

    @MessagePattern({cmd: 'update_docente'})
    async updateDocente({idUsuario,idDocente, ...updateDocenteDto}:UpdateDocenteRequest) {

        return await this.command.execute(new UpdateDocenteCommand(idDocente,updateDocenteDto, idUsuario));
        
    }


    @MessagePattern({cmd: 'modificar_estado_docente'})
    async modificarEstadoDocente({idUsuario,idDocente, esInactivo}:ModifciarEstadoRequest) {

        return await this.command.execute(new ModificarEstadoCommand(idDocente,esInactivo, idUsuario));
        
    }

    
}