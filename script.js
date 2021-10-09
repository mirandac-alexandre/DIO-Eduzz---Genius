let order = [];
let clickedOrder = [];
let score = 0;

//0 - green
//1 - red   
//2 - yellow
//3 - blue

//busca os elementos daquela cor e atribui a variáveis
const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

//cria orderm aleatória das cores
let shuffleOrder = () => {
    //colorOrder contem um número aleatório de 0 a 3 para identificar a cor
    let colorOrder = Math.floor(Math.random() * 4);
    //atribui o valor da cor na próxima posição do order
    order[order.length] = colorOrder;
    clickedOrder = [];

    //acender a cor
    for(let i in order)
    {
        //cria o elemento cor e atribui
        let elementColor = createColorElement(order[i]);
        //passa a cor gerada para o método de acender
        lightColor(elementColor, Number(i) + 1);
    }
}


//acende a próxima cor
let lightColor = (element, number) => {
    number = number * 700;
    setTimeout(() => {
        //adicionar classe selected para ficar visível qual cor selecionada e que o jogador deve apertar
        element.classList.add('selected');
        
    }, number - 450);
    setTimeout(() => {
        element.classList.remove('selected');
    }, number + 350);
}

//checa se o jogador acertou as cores
let checkOrder = () => {
    for(let i in clickedOrder)
    {
        if(clickedOrder[i] != order[i])
        {
            //caso o jogador erre a cor, perde e o jogo
            lose();
            break;
        }
    }
    if(clickedOrder.length == order.length)
    {
        alert(`Pontos: ${score}\nVocê acertou! Iniciando próximo level!`);
        nextLevel();
    }
}

//clique do usuário
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    //atribui classe selected para mudar opacidade e mostrar qual cor foi selecionada pelo jogador
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
         createColorElement(color).classList.remove('selected');
         checkOrder();
    }, 250);
}

//função para retornar a cor
let createColorElement = (color) => {
    if(color==0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if(color == 2) {
        return yellow;
    } else if(color == 3) {
        return blue; 
    }
}

//função para próximo level od jogo
let nextLevel = () => {
    score++;
    shuffleOrder();
}

//caso jogador perder
let lose = () => {
    alert(`Pontos: ${score}!\nVocê perdeu!\nClique em OK para recomeçar.`);
    order = [];
    clickedOrder = [];

    startGame();
}

//função para começar jogo
let startGame = () => {
    alert("Bem vindo ao Genesis, começando jogo!");

    score = 0;
    nextLevel();
}

// green.addEventListener('click', click(0));
// red.addEventListener('click', click(1));
// yellow.addEventListener('click', click(2));
// blue.addEventListener('click', click(3));

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

debugger;
startGame();