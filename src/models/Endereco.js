export class Endereco {
    #id;
    #cep;
    #logradouro;
    #bairro;
    #cidade;
    #uf;
    #numero;
    #complemento;
    #idCliente;

    constructor({ cep, logradouro, bairro, cidade, uf, numero, complemento, idCliente, id = null }) {
        this.cep = cep;
        this.#logradouro = logradouro;
        this.#bairro = bairro;
        this.#cidade = cidade;
        this.#uf = uf;
        this.#numero = numero;
        this.#complemento = complemento;
        this.#idCliente = idCliente;
        this.#id = id;
    }

    get id() {
        return this.#id;
    }
    get cep() {
        return this.#cep;
    }
    get logradouro() {
        return this.#logradouro;
    }
    get bairro() {
        return this.#bairro;
    }
    get cidade() {
        return this.#cidade;
    }
    get uf() {
        return this.#uf;
    }
    get numero() {
        return this.#numero;
    }
    get complemento() {
        return this.#complemento;
    }
    get idCliente() {
        return this.#idCliente;
    }


    set cep(value) {
        this.#validarCep(value);
        this.#cep = value;
    }

    //validar o cep
    #validarCep(value) {
        if (!value || !/^\d{8}$/.test(value)) {
            throw new Error("CEP inválido");
        }
    }
}