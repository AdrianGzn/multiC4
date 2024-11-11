export interface Quote {
    id_quote: string;
    patientId: string;
    doctorId: string;
    amount: number;
    date: string;
    status: 'pending' | 'approved' | 'paid';
  }
  