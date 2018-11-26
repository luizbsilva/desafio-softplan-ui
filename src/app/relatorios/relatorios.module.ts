import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CalendarModule } from 'primeng/calendar';

import { SharedModule } from './../shared/shared.module';
import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { RelatorioTicketsComponent } from './relatorio-tickets/relatorio-tickets.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    CalendarModule,

    SharedModule,
    RelatoriosRoutingModule
  ],
  declarations: [RelatorioTicketsComponent]
})
export class RelatoriosModule { }
