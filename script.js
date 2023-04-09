const selectBox = document.querySelector(".select-box"),
    selectBtnX = selectBox.querySelector(".options .playerX"),
    selectBtnO = selectBox.querySelector(".options .playerO"),
    playBoard = document.querySelector(".play-board"),
    players = document.querySelector(".players"),
    allBox = document.querySelectorAll("section span"),
    resultBox = document.querySelector(".result-box"),
    wonText = resultBox.querySelector(".won-text"),
    replayBtn = resultBox.querySelector("button");

window.onload = () => { // uma vez que a janela foi carregada
    for (let i = 0; i < allBox.length; i++) { //adicionar atributo onclick em todo o intervalo disponível
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
}

selectBtnX.onclick = () => {
    selectBox.classList.add("hide"); //ocultar caixa de seleção
    playBoard.classList.add("show"); //mostrar a seção de playboard
}
selectBtnO.onclick = () => {
    selectBox.classList.add("hide"); //ocultar caixa de seleção
    playBoard.classList.add("show"); //mostrar a seção de playboard
    players.setAttribute("class", "players active player"); //definir atributo de classe em jogadores com valores de jogadores ativos
}
let playerXIcon = "fas fa-times"; //nome de classe do ícone de cruz incrível da fonte
let playerOIcon = "far fa-circle"; //nome de classe do ícone de círculo incrível da fonte
let playerSign = "X"; //esta é uma variável global porque eu usei esta variável dentro de várias funções
let runBot = true; //esta também é uma variável global com valor booleano.

function clickedBox(element) {
    if (players.classList.contains("player")) {
        playerSign = "O"; //  se o jogador escolher (O), mude playerSign para O
        element.innerHTML = `<i class="${playerOIcon}"></i>`; //adicionando marca de ícone de círculo dentro do elemento/caixa clicado pelo usuário
        players.classList.remove("active"); ///adicionar classe ativa em jogadores
        element.setAttribute("id", playerSign); //definir o atributo id em span/box com o sinal escolhido pelo jogador
    } else {
        element.innerHTML = `<i class="${playerXIcon}"></i>`; //adicionando marca de ícone de cruz dentro do elemento/caixa clicado pelo usuário
        element.setAttribute("id", playerSign); //definir o atributo id em span/box com o sinal escolhido pelo jogador
        players.classList.add("active"); ///adicionar classe ativa em jogadores
    }
    selectWinner(); //chamando a função Select Winner
    element.style.pointerEvents = "none"; //uma vez que o usuário seleciona qualquer caixa, essa caixa não pode ser clicada novamente
    playBoard.style.pointerEvents = "none"; //adicionar pointerEvents nenhum ao playboard para que o usuário não possa clicar imediatamente em nenhuma outra caixa até que o bot selecione
    let randomTimeDelay = ((Math.random() * 1000) + 200).toFixed(); //gerando um número aleatório para que o bot atrase aleatoriamente para selecionar a caixa não selecionada
    setTimeout(() => {
        bot(runBot); //função de bot de chamada
    }, randomTimeDelay); //passando valor de atraso aleatório

}

function bot() {
    let array = []; //criando uma matriz vazia... armazenaremos o índice de caixas não clicadas
    if (runBot) { //se run Bot fir verdadeira 
        playerSign = "O"; //altere o playerSign para O, então se o jogador escolheu X, o bot será O
        for (let i = 0; i < allBox.length; i++) {
            if (allBox[i].childElementCount == 0) { //se a caixa/span não tiver filhos significa tag <i>
                array.push(i); //inserindo número/índice de caixas não clicadas dentro da matriz
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)]; //obtendo índice aleatório da matriz para que o bot selecione a caixa não selecionada aleatória
        if (array.length > 0) { //se o comprimento da matriz for maior que 0
            if (players.classList.contains("player")) {
                playerSign = "X"; //se o jogador escolheu O então o bot irá X
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`; //adicionando marca de ícone de cruz dentro do elemento não selecionado
                allBox[randomBox].setAttribute("id", playerSign); //definir o atributo id em span/box com o sinal escolhido pelo jogador
                players.classList.add("active"); ///adicionar classe ativa em jogadores
            } else {
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`; //adicionando marca de ícone de círculo dentro do elemento não selecionado
                players.classList.remove("active"); //removedor classe ativa em jogadores
                allBox[randomBox].setAttribute("id", playerSign); //definir o atributo id em spam/box com o sinal escolhido pelo jogador

            }
            selectWinner(); //chamando a função selectWinner
        }
        allBox[randomBox].style.pointerEvents = "none"; //uma vez que o bot selecione qualquer caixa, o usuário não poderá clicar nessa caixa
        playBoard.style.pointerEvents = "auto"; //adicionar ponteiro Eventos automáticos no playboard para que o usuário possa clicar novamente na caixa
        playerSign = "X"; //se o jogador escolheu X, então o bot será O certo, então mudamos o playerSign novamente para X para que o usuário seja X porque acima mudamos o playerSign para O para bot
    }
}
function getIdVal(classname) {
    return document.querySelector(".box" + classname).id; //valor de id de retorno
}
function checkIdSign(val1, val2, val3, sign) { //verificando se todo valor de id é igual ao sinal (X ou O) ou não, se sim, retorne verdadeiro
    if (getIdVal(val1) == sign && getIdVal(val2) == sign && getIdVal(val3) == sign) {
        return true;
    }
}
function selectWinner() { //se a seguinte combinação vencedora corresponder, selecione o vencedor
    if (checkIdSign(1, 2, 3, playerSign) || checkIdSign(4, 5, 6, playerSign) || checkIdSign(7, 8, 9, playerSign) || checkIdSign(1, 4, 7, playerSign) || checkIdSign(2, 5, 8, playerSign) || checkIdSign(3, 6, 9, playerSign) || checkIdSign(1, 5, 9, playerSign) || checkIdSign(3, 5, 7, playerSign)) {
        runBot = false; //passando o valor booleano falso para runBot para que o bot não seja executado novamente
        bot(runBot); //função de bot de chamada
        setTimeout(() => { //após a partida vencida por alguém, oculte o playboard e mostre a caixa de resultados após 700ms
     resultBox.classList.add("show");
            playBoard.classList.remove("show");
        }, 700); //1s = 1000ms
        wonText.innerHTML = `Jogador<p>${playerSign}</p>ganhou!`; //exibindo o texto vencedor com a passagem do playerSign (X ou O)
    } else { //se todas as caixas/elementos tiverem valor de id e ainda assim ninguém vencer, empate a partida
        if (getIdVal(1) != "" && getIdVal(2) != "" && getIdVal(3) != "" && getIdVal(4) != "" && getIdVal(5) != "" && getIdVal(6) != "" && getIdVal(7) != "" && getIdVal(8) != "" && getIdVal(9) != "") {
            runBot = false; //passando o valor booleano falso para runBot para que o bot não seja executado novamente
            bot(runBot); //função de bot de chamada
            setTimeout(() => { //após a partida empatada, oculte o playboard e mostre a caixa de resultados após 700ms
                resultBox.classList.add("show");
                playBoard.classList.remove("show");
            }, 700); //1s = 1000ms
            wonText.textContent = "Match has been drawn!"; //exibindo texto de correspondência de empate

        }
    }
}
replayBtn.onclick = () => {
    window.location.reload(); //recarregue a página atual ao clicar no botão repetir
}