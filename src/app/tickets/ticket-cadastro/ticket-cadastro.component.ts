import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/components/common/messageservice';

import { ErrorHandlerService } from '../../core/error-handler.service';
import { CategoriaService } from '../../categorias/categoria.service';
import { PessoaService } from '../../pessoas/pessoa.service';
import { Ticket } from '../../core/model';
import { TicketService } from '../tickets.service';
import { UsuarioService } from '../../usuario/usuario.service';

@Component({
  selector: 'app-ticket-cadastro',
  templateUrl: './ticket-cadastro.component.html'
})
export class TicketCadastroComponent implements OnInit {

  tipos = [
    { label: 'Orçamento', value: 'ORCAMENTO' },
    { label: 'Serviço', value: 'SERVICO' },
  ];

  categorias = [];
  pessoas = [];
  usuarios = [];
  formulario: FormGroup;
  uploadEmAndamento = false;

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private ticketService: TicketService,
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.configurarFormulario();

    const codigoTicket = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo lançamento');

    if (codigoTicket) {
      this.carregarTicket(codigoTicket);
    }

    this.carregarCategorias();
    this.carregarPessoas();
    this.carregarUsuarios();
  }

  antesUploadAnexo(event) {
    event.xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));

    this.uploadEmAndamento = true;
  }

  aoTerminarUploadAnexo(event) {
    const anexo = JSON.parse(event.xhr.response);

    this.formulario.patchValue({
      anexo: anexo.nome,
      urlAnexo: anexo.url
    });

    this.uploadEmAndamento = false;
  }

  erroUpload(event) {
    this.messageService.add({ severity: 'error', detail: 'Erro ao tentar enviar anexo!' });

    this.uploadEmAndamento = false;
  }

  removerAnexo() {
    this.formulario.patchValue({
      anexo: null,
      urlAnexo: null
    });
  }

  get nomeAnexo() {
    const nome = this.formulario.get('anexo').value;

    if (nome) {
      return nome.substring(nome.indexOf('_') + 1, nome.length);
    }

    return '';
  }

  get urlUploadAnexo() {
    return this.ticketService.urlUploadAnexo();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      tipo: [ 'ORCAMENTO', Validators.required ],
      dataCriacao: [ null, Validators.required ],
      dataVencimento: [],
      descricao: [null, [ this.validarObrigatoriedade, this.validarTamanhoMinimo(5) ]],
      valor: [ null, Validators.required ],
      pessoa: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      }),
      usuario: this.formBuilder.group({
        codigo: [ ],
        nome: []
      }),
      categoria: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      }),
      observacao: [],
      anexo: [],
      urlAnexo: []
    });
  }

  validarObrigatoriedade(input: FormControl) {
    return (input.value ? null : { obrigatoriedade: true });
  }

  validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor) ? null : { tamanhoMinimo: { tamanho: valor } };
    };
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  carregarTicket(codigo: number) {
    this.ticketService.buscarPorCodigo(codigo)
      .then(ticket => {
        this.formulario.patchValue(ticket);
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar() {
    if (this.editando) {
      this.atualizarTicket();
    } else {
      this.adicionarTicket();
    }
  }

  adicionarTicket() {
    this.ticketService.adicionar(this.formulario.value)
      .then(ticketAdicionado => {
        this.messageService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso!' });

        this.router.navigate(['/tickets', ticketAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarTicket() {
    this.ticketService.atualizar(this.formulario.value)
      .then(ticket => {
        this.formulario.patchValue(ticket);

        this.messageService.add({ severity: 'success', detail: 'Lançamento alterado com sucesso!' });
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias
          .map(c => ({ label: c.nome, value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    this.pessoaService.listarTodas()
      .then(pessoas => {
        this.pessoas = pessoas
          .map(p => ({ label: p.nome, value: p.codigo }));
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

  novo() {
    this.formulario.reset();

    setTimeout(function() {
      this.ticket = new Ticket();
    }.bind(this), 1);

    this.router.navigate(['/ticket/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Ticket: ${this.formulario.get('descricao').value}`);
  }
}
