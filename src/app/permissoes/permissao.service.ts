import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';
import { MoneyHttp } from '../seguranca/money-http';
import { Permissao, Permissoes } from '../core/model';

export class PermissaoFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 15;
}

@Injectable()
export class PermissaoService {

  permissaoUrl: string;

  constructor(private http: MoneyHttp) {
    this.permissaoUrl = `${environment.apiUrl}/permissoes`;
  }

  pesquisar(filtro: PermissaoFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get<any>(`${this.permissaoUrl}`, { params })
      .toPromise()
      .then(response => {
        const permissoes = response.content;

        const resultado = {
          permissoes,
          total: response.totalElements
        };

        return resultado;
      });
  }

  buscarPermissoesUsuario(permissao: Permissoes): Promise<any> {
    const params = new HttpParams()
      .append('codigo', permissao.usuario.codigo.toString());

    return this.http.get<any>(`${this.permissaoUrl}/por-usuario`, { params }).toPromise();

  }

  adicionar(permissao: Permissoes): Promise<Permissoes> {
    return this.http.post<Permissoes>(this.permissaoUrl, permissao)
      .toPromise();
  }

  mudarStatus(codigoPermissao: number, permissao: Permissoes, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders()
        .append('Content-Type', 'application/json');

    return this.http.put(`${this.permissaoUrl}/${codigoPermissao}/${permissao.usuario.codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
  }

}
