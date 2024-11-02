const apikey = "73b97b7626e518a297bab400887a2b79";
let cidadeAtual = '';

async function buscarCidadePrevisao(cidade) {
    if (!cidade) {
        alert("Por favor, digite o nome de uma cidade.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${apikey}&lang=pt_br&units=metric`;

    try {
        const resposta = await fetch(url);
        if (!resposta.ok) {
            throw new Error("Cidade não encontrada");
        }

        const dados = await resposta.json();
        colocarDadosNaTelaPrevisao(dados);
        cidadeAtual = cidade; // Armazena a cidade atual para atualizações automáticas
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

function colocarDadosNaTelaPrevisao(dados) {
    if (dados.cod !== "200") {
        alert("Erro ao buscar dados");
        return;
    }

    const forecastList = dados.list;
    const diasMax = document.querySelectorAll('.Temp-max h1');
    const diasMin = document.querySelectorAll('.temp-min h1');
    const imgClima = document.querySelectorAll('.img-clima img');

    const diasFuturo = [];
    const maxTemperatures = [];
    const minTemperatures = [];
    const icons = [];

    const agora = new Date();
    const uniqueDates = new Set(); // Para garantir datas únicas

    // Coleta as previsões
    for (const forecast of forecastList) {
        const forecastDate = new Date(forecast.dt * 1000);

        // Ignora previsões que já passaram
        if (forecastDate < agora) continue;

        const diaFormatado = `${forecastDate.getDate()} de ${forecastDate.toLocaleString('pt-BR', { month: 'long' })} de ${forecastDate.getFullYear()}`;

        // Armazena apenas as 5 primeiras datas únicas
        if (!uniqueDates.has(diaFormatado) && diasFuturo.length < 5) {
            uniqueDates.add(diaFormatado);
            diasFuturo.push(diaFormatado);

            const maxTemp = Math.ceil(forecast.main.temp_max);
            const minTemp = Math.floor(forecast.main.temp_min);
            const icon = forecast.weather[0].icon;

            maxTemperatures.push(maxTemp);
            minTemperatures.push(minTemp);
            icons.push(icon);
        }
    }

    // Atualiza a interface
    diasMax.forEach((element, index) => {
        if (index < maxTemperatures.length) {
            element.innerHTML = `${maxTemperatures[index]}°C`;
        }
    });

    diasMin.forEach((element, index) => {
        if (index < minTemperatures.length) {
            element.innerHTML = `${minTemperatures[index]}°C`;
        }
    });

    imgClima.forEach((element, index) => {
        if (index < icons.length) {
            element.src = `https://openweathermap.org/img/wn/${icons[index]}.png`;
        }
    });

    // Atualiza as datas na interface
    const diasHTML = document.querySelectorAll('.datas h1');
    diasHTML.forEach((element, index) => {
        if (index < diasFuturo.length) {
            element.innerHTML = diasFuturo[index];
        }
    });

    // Atualiza a previsão hora a hora
    atualizarPrevisaoHora(forecastList);
}

function atualizarPrevisaoHora(forecastList) {
    const horasDia = document.querySelectorAll('.horas-dia h1');
    const imgHoras = document.querySelectorAll('.img-mx-mn img');
    const maxTemperaturasHoras = document.querySelectorAll('.dias-max h1');

    const agora = new Date();

    // Filtra previsões a partir da hora atual
    const previsoesFuturas = forecastList.filter(forecast => {
        const forecastDate = new Date(forecast.dt * 1000);
        return forecastDate >= agora;
    });

    // Exibe as próximas 6 previsões horárias
    for (let i = 0; i < 6; i++) {
        if (i < previsoesFuturas.length) {
            const forecast = previsoesFuturas[i];
            const hora = new Date(forecast.dt * 1000);
            const horaFormatada = hora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

            if (horasDia[i]) {
                horasDia[i].innerHTML = horaFormatada;
            }
            if (imgHoras[i]) {
                imgHoras[i].src = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
            }
        }
    }

    // Atualiza as temperaturas máximas para as horas
    for (let i = 0; i < maxTemperaturasHoras.length; i++) {
        if (i < previsoesFuturas.length) {
            const forecast = previsoesFuturas[i];
            const maxTemp = Math.ceil(forecast.main.temp_max);
            maxTemperaturasHoras[i].innerHTML = `${maxTemp}°C`;
        }
    }
}

function cliqueNoBotaoPrevisão() {
    const cidade = document.querySelector(".caixa-pesquisa").value;
    buscarCidadePrevisao(cidade);
}

// Atualiza automaticamente a cada hora
setInterval(() => {
    if (cidadeAtual) {
        buscarCidadePrevisao(cidadeAtual);
    }
}, 3600000); // Atualiza a cada hora (3600000 ms)
