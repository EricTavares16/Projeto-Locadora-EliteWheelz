
import { Router } from "express";
import { buscarTipoPorId } from "../repository/tipoVeiculoRepository.js";


const endpoints = Router()


endpoints.get('/tipo/:id', async (req, resp) => {

    try {

        const {id} = req.params

        const resposta = await buscarTipoPorId(id)

        resp.send(resposta)
        
    } catch (err) {
        resp.status(500).send({
            erro: err.message
        })
    }
})



export default endpoints