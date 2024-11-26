export interface QuoteResponse {
    id_cita: number;                 // ID de la cita
    fecha: string;                   // Fecha de la cita
    estatus: string;                 // Estado de la cita (Atendidos, No Atendidos, etc.)
    horario: string | null;          // Horario de la cita (puede ser null si no existe)
    id_establecimiento: number;
}
