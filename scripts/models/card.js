export class Card {
  constructor(value) {
    this._value = value;
    this._image = getCardImage(0);
    this._shown = false;
  }
  get name() {
    return this.name;
  }
  get image() {
    return this.image;
  }
  get shown() {
    return this.shown;
  }
  set shown(value) {
    this.shown = value;
  }
  setCardImage(value) {
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
