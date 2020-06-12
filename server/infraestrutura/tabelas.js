class Tabelas {
    init(conexao){

        this.conexao = conexao;
        this.criarPagamentos();
    }


    criarPagamentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS pagamentos (id int NOT NULL auto_increment, titulo varchar(100) not null, valor double not null, data datetime not null, taxa double not null, observacoes text, PRIMARY KEY(id))';

        this.conexao.query(sql, erro => {
            if(erro) console.log(erro)
            else{

                console.log('Tabela de pagamentos criada com sucesso');
            }
        });

    }
}

module.exports = new Tabelas;