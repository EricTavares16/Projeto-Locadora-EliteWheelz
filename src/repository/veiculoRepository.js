import {con} from "./connection.js"


export async function InserirVeiculo(veiculo) {
    const comando = `
      INSERT INTO TB_VEICULO (ID_TIPO_VEICULO, DS_MODELO, DS_MARCA, NR_ANO, DS_PLACA) 
                      VALUES (?, ?, ?, ?, ?)
  `

    const [resp] = await con.query(comando,
        [
            veiculo.idTipoVeiculo,
            veiculo.modelo,
            veiculo.marca,
            veiculo.ano,
            veiculo.placa
        ])

    veiculo.id = resp.insertId;
    return veiculo;
}


export async function ListarVeiculo () {
    
    const comando = 
        ` SELECT    ve.ID_VEICULO           AS Id,
                    ve.ID_TIPO_VEICULO      AS TipoVeiculo,
                    tv.DS_TIPO              AS tipo,
                    ve.DS_MODELO            AS modelo,
                    ve.DS_MARCA             AS marca,
                    ve.NR_ANO               AS ano,
                    ve.DS_PLACA             AS placa      
            FROM TB_VEICULO                 AS VE
            INNER JOIN TB_TIPO_VEICULO      AS tv ON tv.ID_TIPO_VEICULO = ve.ID_TIPO_VEICULO 
    `

    const [resposta] = await con.query (comando)
    return resposta
}


export async function PesquisarVeiculo(busca) {
    let comando = `
        SELECT  ve.ID_VEICULO           AS Id,
                ve.ID_TIPO_VEICULO      AS TipoVeiculo,
                tv.DS_TIPO              AS tipo,
                ve.DS_MODELO            AS modelo,
                ve.DS_MARCA             AS marca,
                ve.NR_ANO               AS ano,
                ve.DS_PLACA             AS placa
        FROM TB_VEICULO                 AS ve
        INNER JOIN TB_TIPO_VEICULO      as tv ON tv.ID_TIPO_VEICULO = ve.ID_TIPO_VEICULO
    WHERE ve.DS_MODELO LIKE ?
    OR ve.DS_MARCA LIKE ?
    OR ve.DS_PLACA LIKE ?
    ORDER BY ve.ID_VEICULO
  `

    let [dados] = await con.query(comando, ['%' + busca + '%', '%' + busca + '%', '%' + busca + '%'])
    return dados;
}


export async function AlterarVeiculo(id, veiculo) {
    let comando = `
      UPDATE TB_VEICULO
            SET ID_TIPO_VEICULO = ?,
                DS_MODELO       = ?,
                DS_MARCA        = ?,
                NR_ANO          = ?,
                DS_PLACA        = ?
        WHERE ID_VEICULO        = ?
  `

    let [resp] = await con.query(comando,
        [
            veiculo.idTipoVeiculo,
            veiculo.modelo,
            veiculo.marca,
            veiculo.ano,
            veiculo.placa,
            id
        ])

    return resp.affectedRows;
}


export async function DeletarVeiculo(id) {
    let comando = `
      DELETE FROM TB_VEICULO 
            WHERE ID_VEICULO = ?
  `

    let [resp] = await con.query(comando, [id]);
    return resp.affectedRows;
}