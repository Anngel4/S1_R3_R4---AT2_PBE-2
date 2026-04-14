import { Cliente } from "../models/Cliente.js";
import { Endereco } from "../models/Endereco.js";
import { Telefone } from "../models/Telefone.js";
import axios from "axios";
import clienteRepository from "../repositories/clienteRepository.js";

const clienteController = {
 
    //---------------
    //------------ CRUD CONTROLLER
    //---------------

    //CREATE(post)
    criar: async (req, res) => {
        try {
            const { nome, cpf, cep, numero, complemento, telefones } = req.body;

            const cepRegex = /^[0-9]{8}$/;
            if (!cepRegex.test(cep)) {
                return res.status(400).json({ message: "CEP inválido" });
            }

            const dadosCep = await consultaCep(cep);

            const cliente = Cliente.criar({ nome, cpf });

            const endereco = new Endereco({cep, numero, complemento, logradouro: dadosCep.logradouro, bairro: dadosCep.bairro, cidade: dadosCep.localidade, uf: dadosCep.uf});

            let listaTelefones = [];

            //para ter mais de 1 telefone, ele precisa ser um array para armazenar mais de 1
            if (Array.isArray(telefones)) {
                listaTelefones = telefones.map(t => new Telefone(t));
            } else {
                if (telefones) {
                    listaTelefones = [new Telefone(telefones)];
                } else {
                    listaTelefones = [];
                }
            }

            const result = await clienteRepository.criar(cliente, endereco, listaTelefones);

            return res.status(201).json({
                message: "Cliente criado com sucesso",
                cliente: result
            });

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao criar cliente",
                error: error.message
            });
        }
    },
    //READ(select)
    selecionar: async (req, res) => {
        try {
            const result = await clienteRepository.selecionar();
            return res.json(result);
        } catch (error) {
            return res.status(500).json({
                message: "Erro ao buscar clientes",
                error: error.message
            });
        }
    },
    //UPDATE(put)
    atualizar: async (req, res) => {
        try {
            const idCliente = req.params.id;

            const { nome, cpf, cep, numero, complemento, telefones } = req.body;

            const dadosCep = await consultaCep(cep);

            const cliente = Cliente.alterar(
                { nome, cpf: cpf || null },
                idCliente
            );

            const endereco = new Endereco({
                cep, numero, complemento, logradouro: dadosCep.logradouro, bairro: dadosCep.bairro, cidade: dadosCep.localidade, uf: dadosCep.uf
            });

            let listaTelefones = [];

            //para ter mais de 1 telefone, ele precisa ser um array para armazenar mais de 1, esse array se chama map            
            if (Array.isArray(telefones)) {
                listaTelefones = telefones.map(t => new Telefone(t));
            } else {
                if (telefones) {
                    listaTelefones = [new Telefone(telefones)];
                } else {
                    listaTelefones = [];
                }
            }

            const result = await clienteRepository.atualizar(idCliente, cliente, endereco, listaTelefones);

            return res.json({ message: "Cliente atualizado com sucesso", result });

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao atualizar cliente",
                error: error.message
            });
        }
    },
    //DELETE
    deletar: async (req, res) => {
        try {
            const idCliente = req.params.id;

            const result = await clienteRepository.deletar(idCliente);

            return res.json({
                message: "Cliente deletado com sucesso",
                result
            });

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao deletar cliente",
                error: error.message
            });
        }
    }
};

export default clienteController;

//Consultar cep, ao colocar o nome, vai ver se é válido e adicionar informações extras
async function consultaCep(cep) {
    try {
        const resApi = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        if (resApi.data.erro) {
            throw new Error("CEP não encontrado");
        }

        return resApi.data;

    } catch (error) {
        console.error(error);
        throw new Error("Erro ao buscar o CEP: " + error.message);
    }
}
