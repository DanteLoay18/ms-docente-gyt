
import { Prop,Schema, SchemaFactory } from '@nestjs/mongoose';
import { Base } from '../helpers/base';

@Schema()
export class Docente extends Base{

    @Prop({type: String})
    nombreCompleto: string;

    @Prop({type: String})
    idEscuela : string;

    @Prop({type: String})
    idFacultad: string;
    
    @Prop({type: String})
    email: string;
}

export const DocenteSchema= SchemaFactory.createForClass(Docente)