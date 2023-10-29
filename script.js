const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const gabaritoArea = document.querySelector("#origin-text")
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

const GABARITOS = [
    "A programação é a linguagem do futuro. Comece a digitar seu caminho para o sucesso agora!",
    "A inovação tecnológica impulsiona o progresso. Teste sua velocidade de digitação e mantenha-se atualizado.",
    "Desenvolvedores de software escrevem o futuro. Quão rápido você pode codificar o amanhã?",
    "Códigos são as palavras da era digital. Meça sua velocidade de digitação em linguagem binária.",
    "Em um mundo digital, a habilidade de digitar é tão importante quanto a de falar. Avalie sua destreza."
]

timer = [0,0,0,0];
var interval;
var timerRunning = false;

function spellCheck() {
    const textoInseridoText = testArea.value;
    const gabaritoText = gabaritoArea.innerText.substring(0, textoInseridoText.length);


    if (textoInseridoText == gabaritoArea.innerText) {
        clearInterval(interval);
        testWrapper.style.borderColor = "#429890";
    } else {
        if (textoInseridoText == gabaritoText) {
            testWrapper.style.borderColor = "#65CCf3";
        } else {
            testWrapper.style.borderColor = "#E95D0F";
        }
    }

}

// Adiciona zero inicial aos números <= 9 (apenas para estética):
function leadingZero(time) {
    if(time <= 9){
        time = "0" + time;
    }
    return time;
}

// Executa um timer padrão de minuto / segundo / centésimos:
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

function start(){
    let textEnteredLength = testArea.value.length;
     if (textEnteredLength === 0 && !timerRunning) {
         timerRunning = true;
         interval = setInterval(runTimer, 10);
     }
 }

// Função de recomeçar:
async function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";

    const gabaritoValue = await getGabarito()
    console.log('xxxx_gabarito', gabaritoValue)
    gabaritoArea.innerText = gabaritoValue;
}

function loadGabarito() {

}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }


testArea.addEventListener("keyup", spellCheck, false);
testArea.addEventListener("keypress", start, false);
resetButton.addEventListener("click", reset, false);

async function getGabarito()  {
    const defer = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(GABARITOS[getRandomInt(3)])
        }, 1000);
    });

    return defer
        .then((data) => {
            return data;
        })
}

window.addEventListener('load', async (event) => {

    console.log('The page has fully loaded');
    const gabaritoValue = await getGabarito()
    console.log('xxxx_gabarito', gabaritoValue)
    gabaritoArea.innerText = gabaritoValue;
});



