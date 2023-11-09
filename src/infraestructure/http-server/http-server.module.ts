import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { DocenteController } from './controllers/docente.controller';

@Module({
    imports:[CoreModule],
    controllers:[
        DocenteController
    ]
})
export class HttpServerModule {}
