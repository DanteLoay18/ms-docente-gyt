import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { MessagePattern } from '@nestjs/microservices';
import { FindAllDocentesRequest } from '../model/find-all-docentes.request';
import { FindAllDocentesQuery } from 'src/core/application/features/read';



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
    
    

    
}