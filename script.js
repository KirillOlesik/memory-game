const headers = document.createElement("div");
const title = document.createElement("h1");
const btn = document.createElement("button")
const btntxt = document.createElement("h2")
const main = document.createElement("div")

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

title.textContent = "Memory game"
headers.classList.add("header")
btntxt.textContent = "Top players"
btn.classList.add("topPlayers")

headers.append(title,btn);
btn.append(btntxt);

function createCard(imageName){
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("playingCard");
    
    const img = document.createElement("img")
    img.src = `./imgsvg/${imageName}.svg`
    img.alt = imageName;
    img.classList.add("playingCardImg")

    cardDiv.append(img);

    cardDiv.addEventListener("click", () => {
    cardDiv.classList.toggle("flipped");
  });
  return cardDiv;
}
const mainContainer = document.getElementById("app");

mainContainer.append(headers);

const gameGrid = document.createElement("div")
gameGrid.classList.add("gameGrid");

cardImages.forEach((imageName) => {
    const newCard = createCard(imageName);
    gameGrid.append(newCard);
    
});

mainContainer.append(gameGrid)

