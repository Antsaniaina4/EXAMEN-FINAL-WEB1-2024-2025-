// Pour gérer les barres de navigations
document.querySelectorAll('.nav-link .link').forEach(link => {
    link.addEventListener('click', function(e) {
        document.querySelectorAll('.nav-link .link').forEach(l => {
            l.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// écriture manuscrite pour le texte turboTyping
const brandName = document.getElementById('brand-name');

brandName.addEventListener('animationend', () => {
    brandName.style.animation = 'block';

    setTimeout(() => {
        brandName.style.animation = 'typing 5s steps(20, end)';
    }, 100);
});

// Pour le défilement scroll vers les pages de navigations en un clique
window.addEventListener('scroll', () => {
    const homePage = document.getElementById('home-page');
    const aboutPage = document.getElementById('about-page');
    const typingTestPage = document.getElementById('typing-test-page');
    const contactPage = document.getElementById('contact-page');
    const homeLink = document.querySelector('a[href="#home"]');
    const aboutLink = document.querySelector('a[href="#about"]');
    const typingTestLink = document.querySelector('a[href="#typing-test"]');
    const contactLink = document.querySelector('a[href="#contact"]');

    const homePosition = homePage.getBoundingClientRect();
    const aboutPosition = aboutPage.getBoundingClientRect();
    const typingTestPosition = typingTestPage.getBoundingClientRect();
    const contactPosition = contactPage.getBoundingClientRect();

    if (contactPosition.top <= 100) {
        homeLink.classList.remove('active');
        aboutLink.classList.remove('active');
        typingTestLink.classList.remove('active');
        contactLink.classList.add('active');

    } else if (typingTestPosition.top <= 100) {
        homeLink.classList.remove('active');
        aboutLink.classList.remove('active');
        typingTestLink.classList.add('active');
        contactLink.classList.remove('active');

    } else if (aboutPosition.top <= 100) {
        homeLink.classList.remove('active');
        aboutLink.classList.add('active');
        typingTestLink.classList.remove('active');
        contactLink.classList.remove('active');
        
    } else {
        homeLink.classList.add('active');
        aboutLink.classList.remove('active');
        typingTestLink.classList.remove('active');
        contactLink.classList.remove('active');
    }
});

// Gestion du clic sur le lien About
document.querySelector('a[href="#about"]').addEventListener('click', (e)=> {
    e.preventDefault();
    document.getElementById('about-page').scrollIntoView({
        behavior: 'smooth'
    });

    document.querySelectorAll('.nav-link .link').forEach(l => {
        l.classList.remove('active');
    });
    e.target.classList.add('active');
});

// Gestion du clic sur le lien Contact
document.querySelector('a[href="#contact"]').addEventListener('click', (e)=> {
    e.preventDefault();
    document.getElementById('contact-page').scrollIntoView({
        behavior: 'smooth'
    });

    document.querySelectorAll('.nav-link .link').forEach(l => {
        l.classList.remove('active');
    });
    e.target.classList.add('active');
});

// Change l'animation de la barre de navigation head horizontale
document.addEventListener('DOMContentLoaded', () => { 
    window.addEventListener('scroll', ()=> {
        const navHeader = document.getElementById('nav-header');
        if (window.scrollY > 2) {
            navHeader.classList.add('scrolled');
        } else {
            navHeader.classList.remove('scrolled');
        }
    });

    document.querySelectorAll('.nav-link .link').forEach(link => {
        link.addEventListener('click', function(e) {
            document.querySelectorAll('.nav-link .link').forEach(l => {
                l.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    document.querySelector('a[href="#home"]').addEventListener('click', (e)=> {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        document.querySelectorAll('.nav-link .link').forEach(l => {
            l.classList.remove('active');
        });
        e.target.classList.add('active');
    });

    let testDurations = {
        easy: 120,
        medium: 210,
        hard: 260
    };

    let currentDuration = testDurations.easy;
    let currentWordIndex = 0;
    const wordsToType = [];

    const modeSelect = document.getElementById("mode");
    const languageSelect = document.getElementById("language");
    const wordDisplay = document.getElementById("word-display");
    const inputField = document.getElementById("input-field");
    const results = document.getElementById("results");

    // POur la sélection des langages
    const wordsByLanguage = {
        english: {
            easy: ["wind", "snow", "rain", "sun", "cloud"],
            medium: ["tennis", "volley", "soccer", "judo", "hockey"],
            hard: ["orchestra", "symphony", "composition", "improvisation", "percussion"]
        },
        malagasy: {
            easy: ["rivotra", "hazo", "rano", "tany", "rahona"],
            medium: ["lalana", "lakana", "fiarakodia", "taona", "fiainana"],
            hard: ["fampandrosoana", "fiarahamonina", "fifandraisana", "fahafaham-po", "fahamarinana"]
        },
        french: {
            easy: ["vent", "neige", "pluie", "soleil", "nuage"],
            medium: ["tennis", "volley", "football", "judo", "hockey"],
            hard: ["orchestre", "symphonie", "composition", "improvisation", "percussion"]
        }
    };

    //  Pour faire randomiser les mots 
    const getRandomWord = (mode) => {
        const currentLanguage = languageSelect.value;
        const wordList = wordsByLanguage[currentLanguage][mode];
        return wordList[Math.floor(Math.random() * wordList.length)];
    };

    const startTest = (wordCount = 30) => {
        currentDuration = testDurations[modeSelect.value];
        remainingTime = currentDuration;
        document.getElementById('timer').textContent = remainingTime;

        wordsToType.length = 0;
        wordDisplay.innerHTML = "";
        currentWordIndex = 0;
        startTime = null;
        previousEndTime = null;
        clearInterval(timerInterval);
        timerInterval = null;
        inputField.disabled = false;

        for (let i = 0; i < wordCount; i++) {
            wordsToType.push(getRandomWord(modeSelect.value));
        }

        wordsToType.forEach((word, index) => {
            const span = document.createElement("span");
            span.textContent = word + " ";
            if (index === 0) span.style.color = "#e71fee";
            wordDisplay.appendChild(span);
        });

        inputField.value = "";
        results.textContent = "";
    };

    let testDuration = 90;
    let remainingTime = testDuration;
    let timerInterval;

    const startTimer = ()=> {
        if (!timerInterval) {
            timerInterval = setInterval(()=> {
                remainingTime--;
                document.getElementById('timer').textContent = remainingTime;

                if (remainingTime <= 0) {
                    clearInterval(timerInterval);
                    inputField.disabled = true;
                    showFinalResults();
                }
            }, 1000);
        }
    };

    const getCurrentStats = () => {
        const elapsedTime = (Date.now() - previousEndTime) / 1000;
        const wpm = (wordsToType[currentWordIndex].length / 5) / (elapsedTime / 120);
        const accuracy = (wordsToType[currentWordIndex].length / inputField.value.length) * 100;

        return { wpm: wpm.toFixed(2), accuracy: accuracy.toFixed(2) };
    };

    let mistakesCount = 0;
    let testCompleted = false;

    const updateWord = (event) => {
        if (event.key === " ") {
            const typedWord = inputField.value.trim();
            const currentWord = wordsToType[currentWordIndex];

            if (typedWord === currentWord) {
                if (!previousEndTime) previousEndTime = startTime;
                const { wpm, accuracy } = getCurrentStats();
                results.textContent = `WPM: ${wpm}, Accuracy: ${accuracy}%`;

                currentWordIndex++;
                previousEndTime = Date.now();
                highlightNextWord();

                inputField.value = "";
                event.preventDefault();
            } else {
                mistakesCount++;
            }
        }
    };

    const showFinalStats = (completed)=> {
        const statsCard = document.getElementById('stats-card');
        const statsTitle = document.querySelector('.stats-content h2');
        const finalWPM = document.getElementById('final-wpm');
        const finalAccuracy = document.getElementById('final-accuracy');
        const finalMistakes = document.getElementById('mistakes');
        const finalTimeLeft = document.getElementById('time-left');

        const timeUsed = testDuration - remainingTime;
        const wpm = ((currentWordIndex * 60) / timeUsed).toFixed(2);
        const accuracy = ((currentWordIndex / wordsToType.length) * 100).toFixed(2);

        statsTitle.textContent = completed? 'Test Completed!' : 'Ooh!, Almost there';
        finalWPM.textContent = wpm;
        finalAccuracy.textContent = `${accuracy}%`;
        finalMistakes.textContent = mistakesCount;
        finalTimeLeft.textContent = `${remainingTime}s`;

        statsCard.style.display = 'flex';
        testCompleted = completed;
    };

    const highlightNextWord = () => {
        const wordElements = wordDisplay.children;

        if (currentWordIndex < wordElements.length) {
            if (currentWordIndex > 0) {
                wordElements[currentWordIndex - 1].style.color = "#000";
            }
            wordElements[currentWordIndex].style.color = "#e71fee";
        } else {
            clearInterval(timerInterval);
            showFinalStats(true);
        }
    };

    document.getElementById('restart-btn').addEventListener('click', ()=> {
        document.getElementById('stats-card').style.display = 'none';
        mistakesCount = 0;
        testCompleted = false;
        startTest();
    });

    document.getElementById('show-stats').addEventListener('click', ()=> {
        if (!testCompleted) {
            showFinalStats(false);
        }
    });

    inputField.addEventListener("keydown", (event) => {
        startTimer();
        updateWord(event);
    });

    // Écouteurs d'événements pour les changements de mode et de langue
    modeSelect.addEventListener("change", () => startTest());
    languageSelect.addEventListener("change", () => startTest());

    startTest(); // Appel initial une fois le DOM prêt
});