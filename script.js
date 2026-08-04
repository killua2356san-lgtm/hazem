// Global Variables
let currentScreen = 1;
const totalScreens = 8;
let answers = {
    q1: false,
    q2: false,
    q3: false
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Start music
    const bgMusic = document.getElementById('bgMusic');
    bgMusic.volume = 0.3;
    bgMusic.play().catch(e => console.log('Audio play failed:', e));

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
        createParticles();
    }
}

function nextScreen() {
    if (currentScreen < totalScreens) {
        // Check if answers are complete before moving
        if (currentScreen === 2 && !answers.q1) {
            alert('يجب اختيار إجابة أولاً!');
            return;
        }
        if (currentScreen === 3 && !answers.q2) {
            alert('يجب اختيار إجابة أولاً!');
            return;
        }
        if (currentScreen === 4 && !answers.q3) {
            alert('يجب اختيار إجابة أولاً!');
            return;
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
    options[0].onclick = function() {
        if (!answers.q1) {
            answers.q1 = true;
            this.classList.add('correct');
            document.getElementById('feedback1').textContent = '✅ صحيح! Stranger Things 🎬';
            document.getElementById('feedback1').style.color = '#44ff44';
            
            // Enable next after 1.5 seconds
            setTimeout(() => {
                // Show a way to move forward (button or auto-next)
            }, 1500);
        }
    };
});

// Question 2: Bleach to Hunter x Hunter
function toggleBleach() {
    const btn = document.getElementById('bleachBtn');
    const feedback = document.getElementById('feedback2');

    if (!btn.classList.contains('transformed')) {
        btn.classList.add('transformed');
        btn.querySelector('.anime-name').textContent = 'Hunter x Hunter';
        feedback.textContent = '😂 Haha! انت عارف بتاعتنا!';
        feedback.style.color = '#44ff44';
        answers.q2 = true;
    }
}

// Question 3: Bike or Car
function chooseVehicle(choice) {
    const feedback = document.getElementById('feedback3');
    
    if (choice === 'car') {
        answers.q3 = true;
        feedback.textContent = '✅ الخيار الصحيح! Nissan Skyline 🏁';
        feedback.style.color = '#44ff44';
    } else {
        feedback.textContent = '❌ بتاعتك السيارات يا محترف!';
        feedback.style.color = '#ff4444';
    }
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

// Override nextScreen for final reveal
const originalNextScreen = window.nextScreen;
window.nextScreen = function() {
    if (currentScreen === 7) {
        triggerConfetti();
    }
    if (currentScreen < totalScreens) {
        if (currentScreen === 2 && !answers.q1) {
            alert('يجب اختيار إجابة أولاً!');
            return;
        }
        if (currentScreen === 3 && !answers.q2) {
            alert('يجب اختيار إجابة أولاً!');
            return;
        }
        if (currentScreen === 4 && !answers.q3) {
            alert('يجب اختيار إجابة أولاً!');
            return;
        }

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
