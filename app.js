// === DIAGNOSTIC VERSION ===
// This file MUST show the first question.
// If it doesn't – app.js is NOT executed at all.

document.addEventListener('DOMContentLoaded', () => {
    alert('app.js loaded');

    const intro = document.getElementById('intro');
    const questionnaire = document.getElementById('questionnaire');
    const startBtn = document.getElementById('startBtn');
    const questionText = document.getElementById('questionText');
    const currentQ = document.getElementById('currentQ');

    if (!startBtn || !questionText) {
        alert('DOM elements not found');
        return;
    }

    startBtn.addEventListener('click', () => {
        alert('Start clicked');

        if (!window.questions || !questions.length) {
            alert('Questions NOT loaded');
            return;
        }

        intro.classList.add('hidden');
        questionnaire.classList.remove('hidden');

        questionText.textContent = questions[0];
        currentQ.textContent = '1';

        alert('First question rendered');
    });
});
