import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/database.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([

    ])
  ],
  exports:[
    DatabaseModule,
    MongooseModule
  ]
})
export class PersistenceModule {}
