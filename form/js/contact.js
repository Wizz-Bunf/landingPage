renderContactForm();       // Injecte dynamiquement le formulaire
setupFormLogic();          // Initialise la logique après injection

// Injecte dynamiquement le HTML du formulaire
function renderContactForm() {
    const app = document.getElementById('contactForm');
    const container = document.createElement('div');
    container.className = 'container';
    container.innerHTML = `
        <h1>Contactez-nous</h1>
        <form id="contactForm">
            <div class="form-group">
                <label for="name">Nom *</label>
                <input type="text" id="name" name="name" aria-required="true">
                <div class="error-message" id="nameError">Veuillez saisir votre nom</div>
            </div>

            <div class="form-group">
                <label for="email">Email *</label>
                <input type="email" id="email" name="email" aria-required="true">
                <div class="error-message" id="emailError">Veuillez saisir un email valide</div>
            </div>

            <div class="form-group">
                <label for="message">Message *</label>
                <textarea id="message" name="message" aria-required="true"></textarea>
                <div class="error-message" id="messageError">Veuillez saisir votre message</div>
            </div>

            <button type="submit" class="btn" id="submitBtn">Envoyer</button>
        </form>
    `;
    app.appendChild(container);
}

// Initialise la validation, modale et soumission
function setupFormLogic() {
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const submitBtn = document.getElementById('submitBtn');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validateField(field, errorElement, validationFn) {
        field.addEventListener('input', () => {
            const error = validationFn(field.value);
            if (error) {
                errorElement.textContent = error;
                errorElement.style.display = 'block';
                field.setAttribute('aria-invalid', 'true');
            } else {
                errorElement.style.display = 'none';
                field.setAttribute('aria-invalid', 'false');
            }
        });
    }

    function validateName(value) {
        return value.trim() ? null : 'Veuillez saisir votre nom';
    }

    function validateEmail(value) {
        if (!value.trim()) return 'Veuillez saisir votre email';
        if (!emailRegex.test(value)) return 'Veuillez saisir un email valide';
        return null;
    }

    function validateMessage(value) {
        return value.trim() ? null : 'Veuillez saisir votre message';
    }

    validateField(nameInput, nameError, validateName);
    validateField(emailInput, emailError, validateEmail);
    validateField(messageInput, messageError, validateMessage);

    function showConfirmationModal() {
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        modalOverlay.setAttribute('role', 'dialog');
        modalOverlay.setAttribute('aria-labelledby', 'modalTitle');
        modalOverlay.setAttribute('aria-modal', 'true');

        const modal = document.createElement('div');
        modal.className = 'modal';

        const closeButton = document.createElement('button');
        closeButton.className = 'modal-close';
        closeButton.innerHTML = '&times;';
        closeButton.setAttribute('aria-label', 'Fermer la modale');

        const modalIcon = document.createElement('div');
        modalIcon.className = 'modal-icon';
        modalIcon.innerHTML = '✓';
        modalIcon.setAttribute('aria-hidden', 'true');

        const modalTitle = document.createElement('h2');
        modalTitle.className = 'modal-title';
        modalTitle.id = 'modalTitle';
        modalTitle.textContent = 'Message envoyé !';

        const modalMessage = document.createElement('p');
        modalMessage.className = 'modal-message';
        modalMessage.textContent = 'Merci de nous avoir contactés. Nous vous répondrons bientôt.';

        const modalButton = document.createElement('button');
        modalButton.className = 'modal-btn';
        modalButton.textContent = 'Fermer';

        modal.appendChild(closeButton);
        modal.appendChild(modalIcon);
        modal.appendChild(modalTitle);
        modal.appendChild(modalMessage);
        modal.appendChild(modalButton);
        modalOverlay.appendChild(modal);
        document.body.appendChild(modalOverlay);

        setTimeout(() => modalOverlay.classList.add('active'), 10);

        function closeModal() {
            modalOverlay.classList.remove('active');
            setTimeout(() => document.body.removeChild(modalOverlay), 300);
        }

        closeButton.addEventListener('click', closeModal);
        modalButton.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });

        document.addEventListener('keydown', function handleEscape(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleEscape);
            }
        });
    }

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameErrorMsg = validateName(nameInput.value);
        const emailErrorMsg = validateEmail(emailInput.value);
        const messageErrorMsg = validateMessage(messageInput.value);

        if (nameErrorMsg || emailErrorMsg || messageErrorMsg) {
            if (nameErrorMsg) {
                nameError.textContent = nameErrorMsg;
                nameError.style.display = 'block';
                nameInput.setAttribute('aria-invalid', 'true');
            }
            if (emailErrorMsg) {
                emailError.textContent = emailErrorMsg;
                emailError.style.display = 'block';
                emailInput.setAttribute('aria-invalid', 'true');
            }
            if (messageErrorMsg) {
                messageError.textContent = messageErrorMsg;
                messageError.style.display = 'block';
                messageInput.setAttribute('aria-invalid', 'true');
            }

            const firstErrorField = document.querySelector('[aria-invalid="true"]');
            if (firstErrorField) firstErrorField.focus();

            return;
        }

        submitBtn.classList.add('loading');

        setTimeout(() => {
            submitBtn.classList.remove('loading');
            contactForm.reset();
            showConfirmationModal();
        }, 1500);
    });
}
