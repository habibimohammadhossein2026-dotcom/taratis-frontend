import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { TicketService } from '../../core/services/ticket.service';
import { PersianDatePipe } from '../../shared/pipes/persian-date-pipe';
import {
  Ticket,
  TicketPriority,
  TicketStatus
} from '../../models/ticket.model';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    PersianDatePipe
  ],
  templateUrl: './ticket-list.html',
  styleUrl: './ticket-list.scss'
})
export class TicketList implements OnInit {

  tickets: Ticket[] = [];

  search = '';

  selectedStatus: TicketStatus | '' = '';
  selectedPriority: TicketPriority | '' = '';

  loading = false;

  statuses = [
    TicketStatus.Open,
    TicketStatus.InProgress,
    TicketStatus.Done
  ];

  priorities = [
    TicketPriority.Low,
    TicketPriority.Medium,
    TicketPriority.High
  ];

  constructor(
    private ticketService: TicketService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTickets();
  }

loadTickets(): void {

  this.loading = true;

  console.log('Loading tickets...');

  this.ticketService
    .getTickets(
      this.search,
      this.selectedStatus,
      this.selectedPriority
    )
    .pipe(
      finalize(() => {
        this.loading = false;
        console.log('Request finished');
      })
    )
    .subscribe({

      next: (tickets) => {

        console.log('Tickets:', tickets);

        this.tickets = tickets;
        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error(
          'Error loading tickets:',
          error
        );

      }

    });
}

  searchTickets(): void {
    this.loadTickets();
  }

  filterChanged(): void {
    this.loadTickets();
  }

  changeStatus(
    ticket: Ticket,
    status: TicketStatus
  ): void {

    this.ticketService
      .changeStatus(ticket.id, status)
      .subscribe({
        next: () => {
          this.loadTickets();
        },
        error: error => {
          console.error(error);
        }
      });
  }
}