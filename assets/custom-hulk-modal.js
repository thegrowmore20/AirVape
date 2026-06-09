const triggers = document.querySelectorAll('.hulk-form-modal-custom-trigger');
const closeBtn = document.getElementById('hulk-form-modal-custom-close-btn');
const overlay = document.getElementById('hulk-form-modal-custom-overlay');
const body = document.body;

// Open logic for all buttons
triggers.forEach(btn => {
    btn.addEventListener('click', () => {
        overlay.classList.add('active');
        body.classList.add('hulk-form-modal-custom-open');
    });
});

// Close logic
const closeModal = () => {
    overlay.classList.remove('active');
    body.classList.remove('hulk-form-modal-custom-open');
};

closeBtn.addEventListener('click', closeModal);

overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && overlay.classList.contains('active')) closeModal();
});