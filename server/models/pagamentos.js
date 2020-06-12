const moment = require('moment');
const conexao = require('../infraestrutura/conexao');


class Pagamentos {

    adiciona(pagamento, res){

        //calcula a taxa para fazer a requisicao
        const taxa = (pagamento.valor * 0.05).toFixed(2);

        // Regra de negócio da data (ela está sendo formatada para só ser inserida da forma correta)
        const data = moment(pagamento.data, 'DD/MM/YYYY').format('YYYY-MM-DD');

        // validações de erro (Regra de negócio do título (entre 5 e 100 caracteres))
        const tituloEhValido = pagamento.titulo.length > 5 && pagamento.titulo.length <= 100;
                
        // um array para que caso a regra de negocios aumente os critérios possamos inserí-los sem muitos problemas (onde cada objeto desse array é uma validacao)
        const validacoes = [
            {
                nome: "titulo",
                valido: tituloEhValido,
                mensagem: "titulo deve conter mais de 5 caracteres e menos de 100"
            },
        ];
        
        // aqui filtramos o array para descobrir se há algum objeto inválido (com erro), se houver o filtro fará um novo array com os erros, então para cada campo vemos se ele tem o atributo valido como "falso"
        const erros = validacoes.filter(campo => !campo.valido);
        //agora vemos se existe algum erro realmente pelo tamanho do array de erros
        const existemErros = erros.length;

        // Bom, agora se existem erros eu valido e passo os objetos de erro como resposta a requisição
        if(existemErros){
            res.status(400).json(erros);
        } 
        else {
        // então eu crio e envio a query somente se não houver erros

                    // aqui inserimos a data corretamente formatada
                    const pagamentoDatadoeTaxado = {...pagamento, taxa, data};

                    const sql = 'INSERT INTO pagamentos SET ?';

                    conexao.query(sql, pagamentoDatadoeTaxado, (erro, resultados) => {

                        if(erro){

                            //erro no lado do cliente, bad request
                            res.status(400).json(erro);
                        }else{

                            //deu tudo certo com a requisição, então retornamos o pagamento que foi cadastrado como resposta
                            res.status(201).json(pagamentoDatadoeTaxado);
                        }
                    });
        }
    }

    lista(res){

        const sql = "SELECT * FROM pagamentos";

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro);
            }
            else{
                res.status(200).json(resultados);
            }

        });
    }

    buscaPorId(id, res){
        // aqui temos um string interpolada para podermos inserir o id dinamicamente
        const sql = `SELECT * FROM pagamentos WHERE id = ${id}`;

        conexao.query(sql, (erro, resultados) => {
            // para evitar devolver um array de objetos (resposta padrao) vamos instanciar um objeto com a posicao 0 do array de resposta
            const pagamento = resultados[0];

            if(erro){
                res.status(400).json(erro);
            }
            else {
                // então devolvemos um unico objeto, até porque essa é a intenção
                res.status(200).json(pagamento);
            }

        });
    }

    alterar(id, valores, res){

        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD');
        }

        const sql = 'UPDATE pagamentos SET ? WHERE id = ?';

        conexao.query(sql, [valores, id], (erro, resultados) => {

            if(erro){
                res.status(400).json(erro);
            }
            else {
                // aqui devolveremos os valores alterados e o id
                res.status(200).json({valores, id});
            }
        });
    }

    deleta(id, res){

        const sql = 'DELETE FROM pagamentos WHERE id = ?';

        conexao.query(sql, id, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro);
            }
            else {
                // devolvemos o id que foi excluido para o cliente como resposta
                res.status(200).json({id});
            }
        });
    }
}

module.exports = new Pagamentos;