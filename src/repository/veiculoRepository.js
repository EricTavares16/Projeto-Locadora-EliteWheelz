import {con} from "./connection.js"


export async function inserir(veiculo) {
    const comando = `
      insert into TB_VEICULO (ID_TIPO_VEICULO, NM_MODELO, DS_MARCA, DS_ANO, DS_PLACA) 
                      values (?, ?, ?, ?, ?)
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


export async function consultar(busca) {
    let comando = `
        SELECT ve.ID,
        ve.ID_TIPO_VEICULO AS idTipoVeiculo,
        tv.DS_TIPO_VEICULO AS tipo,
        ve.NM_MODELO       AS modelo,
        ve.DS_MARCA        AS marca,
        ve.DS_ANO          AS ano,
        ve.DS_PLACA        AS placa
    FROM TB_VEICULO ve
    INNER JOIN tb_tipo_veiculo tv ON tv.ID_TIPO_VEICULO = ve.ID_TIPO_VEICULO
    WHERE ve.NM_MODELO LIKE ?
    OR ve.DS_MARCA LIKE ?
    OR ve.DS_PLACA LIKE ?
    ORDER BY ve.ID
  `

    let [dados] = await con.query(comando, ['%' + busca + '%', '%' + busca + '%', '%' + busca + '%'])
    return dados;
}


export async function alterar(id, veiculo) {
    let comando = `
      update tb_veiculo 
         set ID_TIPO_VEICULO = ?,
             NM_MODELO       = ?,
             DS_MARCA        = ?,
             DS_ANO          = ?,
             DS_PLACA        = ?
       where ID      = ?
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



export async function deletar(id) {
    let comando = `
      delete from TB_VEICULO 
            where ID = ?
  `

    let [resp] = await con.query(comando, [id]);
    return resp.affectedRows;
}