

import { Router } from "express";
import { AlterarCliente, InserirCliente, ListarCliente, Pesquisa, RemoverCliente } from "../repository/clientesRepository.js";

const endpoints = Router()



endpoints.post('/cliente', async (req, resp) => {

    try {
        const clienteInserir = req.body

        const reposta = await InserirCliente(clienteInserir)

        resp.send(reposta)

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


endpoints.get('/cliente', async (req, resp) => {
    
    try {

        const listaC = req.query

        const reposta = await ListarCliente(listaC)

        resp.send(reposta)

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


endpoints.get('/cliente/:nome', async (req, resp) => {

    try {

        const {nome} = req.params

        const resposta = await Pesquisa(nome)

        resp.send(resposta)

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }

})


endpoints.put('/cliente/:id', async (req,resp) => {
    
    try {
        const {id} = req.params

        const cliente = req.body

        const resposta = await AlterarCliente (id, cliente)

        resp.status(204).send()

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


endpoints.delete('/cliente/:id', async (req,resp) => {
    
    try {
        const {id} = req.params

        const resposta = await RemoverCliente(id)

        resp.status(204).send()


    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})



export default endpoints;