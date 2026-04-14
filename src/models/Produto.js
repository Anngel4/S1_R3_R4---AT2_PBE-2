export class Produto {
    #id;
    #idCategoria;
    #nome;
    #valor;
    #caminhoImagem;
    #dataCad;

    constructor(pIdCategoria, pNome, pValor, pCaminhoImagem, pId) {
        this.idCategoria = pIdCategoria;
        this.nome = pNome;
        this.valor = pValor;
        this.caminhoImagem = pCaminhoImagem; // vai chamar o setter
        this.id = pId;
    }

    // Getters e Setters
    get id() {
        return this.#id;
    }
    set id(value) {
        this.#validarId(value); this.#id = value;
    }

    get idCategoria() {
        return this.#idCategoria;
    }
    set idCategoria(value) {
        this.#validarIdCategoria(value); this.#idCategoria = value;
    }

    get nome() {
        return this.#nome;
    }
    set nome(value) {
        this.#validarNome(value); this.#nome = value;
    }

    get valor() {
        return this.#valor;
    }
    set valor(value) {
        this.#validarValor(value); this.#valor = value;
    }

    get caminhoImagem() {
        return this.#caminhoImagem;
    }
    set caminhoImagem(value) {
        // só valida se value não for indefinido
        if (value !== undefined) this.#validarPathImagem(value);
        this.#caminhoImagem = value;
    }

    #validarId(value) {
        if (value && value <= 0) throw new Error('Verifique o ID informado');
    }

    #validarIdCategoria(value) {
        if (!value || value <= 0) throw new Error('Verifique o ID da categoria informado');
    }

    #validarNome(value) {
        if (!value || value.trim().length < 3 || value.trim().length > 100) {
            throw new Error('O campo nome é obrigatório e deve ter entre 3 e 100 caracteres.');
        }
    }

    #validarValor(value) {
        if (value === undefined || value < 0) {
            throw new Error('O campo valor é obrigatório e deve ser um número positivo.');
        }
    }

    #validarPathImagem(value) {
        if (!value || value.trim().length == 0) {
            throw new Error('O caminho da imagem é obrigatório.');
        }
    }

    // Factory methods
    static criar(dados) {
        return new Produto(dados.idCategoria, dados.nome, dados.valor, dados.caminhoImagem, null);
    }

    static alterar(dados, id) {
        return new Produto(dados.idCategoria, dados.nome, dados.valor, dados.caminhoImagem, id);
    }
}