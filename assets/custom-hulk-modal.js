(function () {
    const overlay = document.getElementById('hulk-form-modal-custom-overlay');
    // No modal on this page — bail out so nothing else throws.
    if (!overlay) return;

    const triggers = document.querySelectorAll('.hulk-form-modal-custom-trigger');
    const closeBtn = document.getElementById('hulk-form-modal-custom-close-btn');
    const body = document.body;

    const openModal = () => {
        overlay.classList.add('active');
        body.classList.add('hulk-form-modal-custom-open');
    };

    const closeModal = () => {
        overlay.classList.remove('active');
        body.classList.remove('hulk-form-modal-custom-open');
    };

    // Open logic for all trigger buttons
    triggers.forEach(btn => btn.addEventListener('click', openModal));

    // Close logic
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && overlay.classList.contains('active')) closeModal();
    });
})();