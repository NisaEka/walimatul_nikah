export type GuestMessage = {
  id: string;
  name: string;
  message: string;
  attendance: 'hadir' | 'tidak_hadir' | 'ragu';
  createdAt: any;
};


export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
