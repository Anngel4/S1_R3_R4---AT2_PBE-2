import { validarCPF } from "../utils/validarCpf.js";
import { limparNumero } from "../utils/limparNumero.js";

export class Cliente {
    #id;
    #nome;
    #cpf;
    #dataCad;

    constructor(nome, cpf = null, id = null) {
        this.nome = nome;

        if (cpf !== null && cpf !== undefined) {
            this.cpf = cpf;
        }

        this.#id = id;
    }

    // GETTERS  E SETTERS
    get id() {
        return this.#id;
    }


    get nome() {
        return this.#nome;
    }
    set nome(value) {
        this.#validarNome(value);
        this.#nome = value;
    }


    get cpf() {
        return this.#cpf;
    }
    set cpf(value) {
        this.#validarCpf(value);
        this.#cpf = value;
    }

    get dataCad() {
        return this.#dataCad;
    }
    

    // VALIDAÇÕES NECESSÁRIAS
    #validarNome(value) {
        if (!value || value.trim().length < 3) {
            throw new Error("Nome inválido");
        }
    }

    #validarCpf(value) {
        if (!value) {
            throw new Error("CPF é obrigatório");
        }

        const cpfLimpo = limparNumero(value);

        if (!validarCPF(cpfLimpo)) {
            throw new Error("CPF inválido");
        }
    }


//STATICS (criar e alterar)
    static criar({ nome, cpf }) {
        return new Cliente(nome, cpf);
    }

    static alterar({ nome, cpf }, id) {
        if (!id) throw new Error("ID é obrigatório para alteração");
        return new Cliente(nome, cpf !== undefined ? cpf : null, id);
    }
}