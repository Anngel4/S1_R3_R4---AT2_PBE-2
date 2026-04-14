import { Router } from "express";
import clienteController from "../controllers/clienteController.js";

const clienteRoutes = Router();

//ROTAS
clienteRoutes.post('/', clienteController.criar);
clienteRoutes.get('/', clienteController.selecionar);
clienteRoutes.put('/:id', clienteController.atualizar);
clienteRoutes.delete('/:id', clienteController.deletar);


export default clienteRoutes;