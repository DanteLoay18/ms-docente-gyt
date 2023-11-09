import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { MessagePattern } from '@nestjs/microservices';
import { FindAllDocentesRequest } from '../model/find-all-docentes.request';
import { FindAllDocentesQuery, FindByIdQuery } from 'src/core/application/features/read';



@Controller()
export class DocenteController{

    constructor(
        private command: CommandBus,
        private query: QueryBus
    ) {}
    


    @MessagePattern({cmd: 'findAll_docentes'})
    async findAllDocentes({page, pageSize}:FindAllDocentesRequest) {

        return await this.query.execute(new FindAllDocentesQuery(page,pageSize));
        
    }
    
    @MessagePattern({cmd: 'findOne_docente'})
    async findById(idDocente:string) {

        return await this.query.execute(new FindByIdQuery(idDocente));
        
    }
    

    
}