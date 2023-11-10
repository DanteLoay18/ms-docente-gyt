import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AdaptersModule, DOCENTE_REPOSITORY } from 'src/infraestructure/adapters/adapters.module';
import { PersistenceModule } from 'src/infraestructure/persistence/persistence.module';
import { FindAllDocentesHandler, FindAllDocentesQuery, FindByIdHandler, FindByIdQuery } from './application/features/read';
import { DocenteService } from './domain/services/docente.service';
import { DocenteRepository } from './domain/ports/outbound/docente.repository';
import { DocenteUseCase } from './application/services/docente.use-case';
import { CreateDocenteCommand, CreateDocenteHandler, UpdateDocenteCommand, UpdateDocenteHandler } from './application/features/write';


const DOCENTE_PROVIDERS=[
    FindAllDocentesQuery,
    FindAllDocentesHandler,
    FindByIdQuery,
    FindByIdHandler,
    CreateDocenteCommand,
    CreateDocenteHandler,
    UpdateDocenteCommand,
    UpdateDocenteHandler
]


const providers = [
    ...DOCENTE_PROVIDERS,
]



@Module({
    imports:[
        PersistenceModule,
        AdaptersModule,
        CqrsModule
    ],
    providers:[
        ...providers,
        {
            provide:DocenteService,
            useFactory:(
                docenteRepository:DocenteRepository
            )=> new DocenteService(docenteRepository),
            inject:[
                DOCENTE_REPOSITORY
            ]
        },
        {
            provide: DocenteUseCase,
            useFactory: (docenteService: DocenteService,) => new DocenteUseCase(docenteService),
            inject: [
                DocenteService
            ] 
        },
        
    ],
    exports:[
        ...providers,
        CqrsModule,
        AdaptersModule
    ]
})
export class CoreModule {}
