const headers = document.createElement("div");
const title = document.createElement("h1");
const btn = document.createElement("button");
const btntxt = document.createElement("h2");
const main = document.createElement("div");
const newGameBtn = document.createElement("button")

const cardImages = [
  'bowling', 'basket',
  'tennis', 'rugby',
  'foot', 'football',
  'hockey', 'trophy',
  'bowling', 'basket',
  'tennis', 'rugby',
  'foot', 'football',
  'hockey', 'trophy'
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
newGameBtn.textContent= "Новая игра"
newGameBtn.addEventListener("click", () => {
    startGame();

})
title.textContent = "Memory game";
headers.classList.add("header");
btntxt.textContent = "Top players";
btn.classList.add("topPlayers");

btn.append(btntxt);
let isBoardLocked = false;
let firstCard = null;
let secondCard = null;

const statsContainer = document.createElement("div");
statsContainer.classList.add("stats-container");

const movesText = document.createElement("span");
movesText.classList.add("stat-item");
movesText.textContent = "Ходов: 0";

const pairsText = document.createElement("span");
pairsText.classList.add("stat-item");
pairsText.textContent = "Пар: 0 / 8"; 

statsContainer.append(movesText, pairsText);

const hystmodal = document.createElement("div");
hystmodal.classList.add("hystmodal");

const hystmodalWindow = document.createElement("div");
hystmodalWindow.classList.add("hystmodalWindow");

const modalTitle = document.createElement("h2");
modalTitle.textContent = "Победа! 🎉";

const modalText = document.createElement("p");
modalText.classList.add("modal-text");

const modalButtonsContainer = document.createElement("div");
modalButtonsContainer.classList.add("modal-buttons");

const modalPlayAgainBtn = document.createElement("button");
modalPlayAgainBtn.classList.add("modal-btn", "btn-restart");
modalPlayAgainBtn.textContent = "Играть заново";

const modalCloseBtn = document.createElement("button");
modalCloseBtn.classList.add("modal-btn", "btn-close");
modalCloseBtn.textContent = "Закрыть";

function openModal() {
    modalText.textContent = `Чтобы пройти игру тебе понадобилось: ${movesCount} ходов`;
    hystmodal.classList.add("active"); 
    document.body.style.overflow = "hidden"; 
}

function closeModal() {
    hystmodal.classList.remove("active"); 
    document.body.style.overflow = ""; 
}

modalPlayAgainBtn.addEventListener("click", () => {
    closeModal(); 
    startGame(); 
});

modalCloseBtn.addEventListener("click", () => {
    closeModal(); 
});

hystmodal.addEventListener("click", (event) => {
    if (event.target === hystmodal) {
        closeModal();
    }
});

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && hystmodal.classList.contains("active")) {
        closeModal();
    }
});

// СБОРКА: Складываем всё в правильном порядке
modalButtonsContainer.append(modalPlayAgainBtn, modalCloseBtn);
hystmodalWindow.append(modalTitle, modalText, modalButtonsContainer);
hystmodal.append(hystmodalWindow);


headers.append(title, statsContainer, btn,newGameBtn);
let movesCount = 0;
let pairsCount = 0;
const TOTAL_PAIRS = 8; 

function createCard(imageName) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("playingCard");
    cardDiv.dataset.imageName = imageName;
    
    const cardInner = document.createElement("div");
    cardInner.classList.add("playingCardInner");
    
    const cardFront = document.createElement("div");
    cardFront.classList.add("cardSide", "cardFront");
    const img = document.createElement("img");
    img.src = `./imgsvg/${imageName}.svg`;
    img.alt = imageName;
    img.classList.add("playingCardImg");
    cardFront.append(img);

    const cardBack = document.createElement("div");
    cardBack.classList.add("cardSide", "cardBack");
    const backimg = document.createElement("img");
    backimg.src = `./imgsvg/chumise.png`;
    backimg.alt = 'chumise';
    backimg.classList.add("chumise");
    cardBack.append(backimg);
    
    cardInner.append(cardFront, cardBack);
    cardDiv.append(cardInner);

    cardDiv.addEventListener("click", () => {
        if (isBoardLocked) return;
        if (cardDiv.classList.contains("flipped")) return;

        cardDiv.classList.add("flipped");
        if (!firstCard) {
            firstCard = cardDiv;
            return;
        }
        secondCard = cardDiv;
        isBoardLocked = true;

         movesCount++;
        movesText.textContent = `Ходов: ${movesCount}`;

        if (firstCard.dataset.imageName === secondCard.dataset.imageName) {
          setTimeout(() => {
 firstCard.classList.add("open");
            secondCard.classList.add("open"); 
             pairsCount++;
            pairsText.textContent = `Пар: ${pairsCount} / ${TOTAL_PAIRS}`;
            if (pairsCount === TOTAL_PAIRS) {
                setTimeout(() => {
                      openModal() 
                }, 500);
            }
             firstCard = null;
            secondCard = null;
            isBoardLocked = false;
          }, 400);
          
         
           
        } else {
            setTimeout(() => {
                firstCard.classList.remove("flipped");
                secondCard.classList.remove("flipped");
                
                firstCard = null;
                secondCard = null;
                isBoardLocked = false;
            }, 1000);
        }
       
    });
    return cardDiv;
}

const mainContainer = document.getElementById("app");
mainContainer.append(headers,hystmodal);



const gameGrid = document.createElement("div");
gameGrid.classList.add("gameGrid");
mainContainer.append(gameGrid);

function startGame() {
  gameGrid.replaceChildren(); 

  firstCard = null;
  secondCard = null;
  isBoardLocked = false;

  movesCount = 0;
  pairsCount = 0;

  movesText.textContent = "Ходов: 0";
  pairsText.textContent = `Пар: 0 / ${TOTAL_PAIRS}`;
  const shuffledImages = shuffle([...cardImages]);

  shuffledImages.forEach((imageName) => {
    const newCard = createCard(imageName); 
    gameGrid.append(newCard);
  });
  
}

startGame();
hystmodal.addEventListener("click", (event) => {

    if (event.target === hystmodal) {
        closeModal();
    }
});