import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthGuard } from '../seguranca/auth.guard';
import { RelatorioTicketsComponent } from './relatorio-tickets/relatorio-tickets.component';

const routes: Routes = [
  {
    path: 'tickets',
    component: RelatorioTicketsComponent,
    canActivate: [ AuthGuard ],
    data: { roles: ['ROLE_PESQUISAR_TICKET'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatoriosRoutingModule { }
