// Global Variables
let currentScreen = 1;
const totalScreens = 7;
let musicPlaying = false;
let answers = {
    q1: false,
    q2: false,
    q3: false
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Don't auto-play music - wait for user
    const bgMusic = document.getElementById('bgMusic');
    bgMusic.volume = 0.3;

    // Show first screen after loading
    setTimeout(() => {
        showScreen(1);
    }, 3500);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            nextScreen();
        }
    });
});

// Music Toggle
function toggleMusic() {
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');

    if (musicPlaying) {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
        musicToggle.querySelector('.music-text').textContent = 'Play Music';
        musicPlaying = false;
    } else {
        bgMusic.play().catch(e => console.log('Audio play failed:', e));
        musicToggle.classList.add('playing');
        musicToggle.querySelector('.music-text').textContent = 'Music Playing';
        musicPlaying = true;
    }
}

// Screen Navigation
function showScreen(screenNum) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Show new screen
    const newScreen = document.getElementById(`screen${screenNum}`);
    if (newScreen) {
        newScreen.classList.add('active');
        currentScreen = screenNum;
        
        // Only create particles for non-video screens
        if (screenNum !== 7) {
            createParticles();
        }
    }
}

function nextScreen() {
    if (currentScreen < totalScreens) {
        // Check if answers are complete before moving (but skip screen 7 which is video)
        if (currentScreen === 2 && !answers.q1) {
            return; // Don't move until Q1 answered
        }
        if (currentScreen === 3 && !answers.q2) {
            return; // Don't move until Q2 answered
        }
        if (currentScreen === 4 && !answers.q3) {
            return; // Don't move until Q3 answered - video will handle it
        }

        currentScreen++;
        showScreen(currentScreen);
    }
}

// Question 1: Multiple Choice
function checkAnswer(button, type) {
    const allButtons = document.querySelectorAll('.option');
    
    // Disable all buttons
    allButtons.forEach(btn => btn.disabled = true);

    if (type === 'wrong') {
        button.classList.add('wrong');
        const feedback = document.getElementById('feedback1');
        feedback.textContent = '❌ خطأ! جرب مرة أخرى...';
        feedback.style.color = '#ff4444';

        // Allow retry after animation
        setTimeout(() => {
            allButtons.forEach(btn => {
                btn.classList.remove('wrong', 'correct');
                btn.disabled = false;
            });
            feedback.textContent = '';
        }, 1000);
    }
}

// Question 1: Stranger Things (correct answer)
document.addEventListener('DOMContentLoaded', function() {
    const options = document.querySelectorAll('.option');
    if (options[0]) {
        options[0].onclick = function(e) {
            e.preventDefault();
            if (!answers.q1) {
                answers.q1 = true;
                this.classList.add('correct');
                const allButtons = document.querySelectorAll('.option');
                allButtons.forEach(btn => btn.disabled = true);
                
                const feedback = document.getElementById('feedback1');
                feedback.textContent = '✅ صحيح! Stranger Things 🎬';
                feedback.style.color = '#44ff44';
                
                // Show continue button
                setTimeout(() => {
                    showContinueButton('feedback1');
                }, 800);
            }
        };
    }
});

// Helper function to show continue button
function showContinueButton(feedbackId) {
    const feedback = document.getElementById(feedbackId);
    if (feedback) {
        const btn = document.createElement('button');
        btn.className = 'btn-next';
        btn.textContent = 'CONTINUE';
        btn.style.marginTop = '20px';
        btn.onclick = nextScreen;
        feedback.parentElement.appendChild(btn);
    }
}

// Question 2: Bleach to Hunter x Hunter
function toggleBleach() {
    const btn = document.getElementById('bleachBtn');
    const feedback = document.getElementById('feedback2');
    
    // Clear feedback if clicking again
    if (btn.classList.contains('transformed')) {
        return; // Already answered
    }

    btn.classList.add('transformed');
    btn.querySelector('.anime-name').textContent = 'Hunter x Hunter';
    feedback.textContent = '😂 Haha! انت عارف بتاعتنا!';
    feedback.style.color = '#44ff44';
    answers.q2 = true;
    
    // Show continue button
    setTimeout(() => {
        showContinueButton('feedback2');
    }, 800);
}

// Question 3: Bike or Car
function chooseVehicle(choice) {
    const bikeBtn = document.querySelector('.bike-btn');
    const carBtn = document.querySelector('.car-btn');
    const feedback = document.getElementById('feedback3');
    
    // Disable both buttons
    bikeBtn.disabled = true;
    carBtn.disabled = true;
    
    if (choice === 'car') {
        answers.q3 = true;
        feedback.textContent = '✅ الخيار الصحيح! Nissan Skyline 🏁';
        feedback.style.color = '#44ff44';
        carBtn.style.borderColor = '#44ff44';
    } else {
        answers.q3 = true;
        feedback.textContent = '🏍️ Bike عالي!';
        feedback.style.color = '#44ff44';
        bikeBtn.style.borderColor = '#44ff44';
    }
    
    // Play video after choice
    setTimeout(() => {
        playBirthdayVideo();
    }, 1500);
}

// Play Birthday Video
function playBirthdayVideo() {
    showScreen(7);
    const video = document.getElementById('birthdayVideo');
    if (video) {
        video.play().catch(e => console.log('Video play failed:', e));
        
        // Auto-advance to next screen when video ends
        video.onended = function() {
            setTimeout(() => {
                nextScreen();
            }, 500);
        };
    }
}

// Reset Game
function resetGame() {
    // Reset all answers
    answers = {
        q1: false,
        q2: false,
        q3: false
    };
    
    // Reset music
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    bgMusic.pause();
    bgMusic.currentTime = 0;
    musicToggle.classList.remove('playing');
    musicToggle.querySelector('.music-text').textContent = 'Play Music';
    musicPlaying = false;
    
    // Reset to screen 1
    currentScreen = 1;
    showScreen(1);
}

// Particle Effects
function createParticles() {
    const container = document.getElementById('particleContainer');
    container.innerHTML = ''; // Clear previous particles

    // Create floating particles
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = Math.random() > 0.5 ? '#d4af37' : 'rgba(212, 175, 55, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.animation = `float ${3 + Math.random() * 3}s ease-in-out infinite`;
        particle.style.opacity = Math.random() * 0.5 + 0.3;

        container.appendChild(particle);
    }
}

// Add float animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
        }
        50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.7;
        }
    }
`;
document.head.appendChild(style);

// Confetti on final screen
function triggerConfetti() {
    const container = document.getElementById('particleContainer');
    container.innerHTML = '';

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'particle';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.background = ['#d4af37', '#f0d9b5', '#ff6b6b', '#4ecdc4'][Math.floor(Math.random() * 4)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
        confetti.style.animation = `fall ${2 + Math.random() * 2}s linear forwards`;
        confetti.style.left = Math.random() * 100 + '%';

        container.appendChild(confetti);
    }
}

// Add fall animation
const fallStyle = document.createElement('style');
fallStyle.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(fallStyle);

// Confetti on final screen when entering screen 8
const originalNextScreen = window.nextScreen;
window.nextScreen = function() {
    if (currentScreen === 7) {
        triggerConfetti();
    }
    if (currentScreen < totalScreens) {
        currentScreen++;
        showScreen(currentScreen);
    }
};

// Easter Egg: Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'ArrowRight') {
        nextScreen();
    }
});

// Prevent right-click on final screen
document.addEventListener('contextmenu', (e) => {
    if (currentScreen === 8) {
        e.preventDefault();
    }
});
