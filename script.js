// Download PDF feature
document.getElementById('downloadPdfBtn').addEventListener('click', function() {
    const resume = document.getElementById('resumePreview');
    html2canvas(resume, { scale: 2 }).then(function(canvas) {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new window.jspdf.jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        // Calculate image dimensions to fit A4
        const imgWidth = pageWidth - 40;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        pdf.addImage(imgData, 'PNG', 20, 20, imgWidth, imgHeight);
        pdf.save('resume.pdf');
    });
});
// Resume builder live preview
const builderName = document.getElementById('builderName');
const builderEducation = document.getElementById('builderEducation');
const builderExperience = document.getElementById('builderExperience');
const builderSkills = document.getElementById('builderSkills');

const previewName = document.getElementById('previewName');
const previewEducation = document.getElementById('previewEducation');
const previewExperience = document.getElementById('previewExperience');
const previewSkills = document.getElementById('previewSkills');

function updatePreview() {
    previewName.textContent = builderName.value || 'Your Name';
    previewEducation.textContent = builderEducation.value || 'Your Education';
    previewExperience.textContent = builderExperience.value || 'Your Experience';
    previewSkills.textContent = builderSkills.value || 'HTML, CSS, JS';
}

builderName.addEventListener('input', updatePreview);
builderEducation.addEventListener('input', updatePreview);
builderExperience.addEventListener('input', updatePreview);
builderSkills.addEventListener('input', updatePreview);
// Template card click actions
document.querySelectorAll('.template-card').forEach(function(card) {
    card.addEventListener('click', function() {
        // Open resume editor (customize as needed)
        // For now, scroll to About section
        window.location.hash = '#about';
    });
});
// Hero section button actions
document.getElementById('createResumeBtn').addEventListener('click', function() {
    // Scroll to resume builder section or redirect (customize as needed)
    window.location.hash = '#about';
});

document.getElementById('viewTemplatesBtn').addEventListener('click', function() {
    // Scroll to templates section or redirect (customize as needed)
    window.location.hash = '#skills';
});
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