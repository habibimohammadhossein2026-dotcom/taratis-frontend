import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  CreateTicket,
  Ticket,
  TicketPriority,
  TicketStatus,
  UpdateTicketStatus
} from '../../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private readonly apiUrl = 'https://localhost:7031/api/tickets';

  constructor(private http: HttpClient) {}

  getTickets(
    search?: string,
    status?: TicketStatus | '',
    priority?: TicketPriority | ''
  ): Observable<Ticket[]> {

    let params = new HttpParams();

    if (search) {
      params = params.set('search', search);
    }

    if (status) {
      params = params.set('status', status);
    }

    if (priority) {
      params = params.set('priority', priority);
    }

    return this.http.get<Ticket[]>(
      this.apiUrl,
      { params }
    );
  }

  getById(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(
      `${this.apiUrl}/${id}`
    );
  }

  create(data: CreateTicket): Observable<Ticket> {
    return this.http.post<Ticket>(
      this.apiUrl,
      data
    );
  }

  changeStatus(
    id: number,
    status: TicketStatus
  ): Observable<void> {

    const body: UpdateTicketStatus = {
      status
    };

    return this.http.patch<void>(
      `${this.apiUrl}/${id}/status`,
      body
    );
  }
}