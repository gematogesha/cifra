document.addEventListener("turbo:load", () => {

    const divBJ = document.querySelector(".blackjack"),
        fieldBot = divBJ.querySelectorAll(".field")[0],
        fieldplayer = divBJ.querySelectorAll(".field")[1],
        scorePlayer = divBJ.querySelector(".score__user"),
        scoreBot = divBJ.querySelector(".score__bot"),
        divStart = document.querySelector(".bj__start"),
        divMore = document.querySelector(".bj__more"),
        divPass = document.querySelector(".bj__pass"),
        aceOne = document.querySelector(".ace__one"),
        aceMore = document.querySelector(".ace__more");

    var botScore = 0,
        playerScore = 0,
        cards = ["6", "7", "8", "9", "10", "J", "Q", "K", "A"],
        suitCards = ["\u2660", "\u2663", "\u2666", "\u2665"],
        valueCard = [6, 7, 8, 9, 10, 2, 3, 4, null],
        deck = [],
        exitFlag = false,
        rand = Math.floor(Math.random() * 8);

    divStart.addEventListener('click', function () {
        botScore = 0;
        playerScore = 0;

        scoreBot.textContent = 0;
        scorePlayer.textContent = 0;

        scoreBot.classList.remove("lebowski--text", "fargo--text", "matrix--text");
        scorePlayer.classList.remove("lebowski--text", "fargo--text", "matrix--text");

        exitFlag = false;

        for (let i = 0; i < suitCards.length; i++) {
            deck[i] = [];
            for (let j = 0; j < cards.length; j++) {
                deck[i][j] = {
                    suit: suitCards[i],
                    value: valueCard[j],
                    card: cards[j],
                    use: 1
                };
            }
        }

        fieldBot.innerHTML = '';
        fieldplayer.innerHTML = '';

        play();
    });

    divMore.addEventListener('click', function () {
        play();
    });

    divPass.addEventListener('click', function () {
        divStart.disabled = true;
        divMore.disabled = true;
        divPass.disabled = true;
        exitFlag = true;
        play();
    });

    aceOne.addEventListener('click', function () {
        playerScore += 1;
        scorePlayer.textContent = playerScore;
        divMore.disabled = false;
        divPass.disabled = false;
        aceOne.disabled = true;
        aceMore.disabled = true;
    });

    aceMore.addEventListener('click', function () {
        playerScore += 11;
        scorePlayer.textContent = playerScore;
        divMore.disabled = false;
        divPass.disabled = false;
        aceOne.disabled = true;
        aceMore.disabled = true;
    });

    function play() {
        divStart.disabled = true;
        divMore.disabled = false;
        divPass.disabled = false;
        aceOne.disabled = true;
        aceMore.disabled = true;

        if (exitFlag) {
            botTurn();
            checkWin();
        } else {
            let card = getCard();
            while (card.use == 0) {
                card = getCard();
            }
            card.use = 0;
            if (card.card === "A") {
                divMore.disabled = true;
                divPass.disabled = true;
                aceOne.disabled = false;
                aceMore.disabled = false;
            }

            playerScore += card.value;

            createCard(fieldplayer, card)

            scorePlayer.textContent = playerScore;

            if (playerScore == 21) {
                exitFlag = true;
                play();
            }

            if (playerScore > 21) {
                exitFlag = true;
                play();
            }
        }
    }

    function getCard() {
        let i = Math.floor(Math.random() * 4);
        let j = Math.floor(Math.random() * 9);
        let card = deck[i][j];
        return card;
    }

    function botTurn() {
        while (true) {

            let card = getCard();

            while (card.use == 0) {
                card = getCard();
            }

            card.use = 0;

            if (card.card === "A") {
                if (botScore + 11 > 21) {
                    card.value = 1;
                } else {
                    card.value = 11;
                }
            }

            botScore += card.value;

            createCard(fieldBot, card)

            if (19 < botScore && botScore < 21) {
                break;
            }

            if (botScore == 21) {
                break;
            }

            if (botScore > 21) {
                break;
            }
        }
    }

    function tie() {
        scoreBot.classList.add("lebowski--text");
        scorePlayer.classList.add("lebowski--text");
    }

    function playerWin() {
        scoreBot.classList.add("fargo--text");
        scorePlayer.classList.add("matrix--text");
    }

    function botWin() {
        scoreBot.classList.add("matrix--text");
        scorePlayer.classList.add("fargo--text");
    }

    function checkWin() {
        if (playerScore == 21) {
            if (botScore == 21) {
                tie();
            } else {
                playerWin();
            }
        } else if (playerScore > 21) {
            if (botScore > 21) {
                tie();
            } else {
                botWin();
            }
        } else if (playerScore < 21) {
            if (botScore == 21) {
                botWin();
            } else if (botScore < 21 && playerScore < botScore) {
                botWin();
            } else if (botScore == playerScore) {
                tie();
            }else {
                playerWin();
            }
        }

        console.log(playerScore)

        scoreBot.textContent = botScore;

        divStart.disabled = false;
        divMore.disabled = true;
        divPass.disabled = true;
        rand = Math.floor(Math.random() * 8);
    }

    function createCard(field, card) {
        let divCard = document.createElement("div"),
            divFrame = document.createElement("div"),
            spanCard = document.createElement("span"),
            spanSuit = document.createElement("span"),
            br = document.createElement("br"),
            colorCard = ["indiana", "snatch", "drive", "pulpfiction", "memento", "seven", "shershaah", "mummy"];

        divCard.classList.add("card", colorCard[rand] + "--bg");
        divFrame.classList.add("frame");
        divCard.appendChild(divFrame);
        field.appendChild(divCard);

        spanCard.textContent = card.card;
        spanSuit.textContent = card.suit;

        let color = '';

        if (card.suit == "\u2660" || card.suit == "\u2663") {
            color = "black";
        } else {
            color = "fargo"
        }

        spanCard.classList.add(color + "--text", "sulguni", "mb-2");
        spanSuit.classList.add(color + "--text", "maasdam", "ml-3", "suit");

        divFrame.appendChild(spanCard);
        divFrame.appendChild(br);
        divFrame.appendChild(spanSuit);
    }
});