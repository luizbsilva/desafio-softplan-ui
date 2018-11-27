import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { Usuario } from '../../core/model';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html'
})
export class UsuarioCadastroComponent implements OnInit {

  usuario = new Usuario();  tipos = [
    { label: 'Administrador', value: 'ADMINISTRADOR' },
    { label: 'Técnico', value: 'TECNICO' },
    { label: 'Solicitante', value: 'USUARIO' },
  ];

  constructor(
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const codigoUsuario = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo Usuario');

    if (codigoUsuario) {
      this.carregarUsuario(codigoUsuario);
    }
  }

  get editando() {
    return Boolean(this.usuario.codigo);
  }

  carregarUsuario(codigo: number) {
    this.usuarioService.buscarPorCodigo(codigo)
      .then(pessoa => {
        this.usuario = pessoa;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarUsuario(form);
    } else {
      this.adicionarUsuario(form);
    }
  }

  adicionarUsuario(form: FormControl) {
    this.usuarioService.adicionar(this.usuario)
      .then(pessoaAdicionada => {
        this.messageService.add({ severity: 'success', detail: 'Usuario adicionada com sucesso!' });
        this.router.navigate(['/usuarios', pessoaAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarUsuario(form: FormControl) {
    this.usuarioService.atualizar(this.usuario)
      .then(pessoa => {
        this.usuario = pessoa;

        this.messageService.add({ severity: 'success', detail: 'Usuario alterada com sucesso!' });
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nova(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.pessoa = new Usuario();
    }.bind(this), 1);

    this.router.navigate(['/usuarios/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Usuario: ${this.usuario.nome}`);
  }

}
