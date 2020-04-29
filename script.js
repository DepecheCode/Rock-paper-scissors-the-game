'use strict';

(function () {
    var params = {
        playerScore: 0,
        computerScore: 0,
        winningScore: null,
        roundNumber: 0,
        progress: []
    }

    function renderScore() {
        document.querySelector('#score').innerHTML =
            `Gracz ${params.playerScore} : ${params.computerScore} Komputer<br>Gramy do ${params.winningScore} zwycięstw`;
    }

    function renderRoundNumber() {
        document.querySelector('#score').innerHTML =
            `Runda numer ${params.roundNumber}`;
    }

    function playerMove(playerChoice) {
        if (
            !params.winningScore ||
            params.playerScore === params.winningScore ||
            params.computerScore === params.winningScore
        ) {
            return false;
        }

        params.roundNumber++;
        var computerChoice = ['kamień', 'papier', 'nożyce'][Math.floor((Math.random() * 3))];

        var roundLog = {
            roundNumber: params.roundNumber,
            playerMove: playerChoice,
            computerMove: computerChoice,
            winner: '',
            gameScore: ''
        }

        if (computerChoice === playerChoice) {
            document.querySelector('#game-result').innerHTML =
                `Wybrałeś ${playerChoice}, zaś komputer też wybrał ${computerChoice}. Remis!`;
            roundLog.winner = 'Remis!';
        } else if (
            (playerChoice === 'kamień' && computerChoice === 'nożyce') ||
            (playerChoice === 'papier' && computerChoice === 'kamień') ||
            (playerChoice === 'nożyce' && computerChoice === 'papier')
        ) {
            params.playerScore++;
            document.querySelector('#game-result').innerHTML =
                `Wybrałeś ${playerChoice}, zaś komputer wybrał ${computerChoice}. Wygrywasz!`;
            roundLog.winner = 'Gracz';
        } else if (
            (playerChoice === 'kamień' && computerChoice === 'papier') ||
            (playerChoice === 'papier' && computerChoice === 'nożyce') ||
            (playerChoice === 'nożyce' && computerChoice === 'kamień')
        ) {
            params.computerScore++;
            document.querySelector('#game-result').innerHTML =
                `Wybrałeś ${playerChoice}, zaś komputer wybrał ${computerChoice}. Przegrywasz!`;
            roundLog.winner = 'Komputer';
        }

        roundLog.gameScore = `${params.playerScore} : ${params.computerScore}`;
        params.progress.push(roundLog);
        console.log(params.progress);

        renderScore();

        if (params.playerScore === params.winningScore) {
            alert('Koniec gry! Wygrałeś!');
            newGame();
        } else if (params.computerScore === params.winningScore) {
            alert('Koniec gry! Wygrał komputer!');
            newGame();
        }
    }

    function newGame() {
        var tempWinningScore =
            parseInt(prompt('Podaj ilość zwycięstw do których chcesz zagrać'));

        if (isNaN(tempWinningScore) || tempWinningScore <= 0) {
            return false;
        }

        params.playerScore = 0;
        params.computerScore = 0;
        params.winningScore = tempWinningScore;
        params.roundNumber = 0;
        params.progress = [];

        renderScore();

        console.log('Nowa gra');
    }

    var moveButtons = document.querySelectorAll('.move-button');
    for (var i = 0; i < moveButtons.length; i++) {
        var moveButton = moveButtons[i];
        moveButton.addEventListener('click', function (event) {
            playerMove(event.target.getAttribute('data-move'))
        })
    }

    document.querySelector('#newgame-button').addEventListener('click', newGame);

    renderRoundNumber();
    renderScore();

})();