
import 'dotenv/config'


import cors from 'cors'
import express from 'express'

import clientesController from './controlller/clientesController.js'
import veiculoController from './controlller/veiculoController.js'
import tipoVeiculoController from './controlller/tipoVeiculoController.js'

const server = express()


server.use(cors())
server.use(express.json())


server.use(clientesController)
server.use(veiculoController)
server.use(tipoVeiculoController)


server.listen(process.env.PORT, 
        () => console.log(`A API está funfando na porta ${process.env.PORT}`))