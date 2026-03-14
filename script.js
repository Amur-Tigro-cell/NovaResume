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