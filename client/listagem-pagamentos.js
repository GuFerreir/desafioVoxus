
const removerPagamento = id => {
  if(confirm("Deseja mesmo excluir o pagamento ?")){
    deletaPagamento(id);
    document.location.reload();
  }
};

const exibePagamentos = (titulo, valor, data, taxa, observacoes, id) => {
  const linha = document.createElement("tr");
  const conteudoLinha = `
  <td>${titulo}</td>
  <td>${valor}</td>
  <td>${dataParaTexto(new Date(data))}</td>
  <td>${taxa}</td>
  <td>${observacoes}</td>
  <button type="button" class="btn btn-danger" onclick="removerPagamento(${id})">Excluir</button>
  <a href="edita-pagamento.html?id=${id}">
  <button type="button" class="btn btn-info">Editar</button>
  </a>
  `;
  linha.innerHTML = conteudoLinha;
  return linha;
};

const corpoTabela = document.querySelector("[data-conteudo-tabela]");

listarPagamentos().then( exibe => {
  
    exibe.forEach(indice => {
      corpoTabela.appendChild(exibePagamentos(indice.titulo, indice.valor, indice.data, indice.taxa, indice.observacoes, indice.id));
    })
});

