
export class FindAllDocentesQuery {
    
    constructor(
                public readonly page: number,
                public readonly pageSize: number,
                public readonly idEscuela: string
                ) { }
    
}