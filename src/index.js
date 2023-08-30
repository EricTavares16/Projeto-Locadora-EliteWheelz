
import 'dotenv/config'


import cors from 'cors'
import express from 'express'

import clientesController from './controlller/clientesController.js'
import veiculoController from './controlller/veiculoController.js'

const server = express()


server.use(cors())
server.use(express.json())


server.use(clientesController)
server.use(veiculoController)



server.listen(process.env.PORT, 
        () => console.log(`A API está funfando na porta ${process.env.PORT}`))