document.addEventListener('DOMContentLoaded', () => {
    // Элементы DOM
    const intro = document.getElementById('intro');
    const questionnaire = document.getElementById('questionnaire');
    const results = document.getElementById('results');
    const startBtn = document.getElementById('startBtn');
    const restartBtn = document.getElementById('restartBtn');
    const questionText = document.getElementById('questionText');
    const currentQ = document.getElementById('currentQ');
    const progressFill = document.getElementById('progressFill');
    const answerButtons = document.querySelectorAll('.btn-answer');
    const scoresDiv = document.getElementById('scores');
    const dominantProfileDiv = document.getElementById('dominantProfile');
    const detailedDescriptionsDiv = document.getElementById('detailedDescriptions');
    const reliabilityWarning = document.getElementById('reliabilityWarning');

    // Состояние теста
    let currentQuestion = 0;
    let answers = [];

    // Проверка доступности вопросов
    if (typeof questions === 'undefined' || !questions.length) {
        console.error('Questions array is not available');
        alert('Error: Questions data not loaded. Please refresh the page.');
        return;
    }

    if (typeof answerKey === 'undefined') {
        console.error('Answer key is not available');
        alert('Error: Answer key not loaded. Please refresh the page.');
        return;
    }

    // Кнопка Start
    startBtn.addEventListener('click', () => {
        intro.classList.add('hidden');
        questionnaire.classList.remove('hidden');
        showQuestion(0);
    });

    // Кнопки ответов True/False
    answerButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const answer = e.target.getAttribute('data-answer') === 'true';
            handleAnswer(answer);
        });
    });

    // Кнопка Restart
    restartBtn.addEventListener('click', () => {
        currentQuestion = 0;
        answers = [];
        results.classList.add('hidden');
        intro.classList.remove('hidden');
    });

    // Показать вопрос
    function showQuestion(index) {
        if (index >= questions.length) {
            showResults();
            return;
        }

        currentQuestion = index;
        questionText.textContent = questions[index];
        currentQ.textContent = index + 1;
        
        // Обновление прогресс-бара
        const progress = ((index + 1) / questions.length) * 100;
        progressFill.style.width = progress + '%';
    }

    // Обработка ответа
    function handleAnswer(answer) {
        answers.push(answer);
        
        if (currentQuestion < questions.length - 1) {
            showQuestion(currentQuestion + 1);
        } else {
            showResults();
        }
    }

    // Подсчёт результатов
    function calculateScores() {
        const scores = {
            sociability: 0,
            organization: 0,
            focusOnSubject: 0,
            intelligence: 0,
            motivationOfApproval: 0
        };

        // Подсчёт баллов по каждой категории
        Object.keys(answerKey).forEach(category => {
            const categoryAnswers = answerKey[category];
            Object.keys(categoryAnswers).forEach(questionNum => {
                const index = parseInt(questionNum) - 1; // Индекс в массиве (0-based)
                const correctAnswer = categoryAnswers[questionNum];
                const userAnswer = answers[index];

                if (userAnswer === correctAnswer) {
                    scores[category]++;
                }
            });
        });

        return scores;
    }

    // Показать результаты
    function showResults() {
        questionnaire.classList.add('hidden');
        results.classList.remove('hidden');

        const scores = calculateScores();

        // Проверка на мотивацию одобрения
        if (scores.motivationOfApproval >= 7) {
            reliabilityWarning.classList.remove('hidden');
        }

        // Отображение баллов
        displayScores(scores);

        // Определение доминирующего профиля
        const dominantProfile = getDominantProfile(scores);
        displayDominantProfile(dominantProfile, scores);

        // Отображение детальных описаний
        displayDetailedDescriptions(scores);

        // Построение графика
        createChart(scores);
    }

    // Отображение баллов
    function displayScores(scores) {
        scoresDiv.innerHTML = `
            <div class="score-item">
                <h3>Sociability</h3>
                <p class="score-value">${scores.sociability}/10</p>
            </div>
            <div class="score-item">
                <h3>Organization</h3>
                <p class="score-value">${scores.organization}/10</p>
            </div>
            <div class="score-item">
                <h3>Focus on Subject</h3>
                <p class="score-value">${scores.focusOnSubject}/10</p>
            </div>
            <div class="score-item">
                <h3>Intelligence</h3>
                <p class="score-value">${scores.intelligence}/10</p>
            </div>
        `;
    }

    // Определение доминирующего профиля
    function getDominantProfile(scores) {
        // Исключаем motivationOfApproval из подсчёта доминирующего профиля
        const profileScores = {
            sociability: scores.sociability,
            organization: scores.organization,
            focusOnSubject: scores.focusOnSubject,
            intelligence: scores.intelligence
        };

        let maxScore = 0;
        let dominant = '';

        Object.keys(profileScores).forEach(profile => {
            if (profileScores[profile] > maxScore) {
                maxScore = profileScores[profile];
                dominant = profile;
            }
        });

        return dominant;
    }

    // Отображение доминирующего профиля
    function displayDominantProfile(profileKey, scores) {
        if (!profileDescriptions[profileKey]) return;

        const profile = profileDescriptions[profileKey];
        const score = scores[profileKey];

        dominantProfileDiv.innerHTML = `
            <h3>🎯 Your Dominant Profile: ${profile.name}</h3>
            <p><strong>Score:</strong> ${score}/10</p>
            <p><strong>Key Characteristics:</strong> ${profile.characteristics}</p>
        `;
    }

    // Отображение детальных описаний всех профилей
    function displayDetailedDescriptions(scores) {
        detailedDescriptionsDiv.innerHTML = '<h3>Detailed Profile Descriptions</h3>';

        Object.keys(profileDescriptions).forEach(key => {
            const profile = profileDescriptions[key];
            const score = scores[key];

            const profileCard = document.createElement('div');
            profileCard.className = 'profile-card';
            profileCard.innerHTML = `
                <h4>${profile.name} (${score}/10)</h4>
                <p><strong>Characteristics:</strong> ${profile.characteristics}</p>
                <p><strong>Strengths:</strong> ${profile.pros}</p>
                <p><strong>Potential Challenges:</strong> ${profile.cons}</p>
            `;

            detailedDescriptionsDiv.appendChild(profileCard);
        });
    }

    // Построение графика Chart.js
    function createChart(scores) {
        const ctx = document.getElementById('profileChart').getContext('2d');

        // Уничтожить старый график, если существует
        if (window.myChart) {
            window.myChart.destroy();
        }

        window.myChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: [
                    'Sociability',
                    'Organization',
                    'Focus on Subject',
                    'Intelligence'
                ],
                datasets: [{
                    label: 'Your Profile',
                    data: [
                        scores.sociability,
                        scores.organization,
                        scores.focusOnSubject,
                        scores.intelligence
                    ],
                    backgroundColor: 'rgba(62, 156, 188, 0.2)',
                    borderColor: 'rgba(62, 156, 188, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(62, 156, 188, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(62, 156, 188, 1)'
                }]
            },
            options: {
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 10,
                        ticks: {
                            stepSize: 2
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                responsive: true,
                maintainAspectRatio: true
            }
        });
    }
});
