export interface establishmentResponseWith {
    id_establishment: number;
    nameEstablishment: string;
    image: string,
    descripcion: string;
    direccion: {
      calle: string;
      colonia: string;
      numero: string;
    };
    horario: {
      entrada: string,
      salida: string
    }
    servicios: {
      id_service: number;
      service: string;
      costo: number;
    }[];
  }
  