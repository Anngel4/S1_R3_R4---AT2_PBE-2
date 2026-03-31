import { Produto } from "../models/Produto.js";
import produtoRepository from "../repositories/produtoRepository.js";

const produtoController = {
    // Criar produto com imagem obrigatória
    criar: async (req, res) => {
        try {
            const { idCategoria, nome, valor } = req.body;

            if (!req.file) {
                return res.status(400).json({ message: "Imagem é obrigatória." });
            }
            const caminhoImagem = req.file.filename;

            let produto;
            produto = Produto.criar({ idCategoria, nome, valor, caminhoImagem });

            const result = await produtoRepository.criar(produto);
            res.status(201).json({ result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },

    // Manter a imagem fixa
    editar: async (req, res) => {
        try {
            const id = req.params.id;
            const { idCategoria, nome, valor } = req.body;

            
            const produto = Produto.alterar({ idCategoria, nome, valor}, id);

            const result = await produtoRepository.editar(produto);
            res.status(200).json({ result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },

    deletar: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await produtoRepository.deletar(id);
            res.status(200).json({ result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },

    selecionar: async (req, res) => {
        try {
            const result = await produtoRepository.selecionar();
            res.status(200).json({ result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },

    selecionarPorId: async (req, res) => {
        try {
            const id = req.params.id;
            const produtos = await produtoRepository.selecionar();
            const produto = produtos.find(p => p.Id == id);

            if (!produto) {
                return res.status(404).json({ message: "Produto não encontrado." });
            }

            res.status(200).json({ produto });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    }
};

export default produtoController;