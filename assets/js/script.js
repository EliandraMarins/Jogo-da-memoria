//Seleciona todas as cartas
const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let firstCard, secondCard;
// O locakBoard não deixa o usuário virar outra carta enquanto n tiver ocorrido a ação da carta clicada anteriormente
let lockBoard = false;

function flipCard(){
    if(lockBoard) return;

    // Tratamento do duplo clique
    if(this === firstCard) return;

    //This é o contexto da função - Ele adiciona a classe flip pro elemento Card que estamos selecionando no momento. (toggle- tira e adiciona classe e o add- adiciona uma vez)
    this.classList.add('flip');

    // Validação: se ele tiver setado como false, quando clicado, ele será true
    if(!hasFlippedCard){
        hasFlippedCard = true;

        // Vai ser igual ao elemento que foi clicado
        firstCard = this;
        return;
    }
    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

function checkForMatch(){
 if(firstCard.dataset.card === secondCard.dataset.card){
    disabledCards();
    return;
    }
    unflipCards();
 }

// Se der par, retira o listener da carta clicada e ela fica desabilitada
function disabledCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

// Se não der par, as cartas viram em 1500s
function unflipCards(){
    lockBoard = true;
    setTimeout(() =>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    },1500);
}

function resetBoard(){
    // desestruturação do array - criar outro array com a propriedade de cada um dos índices do array que estamos tratando
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Imediately invoked function - função que é renderizada sempre que é chamada
// Conta que vai sortear até 12 um número até 1 e arredonda pra um número inteiro - a carta quando começar o jogo sempre vai ter uma posição diferente
(function shuffle(){
    cards.forEach((card) =>{
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})();

//Percorre toda a lista que foi gerada no querySelector, o foreach percorre cada lista de elementos e para cada card clicado, adiciona o flip no codigo
cards.forEach((card) =>{
    card.addEventListener('click', flipCard)
})