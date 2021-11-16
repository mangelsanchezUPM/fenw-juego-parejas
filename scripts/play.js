class Card {
  constructor(value) {
    this._value = value;
    this._image = this.getCardImage(this._value);
    this._shown = false;
  }
  get value() {
    return this._value;
  }
  get image() {
    return this._image;
  }
  get shown() {
    return this._shown;
  }
  set shown(shown) {
    this._shown = shown;
  }
  getCardImage(value) {
    let cardsImgPath = "../assets/naipes/";
    switch (value) {
      case 1:
        cardsImgPath += "bastos1";
        break;
      case 2:
        cardsImgPath += "bastos12";
        break;
      case 3:
        cardsImgPath += "copas1";
        break;
      case 4:
        cardsImgPath += "copas12";
        break;
      case 5:
        cardsImgPath += "espadas1";
        break;
      case 6:
        cardsImgPath += "espadas12";
        break;
      case 7:
        cardsImgPath += "oros1";
        break;
      case 8:
        cardsImgPath += "oros12";
        break;
      default:
        cardsImgPath += "reverso";
    }
    cardsImgPath += ".jpg";
    return cardsImgPath;
  }
}

const IMG_REVERSO = "assets/naipes/reverso.jpg";

var cardsNumber,
  timeLimit,
  cardsGenerated,
  selectedCardIndex,
  score,
  totalScore,
  waitTurn,
  interval;

function startGame() {
  $("#table-top").html("");
  clearInterval(interval);
  cardsNumber = localStorage.getItem("cards-number");
  timeLimit = parseInt(localStorage.getItem("time-limit"));
  selectedCardIndex = undefined;
  score = 0;
  totalScore = getExtraScore();
  waitTurn = false;
  cardsGenerated = generateCards();
  printTableTop();
  playingGame = false;
}

function generateCards() {
  let cardValues = [];
  for (let i = 0; i < cardsNumber / 2; i++) {
    let rndValue = Math.floor(Math.random() * (8 - 1)) + 1;
    cardValues.push(rndValue, rndValue);
  }
  return cardValues.map((v) => new Card(v)).sort(() => Math.random() - 0.5);
}

function printTableTop() {
  for (let i = 0; i < cardsGenerated.length; i++) {
    $("#table-top").append(`
                 <img name="card" id="card-${i}" src="${IMG_REVERSO}" class="img-fluid" draggable="false"
                 onclick="selectCard(this.id)" >
             `);
  }
  $("#score-info").html(score);
  $("#total-score-info").html(totalScore);

  if (timeLimit == 0) {
    $("#time-limit-info").html("No");
  } else {
    $("#time-limit-info").html(timeLimit);
    interval = setInterval(() => {
      timeLimit -= 1;
      $("#time-limit-info").html(timeLimit);
      if (timeLimit == 0) {
        finishGame();
        clearInterval(interval);
      }
    }, 1000);
  }
}

function selectCard(cardId) {
  if (waitTurn) {
    console.info("Espere a que todas las cartas estén boca abajo");
    return;
  }
  const index = parseInt(cardId.split("-")[1]);
  const card = cardsGenerated[index];
  if (card.shown) {
    console.info("Carta ya seleccionada");
    return;
  }
  card.shown = true;
  $("#" + cardId).attr("src", card.image);
  if (selectedCardIndex === undefined) {
    selectedCardIndex = index;
  } else {
    debugger;
    const selectedCard = cardsGenerated[selectedCardIndex];
    const cardsAreEqual = card.value == selectedCard.value;
    score += cardsAreEqual ? 15 : -5;
    $("#score-info").html(score);
    totalScore = score + getExtraScore();
    $("#total-score-info").html(totalScore);
    let previousCardIndex = selectedCardIndex;
    selectedCardIndex = undefined;
    $("#" + cardId).attr("src", card.image);
    if (!cardsAreEqual) {
      waitTurn = true;
      selectedCard.shown = false;
      card.shown = false;
      setTimeout(() => {
        $("#card-" + previousCardIndex).attr("src", IMG_REVERSO);
        $("#" + cardId).attr("src", IMG_REVERSO);
        waitTurn = false;
      }, 500);
    }
  }
  if (isGameOver()) finishGame();
}

function finishGame() {
  clearInterval(interval);
  $("#game-over-modal").modal("show");
  $("#game-over-message").html(
    `El juego ha terminado con una puntuación de ${totalScore}.`
  );
  // saveRecord()
}

function restartGame() {
  $("#game-over-modal").modal("hide");
  startGame();
}

function exitGame() {
  $("#game-over-modal").modal("hide");
  $("#router-outlet").load("./html/home.html");
}

function isGameOver() {
  return cardsGenerated.every((card) => card.shown == true);
}

function getExtraScore() {
  let extraPoints = 0;
  const cardsNumber = parseInt(localStorage.getItem("cards-number"));
  const timeLimit = parseInt(localStorage.getItem("time-limit"));
  switch (parseInt(cardsNumber)) {
    case 26:
      extraPoints += 25;
      break;
    case 32:
      extraPoints += 50;
      break;
    default:
      extraPoints += 0;
      break;
  }
  switch (parseInt(timeLimit)) {
    case 60:
      extraPoints += 100;
      break;
    case 90:
      extraPoints += 75;
      break;
    case 120:
      extraPoints += 50;
      break;
    case 150:
      extraPoints += 25;
      break;
    default:
      extraPoints += 0;
  }
  return extraPoints;
}
