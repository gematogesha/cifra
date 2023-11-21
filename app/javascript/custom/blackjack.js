document.addEventListener("turbo:load", () => {

    const divBJ = document.querySelector(".blackjack"),
        fieldBot = divBJ.querySelectorAll(".field")[0],
        fieldplayer = divBJ.querySelectorAll(".field")[1],
        scoreUser = divBJ.querySelector(".score__user"),
        scoreBot = divBJ.querySelector(".score__bot"),
        divStart = document.querySelector(".bj__start"),
        divMore = document.querySelector(".bj__more"),
        divPass = document.querySelector(".bj__pass"),
        aceOne = document.querySelector(".ace__one"),
        aceMore = document.querySelector(".ace__more");

    var botSum = 0,
        playerSum = 0,
        cards = ["6", "7", "8", "9", "10", "J", "Q", "K", "A"],
        suitCards = ["\u2660", "\u2663", "\u2666", "\u2665"],
        valueCard = [6, 7, 8, 9, 10, 2, 3, 4, null],
        deck = [],
        exitFlag = false,
        rand = Math.floor(Math.random() * 8);

    divStart.addEventListener('click', function () {
        botSum = 0;
        playerSum = 0;

        scoreBot.textContent = 0;
        scoreUser.textContent = 0;

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
        playerSum += 1;
        scoreUser.textContent = playerSum;
        divMore.disabled = false;
        divPass.disabled = false;
        aceOne.disabled = true;
        aceMore.disabled = true;
    });

    aceMore.addEventListener('click', function () {
        playerSum += 11;
        scoreUser.textContent = playerSum;
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

            playerSum += card.value;

            createCard(fieldplayer, card)

            scoreUser.textContent = playerSum;

            if (playerSum == 21) {
                exitFlag = true;
                play();
            }

            if (playerSum > 21) {
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
                if (botSum + 11 > 21) {
                    card.value = 1;
                } else {
                    card.value = 11;
                }
            }

            botSum += card.value;

            createCard(fieldBot, card)

            if (19 < botSum && botSum < 21) {
                break;
            }

            if (botSum == 21) {
                break;
            }

            if (botSum > 21) {
                break;
            }
        }
    }

    function checkWin() {
        if (playerSum < 21) {
            console.log(playerSum);
        } else if (playerSum < botSum < 21) {
            console.log(playerSum);
        } else {
            console.log(playerSum);
        }

        scoreBot.textContent = botSum;

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