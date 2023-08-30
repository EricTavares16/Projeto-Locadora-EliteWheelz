import {AlterarVeiculo, DeletarVeiculo, InserirVeiculo, ListarVeiculo, PesquisarVeiculo} from '../repository/veiculoRepository.js' 

import { Router } from "express";


const endpoints = Router()


endpoints.post('/veiculo', async (req, resp) => {
    try{
        const veiculo = req.body 

        if (!veiculo.modelo)
          throw new Error('Modelo é obrigatório.');
    
        if (isNaN(veiculo.ano))
          throw new Error('Ano inválido.')
        
        const placa = await PesquisarVeiculo(veiculo.placa);

        if (placa.length != 0)
          throw new Error('Placa já cadastrada.');
        
        
        const resposta = await InserirVeiculo(veiculo);
        resp.send(resposta);

    }catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})


endpoints.get('/veiculos', async (req, resp) => { 
    try{

        const resposta = await ListarVeiculo()

        resp.send(resposta)

    }catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})


endpoints.get('/veiculos/:nome', async (req, resp) => { 
    try{
        const {nome} = req.params

        const resposta = await PesquisarVeiculo(nome)

        resp.send(resposta)

    }catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})

endpoints.put('/veiculo/:id', async (req,resp) => {
    try{

        const {id} = req.params
        const veiculo = req.body

        const resposta = await AlterarVeiculo(id, veiculo)

        resp.send({linhas: resposta})

    }catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})


endpoints.delete('/veiculo/:id', async (req,resp) => {
    try{

        const {id} = req.params

        const resposta = await DeletarVeiculo(id)

        resp.send({linhas: resposta})

    }catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})


export default endpoints;