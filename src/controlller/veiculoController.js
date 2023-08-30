import {alterar, consultar, deletar, inserir} from '../repository/veiculoRepository.js' 

import { Router } from "express";


const endpoints = Router()


endpoints.post('/veiculo', async (req, resp) => {
    try{
        const veiculo = req.body 

        if (!veiculo.modelo)
          throw new Error('Modelo é obrigatório.');
    
        if (!isNaN(veiculo.ano))
          throw new Error('Ano inválido.')
        
        let placa = await consultar(veiculo.placa);

        if (placa.length != 0)
          throw new Error('Placa já cadastrada.');
        
        
        let r = await inserir(veiculo);
        resp.send(r);

    }catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})


endpoints.get('/veiculos', async (req, resp) => {  //http://localhost:5000/veiculos?busca=h
try{
    const list = req.query.busca

    const resposta = await consultar(list)

    resp.send(resposta)

}catch(err){
    resp.status(500).send({
        erro: err.message
    })
}
})

endpoints.put('/veiculo', async (req,resp) => {
    try{

        const alt = req.query.id
        const alt2 = req.body

        const resposta = await alterar(alt, alt2)

        resp.send({linhas: resposta})

    }catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})


endpoints.delete('/veiculo', async (req,resp) => {
    try{

        const del = req.query.id

        const resposta = await deletar(del)

        resp.status(204).send()

    }catch(err){
        resp.status(500).send({
            erro: err.message
        })
    }
})
export default endpoints