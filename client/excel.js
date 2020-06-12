let selectedFile;
document.getElementById('input').addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
})

let data=[{
    "name":"jayanth",
    "data":"scd",
    "abc":"sdef"
}]


document.getElementById('button').addEventListener("click", () => {
    XLSX.utils.json_to_sheet(data, 'out.xlsx');
    if(selectedFile){
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event)=>{
         let data = event.target.result;
         let workbook = XLSX.read(data,{type:"binary"});
         workbook.SheetNames.forEach(sheet => {
              let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
              rowObject.forEach(objeto => {

                const data = JSON.stringify(objeto["Data do Lançamento"]);
                
                cadastrarPagamentos(objeto["Título"], objeto["Valor"], data, objeto["Observações"])
                .then(resposta => {
                    if(resposta.status === 201) window.location.href = "pagamentos.html";
                });
              });
              
              
         });
        }
    }
});