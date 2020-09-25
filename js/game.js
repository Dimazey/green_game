const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let divSelector = 0;
let miss = 0;


function round() {
  
  divSelector = randomDivId();
  $(divSelector).addClass("target");

   $(divSelector).text(`${hits + 1}`);
   if (hits == 0) {
    firstHitTime = getTimestamp();
    console.log(firstHitTime );
   }
   
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  $('.q-wrapper').addClass("hide");

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#penalty-points").text(miss);

  $("#win-message").removeClass("d-none");
  hits = 0;
  miss = 0;
}

function handleClick(event) {
    if ($(event.target).hasClass("target")) {
    hits++;
    $(divSelector).removeClass("target");
    $(divSelector).text("");
    console.log(hits);
    round();
    }
  else {
    $(event.target).addClass("miss");
    miss++
    setTimeout(() => { $(event.target).removeClass("miss");},120);
    }
  }

function init() {
 
  $('#button-reload').addClass("hide");
  $("#button-newGame").click(() => {
  miss = 0;
  round();
  $('#button-newGame').addClass("hide");
  $('#button-reload').removeClass("hide");
  });

  $("#button-reload").click(() => {
         location.reload();;
         round();
    });
  
  
  $(".game-field").click(handleClick);
 
}

$(document).ready(init);
