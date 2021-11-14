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

var cardsNumber, timeLimit, cardsGenerated, selectedCard, gameOver, score;

function startGame() {
  $("#table-top").html("");
  cardsNumber = localStorage.getItem("cards-number");
  timeLimit = localStorage.getItem("time-limit");
  gameOver = false;
  selectedCardIndex = undefined;
  score = 0;
  cardsGenerated = generateCards();
  printTableTop();
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
                 <img name="card" id="card-${i}" src="../assets/naipes/reverso.jpg" class="img-fluid" draggable="false"
                 onclick="selectCard(this.id)" >
             `);
  }
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
