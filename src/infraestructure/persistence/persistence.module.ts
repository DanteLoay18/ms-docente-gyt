import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Docente, DocenteSchema } from './db/entities/docente.entity';
@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      {name: Docente.name, schema: DocenteSchema},
    ])
  ],
  exports:[
    DatabaseModule,
    MongooseModule
  ]
})
export class PersistenceModule {}
