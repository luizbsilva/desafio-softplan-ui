import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';

import { SharedModule } from '../shared/shared.module';
import { PermissaoCadastroComponent } from './permissao-cadastro/permissao-cadastro.component';
import { PermissoesPesquisaComponent } from './permissoes-pesquisa/permissoes-pesquisa.component';
import { PermissaoRoutingModule } from './permissao-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputMaskModule,
    PanelModule,
    DialogModule,
    DropdownModule,

    SharedModule,
    PermissaoRoutingModule
  ],
  declarations: [
    PermissaoCadastroComponent,
    PermissoesPesquisaComponent
  ],
  exports: []
})
export class PermissoesModule { }
