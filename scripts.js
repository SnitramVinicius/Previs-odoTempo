const key = "260f2fe32f230748d41342692644204f";

function colocardadosnatela(dados) {
    if (dados.cod !== 200) {
        document.querySelector(".alerta1").innerHTML = "<strong> Cidade não encontrada </strong>. <br> Por favor, tente novamente.";
        document.querySelector(".text-city").innerHTML = "";
        document.querySelector(".temperatura").innerHTML = "";
        document.querySelector(".clima").innerHTML = "";
        document.querySelector(".informaçoes").classList.remove('show');
        document.querySelector(".erro-imagem").style.display = "block";
        document.querySelector(".caixa").style.display = "none";
        return;
    }

    console.log(dados);
    document.querySelector(".alerta1").innerHTML = "";
    document.querySelector(".text-city").innerHTML = dados.name;
    document.querySelector(".temperatura").innerHTML = Math.floor(dados.main.temp) + "°";
    document.querySelector(".clima").innerHTML = dados.weather[0].description;
    document.querySelector(".informaçoes").classList.add('show');
    document.querySelector(".erro-imagem").style.display = "none";
    document.querySelector(".caixa").style.display = "block";


}

async function buscarcidade(cidade) {
    if (!cidade) {
        document.querySelector(".alerta2").innerHTML = "<b>Por favor</b>, <br>  digite o nome de uma cidade.";
        document.querySelector(".informaçoes").classList.remove('show');
        document.querySelector(".sem-cidade").style.display = "block";
        document.querySelector(".alerta1").innerHTML = "";
        document.querySelector(".erro-imagem").style.display = "none";
        document.querySelector(".caixa").style.display = "none";

        return;
    }
    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`).then(resposta => resposta.json());
    document.querySelector(".alerta2").innerHTML = "";
    document.querySelector(".sem-cidade").style.display = "none";        


    colocardadosnatela(dados);
}

function cliqueinobotao() {
    const cidade = document.querySelector(".caixa-pesquisa").value;
    buscarcidade(cidade);
    document.querySelector('.pesquisa-container').classList.add('apos-busca');
}

function updateclock() {
    var now = new Date();
    var dname = now.getDate();
    var dnum = now.getMonth();
    var yr = now.getFullYear();
    var hou = now.getHours();
    var min = now.getMinutes();

    var months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    if (min < 10) {
        min = '0' + min;
    }
    if (hou < 10) {
        hou = '0' + hou;
    }

    document.getElementById('dia').textContent = dname;
    document.getElementById('mes').textContent = months[dnum];
    document.getElementById('ano').textContent = yr;

    document.getElementById('horas').textContent = hou;
    document.getElementById('minutos').textContent = min;
}

function initclock() {
    updateclock();
    setInterval(updateclock, 1000);
}
