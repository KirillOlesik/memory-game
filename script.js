const headers = document.createElement("div");
const title = document.createElement("h1");
const btn = document.createElement("button");
const btntxt = document.createElement("h2");
const main = document.createElement("div");

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

title.textContent = "Memory game";
headers.classList.add("header");
btntxt.textContent = "Top players";
btn.classList.add("topPlayers");

headers.append(title, btn);
btn.append(btntxt);

// --- ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ СОСТОЯНИЯ ИГРЫ ---
let isBoardLocked = false;
let firstCard = null;
let secondCard = null;

function createCard(imageName) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("playingCard");
    
    // ИСПРАВЛЕНИЕ: Обязательно сохраняем имя картинки в dataset, чтобы работал if ниже!
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
        // Игнорируем клик, если доска заблокирована или карта уже открыта
        if (isBoardLocked) return;
        if (cardDiv.classList.contains("flipped")) return;

        cardDiv.classList.add("flipped");

        // Если это первая открытая карта
        if (!firstCard) {
            firstCard = cardDiv;
            return;
        }

        // Если это вторая открытая карта
        secondCard = cardDiv;
        isBoardLocked = true; // Блокируем доску на время анимации проверки

        // Проверяем на совпадение по сохраненному dataset
        if (firstCard.dataset.imageName === secondCard.dataset.imageName) {
            // Карточки совпали! Оставляем открытыми
            firstCard = null;
            secondCard = null;
            isBoardLocked = false;
        } else {
            // Карточки не совпали. Ждем 1 секунду и закрываем
            setTimeout(() => {
                firstCard.classList.remove("flipped");
                secondCard.classList.remove("flipped");
                
                // Сбрасываем переменные для следующих ходов
                firstCard = null;
                secondCard = null;
                isBoardLocked = false;
            }, 1000);
        }
    });
    return cardDiv;
}

const mainContainer = document.getElementById("app");
mainContainer.append(headers);

const gameGrid = document.createElement("div");
gameGrid.classList.add("gameGrid");
mainContainer.append(gameGrid);

function startGame() {
  // Очищаем сетку от старых карт
  gameGrid.replaceChildren(); 

  // Сбрасываем состояние карт и блокировок при перезапуске
  firstCard = null;
  secondCard = null;
  isBoardLocked = false;

  // Перемешиваем копию массива картинок
  const shuffledImages = shuffle([...cardImages]);

  // Генерируем новые карты
  shuffledImages.forEach((imageName) => {
    const newCard = createCard(imageName); 
    gameGrid.append(newCard);
  });
}

// Запускаем игру
startGame();