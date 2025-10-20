// ---------------------------------------------
// 1. Variaveis globais
// ---------------------------------------------

const txt_cep = document.querySelector("#cep")

// ---------------------------------------------
// 2. Funçoes de logica
// ---------------------------------------------
function consultaCEP() {
    alert("ola mundo!");
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