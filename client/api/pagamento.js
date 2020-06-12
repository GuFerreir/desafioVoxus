const listarPagamentos = () => { 
    return fetch('http://localhost:3000/pagamentos')
    .then( resposta => {
        return resposta.json();
    })
    .then( json => {
        return json;
    });
};

const cadastrarPagamentos = (titulo, valor, data, observacoes) => {

    console.log(data);

    const json = JSON.stringify({
        titulo: titulo,
        valor: valor,
        data: data,
        observacoes: observacoes
    });
   
    console.log(json)
    return fetch('http://localhost:3000/pagamentos/',{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: json
    })
    .then( resposta => {
        return resposta;
    });
};

const deletaPagamento = id => {
    return fetch(`http://localhost:3000/pagamentos/${id}`, {
        method:'DELETE'
    });
};

const selecionaPagamento = id => {

    return fetch(`http://localhost:3000/pagamentos/${id}`)
    .then( resposta => {
        return resposta.json();
    });
};

const editaPagamento = (id, tit, val, dat, tax, obs) => {
    
    const json = JSON.stringify({
        titulo: tit,
        valor: parseFloat(val),
        data: dat,
        taxa: parseFloat(tax),
        observacoes: obs
    });
    
    return fetch(`http://localhost:3000/pagamentos/${id}`,{
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: json
      })
      .then( resposta => {  
          return resposta;
    });
};

const dataParaTexto = data => { 

    const mes = (data.getMonth() + 1).toString().padStart(2, "0");

    return `${data.getDate()}/${mes}/${data.getFullYear()}`;

};

