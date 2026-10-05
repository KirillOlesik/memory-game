const headers = document.createElement("div");
const title = document.createElement("h1");
const btn = document.createElement("button");
const asd = document.createElement("div")
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
newGameBtn.textContent= "New Game"
newGameBtn.classList.add("newGameBtn")
newGameBtn.addEventListener("click", () => {
    startGame();
})

title.textContent = "Sport Memory Game";
headers.classList.add("header");
btn.textContent = "Top players 🏆";
btn.id = 'leaderBtn'
btn.classList.add("topPlayers");

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
pairsText.textContent = "Совпадений: 0 / 8"; 

asd.classList.add("asd")
statsContainer.append(movesText, pairsText);


asd.append( btn, statsContainer, newGameBtn);
headers.append(title, asd);

const hystmodal = document.createElement("div");
hystmodal.classList.add("hystmodal");

const hystmodalWindow = document.createElement("div");
hystmodalWindow.classList.add("hystmodalWindow");

const modalTitle = document.createElement("h2");
modalTitle.textContent = "Победа!";

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

modalButtonsContainer.append(modalPlayAgainBtn, modalCloseBtn); 
hystmodalWindow.append(modalTitle, modalText, modalButtonsContainer); 
hystmodal.append(hystmodalWindow); 
document.body.append(hystmodal);

function openModal() {
    modalText.textContent = `Чтобы пройти игру тебе понадобилось: ${movesCount} ходов`;
    hystmodal.classList.add("active"); 
    document.body.style.overflow = "hidden"; 
    

    saveGameResult(movesCount);
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

const leaderboardModal = document.createElement("div");
leaderboardModal.classList.add("hystmodal"); 

const leaderboardWindow = document.createElement("div");
leaderboardWindow.classList.add("hystmodalWindow");

const leaderboardTitle = document.createElement("h2");
leaderboardTitle.textContent = "🏆 Топ-10 Результатов";

const leaderboardContent = document.createElement("div");
leaderboardContent.classList.add("leaderboard-content");

const leaderboardCloseBtn = document.createElement("button");
leaderboardCloseBtn.classList.add("modal-btn", "btn-close");
leaderboardCloseBtn.textContent = "Закрыть";

leaderboardWindow.append(leaderboardTitle, leaderboardContent, leaderboardCloseBtn);
leaderboardModal.append(leaderboardWindow);


function updateLeaderboardUI() {
  const leaderboard = JSON.parse(localStorage.getItem('sport_game_leaderboard')) || [];
  leaderboardContent.replaceChildren(); 

  if (leaderboard.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.textContent = "Результатов пока нет. Сыграйте первую игру!";
    emptyMsg.style.fontStyle = "italic";
    leaderboardContent.append(emptyMsg);
    return;
  }

  const list = document.createElement("ol");
  list.classList.add("leaderboard-list");
  list.style.textAlign = "left";

  
  leaderboard.forEach((item, index) => {
    const li = document.createElement("li");
    li.style.marginBottom = "8px";

    
    const scoreText = document.createElement("span");
    scoreText.textContent = ` Победа — ${item.score} ходов`;

    
    const dateText = document.createElement("small");
    dateText.style.color = "#888";
    dateText.style.float = "right";
    dateText.textContent = item.date;

    
    li.append(scoreText, dateText);
    list.append(li);
  });

  leaderboardContent.append(list);
}

function openLeaderboard() {
    updateLeaderboardUI();
    leaderboardModal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeLeaderboard() {
    leaderboardModal.classList.remove("active");
    document.body.style.overflow = "";
}


btn.addEventListener("click", openLeaderboard);
leaderboardCloseBtn.addEventListener("click", closeLeaderboard);
leaderboardModal.addEventListener("click", (event) => {
    if (event.target === leaderboardModal) closeLeaderboard();
});


window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        if (hystmodal.classList.contains("active")) closeModal();
        if (leaderboardModal.classList.contains("active")) closeLeaderboard();
    }
});

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
    backimg.src = `./imgsvg/chumisee.jpg`;
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
            pairsText.textContent = ` Совпадений: ${pairsCount} / ${TOTAL_PAIRS}`;
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

mainContainer.append(headers, hystmodal, leaderboardModal);

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

  movesText.textContent = " Ходов: 0";
  pairsText.textContent = ` Совпадений: 0 / ${TOTAL_PAIRS}`;
  const shuffledImages = shuffle([...cardImages]);

  shuffledImages.forEach((imageName) => {
    const newCard = createCard(imageName); 
    gameGrid.append(newCard);
  });
}

function initPlayerProfile() {
  let player = JSON.parse(localStorage.getItem('game_player'));

  if (!player) {
    const randomNumber = Math.floor(1000 + Math.random() * 9000); 
    player = {
      name: `Игрок #${randomNumber}`, 
      id: 'usr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5) 
    };
    localStorage.setItem('game_player', JSON.stringify(player));
  }

  displayPlayer(player.name);
  setupNameEditing();
}

function displayPlayer(name) {
  const playerDisplay = document.getElementById('player-display');
  if (playerDisplay) {
    playerDisplay.textContent = name;
  }
}


function setupNameEditing() {
  const playerDisplay = document.getElementById('player-display');
  if (!playerDisplay) return;
  
  playerDisplay.addEventListener('click', () => {
    const currentName = playerDisplay.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentName;
    input.maxLength = 15;
    input.className = 'header-name-input';
    
    playerDisplay.replaceWith(input);
    input.focus();
    input.select();
    
    const saveNewName = () => {
      const newName = input.value.trim() || currentName;
      
      let player = JSON.parse(localStorage.getItem('game_player'));
      player.name = newName;
      localStorage.setItem('game_player', JSON.stringify(player));
      
      input.replaceWith(playerDisplay);
      playerDisplay.textContent = newName;
    };
    
    input.addEventListener('blur', saveNewName);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') saveNewName();
    });
  });
}


function saveGameResult(finalMoves) {
  let leaderboard = JSON.parse(localStorage.getItem('sport_game_leaderboard')) || [];
  
  
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); 
  const year = now.getFullYear();
  const formattedDate = `${day}.${month}.${year}`;

  const newResult = {
    
    gameId: 'game_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
    
    timestamp: Date.now(), 
    score: finalMoves,
    date: formattedDate
  };

  
  const isDuplicate = leaderboard.some(item => item.gameId === newResult.gameId);
  
  if (!isDuplicate) {
    leaderboard.push(newResult);
    
    
    leaderboard.sort((a, b) => {
      if (a.score !== b.score) {
        
        return a.score - b.score; 
      }
      
      return a.timestamp - b.timestamp; 
    });
    
    
    leaderboard = leaderboard.slice(0, 10);
    
    localStorage.setItem('sport_game_leaderboard', JSON.stringify(leaderboard));
  }
}


initPlayerProfile();
startGame();