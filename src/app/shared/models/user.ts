import { Horarios } from "./horarios"

export interface User {
    id_usuario: number,
    id_rol: number,
    nombre: string,
    horario: Horarios[],
    id_establecimiento: number,
    id_servicio: number
}
