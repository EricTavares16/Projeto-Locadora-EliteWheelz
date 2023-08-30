
import { con } from "./connection.js";



export async function InserirCliente (cliente) {

    const comando = 
        `   INSERT INTO TB_CLIENTE (NM_NOME, DS_EMAIL, DS_TELEFONE, DS_CPF, DS_CNH)
                    VALUES(?, ?, ?, ?, ?)`

    const [reposta] = await con.query (comando, 
        
           [ 
                cliente.nome,
                cliente.email,
                cliente.telefone,
                cliente.cpf,
                cliente.cnh
            ]
        )
    
    cliente.id = reposta.insertId;

    return cliente;
}


export async function ListarCliente (){
    
    const comando = `SELECT NM_NOME AS Nome,
                            DS_EMAIL AS Email,
                            DS_TELEFONE AS Tel, 
                            DS_CPF AS CPF,
                            DS_CNH AS CNH 
                     FROM TB_CLIENTE`

    const [resposta] = await con.query (comando)
    return resposta
}


export async function Pesquisa (itemBusca) {

    const comando =

        `SELECT * FROM TB_CLIENTE
            WHERE NM_NOME LIKE ?` 

    const [reposta] = await con.query (comando, [`%${itemBusca}%`])

    return reposta

}

export async function AlterarCliente (id, cliente){
    const comando = 
        `UPDATE TB_CLIENTE
            SET     NM_NOME         = ?,
                    DS_EMAIL        = ?,
                    DS_TELEFONE     = ?, 
                    DS_CPF          = ?,
                    DS_CNH          = ?
            WHERE ID_CLIENTE        = ?`
            
    const [resposta] = await con.query (comando, 
        [
            cliente.nome,
            cliente.email,
            cliente.telefone,
            cliente.cpf,
            cliente.cnh,
            id  
        ])

    return resposta.affectedRows
}


export async function RemoverCliente (id){
    const comando =   
    `DELETE FROM TB_CLIENTE
            WHERE ID_CLIENTE = ? `

    const [resposta] = await con.query (comando, [id])

    return resposta.affectedRows
}

