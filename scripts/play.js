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
  selectedCard,
  score,
  waitTurn,
  interval;

function startGame() {
  $("#table-top").html("");
  clearInterval(interval);
  cardsNumber = localStorage.getItem("cards-number");
  timeLimit = parseInt(localStorage.getItem("time-limit"));
  selectedCardIndex = undefined;
  score = 0;
  waitTurn = false;
  cardsGenerated = generateCards();
  printTableTop();
  playingGame = false;
}

function generateCards() {
  let cardValues = [];
  for (let i = 0; i < cardsNumber / 2; i++) {
    let rndValue = getRndInteger(1, 8);
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

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

