import { ScheduleDoctor } from "./schedule-doctor"

export interface User {
    id_usuario: number,
    id_rol: number,
    nombre: string,
    horario: ScheduleDoctor[],
    id_establecimiento: number,
    id_servicio: number
}
