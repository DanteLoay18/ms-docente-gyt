

export interface FindByBusquedaDto{
    page : number;

    pageSize:number;

    idEscuelaUsuario:string;

    nombreCompleto?:string;

    email?:string;

    idEscuela?:string;

    idFacultad?:string;
}