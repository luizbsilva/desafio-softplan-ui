import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../seguranca/auth.guard';
import { TicketsPesquisaComponent } from './tickets-pesquisa/tickets-pesquisa.component';
import { TicketCadastroComponent } from './ticket-cadastro/ticket-cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: TicketsPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_TICKET'] }
  },
  {
    path: 'novo',
    component: TicketCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_TICKET'] }
  },
  {
    path: ':codigo',
    component: TicketCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_TICKET'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
