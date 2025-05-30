// Splash Screen Logic
document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.querySelector('.splash-screen');
    const mainContent = document.querySelector('.container');
    const countdownElement = document.querySelector('.countdown');
    const typingText = document.getElementById('typing-text');
    let count = 5;

    // Hide main content initially
    if (mainContent) {
        mainContent.style.opacity = '0';
        mainContent.style.display = 'none';
    }

    const messages = [
        "Loading Surprise...",
        "Preparing Magic...",
        "🎉 Happy Birthday, Suju 🎉"
    ];

    // Create sparkles
    function createSparkles() {
        const container = document.querySelector('.splash-content');
        if (!container) return;
        
        for (let i = 0; i < 20; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.setProperty('--tx', (Math.random() * 200 - 100) + 'px');
            sparkle.style.setProperty('--ty', (Math.random() * 200 - 100) + 'px');
            sparkle.style.animationDelay = Math.random() * 2 + 's';
            container.appendChild(sparkle);
        }
    }

    // Create enhanced fireworks
    function createSplashFirework(x, y) {
        const firework = document.createElement('div');
        firework.className = 'splash-firework';
        firework.style.left = x + 'px';
        firework.style.top = y + 'px';
        document.body.appendChild(firework);

        // Create more particles with different colors
        for (let i = 0; i < 40; i++) {
            const particle = document.createElement('div');
            particle.className = 'splash-firework-particle';
            const angle = (Math.PI * 2 * i) / 40;
            const tx = Math.cos(angle);
            const ty = Math.sin(angle);
            particle.style.setProperty('--tx', tx);
            particle.style.setProperty('--ty', ty);
            particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            firework.appendChild(particle);
        }

        setTimeout(() => {
            firework.remove();
        }, 1500);
    }

    function showSplashFireworks() {
        const fireworks = 8; // More fireworks
        const delay = 300;

        for (let i = 0; i < fireworks; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * (window.innerHeight * 0.7); // Keep fireworks in upper part
                createSplashFirework(x, y);
            }, i * delay);
        }
    }

    let currentMessageIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let allMessagesShown = false;

    function typeText() {
        if (!typingText) return;
        
        const currentMessage = messages[currentMessageIndex];
        
        if (isDeleting) {
            typingText.textContent = currentMessage.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentMessage.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && currentCharIndex === currentMessage.length) {
            isDeleting = true;
            typingSpeed = 1000;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentMessageIndex++;
            
            if (currentMessageIndex >= messages.length) {
                allMessagesShown = true;
                typingText.textContent = messages[messages.length - 1];
                createSparkles();
                return;
            }
            
            typingSpeed = 500;
        }

        setTimeout(typeText, typingSpeed);
    }

    // Create confetti
    function createConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#ffd93d', '#ff8c42', '#95e1d3', '#ff69b4', '#00ff00', '#ff1493'];
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear forwards`;
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            document.body.appendChild(confetti);
        }
    }

    // Countdown function
    function startCountdown() {
        const countdownInterval = setInterval(() => {
            if (allMessagesShown && countdownElement) {
                count--;
                countdownElement.textContent = count;
                
                if (count === 0) {
                    clearInterval(countdownInterval);
                    createConfetti();
                    showSplashFireworks();
                    
                    // Smooth transition to main content
                    if (splashScreen && mainContent) {
                        splashScreen.style.opacity = '0';
                        splashScreen.style.transition = 'opacity 1s ease-in-out';
                        
                        setTimeout(() => {
                            splashScreen.style.display = 'none';
                            mainContent.style.display = 'block';
                            
                            // Force reflow
                            mainContent.offsetHeight;
                            
                            mainContent.style.opacity = '1';
                            mainContent.style.transition = 'opacity 1s ease-in-out';
                        }, 1000);
                    }
                }
            }
        }, 1000);
    }

    // Start the typing animation
    typeText();
    // Start the countdown
    startCountdown();
});

// Particle effect
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 5 and 20 pixels
        const size = Math.random() * 15 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        
        // Random animation duration between 10 and 20 seconds
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        
        // Random delay
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Slideshow functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach(slide => {
        slide.classList.remove('active', 'prev');
    });
    dots.forEach(dot => dot.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');

    const prevIndex = (index - 1 + totalSlides) % totalSlides;
    slides[prevIndex].classList.add('prev');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Add click event to dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Auto slide every 5 seconds
setInterval(nextSlide, 5000);

// Confetti effect
function createConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        document.body.appendChild(confetti);
    }
}

function createFirework(x, y) {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = x + 'px';
    firework.style.top = y + 'px';
    document.body.appendChild(firework);

    // Create particles
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';
        const angle = (Math.PI * 2 * i) / 30;
        const tx = Math.cos(angle);
        const ty = Math.sin(angle);
        particle.style.setProperty('--tx', tx);
        particle.style.setProperty('--ty', ty);
        particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        firework.appendChild(particle);
    }

    // Remove firework after animation
    setTimeout(() => {
        firework.remove();
    }, 1000);
}

function showFireworks() {
    const fireworks = 5;
    const delay = 200;

    for (let i = 0; i < fireworks; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            createFirework(x, y);
        }, i * delay);
    }
}

// Update the transition to main page
function transitionToMainPage() {
    const splashScreen = document.querySelector('.splash-screen');
    const mainContent = document.querySelector('.main-content');
    
    splashScreen.style.opacity = '0';
    setTimeout(() => {
        splashScreen.style.display = 'none';
        mainContent.style.display = 'block';
        setTimeout(() => {
            mainContent.style.opacity = '1';
            showFireworks(); // Add fireworks when main page appears
        }, 100);
    }, 1000);
}

// Initialize everything when page loads
window.onload = function() {
    createParticles();
    createConfetti();
};

function showPopup() {
    const popup = document.querySelector('.popup-overlay');
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closePopup() {
    const popup = document.querySelector('.popup-overlay');
    popup.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Add event listener for close button
document.addEventListener('DOMContentLoaded', function() {
    const closeButton = document.querySelector('.close-popup');
    if (closeButton) {
        closeButton.addEventListener('click', closePopup);
    }
}); 

