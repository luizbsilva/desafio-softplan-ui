import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { AuthService } from '../../seguranca/auth.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { TicketService, TicketFiltro } from '../tickets.service';

@Component({
  selector: 'app-tickets-pesquisa',
  templateUrl: './tickets-pesquisa.component.html'
})
export class TicketsPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new TicketFiltro();
  tickets = [];
  @ViewChild('tabela') grid;

  constructor(
    private ticketService: TicketService,
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de lançamentos');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.ticketService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.tickets = resultado.tickets;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(ticket: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(ticket);
      }
    });
  }

  excluir(ticket: any) {
    this.ticketService.excluir(ticket.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.messageService.add({ severity: 'success', detail: 'Ticket excluído com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
