

const key = "260f2fe32f230748d41342692644204f"

function colocardadosnatela(dados) {
    console.log(dados)
    document.querySelector(".text-city").innerHTML = dados.name
    document.querySelector(".temperatura").innerHTML = Math.floor(dados.main.temp) + "°"
    document.querySelector(".clima").innerHTML = dados.weather[0].description
    // document.querySelector(".dia").src = dados.weather[0].icon
}

async function buscarcidade(cidade) {
    // A expressão await faz a execução de uma função async pausar, para esperar pelo retorno da Promise 
    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`).then(resposta => resposta.json())

    colocardadosnatela(dados)
}

// essa funcao tem a responsabilidade de pegar a informacao do caixa-pesquisa 
function cliqueinobotao() {

    const cidade = document.querySelector(".caixa-pesquisa").value

    buscarcidade(cidade)
}

