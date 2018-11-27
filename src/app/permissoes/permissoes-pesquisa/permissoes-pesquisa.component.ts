import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { ErrorHandlerService } from './../../core/error-handler.service';

import { PermissaoFiltro, PermissaoService } from '../permissao.service';
import { UsuarioService } from 'src/app/usuarios/usuario.service';

@Component({
  selector: 'app-permissoes-pesquisa',
  templateUrl: './permissoes-pesquisa.component.html'
})
export class PermissoesPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PermissaoFiltro();
  permissoes = [];
  usuarios = [];
  formulario: FormGroup;
  usuarioSelecionado: number;
  @ViewChild('tabela') grid;

  constructor(
    private permisaoService: PermissaoService,
    private usuarioService: UsuarioService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private router: Router,
    private formBuilder: FormBuilder,
    private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Adicionar Permissão de usuários');
    this.configurarFormulario();
    this.carregarUsuarios();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      permissoes: [],
      usuario: this.formBuilder.group({
        codigo: [ ],
        nome: []
      })
    });
  }

  salvar() {
    this.adicionarPessoa();
  }


  adicionarPessoa() {
    this.formulario.patchValue({
      permissoes: this.permissoes
    });

    this.permisaoService.adicionar(this.formulario.value)
      .then(pessoaAdicionada => {
        this.messageService.add({ severity: 'success', detail: 'Permissões adicionadas com sucesso!' });
        this.router.navigate(['/permissoes']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarUsuarios() {
    this.usuarioService.listarTodas()
      .then(usuarios => {
        this.usuarios = usuarios
          .map(p => ({ label: p.nome, value: p.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPermissaoUsuario() {
    this.permisaoService.buscarPermissoesUsuario(this.formulario.value).then(permissoes => {
      console.log(permissoes);
      this.permissoes = permissoes;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  alternarStatus(permissao: any): void {
    const novoStatus = !permissao.selecionado;

    this.permisaoService.mudarStatus(permissao.codigo, this.formulario.value, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativada' : 'desativada';

        permissao.selecionado = novoStatus;
        this.messageService.add({ severity: 'success', detail: `Permissão ${acao} com sucesso!` });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
