document.getElementById('surveyForm').addEventListener('submit', function(event) {
    let isValid = true;

    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

    const name = document.getElementById('name').value.trim();
    if (!name) {
        document.getElementById('nameError').textContent = 'Name is required.';
        isValid = false;
    }

    const source = document.querySelector('input[name="source"]:checked');
    if (!source) {
        document.getElementById('sourceError').textContent = 'Please select how you heard about us.';
        isValid = false;
    }

    const features = document.querySelectorAll('input[name="features"]:checked');
    if (features.length === 0) {
        document.getElementById('featuresError').textContent = 'Please select at least one feature.';
        isValid = false;
    }

    const experience = document.getElementById('experience').value;
    if (experience === '') {
        document.getElementById('experienceError').textContent = 'Please rate your experience.';
        isValid = false;
    }

    const username = document.getElementById('username').value;
    const usernamePattern = /^[a-zA-Z0-9]+$/;
    if (!usernamePattern.test(username)) {
        document.getElementById('usernameError').textContent = 'Username must be alphanumeric.';
        isValid = false;
    }

    const customCode = document.getElementById('customCode').value;
    const customCodePattern = /^[A-Z]{3}-\d{4}$/;
    if (!customCodePattern.test(customCode)) {
        document.getElementById('customCodeError').textContent = 'Code must be in the format ABC-1234.';
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault();
    }
});
