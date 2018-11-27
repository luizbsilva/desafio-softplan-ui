import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';
import { MoneyHttp } from '../seguranca/money-http';
import { Usuario } from '../core/model';

export class UsuarioFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PermissaoService {

  usuarioUrl: string;

  constructor(private http: MoneyHttp) {
    this.usuarioUrl = `${environment.apiUrl}/usuarios`;
  }

  pesquisar(filtro: UsuarioFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get<any>(`${this.usuarioUrl}`, { params })
      .toPromise()
      .then(response => {
        const usuarios = response.content;

        const resultado = {
          usuarios,
          total: response.totalElements
        };

        return resultado;
      });
  }

  listarTodas(): Promise<any> {
    return this.http.get<any>(this.usuarioUrl)
      .toPromise()
      .then(response => response.content);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.usuarioUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders()
        .append('Content-Type', 'application/json');

    return this.http.put(`${this.usuarioUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
  }

  adicionar(usuario: Usuario): Promise<Usuario> {
    return this.http.post<Usuario>(this.usuarioUrl, usuario)
      .toPromise();
  }

  atualizar(usuario: Usuario): Promise<Usuario> {
    return this.http.put<Usuario>(`${this.usuarioUrl}/${usuario.codigo}`, usuario)
      .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<Usuario> {
    return this.http.get<Usuario>(`${this.usuarioUrl}/${codigo}`)
      .toPromise();
  }

}
