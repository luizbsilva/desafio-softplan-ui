import { Injectable } from '@angular/core';

import 'rxjs/operator/toPromise';
import * as moment from 'moment';

import { environment } from './../../environments/environment';
import { MoneyHttp } from '../seguranca/money-http';

@Injectable()
export class DashboardService {

  ticketsUrl: string;

  constructor(private http: MoneyHttp) {
    this.ticketsUrl = `${environment.apiUrl}/tickets`;
  }

  ticketsPorCategoria(): Promise<Array<any>> {
    return this.http.get<Array<any>>(`${this.ticketsUrl}/estatisticas/por-categoria`)
      .toPromise();
  }

  ticketsPorDia(): Promise<Array<any>> {
    return this.http.get<Array<any>>(`${this.ticketsUrl}/estatisticas/por-dia`)
      .toPromise()
      .then(response => {
        const dados = response;
        this.converterStringsParaDatas(dados);

        return dados;
      });
  }

  private converterStringsParaDatas(dados: Array<any>) {
    for (const dado of dados) {
      dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
    }
  }
}
