function savePreferences() {
    let cardsNumber = parseInt($('#cards-number').val());
    localStorage.setItem('cards-number', cardsNumber);
    let timeLimit = parseInt($('#time-limit').val());
    localStorage.setItem('time-limit', timeLimit);
    $('#router-outlet').load('html/play.html');
}