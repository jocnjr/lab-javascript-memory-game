var cards = [
  { name: 'aquaman',         img: 'aquaman.jpg' },
  { name: 'batman',          img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four',  img: 'fantastic-four.jpg' },
  { name: 'flash',           img: 'flash.jpg' },
  { name: 'green arrow',     img: 'green-arrow.jpg' },
  { name: 'green lantern',   img: 'green-lantern.jpg' },
  { name: 'ironman',         img: 'ironman.jpg' },
  { name: 'spiderman',       img: 'spiderman.jpg' },
  { name: 'superman',        img: 'superman.jpg' },
  { name: 'the avengers',    img: 'the-avengers.jpg' },
  { name: 'thor',            img: 'thor.jpg' },
  { name: 'aquaman',         img: 'aquaman.jpg' },
  { name: 'batman',          img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four',  img: 'fantastic-four.jpg' },
  { name: 'flash',           img: 'flash.jpg' },
  { name: 'green arrow',     img: 'green-arrow.jpg' },
  { name: 'green lantern',   img: 'green-lantern.jpg' },
  { name: 'ironman',         img: 'ironman.jpg' },
  { name: 'spiderman',       img: 'spiderman.jpg' },
  { name: 'superman',        img: 'superman.jpg' },
  { name: 'the avengers',    img: 'the-avengers.jpg' },
  { name: 'thor',            img: 'thor.jpg' }
];

// instance has to be global so the helper functions has access to it

let memoryGame = new MemoryGame(cards);
let closeCardId = 0;

$(function(){

  // shuffle up and deal!
  // memoryGame.shuffleCards();

  boardInit();

  // Bind the click event of each element to a function
  $('.back').click(function () {

    // opening the cards
    let $parentDiv =  $(this).parent();

    //flipping the cards

    $parentDiv.find('.front, .back').toggleClass('front back');

    // move check
    // rules control
    $parentDiv.addClass('clicked');
    memoryGame.pickedCards.push($parentDiv);

    // we need at least two cards to have a complete move
    if (memoryGame.pickedCards.length === 2) {
      clearTimeout(closeCardId);
      // blocking the board for any other clicks
      $('.front, .back').addClass('blocked');
      let card1 = memoryGame.pickedCards[0].data('card-name');
      let card2 = memoryGame.pickedCards[1].data('card-name');

    
      (memoryGame.checkIfPair(card1,card2)) ?  itsAMatch($parentDiv) : notAMatch($parentDiv);
      console.log(memoryGame.pickedCards);  

    } else if (memoryGame.pickedCards.length === 1) {
      let $card1 = memoryGame.pickedCards[0];
      closeCardId = setTimeout(() => {
        $card1.removeClass('clicked'); 
        $card1.find('.front, .back').toggleClass('front back');
        endMove();
      }, 2000);
    }
  });

});


const itsAMatch = ($parentDiv) => {

  let $card1 = memoryGame.pickedCards[0];
  let $card2 = memoryGame.pickedCards[1];
  $($card1, $card2).addClass('itsAMatch');
  $('#pairs_guessed').html(memoryGame.pairsGuessed);
  $('#pairs_clicked').html(memoryGame.pairsClicked);
  console.log(memoryGame.cards.length, memoryGame.pairsGuessed);
  endMove();
  if (memoryGame.isFinished()) {
    alert(`You've Won!`);
    boardInit();
  }

};

const notAMatch = () => {

let $card1 = memoryGame.pickedCards[0];
let $card2 = memoryGame.pickedCards[1];

let setTimeoutId = setTimeout(() => {
  $($card1, $card2).removeClass('clicked');
  $card1.find('.front, .back').toggleClass('front back');
  $card2.find('.front, .back').toggleClass('front back');
  endMove();

  }, 800);
  // updating the dom with clicked pairs
  $('#pairs_guessed').html(memoryGame.pairsGuessed);
  $('#pairs_clicked').html(memoryGame.pairsClicked);
};

const endMove = () => {
  $('.card:not(.itsAMatch)').find('.front, .back').removeClass('blocked');
  memoryGame.pickedCards = [];
};

const boardInit = () => {
  let html = '';
  memoryGame.cards.forEach(function (pic) {
    html += '<div class="card" data-card-name="'+ pic.name +'">';
    html += '  <div class="back" name="'+ pic.img +'"></div>';
    html += '  <div class="front" style="background: url(img/'+ pic.img +') no-repeat"></div>';
    html += '</div>';
  });

  // Add all the div's to the HTML
  $('#memory_board').html(html);
  memoryGame.pairsGuessed = 0;
  memoryGame.pairsClicked = 0;

}