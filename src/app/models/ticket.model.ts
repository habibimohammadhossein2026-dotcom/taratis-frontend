export enum TicketPriority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High'
}

export enum TicketStatus {
  Open = 'Open',
  InProgress = 'InProgress',
  Done = 'Done'
}

export interface Ticket {
  id: number;
  title: string;
  requesterName: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
  isOverdue: boolean;
  totalOpenHours: number;
}

export interface CreateTicket {
  title: string;
  requesterName: string;
  description: string;
  priority: TicketPriority;
}

export interface UpdateTicketStatus {
  status: TicketStatus;
}