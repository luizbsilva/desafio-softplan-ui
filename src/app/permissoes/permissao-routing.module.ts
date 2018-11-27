import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../seguranca/auth.guard';
import { PermissoesPesquisaComponent } from './permissoes-pesquisa/permissoes-pesquisa.component';
import { PermissaoCadastroComponent } from './permissao-cadastro/permissao-cadastro.component';



const routes: Routes = [
  {
    path: '',
    component: PermissoesPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_PERMISSAO'] }
  },
  {
    path: 'novo',
    component: PermissaoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_PERMISSAO'] }
  },
  {
    path: ':codigo',
    component: PermissaoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_PERMISSAO'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PermissaoRoutingModule { }
