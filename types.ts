
export interface Student {
  sNo: number;
  rollNo: string;
  name: string;
  contact: string;
  mail: string;
}

export interface CapturedImage {
  id: string;
  timestamp: string;
  dataUrl: string;
  status: 'captured' | 'transferring' | 'received';
}

export type AppView = 'overview' | 'simulation' | 'tech' | 'team';
