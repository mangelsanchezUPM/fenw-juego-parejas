export class Card {
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
