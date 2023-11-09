import { BadRequestException, Injectable  } from "@nestjs/common";
import { DocenteService } from "src/core/domain/services/docente.service";
import { Paginated } from "../utils/Paginated";


@Injectable()
export class DocenteUseCase{
    constructor(private readonly docenteService:DocenteService){}

    async getDocenteById(id:string){
        try{
            const docente= await this.docenteService.findOneById(id);

            if(!docente)
                return {
                    success:false,
                    message:"El id de la escuela no existe",
                    value:{}
                }
            

            return {
                success: true,
                message: "",
                value:docente
            };
        }catch(error){
            this.handleExceptions(error)
        }
        
    }

   
    async getAllDocentes(page:number, pageSize:number){
        try{
            const docentes= await this.docenteService.findAll();

            const startIndex = (page - 1 )*pageSize;
            const endIndex = startIndex + pageSize;

            if(docentes.length === 0 && page !==1){
                const startIndex = (page - 2 )*pageSize;
                const endIndex = startIndex + pageSize;
                return {
                    page:page-1,
                    pageSize:pageSize,
                    items: docentes.slice(startIndex,endIndex),
                    total: docentes.length
                }
            }
            return Paginated.create({
                page,
                pageSize,
                items: docentes.slice(startIndex,endIndex),
                total: docentes.length
            });

        }catch(error){
            this.handleExceptions(error)
        }
    }

    async GetDocentesByFacultad(){
        
    }
   


    async bloquearDocente(id:string, esBloqueado:boolean){
        try {

            return await this.docenteService.bloquearDocente(id, esBloqueado);
        } catch (error) {
            this.handleExceptions(error)
        }
    }
    


    private handleExceptions(error:any){
        
        if(error.code==="23505")
        throw new BadRequestException(error.detail)
        
        

        throw new BadRequestException(error.message)
      }

      
}