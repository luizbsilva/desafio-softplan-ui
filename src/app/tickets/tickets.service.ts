import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';
import { Ticket } from '../core/model';
import { MoneyHttp } from '../seguranca/money-http';

export class TicketFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class TicketService {

  ticketsUrl: string;

  constructor(private http: MoneyHttp) {
    this.ticketsUrl = `${environment.apiUrl}/tickets`;
  }

  urlUploadAnexo(): string {
    return `${this.ticketsUrl}/anexo`;
  }

  pesquisar(filtro: TicketFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.descricao) {
      params = params.append('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.append('dataVencimentoDe',
        moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
      params = params.append('dataVencimentoAte',
        moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    return this.http.get<any>(`${this.ticketsUrl}?resumo`,
        { params })
      .toPromise()
      .then(response => {
        const tickets = response.content;

        const resultado = {
          tickets,
          total: response.totalElements
        };

        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.ticketsUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(ticket: Ticket): Promise<Ticket> {
    return this.http.post<Ticket>(this.ticketsUrl, ticket)
      .toPromise();
  }

  atualizar(ticket: Ticket): Promise<Ticket> {
    return this.http.put<Ticket>(`${this.ticketsUrl}/${ticket.codigo}`, ticket)
      .toPromise()
      .then(response => {
        const ticketAlterado = response;

        this.converterStringsParaDatas([ticketAlterado]);

        return ticketAlterado;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Ticket> {
    return this.http.get<Ticket>(`${this.ticketsUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const ticket = response;

        this.converterStringsParaDatas([ticket]);

        return ticket;
      });
  }

  private converterStringsParaDatas(tickets: Ticket[]) {
    for (const ticket of tickets) {
      ticket.dataVencimento = moment(ticket.dataVencimento,
        'YYYY-MM-DD').toDate();

      if (ticket.dataCricao) {
        ticket.dataCricao = moment(ticket.dataCricao,
          'YYYY-MM-DD').toDate();
      }
    }
  }

}
