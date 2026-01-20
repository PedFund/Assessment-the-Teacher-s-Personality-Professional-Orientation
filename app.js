document.addEventListener('DOMContentLoaded', () => {
    const intro = document.getElementById('intro');
    const questionnaire = document.getElementById('questionnaire');
    const startBtn = document.getElementById('startBtn');
    const questionText = document.getElementById('questionText');
    const currentQ = document.getElementById('currentQ');

    startBtn.addEventListener('click', () => {
        if (typeof questions === 'undefined' || !questions.length) {
            alert('Questions array is not available');
            return;
        }

        intro.classList.add('hidden');
        questionnaire.classList.remove('hidden');

        questionText.textContent = questions[0];
        currentQ.textContent = '1';
    });
});
