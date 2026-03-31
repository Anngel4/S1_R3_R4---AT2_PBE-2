import { Router } from "express";
import produtoController from "../controllers/produtoController.js";
import upload from "../middlewares/upload.js";

const produtoRoutes = Router();

produtoRoutes.get('/', produtoController.selecionar);
produtoRoutes.post('/', upload.single('caminhoImagem'), produtoController.criar);
produtoRoutes.put('/:id', produtoController.editar);
produtoRoutes.delete('/:id', produtoController.deletar);

export default produtoRoutes;