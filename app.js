let currentQuestion = 0;
let answers = [];

// DOM Elements
const introSection = document.getElementById('intro');
const questionnaireSection = document.getElementById('questionnaire');
const resultsSection = document.getElementById('results');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const questionText = document.getElementById('questionText');
const currentQSpan = document.getElementById('currentQ');
const progressFill = document.getElementById('progressFill');
const answerButtons = document.querySelectorAll('.btn-answer');

// Event Listeners
startBtn.addEventListener('click', startTest);
restartBtn.addEventListener('click', restartTest);
answerButtons.forEach(btn => {
    btn.addEventListener('click', (e) => handleAnswer(e.target.dataset.answer === 'true'));
});

function startTest() {
    introSection.classList.add('hidden');
    questionnaireSection.classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    if (currentQuestion < questions.length) {
        questionText.textContent = questions[currentQuestion];
        currentQSpan.textContent = currentQuestion + 1;
        updateProgress();
    } else {
        showResults();
    }
}

function handleAnswer(answer) {
    answers.push(answer);
    currentQuestion++;
    showQuestion();
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressFill.style.width = progress + '%';
}

function calculateScores() {
    const scores = {
        sociability: 0,
        organization: 0,
        focusOnSubject: 0,
        intelligence: 0,
        motivationOfApproval: 0
    };

    // Calculate each dimension score
    Object.keys(answerKey).forEach(dimension => {
        Object.keys(answerKey[dimension]).forEach(questionNum => {
            const arrayIndex = parseInt(questionNum) - 1;
            const expectedAnswer = answerKey[dimension][questionNum];
            if (answers[arrayIndex] === expectedAnswer) {
                scores[dimension]++;
            }
        });
    });

    return scores;
}

function getLevel(score) {
    if (score >= 0 && score <= 3) return { level: 'Low', class: 'low' };
    if (score >= 4 && score <= 7) return { level: 'Normal', class: 'normal' };
    if (score >= 8 && score <= 10) return { level: 'High', class: 'high' };
}

function showResults() {
    questionnaireSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');

    const scores = calculateScores();
    
    // Check reliability
    const reliabilityWarning = document.getElementById('reliabilityWarning');
    if (scores.motivationOfApproval > 7) {
        reliabilityWarning.classList.remove('hidden');
    }

    // Display scores
    displayScores(scores);

    // Display chart
    displayChart(scores);

    // Display dominant profile
    displayDominantProfile(scores);

    // Display detailed descriptions
    displayDetailedDescriptions(scores);
}

function displayScores(scores) {
    const scoresContainer = document.getElementById('scores');
    scoresContainer.innerHTML = '';

    const displayNames = {
        sociability: 'Sociability',
        organization: 'Organization',
        focusOnSubject: 'Focus on Subject',
        intelligence: 'Intelligence'
    };

    Object.keys(scores).forEach(key => {
        if (key !== 'motivationOfApproval') {
            const levelInfo = getLevel(scores[key]);
            const card = document.createElement('div');
            card.className = 'score-card';
            card.innerHTML = `
                <h3>${displayNames[key]}</h3>
                <div class="score">${scores[key]}/10</div>
                <span class="level ${levelInfo.class}">${levelInfo.level} Level</span>
            `;
            scoresContainer.appendChild(card);
        }
    });
}

function displayChart(scores) {
    const ctx = document.getElementById('profileChart').getContext('2d');
    
    const chartData = {
        sociability: scores.sociability,
        organization: scores.organization,
        focusOnSubject: scores.focusOnSubject,
        intelligence: scores.intelligence
    };

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Sociability', 'Organization', 'Focus on Subject', 'Intelligence'],
            datasets: [{
                label: 'Your Profile',
                data: Object.values(chartData),
                backgroundColor: 'rgba(62, 156, 188, 0.2)',
                borderColor: 'rgba(62, 156, 188, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(62, 156, 188, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(62, 156, 188, 1)',
                pointRadius: 5,
                pointHoverRadius: 7
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
                    display: false
                }
            }
        }
    });
}

function displayDominantProfile(scores) {
    const mainScores = {
        sociability: scores.sociability,
        organization: scores.organization,
        focusOnSubject: scores.focusOnSubject,
        intelligence: scores.intelligence
    };

    const dominant = Object.keys(mainScores).reduce((a, b) => 
        mainScores[a] > mainScores[b] ? a : b
    );

    const dominantContainer = document.getElementById('dominantProfile');
    const profile = profileDescriptions[dominant];

    dominantContainer.innerHTML = `
        <h3>Your Dominant Professional Direction</h3>
        <h4>${profile.name}</h4>
        <p><strong>Key Characteristics:</strong> ${profile.characteristics}</p>
    `;
}

function displayDetailedDescriptions(scores) {
    const container = document.getElementById('detailedDescriptions');
    container.innerHTML = '<h3>Detailed Profile Analysis</h3>';

    const mainScores = {
        sociability: scores.sociability,
        organization: scores.organization,
        focusOnSubject: scores.focusOnSubject,
        intelligence: scores.intelligence
    };

    // Sort by score descending
    const sortedProfiles = Object.keys(mainScores).sort((a, b) => 
        mainScores[b] - mainScores[a]
    );

    sortedProfiles.forEach(key => {
        const profile = profileDescriptions[key];
        const levelInfo = getLevel(mainScores[key]);
        
        const card = document.createElement('div');
        card.className = 'description-card';
        card.innerHTML = `
            <h4>${profile.name} - ${mainScores[key]}/10 (${levelInfo.level})</h4>
            <p class="characteristics"><strong>Characteristics:</strong> ${profile.characteristics}</p>
            <div class="pros-cons">
                <div class="pros">
                    <strong>✓ Strengths:</strong><br>${profile.pros}
                </div>
                <div class="cons">
                    <strong>⚠ Potential Challenges:</strong><br>${profile.cons}
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function restartTest() {
    currentQuestion = 0;
    answers = [];
    resultsSection.classList.add('hidden');
    introSection.classList.remove('hidden');
    progressFill.style.width = '0%';
}
