import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PersistenceModule } from '../persistence/persistence.module';
import { MongoDocenteRepository } from './domain/docente-mongo.repository';


export const DOCENTE_REPOSITORY = 'DOCENTE_REPOSITORY';

const providers = [
        MongoDocenteRepository,
        {
            provide: DOCENTE_REPOSITORY,
            useExisting: MongoDocenteRepository,
        }
]


@Module({
    imports:[
        ConfigModule,
        PersistenceModule,
        
    ],
    providers:[
        ...providers
    ],
    exports:[
        ...providers,
       
    ]
})
export class AdaptersModule {}
