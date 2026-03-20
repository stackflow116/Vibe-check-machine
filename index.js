// ============================================================
//  VIBE CHECK MACHINE — index.js (FULLY FIXED)
// ============================================================

let score = 0;
let currentIndex = 0;

const questions = [
    {
        text: "🌅 It's Saturday morning. What are you doing?",
        choices: [
            { label: "Still in bed. Obviously.", points: 0 },
            { label: "Making an elaborate breakfast.", points: 1 },
            { label: "Already at the gym.", points: 2 },
            { label: "Reorganising my bookshelf.", points: 3 },
        ]
    },
    {
        text: "📱 Your phone battery hits 10%. You...",
        choices: [
            { label: "Panic immediately.", points: 0 },
            { label: "Calmly find a charger.", points: 1 },
            { label: "Enable low power mode & carry on.", points: 2 },
            { label: "Don't notice. It dies.", points: 3 },
        ]
    },
    {
        text: "🍕 You ordered pizza but got the wrong one. You...",
        choices: [
            { label: "Eat it anyway. Food is food.", points: 0 },
            { label: "Call and complain politely.", points: 1 },
            { label: "Leave a very detailed review.", points: 2 },
            { label: "Blog about it.", points: 3 },
        ]
    },
    {
        text: "🎶 Your go-to study soundtrack?",
        choices: [
            { label: "Complete silence.", points: 0 },
            { label: "Lo-fi beats.", points: 1 },
            { label: "Full movie soundtracks.", points: 2 },
            { label: "Chaos. Anything loud.", points: 3 },
        ]
    },
    {
        text: "🌈 Pick a vibe for your ideal weekend trip:",
        choices: [
            { label: "Cozy cabin in the mountains.", points: 0 },
            { label: "Busy city with a packed itinerary.", points: 1 },
            { label: "Beach — no plans, just vibes.", points: 2 },
            { label: "Fictional universe. I need options.", points: 3 },
        ]
    }
];

// --- Core Functions ---

function startQuiz() {
    score = 0;
    currentIndex = 0;
    showQuestion();
    switchScreen("screen-start", "screen-quiz");
}

function switchScreen(hideId, showId) {
    document.getElementById(hideId).classList.add("hidden");
    document.getElementById(showId).classList.remove("hidden");
}

function showQuestion() {
    const currentQ = questions[currentIndex];
    
    // Progress Bar update
    const progressPercent = ((currentIndex + 1) / questions.length) * 100;
    document.getElementById("progress-fill").style.width = progressPercent + "%";
    
    // Counter update
    document.getElementById("question-counter").textContent = `Question ${currentIndex + 1} of ${questions.length}`;
    
    // Text update
    document.getElementById("question-text").textContent = currentQ.text;
    
    const qChoices = document.getElementById("choices-container");
    qChoices.innerHTML = "";
    
    const labels = ["A", "B", "C", "D"];
    
    currentQ.choices.forEach((choice, i) => {
        const btn = document.createElement("button");
        btn.className = "choice-btn";
        btn.innerHTML = `<span class="choice-tag">${labels[i]}</span> ${choice.label}`;
        
        btn.onclick = function () {
            // Choice select animation (CSS class use ho rahi hai)
            const allBtns = document.querySelectorAll(".choice-btn");
            allBtns.forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");

            // Thora sa delay taakay user ko selection nazar aaye
            setTimeout(() => {
                handleChoiceSelection(choice.points);
            }, 300);
        };
        
        qChoices.appendChild(btn);
    });
}

function handleChoiceSelection(points) {
    score += points;
    currentIndex += 1;

    if (currentIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const result = computeVibe(score);
    document.getElementById("result-emoji").textContent = result.emoji;
    document.getElementById("result-title").textContent = result.title;
    document.getElementById("result-desc").textContent = result.desc;
    switchScreen("screen-quiz", "screen-result");
}

function computeVibe(totalScore) {
    // Points logic base on 5 questions (max 15 points)
    if (totalScore <= 3) 
        return { emoji: "😴", title: "The Cozy Sloth", desc: "Comfort is your superpower. You know exactly what you like and you protect your peace fiercely. Zero stress, maximum chill." };
    else if (totalScore <= 7) 
        return { emoji: "🧘", title: "The Balanced Sage", desc: "You have this rare gift of going with the flow without losing yourself. People love being around you." };
    else if (totalScore <= 11) 
        return { emoji: "✨", title: "The Chaotic Star", desc: "You run on spontaneity and vibes. Every day is an adventure. Your energy is contagious!" };
    else 
        return { emoji: "🚀", title: "The Galaxy Brain", desc: "Your thoughts move faster than your words. You're always three steps ahead. Living in the future, I see!" };
}

function restart() {
    switchScreen("screen-result", "screen-start");
}