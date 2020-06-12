
const formCadastroPagamento = document.querySelector('[data-form]');
formCadastroPagamento.addEventListener("submit", event => {
    event.preventDefault();

    const titulo = event.target.querySelector('[data-titulo]');
    const valor = event.target.querySelector('[data-valor]');
    const data = event.target.querySelector('[data-date]');
    const observacoes = event.target.querySelector('[data-obs]');

    cadastrarPagamentos(titulo.value, valor.value, data.value, observacoes.value)
    .then(resposta => {
        if(resposta.status === 201) window.location.href = "pagamentos.html";
    });
    
});