import { Component, OnInit } from '@angular/core';

import { RelatoriosService } from '../relatorios.service';

@Component({
  selector: 'app-relatorio-tickets',
  templateUrl: './relatorio-tickets.component.html'
})
export class RelatorioTicketsComponent implements OnInit {

  periodoInicio: Date;
  periodoFim: Date;

  constructor(private relatoriosService: RelatoriosService) { }

  ngOnInit() {
  }

  gerar() {
    this.relatoriosService.relatorioTicketsPorPessoa(this.periodoInicio, this.periodoFim)
      .then(relatorio => {
        const url = window.URL.createObjectURL(relatorio);

        window.open(url);
      });
  }
}
