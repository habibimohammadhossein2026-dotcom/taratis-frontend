import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { TicketService } from '../../core/services/ticket.service';
import {
  CreateTicket,
  TicketPriority
} from '../../models/ticket.model';

@Component({
  selector: 'app-ticket-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './ticket-create.html',
  styleUrl: './ticket-create.scss'
})
export class TicketCreate {

  submitting = false;
  errorMessage = '';

  priorities = [
    TicketPriority.Low,
    TicketPriority.Medium,
    TicketPriority.High
  ];

  form;

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private router: Router
  ) {
    this.form = this.fb.nonNullable.group({
      title: [
        '',
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ],

      requesterName: [
        '',
        [
          Validators.required,
          Validators.maxLength(100)
        ]
      ],

      description: [
        '',
        [
          Validators.required,
          Validators.maxLength(2000)
        ]
      ],

      priority: [
        TicketPriority.Medium,
        Validators.required
      ]
    });
  }

  submit(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.errorMessage = '';

    const data: CreateTicket = {
      title: this.form.controls.title.value,
      requesterName: this.form.controls.requesterName.value,
      description: this.form.controls.description.value,
      priority: this.form.controls.priority.value
    };

    this.ticketService.create(data).subscribe({

      next: () => {
        this.router.navigate(['/tickets']);
      },

      error: error => {
        console.error(error);

        this.errorMessage =
          'An error occurred while creating the ticket.';

        this.submitting = false;
      }

    });
  }
}