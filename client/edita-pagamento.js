const pegaURL = new URL(window.location);

const id = pegaURL.searchParams.get('id');

const inputTitulo = document.querySelector('[data-titulo]');
const inputValor = document.querySelector('[data-valor]');
const inputData = document.querySelector('[data-date]');
const inputTaxa = document.querySelector('[data-taxa]');
const inputObservacoes = document.querySelector('[data-obs]');


selecionaPagamento(id).then( dados => {

    inputTitulo.value = dados.titulo
    inputValor.value = dados.valor,
    inputData.value =  dataParaTexto(new Date(dados.data)),
    inputTaxa.value = dados.taxa,
    inputObservacoes.value = dados.observacoes       
});

const formEdicao = document.querySelector('[data-form]');
const mensagemSucesso = (mensagem) => {
    const linha = document.createElement("tr");
    const conteudoLinha = `
    <div class="alert alert-success" role="alert">
        ${mensagem}
    </div>
    `;
    linha.innerHTML = conteudoLinha;
    return linha;
};

const mensagemErro = (mensagem) => {
    const linha = document.createElement("tr");
    const conteudoLinha = `
    <div class="alert alert-warning" role="alert">
        ${mensagem}
    </div>
    `;
    linha.innerHTML = conteudoLinha;
    return linha;
};


formEdicao.addEventListener("submit", event => {
    event.preventDefault();

    editaPagamento(id, inputTitulo.value, inputValor.value, inputData.value, inputTaxa.value, inputObservacoes.value).then(resposta => {

        console.log(resposta.status);

        if(resposta.status === 200){
            formEdicao.appendChild(mensagemSucesso('Pagamento editado com sucesso!'));

            setTimeout(function() {
                window.location.href = "pagamentos.html";
            }, 2000);

        }else{
            formEdicao.appendChild(mensagemErro('Erro ao editar pagamento'));
        }
    });    
});