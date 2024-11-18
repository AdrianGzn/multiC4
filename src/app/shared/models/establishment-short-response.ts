export interface EstablishmentShortResponse {
    id_establishment: number,
    nombre: string,
    dirección:  {
        calle: string,
        colonia: string,
        descripción: string,
        id_dirección: number,
        latitud: number,
        longitud: number
        numero: number
    }
    image: string
}
