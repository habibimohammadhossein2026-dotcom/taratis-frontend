import { Routes } from '@angular/router';
import { TicketList } from './pages/ticket-list/ticket-list';
import { TicketCreate } from './pages/ticket-create/ticket-create';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tickets',
    pathMatch: 'full'
  },
  {
    path: 'tickets',
    component: TicketList
  },
  {
    path: 'tickets/new',
    component: TicketCreate
  },
  {
    path: '**',
    redirectTo: 'tickets'
  }
];