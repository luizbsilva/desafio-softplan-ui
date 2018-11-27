import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {CheckboxModule} from 'primeng/checkbox';

import { SharedModule } from '../shared/shared.module';
import { PermissoesPesquisaComponent } from './permissoes-pesquisa/permissoes-pesquisa.component';
import { PermissaoRoutingModule } from './permissao-routing.module';


@NgModule({
  imports: [

    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    SelectButtonModule,
    DropdownModule,
    ProgressSpinnerModule,
    CheckboxModule,

    SharedModule,
    PermissaoRoutingModule
  ],
  declarations: [
    PermissoesPesquisaComponent
  ],
  exports: []
})
export class PermissoesModule { }
