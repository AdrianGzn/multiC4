export interface Campaign {
    id_campaign: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    status: 'active' | 'inactive' | 'completed';
  }
  