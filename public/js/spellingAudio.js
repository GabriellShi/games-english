document.addEventListener('DOMContentLoaded', () => {
    const speakBtn = document.getElementById('speak-btn');
    const speakAnswerBtn = document.getElementById('speak-answer-btn');
    const answerInput = document.getElementById('answer-input');
    const spokenWordDisplay = document.getElementById('spoken-word-display');

    if (speakBtn) {
        speakBtn.addEventListener('click', () => {
            const wordToSpeak = document.querySelector('input[name="word"]').value;
            const utterance = new SpeechSynthesisUtterance(wordToSpeak);
            utterance.lang = 'en-US';
            window.speechSynthesis.speak(utterance);
        });
    }

    if (speakAnswerBtn) {
        speakAnswerBtn.addEventListener('click', () => {
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.lang = 'en-US';

            recognition.start();

            recognition.onresult = function(event) {
                const spokenWord = event.results[0][0].transcript;
                answerInput.value = spokenWord;  
                if (spokenWordDisplay) {
                    spokenWordDisplay.value = spokenWord;  
                }
            };

            recognition.onerror = function(event) {
                console.error('Erro no reconhecimento de fala:', event.error);
            };
        });
    }
});
// -------------- 
