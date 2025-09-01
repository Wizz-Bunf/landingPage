// Sélection des éléments du formulaire
        const contactForm = document.getElementById('contactForm');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const messageError = document.getElementById('messageError');
        const submitBtn = document.getElementById('submitBtn');

        // Expressions régulières pour la validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Fonction de validation en temps réel
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

        // Fonctions de validation spécifiques
        function validateName(value) {
            if (!value.trim()) return 'Veuillez saisir votre nom';
            return null;
        }

        function validateEmail(value) {
            if (!value.trim()) return 'Veuillez saisir votre email';
            if (!emailRegex.test(value)) return 'Veuillez saisir un email valide';
            return null;
        }

        function validateMessage(value) {
            if (!value.trim()) return 'Veuillez saisir votre message';
            return null;
        }

        // Initialisation de la validation en temps réel
        validateField(nameInput, nameError, validateName);
        validateField(emailInput, emailError, validateEmail);
        validateField(messageInput, messageError, validateMessage);

        // Fonction pour créer et afficher la modale
        function showConfirmationModal() {
            // Création des éléments de la modale
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
            modalMessage.textContent = 'Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.';
            
            const modalButton = document.createElement('button');
            modalButton.className = 'modal-btn';
            modalButton.textContent = 'Fermer';
            
            // Assemblage de la modale
            modal.appendChild(closeButton);
            modal.appendChild(modalIcon);
            modal.appendChild(modalTitle);
            modal.appendChild(modalMessage);
            modal.appendChild(modalButton);
            modalOverlay.appendChild(modal);
            
            // Ajout au DOM
            document.body.appendChild(modalOverlay);
            
            // Animation d'apparition
            setTimeout(() => {
                modalOverlay.classList.add('active');
            }, 10);
            
            // Gestion des événements pour fermer la modale
            function closeModal() {
                modalOverlay.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(modalOverlay);
                }, 300);
            }
            
            closeButton.addEventListener('click', closeModal);
            modalButton.addEventListener('click', closeModal);
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) closeModal();
            });
            
            // Fermeture avec la touche Échap
            document.addEventListener('keydown', function handleEscape(e) {
                if (e.key === 'Escape') {
                    closeModal();
                    document.removeEventListener('keydown', handleEscape);
                }
            });
        }

        // Soumission du formulaire
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validation finale avant envoi
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
                
                // Focus sur le premier champ avec erreur
                const firstErrorField = document.querySelector('[aria-invalid="true"]');
                if (firstErrorField) firstErrorField.focus();
                
                return;
            }
            
            // Simulation d'envoi avec animation de chargement
            submitBtn.classList.add('loading');
            
            // Simulation d'une requête asynchrone
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                
                // Réinitialisation du formulaire
                contactForm.reset();
                
                // Affichage de la modale de confirmation
                showConfirmationModal();
            }, 1500);
        });