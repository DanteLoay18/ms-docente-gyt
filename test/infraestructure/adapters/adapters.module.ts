import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PersistenceModule } from '../persistence/persistence.module';



const providers = [
   
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
