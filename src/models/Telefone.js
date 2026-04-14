export class Telefone {
    #id;
    #telefone;
    #idCliente;

    constructor(telefone, idCliente = null, id = null) {
        this.telefone = telefone;
        this.#idCliente = idCliente;
        this.#id = id;
    }

    get id() {
        return this.#id;
    }
    get telefone() {
        return this.#telefone;
    }
    get idCliente() {
        return this.#idCliente;
    }

    set telefone(value) {
        this.#validarTelefone(value);
        this.#telefone = value;
    }

    //validar telefone e evitar numeros tipo 1111111111
    #validarTelefone(value) {
        if (!value || !/^\d{10,11}$/.test(value)) {
            throw new Error("Telefone inválido");
        }
    }
}