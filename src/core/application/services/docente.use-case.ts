import { BadRequestException, Injectable  } from "@nestjs/common";
import { DocenteService } from "src/core/domain/services/docente.service";
import { Paginated } from "../utils/Paginated";
import { CreateDocenteDto } from "src/core/shared/dtos/create-docente.dto";
import { Docente } from "src/core/domain/entity/docente.entity";
import { UpdateDocenteDto } from "src/core/shared/dtos/update-docente.dto";
import { FindByBusquedaDto } from "src/core/shared/dtos/find-by-busqueda.dto";


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

   
    async getAllDocentes(page:number, pageSize:number, idFacultad:string){
        try{
            let docentes= await this.docenteService.findAll();

            docentes = docentes.sort((a, b) => (a.esInactivo === b.esInactivo) ? 0 : a.esInactivo ? 1 : -1);

            if(idFacultad)
            docentes= docentes.filter((docente)=>docente.idFacultad===idFacultad);
          
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

    

    async getDocentesByBusqueda(findByBusquedaDto:FindByBusquedaDto){
        try{
            let docentes= await this.docenteService.findAll();

            docentes = docentes.sort((a, b) => (a.esInactivo === b.esInactivo) ? 0 : a.esInactivo ? 1 : -1);
            
            if(findByBusquedaDto.idFacultadUsuario)
            docentes= docentes.filter((docente)=>docente.idFacultad===findByBusquedaDto.idFacultadUsuario)

            docentes= docentes.filter(docente => {
                const nombreCoincide = !findByBusquedaDto.nombreCompleto || docente.nombreCompleto.toUpperCase().includes(findByBusquedaDto.nombreCompleto.toUpperCase());
            
                const email = !findByBusquedaDto.email || docente.email.toUpperCase().includes(findByBusquedaDto.email.toUpperCase());
              
                const escuela = !findByBusquedaDto.idEscuela || docente.idEscuela.toUpperCase().includes(findByBusquedaDto.idEscuela.toUpperCase());
      
                const facultad = !findByBusquedaDto.idFacultad || docente.idFacultad === findByBusquedaDto.idFacultad;
            
                return nombreCoincide && email && escuela && facultad;
              });

              return Paginated.create({
                page:findByBusquedaDto.page,
                pageSize:findByBusquedaDto.pageSize,
                items: docentes,
                total: docentes.length
              })

        }catch(error){
            this.handleExceptions(error)
        }
    }

    async GetDocentesByEscuela(idEscuela:string){
        try {
            let docentes= await this.docenteService.findAll();

            docentes= docentes.filter((docente)=>docente.idEscuela===idEscuela);
            
            return {
                success:true,
                message:"",
                value:docentes
            }

        } catch (error) {
            this.handleExceptions(error);
        }
    }

    async GetDocentesByFacultad(idFacultad:string){
        try {
            let docentes= await this.docenteService.findAll();

            docentes= docentes.filter((docente)=>docente.idFacultad===idFacultad);
            
            docentes= docentes.filter((docente, index, self) =>
                        index === self.findIndex((d) => d.nombreCompleto === docente.nombreCompleto)
                    );

            return {
                success:true,
                message:"",
                value:docentes
            }

        } catch (error) {
            this.handleExceptions(error);
        }
    }

    async createDocente(createDocenteDto:CreateDocenteDto, usuarioCreacion:string){
        try {

            const nombreEncontrado = await this.findOneByTerm("nombreCompleto", createDocenteDto.nombreCompleto, "", createDocenteDto.idEscuela);

            if(nombreEncontrado)
                return {
                    success:nombreEncontrado.success,
                    message:nombreEncontrado.message
                }

            const emailEncontrado= await this.findOneByTerm("email",createDocenteDto.email,"",createDocenteDto.idEscuela);

            if(emailEncontrado)
            return {
                success:emailEncontrado.success,
                message:emailEncontrado.message
            }

            const docente = Docente.CreateDocente(createDocenteDto.nombreCompleto, createDocenteDto.idEscuela, createDocenteDto.idFacultad, createDocenteDto.email,usuarioCreacion);
           
            const docenteCreado= await this.docenteService.createDocente(docente);

            if(!docenteCreado)
                return {
                    success:false,
                    message:"El docente no se pudo registrar correctamente"
                }

            return {
                success:true,
                message:"El docente se creo correctamente"
            }
        } catch (error) {
            this.handleExceptions(error)
        }
    }

    async updateDocente(idDocente:string, updateDocenteDto:UpdateDocenteDto, usuarioModificacion:string){
        try {
            
            const docenteEncontrado = await this.getDocenteById(idDocente);

            if(!docenteEncontrado)
            return {
                success:false,
                message: "El docente no existe"
            }

            if(docenteEncontrado.value?.['esInactivo'])
            return {
                success:false,
                message:"El docente esta inactivo no puede realizar ningun cambio"
            }     

            if(updateDocenteDto.nombreCompleto){
                const nombreEncontrado = await this.findOneByTerm("nombreCompleto", updateDocenteDto.nombreCompleto, docenteEncontrado?.["value"]?.['_id'], updateDocenteDto.idEscuela);

                if(nombreEncontrado)
                    return {
                        success:nombreEncontrado.success,
                        message:nombreEncontrado.message
                    }

            
            }

            if(updateDocenteDto.email){
                const emailEncontrado= await this.findOneByTerm("email",updateDocenteDto.email,docenteEncontrado?.["value"]?.['_id'], updateDocenteDto.idEscuela);

                if(emailEncontrado)
                return {
                    success:emailEncontrado.success,
                    message:emailEncontrado.message
                }
            }


            await this.bloquearDocente(idDocente, true)

            const docente = Docente.UpdateDocente(updateDocenteDto.nombreCompleto, updateDocenteDto.idEscuela, updateDocenteDto.idFacultad, updateDocenteDto.email,usuarioModificacion);
           
            const docenteActualizado= await this.docenteService.updateDocente(idDocente,docente);

            if(!docenteActualizado)
                return {
                    success:false,
                    message:"El docente no se pudo registrar correctamente"
                }

            return {
                success:true,
                message:"El docente se actualizo correctamente"
            }
        } catch (error) {
            this.handleExceptions(error)
        } finally{
            await this.bloquearDocente(idDocente, false)
        }
    }

    async modificarEstado(idDocente:string, esInactivo:boolean, usuarioModificacion:string){
        const docenteEncontrado = await this.getDocenteById(idDocente);

        if(!docenteEncontrado)
        return {
            success:false,
            message: "El docente no existe"
        }

        if(docenteEncontrado.value?.['esInactivo']===esInactivo){
            const estado= esInactivo ? "inactivo" :"activo";
            return {
                success:false,
                message: `El docente ya esta ${estado}`
            }
        }

        const docente = Docente.ModificarEstado(esInactivo,usuarioModificacion);
           
        const docenteActualizado= await this.docenteService.updateDocente(idDocente,docente);

        if(!docenteActualizado)
            return {
                success:false,
                message:"El docente no se pudo registrar correctamente"
            }

        return {
            success:true,
            message:"El docente se actualizo correctamente"
        }
    }
   


    async bloquearDocente(id:string, esBloqueado:boolean){
        try {

            return await this.docenteService.bloquearDocente(id, esBloqueado);
        } catch (error) {
            this.handleExceptions(error)
        }
    }
    
    async findOneByTerm(term:string, valor:string, idDocente:string, idEscuela:string){
        let docentes= await this.docenteService.findByterm(term, valor);
        const docentesEncontradoPorEscuela= docentes.find((docente)=>docente.idEscuela===idEscuela && docente._id!==idDocente);
      
        if(docentesEncontradoPorEscuela)
        return {
                success:false,
                message:`El ${term} ${valor} ya esta registrado`
            }
       
    }


    private handleExceptions(error:any){
        
        if(error.code==="23505")
        throw new BadRequestException(error.detail)
        
        

        throw new BadRequestException(error.message)
      }

      
}