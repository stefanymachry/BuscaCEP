// ---------------------------------------------
// 1. Variaveis globais
// ---------------------------------------------

//rpocura pelo campo de "CEP" no documento HTML
const txt_cep = document.querySelector("#cep");

const txt_rua = document.querySelector("#rua");
const txt_num = document.querySelector("#numero");
const txt_cidade = document.querySelector("#cidade");
const txt_bairro = document.querySelector("bairro");

// procura pelo elemneto de spinner no documento HTML
const loadingOverlay = document.querySelector("#loadingOverlay");

// ---------------------------------------------
// 2. Funçoes de logica
// ---------------------------------------------

function consultaCEP() {
    // le o CEP digitado no campo "CEP" da pagina
    // para a variavcel 'cep'
    let cep = txt_cep.value;
    
    // verifica se o CEP digitado corresponde ao padrao '00000-000',
    // ou seja, se e um CEP valido
    if (cep.match(/^\d{5}-\d{3}$/)) {
        
        // uma API permite que a gente obtenha informaçoes
        // sem sair da pagina atual
        // nosso objetivo e obter as informaçoes do CEP digitado
        // a URL da API de CEP posssui o seguinte formato:
        // https://viacep.com.br/ws/12345123/json/
        // onde "12345123" e o CEP (sem traço, apenas numeros).
        
        // remove o "-" (traço) da variavel 'cep'.
        cep = cep.replace("-", "");
        
        // exibe o spinner de 'carregando'
        loadingOverlay.classList.add('d-flex');
        loadingOverlay.classList.remove('d-none');
        
        fetch('https://viacep.com.br/ws/'+cep+'/json/')
        .then(function(response) {
            // oculta o spinner de 'carregando' ao receber a resposta da API
            loadingOverlay.classList.add('d-none');
            loadingOverlay.classList.remove('d-flex');
            
            // converte a resposta para json.
            return response.json();
        })
        .then(function(jsonResponse) {
            // exibe a resposta convertida da API na console do navegador web.
            console.log(jsonResponse);
            
            // a API da ViaCEP retorna a chave 'erro' quando o CEP
            // digitado e valido.
            if (jsonResponse.erro) {
                console.log("CEP invalido!");
                // exibe a mensagem de "CEP invalido!" abaixo do camppo CEP.
                txt_cep.classList.add("is-invalid");
            } else {
                // remove a mensagem de "CEP invalido!" abaixo do campo de CEP (se existir)
                txt_cep.classList.remove("is-invalid"); 
                // preenche os campos de texto com as informacoes retornadas pela API.
                txt_rua.value = jsonResponse.logradouro;
                txt_cidade.value = jsonResponse.localidade;
                txt_bairro.value = jsonResponse.bairro;
            }
        });
    }
}
// ---------------------------------------------
// 3. Escutadores de evento e inicio
// ---------------------------------------------

// executa funçao ao digiatar qualquer tecla no campo "CEP"
txt_cep.addEventListener("keyup", consultaCEP);

// adiciona mascara ao campo de "CEP"
jQuery(function($){
    $("#cep").mask("99999-999");
});