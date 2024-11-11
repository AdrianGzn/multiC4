export interface Schedule {
    id_schedule: string;
    doctorId: string;
    patientId: string;
    appointmentDate: string;
    status: 'scheduled' | 'completed' | 'cancelled';
  }
  