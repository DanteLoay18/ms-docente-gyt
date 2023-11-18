

export interface FindByBusquedaDto{
    page : number;

    pageSize:number;

    idFacultadUsuario:string;

    nombreCompleto?:string;

    email?:string;

    idEscuela?:string;

    idFacultad?:string;
}