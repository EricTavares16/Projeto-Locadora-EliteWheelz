import {con} from "./connection.js"


export async function buscarTipoPorId(id) {

    const comando = 
    `
        SELECT  ID_TIPO_VEICULO AS ID,
                DS_TIPO AS TIPO
            FROM TB_TIPO_VEICULO
            WHERE   ID_TIPO_VEICULO = ?  

    `

    const [resposta] = await con.query(comando, [id]);

    return resposta;

  }