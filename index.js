  // ---- Mobile nav toggle ----
  const burgerBtn = document.getElementById('burgerBtn');
  const mobilePanel = document.getElementById('mobilePanel');

  burgerBtn.addEventListener('click', () => {
    const isOpen = mobilePanel.classList.toggle('open');
    burgerBtn.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile panel and smooth-scroll when a nav link is tapped
  document.querySelectorAll('.navlinks a, .mobile-panel a, a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId.charAt(0) !== '#' || targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      mobilePanel.classList.remove('open');
      burgerBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // ---- Contact form validation ----
  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const formStatus = document.getElementById('formStatus');

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setFieldState(input, errorEl, message) {
    if (message) {
      input.classList.add('invalid');
      errorEl.textContent = message;
    } else {
      input.classList.remove('invalid');
      errorEl.textContent = '';
    }
  }

  function validateForm() {
    let isValid = true;

    if (nameInput.value.trim() === '') {
      setFieldState(nameInput, nameError, 'Please enter your name.');
      isValid = false;
    } else {
      setFieldState(nameInput, nameError, '');
    }

    if (emailInput.value.trim() === '') {
      setFieldState(emailInput, emailError, 'Please enter your email.');
      isValid = false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
      setFieldState(emailInput, emailError, 'Please enter a valid email address.');
      isValid = false;
    } else {
      setFieldState(emailInput, emailError, '');
    }

    if (messageInput.value.trim() === '') {
      setFieldState(messageInput, messageError, 'Please enter a message.');
      isValid = false;
    } else {
      setFieldState(messageInput, messageError, '');
    }

    return isValid;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const valid = validateForm();

    if (!valid) {
      formStatus.textContent = 'Please fix the highlighted fields before sending.';
      formStatus.className = 'form-status show error';
      return;
    }

    formStatus.textContent = 'Thanks — your message has been sent. Our team will be in touch within one business day.';
    formStatus.className = 'form-status show success';
    form.reset();
  });

  // Clear a field's error as the user corrects it
  [nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('input', () => {
      if (input.classList.contains('invalid')) {
        input.classList.remove('invalid');
        document.getElementById(input.id + 'Error').textContent = '';
      }
    });
  });