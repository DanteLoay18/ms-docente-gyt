import { PartialType } from '@nestjs/swagger';
import {CreateDocenteRequest} from '../model/create-docente.request'

export class UpdateDocenteRequest extends PartialType(CreateDocenteRequest){
    idDocente:string
}
    