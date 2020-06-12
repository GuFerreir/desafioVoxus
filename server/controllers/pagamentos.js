const Pagamentos = require('../models/pagamentos')

module.exports = app => {
    
    //aqui listamos todos os pagamentos
    app.get('/pagamentos', (req, res) => {

        Pagamentos.lista(res);
    });

    // aqui buscamos um pagamento específico pelo seu id
    app.get('/pagamentos/:id', (req, res) => {

        // JSON é um formato textual mas nossa base de dados tem id como inteiro, então precisamos converter para inteiro
        const id = parseInt(req.params.id);
        Pagamentos.buscaPorId(id, res);
    });

    // aqui adicionamos um pagamento
    app.post('/pagamentos', (req, res) => {
        
        const pagamento = req.body;
        Pagamentos.adiciona(pagamento, res);
    });

    app.put('/pagamentos/:id', (req, res) => {

        // mesmo caso da busca por id
        const id = parseInt(req.params.id);
        const pagamento = req.body;

        Pagamentos.alterar(id, pagamento, res);
    });


    app.delete('/pagamentos/:id', (req, res) => {

            // mesmo caso da busca por id
            const id = parseInt(req.params.id);
            
            Pagamentos.deleta(id, res);
    });

}