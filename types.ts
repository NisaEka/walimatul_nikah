export interface GuestMessage {
  id: string;
  name: string;
  message: string;
  date: string;
  attendance: 'hadir' | 'tidak_hadir' | 'ragu';
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
