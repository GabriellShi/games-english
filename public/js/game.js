document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const feedback = document.getElementById('feedback');
    let hasFlippedCard = false;
    let firstCard, secondCard;
    let lockBoard = false;
    let matchedCards = 0;

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.word === secondCard.dataset.word &&
                      firstCard.dataset.isimage !== secondCard.dataset.isimage;

        if (isMatch) {
            showFeedback('Acertou!');
            disableCards();
            matchedCards += 2;

            if (matchedCards === cards.length) {
                setTimeout(() => {
                    window.location.href = '/pageSucesso';
                }, 1000);
            }
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function showFeedback(message) {
        feedback.textContent = message;
        feedback.style.display = 'block';
        setTimeout(() => {
            feedback.style.display = 'none';
        }, 2000);
    }

    function shuffle() {
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * cards.length);
            card.style.order = randomPos;
        });
    }

    cards.forEach(card => card.addEventListener('click', flipCard));

    shuffle();
});
// -------------- 
