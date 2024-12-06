export interface User {
  id: string;
  name: string;
}

export interface Letter {
  id: string;
  from: string;
  to: string;
  content: string;
  sentAt: Date;
}

