document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const formMessage = document.getElementById('formMessage');

    // Simple validation
    if (!name || !email || !message) {
        formMessage.textContent = 'Please fill out all fields.';
        formMessage.style.color = '#d32f2f';
        return;
    }

    // Simulate sending message
    formMessage.textContent = 'Thank you, ' + name + '! Your message has been sent.';
    formMessage.style.color = '#388e3c';
    document.getElementById('contactForm').reset();
});

// Example usage of html2canvas and jsPDF
// Adds a button to download the resume as PDF

document.addEventListener('DOMContentLoaded', function () {
    // Create the button
    const downloadBtn = document.createElement('button');
    downloadBtn.textContent = 'Download Resume as PDF';
    downloadBtn.id = 'downloadPdfBtn';
    document.body.insertBefore(downloadBtn, document.body.firstChild);

    downloadBtn.addEventListener('click', function () {
        // Select the main content to capture
        const resumeElement = document.querySelector('main');
        html2canvas(resumeElement).then(function (canvas) {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new window.jspdf.jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
            // Calculate width/height for A4
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            // Scale image to fit page
            const imgProps = { width: canvas.width, height: canvas.height };
            const ratio = Math.min(pageWidth / imgProps.width, pageHeight / imgProps.height);
            const imgWidth = imgProps.width * ratio;
            const imgHeight = imgProps.height * ratio;
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save('NovaResume.pdf');
        });
    });
});

// Progress bar step navigation and animation
function setActiveStep(stepIndex) {
    const steps = document.querySelectorAll('.progress-bar .step');
    const sections = document.querySelectorAll('.step-section');
    steps.forEach((step, idx) => {
        step.classList.toggle('active', idx === stepIndex);
    });
    sections.forEach((section, idx) => {
        section.style.display = idx === stepIndex ? 'block' : 'none';
        section.style.opacity = idx === stepIndex ? 1 : 0;
        section.style.transition = 'opacity 0.4s';
    });
}

document.addEventListener('DOMContentLoaded', function () {
    let currentStep = 0;
    setActiveStep(currentStep);
    const steps = document.querySelectorAll('.progress-bar .step');
    const nextBtns = document.querySelectorAll('.next-btn');
    const prevBtns = document.querySelectorAll('.prev-btn');

    // Remove auto animation
    // Animate steps only on user action
    nextBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            if (currentStep < steps.length - 1) {
                currentStep++;
                setActiveStep(currentStep);
            }
        });
    });
    prevBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            if (currentStep > 0) {
                currentStep--;
                setActiveStep(currentStep);
            }
        });
    });
    steps.forEach((step, idx) => {
        step.addEventListener('click', function () {
            currentStep = idx;
            setActiveStep(currentStep);
        });
    });
});

// Example: Animate to next step every 2 seconds for demo
// Remove auto animation block
// Dark mode toggle logic
function applyDarkMode(isDark) {
    document.body.classList.toggle('dark-mode', isDark);
    document.querySelectorAll('header, footer, h1, h2, .step-section, input, textarea, button, .skills-list li, .progress-bar .step').forEach(el => {
        el.classList.toggle('dark-mode', isDark);
    });
    document.getElementById('darkModeToggle').textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
}

// Theme switching logic
function applyTheme(theme) {
    document.body.classList.remove('theme-blue', 'theme-green', 'theme-black', 'theme-gray');
    document.body.classList.add('theme-' + theme);
    localStorage.setItem('resumeTheme', theme);
}

document.addEventListener('DOMContentLoaded', function () {
    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    let isDark = localStorage.getItem('darkMode') === 'true';
    applyDarkMode(isDark);
    darkModeToggle.addEventListener('click', function () {
        isDark = !isDark;
        localStorage.setItem('darkMode', isDark);
        applyDarkMode(isDark);
    });

    // Theme selector
    const themeSelect = document.getElementById('themeSelect');
    const savedTheme = localStorage.getItem('resumeTheme') || 'blue';
    themeSelect.value = savedTheme;
    applyTheme(savedTheme);
    themeSelect.addEventListener('change', function () {
        applyTheme(themeSelect.value);
    });

    // Resume score evaluation logic
    function evaluateResume() {
        // Collect data from form
        const form = document.getElementById('resumeForm');
        const sections = form.querySelectorAll('.step-section');
        let score = 60; // Base score
        let suggestions = [];

        // Check for measurable achievements
        const workExp = sections[2].querySelector('input[type="text"]');
        if (workExp && !/\d/.test(workExp.value)) {
            suggestions.push('Add measurable achievements (numbers, results) to your work experience.');
            score -= 10;
        }

        // Check for LinkedIn profile
        const personalInfo = sections[0].querySelector('input[type="text"]');
        if (personalInfo && !/linkedin/i.test(personalInfo.value)) {
            suggestions.push('Add your LinkedIn profile to personal information.');
            score -= 10;
        }

        // Check for skills
        const skillsSection = sections[3].querySelector('input[type="text"]');
        if (skillsSection && skillsSection.value.split(',').length < 3) {
            suggestions.push('Add more skills to showcase your abilities.');
            score -= 10;
        }

        // Clamp score
        score = Math.max(0, Math.min(100, score));

        // Update UI
        document.getElementById('resumeScoreContainer').style.display = 'block';
        document.getElementById('resumeScoreBar').style.width = score + '%';
        document.getElementById('resumeScoreValue').textContent = 'Score: ' + score + '/100';
        const suggestionsList = document.getElementById('resumeSuggestions');
        suggestionsList.innerHTML = '';
        if (suggestions.length === 0) {
            suggestionsList.innerHTML = '<li>Your resume looks great!</li>';
        } else {
            suggestions.forEach(s => {
                const li = document.createElement('li');
                li.textContent = s;
                suggestionsList.appendChild(li);
            });
        }
    }

    // Evaluate resume on Download step
    const form = document.getElementById('resumeForm');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        evaluateResume();
    });

    // Resume sharing logic
    function generateShareableLink() {
        // Simulate unique link generation (in real app, use backend)
        const baseUrl = window.location.origin + window.location.pathname;
        const uniqueId = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
        return baseUrl + '?resume=' + uniqueId;
    }

    document.addEventListener('DOMContentLoaded', function () {
        // Show share container and generate link on Download step
        const form = document.getElementById('resumeForm');
        form.addEventListener('submit', function () {
            document.getElementById('resumeShareContainer').style.display = 'block';
            const link = generateShareableLink();
            document.getElementById('resumeShareLink').value = link;
        });
        // Copy link button
        document.getElementById('copyShareLinkBtn').addEventListener('click', function () {
            const linkInput = document.getElementById('resumeShareLink');
            linkInput.select();
            document.execCommand('copy');
            document.getElementById('shareLinkMessage').textContent = 'Link copied!';
            setTimeout(() => {
                document.getElementById('shareLinkMessage').textContent = '';
            }, 2000);
        });
        // If viewing a shared resume
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('resume')) {
            // Clean layout for shared resume
            document.body.innerHTML = '';
            const resumePreview = document.createElement('div');
            resumePreview.style.maxWidth = '600px';
            resumePreview.style.margin = '40px auto';
            resumePreview.style.background = '#fff';
            resumePreview.style.borderRadius = '16px';
            resumePreview.style.boxShadow = '0 4px 24px rgba(0,123,255,0.07)';
            resumePreview.style.padding = '32px 24px';
            resumePreview.innerHTML = '<h1>Shared Resume</h1><p>This is a clean preview of the shared resume.<br>(Resume data would be loaded here.)</p>';
            document.body.appendChild(resumePreview);
        }
    });
});