
$(document).ready(initApp);

function initApp() {
    const gameInit = new Game();
}

class Game {
    constructor() {
        this.theNumber = this.pickedNumber();
        this.wallMovementCounter = 0;
        this.previousGuesses = [];
        this.gamesPlayed = null; //will add functionality to this later
        this.makeLana();
        this.createClickHandlers();
    }

    createClickHandlers() {
        $(".game-button").click(this.makeGuess.bind(this));
        $(".play-now-button").click(this.playGameButton.bind(this));
        $(".play-music-button").click(this.toggleMusicButton.bind(this));
    }

    pickedNumber() {
        var randomNumber = Math.floor((Math.random() * 10) + 1);
        return randomNumber;
    }

    makeDefeatedLana() {
        var DefeatedLanaPic = $("<img class='human evil-human'>").attr("src", "images/Lana_Kane_Evil.png");
        $(".container").append(DefeatedLanaPic);
    }

    eraseDefeatedLana() {
        var DefeatedLanaPic = $("<img class='human evil-human'>").attr("src", "images/Lana_Kane_Evil.png");
        $(".evil-human").detach();
    }

    makeLana() {
        var lanaPic = $("<img id='lana-pic'>").attr("src", "images/Lana_Kane.png").addClass("human");
        $(".container").append(lanaPic);
    }

    removeLana() {
        var lanaPic = $("<img id='lana-pic'>").attr("src", "images/Lana_Kane.png").addClass("human");
        $("#lana-pic").detach();
    }

    makeGuess() {
        var theGuess = parseInt($("#numberGuessInput").val());
        var message = "";
        if (isNaN(theGuess)) {
            return;
        } else if (theGuess === this.theNumber) {
            message = "\>Congratulations, you helped Lana escape!";
            this.youWon();
        } else if (theGuess < 1 || this.theGuess > 10) {
            message = "\>Please pick a number between 1 and 10.";
        } else if (theGuess > this.theNumber) {
            message = "\>Your guess is too high.";
            this.moveWalls();
        } else if (theGuess < this.theNumber) {
            message = "\>Your guess is too low.";
            this.moveWalls();
        } else {
            message = "\>I'm not quite sure what you're getting at. Pick a number between 1 and 10.";
        }
        if (this.wallMovementCounter < 4) {
            $(".responseDiv").append($("<span>").text(message).append($("<br>")));
        }
        $("#numberGuessInput")[0].value = "";
    }

    moveWalls() {
        this.wallMovementCounter += 1;
        if (this.wallMovementCounter === 1) {
            this.youLost();
        }
        var translateAmount = this.wallMovementCounter * 15.5;
        $(".leftwall")[0].style.transform = "translateX(" + translateAmount + "%)";
        $(".rightwall")[0].style.transform = "translateX(-" + translateAmount + "%)";
    }

    youLost() {
        this.makeDefeatedLana();
        $("#lana-pic")[0].style.display = "none";
        $(".responseDiv").empty();
        $("#responseSpan")[0].style.color = "red";
        this.changeGameButton();
    }

    youWon() {
        $(".responseDiv").empty();
        $("#lana-pic").addClass("lana-win");
        this.changeGameButton();
    }

    changeGameButton() {
        $(".game-button").text("Play Again!")
            .removeClass("btn btn-primary btn-lg")
            .addClass("btn btn-success btn-lg")
            .click(this.restartGame.bind(this));
    }

    restartGame() {
        this.wallMovementCounter = 0;
        this.previousGuesses = [];
        this.theNumber = this.pickedNumber();
        this.makeLana();
        this.createClickHandlers();
        this.eraseDefeatedLana();
        $(".game-button").text("Guess!")
            .removeClass("btn btn-success btn-lg")
            .addClass("btn btn-primary btn-lg")
            .click(this.makeGuess.bind(this));
    }

    playGameButton() {
        $(".responseDiv")[0].style.zIndex = "2";
        $(".allGuessInputDiv")[0].style.zIndex = "2";
        $("#initial-background-div")[0].style.display = "none";
        $(".play-now-button")[0].style.display = "none";
        $("#instructions-div")[0].style.display = "none";
        // $("audio")[0].play();
        $(".play-music-button")[0].style.zIndex = "2";
    }


    toggleMusicButton() {
        var musicButtonText = $(".play-music-button")[0].innerText;
        if (musicButtonText === "mute music") {
            $("audio")[0].pause();
            $(".play-music-button")[0].innerText = "play music";
        } else if (musicButtonText === "play music") {
            $("audio")[0].play();
            $(".play-music-button")[0].innerText = "mute music";
        }
    }
};
